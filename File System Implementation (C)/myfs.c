#define FUSE_USE_VERSION 26

#include <fuse.h>
#include <errno.h>
#include <fcntl.h>

#include "myfs.h"

//TODO: Check frees in all methods
//TODO: Permissions on everything
//TODO: Add not found to init process since FS could shut down during creat or mkdir

//Global pointers
unqlite *pDb; //Persistent database
unqlite *memDb; //In-memory database
uuid_t zero_uuid; //Zero UUID
myfcb *root_fcb; //Root FCB

//Function to add FCB to FS. First stores in memory, then handles persistent storage
int store_fcb(char *key, void *value_ptr) {
    int rc;
    unqlite_int64 value_size = sizeof(myfcb);

    if (strlen(key) == ROOT_OBJECT_KEY_SIZE) {
        //Want to store root FCB
        memcpy(root_fcb, value_ptr, value_size); //Memory (global pointer for root)
        rc = unqlite_kv_store(pDb, ROOT_OBJECT_KEY, ROOT_OBJECT_KEY_SIZE, value_ptr, value_size); //Persistent
    } else {
        //Want to store any other FCB
        rc = unqlite_kv_store(memDb, key, KEY_SIZE, value_ptr, value_size); //Memory
        if (rc != UNQLITE_OK) return rc;
        rc = unqlite_kv_store(pDb, key, KEY_SIZE, value_ptr, value_size); //Persistent
    }

    return rc;
}

//Function to store FCB in memory kv store only. Only used in FS intialisation.
int store_mem_fcb(char *key, void *value_ptr) {
    int rc;
    unqlite_int64 value_size = sizeof(myfcb);

    if (strlen(key) == ROOT_OBJECT_KEY_SIZE) {
        //Want to store root FCB
        memcpy(root_fcb, value_ptr, value_size);
    } else {
        //Want to store any other FCB
        rc = unqlite_kv_store(memDb, key, KEY_SIZE, value_ptr, value_size);
    }

    return rc;
}

//Function to fetch FCB from memory kv store
int fetch_fcb(char *key, void *buffer) {
    int rc;
    unqlite_int64 nBytes = sizeof(myfcb);

    if (strlen(key) == ROOT_OBJECT_KEY_SIZE) {
        //Want to fetch root FCB
        memcpy(buffer, root_fcb, nBytes);
    } else {
        //Want to fetch any other FCB
        rc = unqlite_kv_fetch(memDb, key, KEY_SIZE, buffer, &nBytes);
    }

    return rc;
}

//Function to fetch FCB from persistent kv store. Only used in FS initialisation
int fetch_persistent_fcb(char *key, void *buffer) {
    int rc;
    unqlite_int64 nBytes = sizeof(myfcb);

    if (strlen(key) == ROOT_OBJECT_KEY_SIZE) {
        //Want to fetch root FCB
        rc = unqlite_kv_fetch(pDb, ROOT_OBJECT_KEY, ROOT_OBJECT_KEY_SIZE, buffer, &nBytes);
    } else {
        //Want to fetch any other FCB
        rc = unqlite_kv_fetch(pDb, key, KEY_SIZE, buffer, &nBytes);
    }

    return rc;
}

//Function to remove FCB entry from FS. Handles in-memory storage first, then persistent
int delete_fcb(char *key) {
    int rc;
    if (strlen(key) == ROOT_OBJECT_KEY_SIZE) {
        //Want to delete root FCB
        memset(root_fcb, 0, sizeof(myfcb)); //Memory
        if (rc != UNQLITE_OK) return rc;
        rc = unqlite_kv_delete(pDb, ROOT_OBJECT_KEY, ROOT_OBJECT_KEY_SIZE); //Persistent
    } else {
        //Want to delete any other FCB
        rc = unqlite_kv_delete(memDb, key, KEY_SIZE); //Memory
        if (rc != UNQLITE_OK) return rc;
        rc = unqlite_kv_delete(pDb, key, KEY_SIZE); //Persistent
    }
    return rc;
}

//Function to store file data in persistent DB
int store_data(char *key, void *value_ptr, unqlite_int64 value_size) {
    int rc = unqlite_kv_store(pDb, key, KEY_SIZE, value_ptr, value_size);
    return rc;
}

//Function to fetch file data from persistent DB
int fetch_data(char *key, void *buffer, unqlite_int64 value_size) {
    unqlite_int64 nBytes = value_size;
    int rc = unqlite_kv_fetch(pDb, key, KEY_SIZE, buffer, &nBytes);
    return rc;
}

//Function to remove file data entry from persistent DB
int delete_data(char *key) {
    int rc = unqlite_kv_delete(pDb, key, KEY_SIZE);
    return rc;
}


//Function to check permissions of a file
//Flags 'r','w','x' used for flag. Returns int representing boolean
int have_permission(myfcb *this_fcb, char flag) {

    //Symbolic constants
    int user_const;
    int group_const;
    int other_const;

    //Set symbolic constants to use
    if (flag == 'r') {
        //Read
        user_const = S_IRUSR;
        group_const = S_IRGRP;
        other_const = S_IROTH;

    } else if (flag == 'w') {
        //Write
        user_const = S_IWUSR;
        group_const = S_IWGRP;
        other_const = S_IWOTH;

    } else if (flag == 'x') {
        //Execute
        user_const = S_IXUSR;
        group_const = S_IXGRP;
        other_const = S_IXOTH;
    }

    //Super user takes highest precedence
    if (getuid() == 0) {
        return 1; //Permission granted
    }

    //User takes precedence over group and others
    if (getuid() == this_fcb->uid) {
        if (this_fcb->mode & user_const) return 1; //Permission granted
        else return 0; //Permission denied
    }

    //Group takes precedence over others
    if (getgid() == this_fcb->gid) {
        if (this_fcb->mode & group_const) return 1; //Permission granted
        else return 0; //Permission denied
    }

    //Others take least precedence
    if (this_fcb->mode & other_const) return 1; //Permission granted
    else return 0; //Permission denied
}

//Gets file/directory FCB from a given path, and copies data into fcb_buf & key int uuid_buf
//Returns 0 on success, and error code on failure
int get_fcb_from_path(const char *path, myfcb *fcb_buf, uuid_t *uuid_buf) {
    write_log("Started search for FCB using path: %s\n", path);

    //Null means no entry as per man pages
    if(path == NULL){
        write_log("Provided path is NULL. Returning no entry error\n");
        return -ENOENT;
    }

    //Root FCB returned if empty path given
    if (path[0] == '/' && path[1] == '\0') {
        memcpy(fcb_buf, root_fcb, sizeof(myfcb));
        if (uuid_buf != NULL) memcpy(uuid_buf, &ROOT_OBJECT_KEY, KEY_SIZE);
        write_log("Fetched root FCB from path\n");
        return 0;
    }

    //Check for permission to read root directory
    if (!have_permission(root_fcb, 'r')) {
        write_log("No permission to read root directory during search\n");
        return -EACCES;
    }

    //Copy path before tokenizing
    char *path_cpy = malloc(strlen(path) + 1);
    strcpy(path_cpy, path);

    //Set traversal markers to root_fcb, its data, and path tokens
    myfcb *this_fcb = calloc(1, sizeof(myfcb));
    memcpy(this_fcb, root_fcb, sizeof(myfcb));

    //No data in stored for root FCB means no entry
    if (this_fcb->size == 0) {
        free(this_fcb);
        free(path_cpy);
        write_log("No file or directory found\n");
        return -ENOENT;
    }

    uint8_t *this_fcb_data = calloc(1, this_fcb->size);
    int rc = fetch_data(this_fcb->data_uuid, this_fcb_data, this_fcb->size);
    if (rc != UNQLITE_OK) {
        write_log("Error when using database(s); returning -EIO\n");
        free(this_fcb);
        free(path_cpy);
        free(this_fcb_data);
        return -EIO;
    }

    char *this_path_token = strtok(path_cpy, "/");
    char *next_path_token = strtok(NULL, "/");

    //Loop through path using tokens
    while (next_path_token) {

        //Loop through dirents in data to try find match to current token
        dirent *this_dirent;
        int dirent_counter;
        int total_dirents = this_fcb->size / sizeof(dirent);
        for (dirent_counter = 0; dirent_counter < total_dirents; dirent_counter++) {

            //Form dirent from this section of data
            this_dirent = (dirent *) (this_fcb_data + (dirent_counter * sizeof(dirent)));
            write_log("Search currently at name: %s\n", this_dirent->name);
            //Check for match
            if (strcmp(this_dirent->name, this_path_token) == 0) {
                //Fetch matching FCB & end for loop
                rc = fetch_fcb(this_dirent->fcb_uuid, this_fcb);
                if (rc != UNQLITE_OK) {
                    free(this_fcb);
                    free(path_cpy);
                    free(this_fcb_data);
                    write_log("Error when using database(s); returning -EIO\n");
                    return -EIO;
                }
                break;
            }

        } //For end

        //No dirent found with wanted name => No FCB
        if (dirent_counter == total_dirents) {
            free(path_cpy);
            free(this_fcb_data);
            free(this_fcb);
            write_log("No file or directory found\n");
            return -ENOENT;
        }

        //Else FCB found, so check permissions and that it is a directory, then read data
        if (!(this_fcb->mode & S_IFDIR)) {
            //Not a directory
            free(path_cpy);
            free(this_fcb_data);
            free(this_fcb);
            write_log("File in pathname that isn't a directory\n");
            return -ENOTDIR;
        }
        if (!have_permission(this_fcb, 'r')) {
            //No read permission
            free(path_cpy);
            free(this_fcb_data);
            free(this_fcb);
            write_log("No read permission for FCB in path\n");
            return -EACCES;
        }

        //No FCB data means no entry exists
        if (this_fcb->size == 0) {
            free(this_fcb);
            free(path_cpy);
            free(this_fcb_data);
            write_log("No file or directory found\n");
            return -ENOENT;
        }

        //Then iterate to the FCB's data
        free(this_fcb_data);
        this_fcb_data = calloc(1, this_fcb->size);
        rc = fetch_data(this_fcb->data_uuid, this_fcb_data, this_fcb->size);
        if (rc != UNQLITE_OK) {
            write_log("Error when using database(s); returning -EIO\n");
            free(this_fcb);
            free(path_cpy);
            free(this_fcb_data);
            return -EIO;
        }
        this_path_token = next_path_token;
        next_path_token = strtok(NULL, "/");

    } //While end

    //Found directory of wanted file/directory, so loop through data to try find match
    dirent *this_dirent;
    int dirent_counter;
    int total_dirents = this_fcb->size / sizeof(dirent);
    for (dirent_counter = 0; dirent_counter < total_dirents; dirent_counter++) {

        //Form dirent from this section of data
        this_dirent = (dirent *) (this_fcb_data + (dirent_counter * sizeof(dirent)));
        write_log("Search currently at name: %s\n", this_dirent->name);

        //Check for match
        if (strcmp(this_dirent->name, this_path_token) == 0) {
            //Match => Found the wanted FCB!
            if (uuid_buf != NULL) memcpy(uuid_buf, &(this_dirent->fcb_uuid), KEY_SIZE);
            rc = fetch_fcb(this_dirent->fcb_uuid, this_fcb);
            if (rc != UNQLITE_OK) {
                free(this_fcb);
                free(path_cpy);
                free(this_fcb_data);
                write_log("Error when using database(s); returning -EIO\n");
                return -EIO;
            }
            write_log("Returning FCB for file/dir with name: %s\n", this_dirent->name);
            memcpy(fcb_buf, this_fcb, sizeof(myfcb));
            free(this_fcb_data);
            free(path_cpy);
            free(this_fcb);
            return 0;
        }
    }

    //No file or directory found using given path
    write_log("No file or directory found\n");
    free(this_fcb);
    free(this_fcb_data);
    free(path_cpy);
    return -ENOENT;
}

//=====================================
//===== FUSE FUNCTIONS START HERE =====
//=====================================

//Get file and directory attributes (meta-data) - man 2 stat
static int myfs_getattr(const char *path, struct stat *stbuf) {

    write_log("\nmyfs_getattr(path=\"%s\", statbuf=0x%08x)\n", path, stbuf); //Log stat call

    //Zero out given buffer
    memset(stbuf, 0, sizeof(struct stat));

    //Find FCB from path
    myfcb *this_fcb = calloc(1, sizeof(myfcb));
    uuid_t uuid_buf;
    int ec = get_fcb_from_path(path, this_fcb, &uuid_buf);
    if (ec != 0) {
        free(this_fcb);
        return ec;
    }
    write_log("FCB Found From Path\n");

    //Sets values in stbuf from found FCB
    stbuf->st_dev = 0; //ID of device containing file
    stbuf->st_ino = 0; //Inode number
    stbuf->st_mode = this_fcb->mode; //File type and mode
    stbuf->st_nlink = 1; //Number of hard links
    stbuf->st_uid = this_fcb->uid; //User ID of owner
    stbuf->st_gid = this_fcb->gid; //Group ID of owner
    stbuf->st_rdev = 0; //Device ID (if special file)
    stbuf->st_size = this_fcb->size; //Total size, in bytes
    stbuf->st_blksize = 0; //Block size for filesystem I/O
    stbuf->st_blocks = 0; //Number of 512B blocks allocated
    stbuf->st_atime = 0; //
    stbuf->st_mtime = this_fcb->mtime; //
    stbuf->st_ctime = this_fcb->ctime; //

    free(this_fcb);
    return 0;
}

//Read a directory - man 2 readdir
static int myfs_readdir(const char *path, void *buf, fuse_fill_dir_t filler, off_t offset, struct fuse_file_info *fi) {

    (void) offset;  // This prevents compiler warnings
    (void) fi;

    write_log("\nmyfs_readdir(path=\"%s\", buf=0x%08x, filler=0x%08x, offset=%lld, fi=0x%08x)\n", path, buf, filler,
              offset, fi);

    //Output . and .. first
    filler(buf, ".", NULL, 0);
    filler(buf, "..", NULL, 0);

    //Find FCB from path
    myfcb *this_fcb = calloc(1, sizeof(myfcb));
    uuid_t temp;
    int ec = get_fcb_from_path(path, this_fcb, &temp);
    if (ec != 0) {
        free(this_fcb);
        return ec;
    }
    write_log("FCB Found From Path\n");

    //Check path leads to a directory
    if (!(this_fcb->mode & S_IFDIR)) {
        write_log("Trying to readdir not a directory\n");
        return -ENOTDIR;
    }

    //Check read permissions
    if (!have_permission(this_fcb, 'r')) {
        return -EACCES;
    }

    //Fetch FCB data if there is any
    if (this_fcb->size != 0) {
        uint8_t *this_fcb_data = calloc(1, this_fcb->size);
        int rc = fetch_data(this_fcb->data_uuid, this_fcb_data, this_fcb->size);
        if (rc != UNQLITE_OK) {
            write_log("Error when using database(s); returning -EIO\n");
            free(this_fcb);
            free(this_fcb_data);
            return -EIO;
        }

        //Call filler with all dirents in data
        for (int i = 0; i < this_fcb->size / sizeof(dirent); i++) {
            dirent *this_dirent = (dirent *) (this_fcb_data + i * sizeof(dirent));
            write_log("Adding to buf: %s\n", this_dirent->name);
            filler(buf, this_dirent->name, NULL, 0);
        }

        free(this_fcb_data);
    }

    free(this_fcb);
    return 0;
}

//Read a file - man 2 read
static int myfs_read(const char *path, char *buf, size_t size, off_t offset, struct fuse_file_info *fi) {
    write_log("\nmyfs_read(path=\"%s\", buf=0x%08x, size=%d, offset=%lld, fi=0x%08x)\n", path, buf, size, offset, fi);

    (void) fi;

    //Find FCB from path
    myfcb *this_fcb = calloc(1, sizeof(myfcb));
    int ec = get_fcb_from_path(path, this_fcb, NULL);
    if (ec != 0) {
        free(this_fcb);
        return ec;
    }
    write_log("FCB Found From Path\n");

    //Check path leads to a file
    if (this_fcb->mode & S_IFDIR) {
        write_log("Trying to read a directory\n");
        free(this_fcb);
        return -EISDIR;
    }

    //Check current user has permission to read file
    if (!have_permission(this_fcb, 'r')) {
        write_log("No read permission! Returning -EACCES\n");
        free(this_fcb);
        return -EACCES;
    }

    //Check for data block before fetching
    if (this_fcb->size != 0) {
        //Data exists, so fetch
        uint8_t *data = calloc(1, this_fcb->size);
        int rc = fetch_data(this_fcb->data_uuid, data, this_fcb->size);
        if (rc != UNQLITE_OK) {
            free(this_fcb);
            free(data);
            write_log("Error when using database(s); returning -EIO\n");
            return -EIO;
        }

        //Copy data
        if (offset < this_fcb->size) {
            if (offset + size > this_fcb->size) {
                //Adjust size to available bytes
                size = this_fcb->size - offset;
            }
            memcpy(buf, data + offset, size);
        } else {
            //Wanted offset too large
            write_log("Wanted offset too large. Returning 0.\n");
            free(this_fcb);
            free(data);
            size = 0;
            return size;
        }
        free(data);


    } else {
        //No data
        write_log("No data found. Returning 0.\n");
        free(this_fcb);
        size = 0;
        return size;
    }

    free(this_fcb);
    return size;
}

//Create a file - man 2 creat
static int myfs_create(const char *path, mode_t mode, struct fuse_file_info *fi) {
    write_log("\nmyfs_create(path=\"%s\", mode=0%03o, fi=0x%08x)\n", path, mode, fi);

    //Copy path
    char *path_cpy = malloc(strlen(path) + 1);
    strcpy(path_cpy, path);

    //Markers & counters for while loop
    int final_slash_index = 0;
    int penult_slash_index = 0;
    int this_index = 0;
    char this_char = path_cpy[this_index];

    //Loop through path, finding second to last slash
    while (this_char != '\0') {
        if (this_char == '/') {
            final_slash_index = this_index;
            penult_slash_index = final_slash_index;
        }

        this_index++;
        this_char = path_cpy[this_index];
    }

    //Check name isn't too long
    if (strlen(path) - (penult_slash_index + 1) > MY_MAX_FILE_NAME - 1) {
        write_log("File not created: File name too long\n");
        free(path_cpy);
        return -ENAMETOOLONG;
    }

    //Save wanted file name
    char new_file_name[MY_MAX_FILE_NAME];
    strcpy(new_file_name, path_cpy + penult_slash_index + 1);
    write_log("New File Name: %s\n", new_file_name);

    //Remove file name from path to form directory path
    path_cpy[penult_slash_index + 1] = '\0';
    write_log("New File Parent Dir Path: %s\n", path_cpy);

    //Create new dirent for file
    dirent *new_dirent = calloc(1, sizeof(dirent));
    strcpy(new_dirent->name, new_file_name);
    uuid_generate(new_dirent->fcb_uuid);
    //Fetch parent directory FCB
    myfcb *parent_fcb = calloc(1, sizeof(myfcb));
    uuid_t parent_fcb_key;
    int ec = get_fcb_from_path(path_cpy, parent_fcb, &parent_fcb_key);
    if (ec != 0) {
        free(parent_fcb);
        free(new_dirent);
        free(path_cpy);
        return ec;
    }
    write_log("Parent FCB and UUID key found From Path\n");

    if (parent_fcb->size == 0) {
        //First child being created
        write_log("No previous children found\n");
        uint8_t *new_parent_fcb_data = calloc(1, sizeof(dirent));
        memcpy(new_parent_fcb_data, new_dirent, sizeof(dirent));
        int rc = store_data(parent_fcb->data_uuid, new_parent_fcb_data, parent_fcb->size + sizeof(dirent));
        if (rc != UNQLITE_OK) {
            free(parent_fcb);
            free(new_dirent);
            free(new_parent_fcb_data);
            free(path_cpy);
            write_log("Error when using database(s); returning -EIO\n");
            return -EIO;
        }
        free(new_parent_fcb_data);
        write_log("Parent FCB data updated\n");

    } else {
        //Not first child, so add to end of dirent list
        write_log("Previous children found. Adding to end of dirent list\n");
        uint8_t *parent_fcb_data = calloc(1, parent_fcb->size);
        int rc = fetch_data(parent_fcb->data_uuid, parent_fcb_data, parent_fcb->size);
        if (rc != UNQLITE_OK) {
            free(parent_fcb);
            free(new_dirent);
            free(parent_fcb_data);
            free(path_cpy);
            write_log("Error when using database(s); returning -EIO\n");
            return -EIO;
        }
        write_log("Parent FCB data found okay\n");

        //Add new dirent to parent data & store in persistent DB
        uint8_t *new_parent_fcb_data = calloc(1, parent_fcb->size + sizeof(dirent));
        memcpy(new_parent_fcb_data, parent_fcb_data, parent_fcb->size);
        memcpy(new_parent_fcb_data + parent_fcb->size, new_dirent, sizeof(dirent));
        rc = store_data(parent_fcb->data_uuid, new_parent_fcb_data, parent_fcb->size + sizeof(dirent));
        if (rc != UNQLITE_OK) {
            free(parent_fcb);
            free(new_dirent);
            free(parent_fcb_data);
            free(new_parent_fcb_data);
            free(path_cpy);
            write_log("Error when using database(s); returning -EIO\n");
            return -EIO;
        }
        free(parent_fcb_data);
        free(new_parent_fcb_data);
        write_log("Parent FCB data updated\n");
    }
    //Update parent FCB
    parent_fcb->size = parent_fcb->size + sizeof(dirent);
    int rc = store_fcb(parent_fcb_key, parent_fcb);
    if (rc != UNQLITE_OK) {
        free(parent_fcb);
        free(new_dirent);
        free(path_cpy);
        write_log("Error when using database(s); returning -EIO\n");
        return -EIO;
    }

    //FCB for new file
    myfcb *new_fcb = calloc(1, sizeof(myfcb));
    struct fuse_context *context = fuse_get_context();
    new_fcb->uid = context->uid;
    new_fcb->gid = context->gid;
    new_fcb->mode = mode | S_IFREG;
    new_fcb->size = 0;
    uuid_generate(new_fcb->data_uuid);

    //Store new FCB
    rc = store_fcb(new_dirent->fcb_uuid, new_fcb);
    if (rc != UNQLITE_OK) {
        free(parent_fcb);
        free(new_dirent);
        free(new_fcb);
        free(path_cpy);
        write_log("Error when using database(s); returning -EIO\n");
        return -EIO;
    }

    free(new_dirent);
    free(new_fcb);
    free(path_cpy);
    free(parent_fcb);
    return 0;
}

//Create a directory - man 2 mkdir
int myfs_mkdir(const char *path, mode_t mode) {
    write_log("\nmyfs_mkdir(path=\"%s\", mode=\"%i\")\n", path);

    //Copy path
    char *path_cpy = malloc(strlen(path + 1));
    strcpy(path_cpy, path);

    //Markers & counters for while loop
    int final_slash_index = 0;
    int penult_slash_index = 0;
    int this_index = 0;
    char this_char = path_cpy[this_index];

    //Loop through path, finding second to last slash
    while (this_char != '\0') {
        if (this_char == '/') {
            final_slash_index = this_index;
            penult_slash_index = final_slash_index;
        }

        this_index++;
        this_char = path_cpy[this_index];
    }

    //Check name isn't too long
    if (strlen(path) - (penult_slash_index + 1) > MY_MAX_FILE_NAME - 1) {
        write_log("Dir not created: Dir name too long\n");
        free(path_cpy);
        return -ENAMETOOLONG;
    }

    //Save wanted directory name
    char new_dir_name[MY_MAX_FILE_NAME];
    strcpy(new_dir_name, path_cpy + penult_slash_index + 1);
    write_log("New Dir Name: %s\n", new_dir_name);

    //Remove directory name from path to form parent directory path
    path_cpy[penult_slash_index + 1] = '\0';
    write_log("New Dir Parent Dir Path: %s\n", path_cpy);

    //Check name isn't too long
    if (strlen(new_dir_name) > MY_MAX_FILE_NAME - 1) {
        return -ENAMETOOLONG;
    }

    //Create new dirent for directory
    dirent *new_dirent = calloc(1, sizeof(dirent));
    strcpy(new_dirent->name, new_dir_name);
    uuid_generate(new_dirent->fcb_uuid);

    //Fetch parent directory FCB and FCB data
    myfcb *parent_fcb = calloc(1, sizeof(myfcb));
    uuid_t parent_fcb_key;
    int ec = get_fcb_from_path(path_cpy, parent_fcb, &parent_fcb_key);
    if (ec != 0) {
        free(parent_fcb);
        free(path_cpy);
        free(new_dirent);
        return ec;
    }
    write_log("Parent FCB and UUID key found From Path\n");

    if (parent_fcb->size == 0) {
        //First child being created
        write_log("No previous children found\n");
        uint8_t *new_parent_fcb_data = calloc(1, sizeof(dirent));
        memcpy(new_parent_fcb_data, new_dirent, sizeof(dirent));
        int rc = store_data(parent_fcb->data_uuid, new_parent_fcb_data, parent_fcb->size + sizeof(dirent));
        if (rc != UNQLITE_OK) {
            write_log("Error when using database(s); returning -EIO\n");
            free(parent_fcb);
            free(path_cpy);
            free(new_dirent);
            free(new_parent_fcb_data);
            return -EIO;
        }
        free(new_parent_fcb_data);
        write_log("Parent FCB data updated\n");

    } else {
        //Not first child, so add to end of dirent list
        uint8_t *parent_fcb_data = calloc(1, parent_fcb->size);
        int rc = fetch_data(parent_fcb->data_uuid, parent_fcb_data, parent_fcb->size);
        if (rc != UNQLITE_OK) {
            free(parent_fcb);
            free(path_cpy);
            free(new_dirent);
            free(parent_fcb_data);
            write_log("Error when using database(s); returning -EIO\n");
            return -EIO;
        }
        write_log("Parent FCB data found okay\n");

        //Add new dirent to parent data & store in persistent DB
        uint8_t *new_parent_fcb_data = calloc(1, parent_fcb->size + sizeof(dirent));
        memcpy(new_parent_fcb_data, parent_fcb_data, parent_fcb->size);
        memcpy(new_parent_fcb_data + parent_fcb->size, new_dirent, sizeof(dirent));
        rc = store_data(parent_fcb->data_uuid, new_parent_fcb_data, parent_fcb->size + sizeof(dirent));
        if (rc != UNQLITE_OK) {
            free(parent_fcb);
            free(path_cpy);
            free(new_dirent);
            free(parent_fcb_data);
            free(new_parent_fcb_data);
            write_log("Error when using database(s); returning -EIO\n");
            return -EIO;
        }
        free(parent_fcb_data);
        free(new_parent_fcb_data);
        write_log("Parent FCB data updated\n");
    }
    //Update parent FCB
    parent_fcb->size = parent_fcb->size + sizeof(dirent);
    int rc = store_fcb(parent_fcb_key, parent_fcb);
    if (rc != UNQLITE_OK) {
        free(parent_fcb);
        free(path_cpy);
        free(new_dirent);
        write_log("Error when using database(s); returning -EIO\n");
        return -EIO;
    }

    //FCB for new file
    myfcb *new_fcb = calloc(1, sizeof(myfcb));
    struct fuse_context *context = fuse_get_context();
    new_fcb->uid = context->uid;
    new_fcb->gid = context->gid;
    new_fcb->mode = mode | S_IFDIR;
    new_fcb->size = 0;
    uuid_generate(new_fcb->data_uuid);

    //Store new FCB
    rc = store_fcb(new_dirent->fcb_uuid, new_fcb);
    if (rc != UNQLITE_OK) {
        free(parent_fcb);
        free(path_cpy);
        free(new_dirent);
        free(new_fcb);
        write_log("Error when using database(s); returning -EIO\n");
        return -EIO;
    }

    free(new_dirent);
    free(new_fcb);
    free(path_cpy);
    free(parent_fcb);
    return 0;
}

//Delete a file - man 2 unlink
int myfs_unlink(const char *path) {
    write_log("\nmyfs_unlink(path=\"%s\")\n", path);

    //Copy path
    char *path_cpy = malloc(strlen(path) + 1);
    strcpy(path_cpy, path);

    //Markers & counters for while loop
    int final_slash_index = 0;
    int penult_slash_index = 0;
    int this_index = 0;
    char this_char = path_cpy[this_index];

    //Loop through path, finding second to last slash
    while (this_char != '\0') {
        if (this_char == '/') {
            final_slash_index = this_index;
            penult_slash_index = final_slash_index;
        }

        this_index++;
        this_char = path_cpy[this_index];
    }

    //Save file name to remove
    char file_name_to_remove[256];
    strcpy(file_name_to_remove, path_cpy + penult_slash_index + 1);
    write_log("File Name To Remove: %s\n", file_name_to_remove);

    //Remove file name from path to form directory path
    path_cpy[penult_slash_index + 1] = '\0';
    write_log("File Parent Dir Path: %s\n", path_cpy);

    //Fetch parent directory FCB and UUID
    myfcb *parent_fcb = calloc(1, sizeof(myfcb));
    uuid_t parent_fcb_key;
    int ec = get_fcb_from_path(path_cpy, parent_fcb, &parent_fcb_key);
    if (ec != 0) {
        free(parent_fcb);
        free(path_cpy);
        return ec;
    }
    write_log("FCB and UUID key found From Path\n");

    //Check write permissions
    if (!have_permission(parent_fcb, 'w')) {
        write_log("Permission denied\n");
        return -EACCES;
    }
    write_log("Permission granted\n");

    //Check file isn't a directory
    myfcb *fcb_to_delete = calloc(1, sizeof(myfcb));
    ec = get_fcb_from_path(path, fcb_to_delete, NULL);
    if (ec != 0) {
        free(parent_fcb);
        free(fcb_to_delete);
        free(path_cpy);
        return ec;
    }
    if (fcb_to_delete->mode & S_IFDIR) {
        write_log("Using unlink on a directory\n");
        free(parent_fcb);
        free(fcb_to_delete);
        free(path_cpy);
        return -EISDIR;
    }

    //Fetch parent FCB stored data
    uint8_t *parent_fcb_data = calloc(1, parent_fcb->size);
    int rc = fetch_data(parent_fcb->data_uuid, parent_fcb_data, parent_fcb->size);
    if (rc != UNQLITE_OK) {
        write_log("Error when using database(s); returning -EIO\n");
        free(parent_fcb);
        free(fcb_to_delete);
        free(path_cpy);
        free(parent_fcb_data);
        return -EIO;
    }
    write_log("Wanted parent FCB & data found okay\n");

    //Split fetched data into dirents (uuid & name) & loop through to find entry to remove
    int dirent_counter;
    int no_of_dirents = parent_fcb->size / sizeof(dirent);
    dirent *this_dirent = (dirent *) parent_fcb_data;
    for (dirent_counter = 0; dirent_counter < no_of_dirents; dirent_counter++) {
        this_dirent = (dirent *) (parent_fcb_data + dirent_counter * sizeof(dirent));
        //Check for name match
        if (strcmp(file_name_to_remove, this_dirent->name) == 0) {
            break;
        }
    }

    //Dirent not found => Fatal error with system
    if (dirent_counter == no_of_dirents) {
        write_log("Dirent not found during traversal: Fatal error!\n");
        exit(0);
    }

    write_log("Wanted data block found in parent FCB data\n");

    //Deletes FCB associated with dirent and its data if there is any
    rc = delete_fcb(this_dirent->fcb_uuid);
    error_handler(rc);
    if (fcb_to_delete->size != 0) {
        rc = delete_data(fcb_to_delete->data_uuid);
        error_handler(rc);
    }
    free(fcb_to_delete);

    write_log("FCB and FCB data removed from DB okay\n");

    //Calculates indices of dirents to rearrange
    int dirent_to_delete_index = dirent_counter * sizeof(dirent);
    int last_dirent_index = (no_of_dirents - 1) * sizeof(dirent);

    //Create new data
    unsigned new_data_size = parent_fcb->size - sizeof(dirent);
    if (new_data_size == 0) {
        //No data left so delete entry
        delete_data(parent_fcb->data_uuid);
    } else {
        //Create and fill new data
        uint8_t *new_data = calloc(1, new_data_size);
        memcpy(new_data, parent_fcb_data, parent_fcb->size - sizeof(dirent)); //All but final dirent
        if (last_dirent_index != dirent_to_delete_index) {
            //Block to remove isn't last block, so put final block in place of deleted one
            memcpy(new_data + dirent_to_delete_index, parent_fcb_data + last_dirent_index, sizeof(dirent));
        }

        write_log("New data filled okay\n");

        //Store new data
        rc = store_data(parent_fcb->data_uuid, new_data, new_data_size);
        if (rc != UNQLITE_OK) {
            write_log("Error when using database(s); returning -EIO\n");
            free(parent_fcb);
            free(parent_fcb_data);
            free(path_cpy);
            free(new_data);
            return -EIO;
        }
        free(new_data);
    }

    //Update and store FCB
    parent_fcb->size = new_data_size;
    rc = store_fcb(parent_fcb_key, parent_fcb);
    if (rc != UNQLITE_OK) {
        write_log("Error when using database(s); returning -EIO\n");
        free(parent_fcb);
        free(parent_fcb_data);
        free(path_cpy);
        return -EIO;
    }
    write_log("New data & FCB stored okay\n");

    free(parent_fcb);
    free(parent_fcb_data);
    free(path_cpy);
    return 0;
}

//Delete a directory - man 2 rmdir
int myfs_rmdir(const char *path) {
    write_log("\nmyfs_rmdir(path=\"%s\")\n", path);

    //Copy path
    char *path_cpy = malloc(strlen(path) + 1);
    strcpy(path_cpy, path);

    //Markers & counters for while loop
    int final_slash_index = 0;
    int penult_slash_index = 0;
    int this_index = 0;
    char this_char = path_cpy[this_index];

    //Loop through path, finding second to last slash
    while (this_char != '\0') {
        if (this_char == '/') {
            final_slash_index = this_index;
            penult_slash_index = final_slash_index;
        }

        this_index++;
        this_char = path_cpy[this_index];
    }

    //Save dir name to remove
    char dir_name_to_remove[256];
    strcpy(dir_name_to_remove, path_cpy + penult_slash_index + 1);
    write_log("Dir Name To Remove: %s\n", dir_name_to_remove);

    //Remove dir name from path to form parent directory path
    path_cpy[penult_slash_index + 1] = '\0';
    write_log("Dir Parent Dir Path: %s\n", path_cpy);

    //Fetch parent directory FCB and UUID
    myfcb *parent_fcb = calloc(1, sizeof(myfcb));
    uuid_t parent_fcb_key;
    int ec = get_fcb_from_path(path_cpy, parent_fcb, &parent_fcb_key);
    if (ec != 0) {
        free(parent_fcb);
        free(path_cpy);
        return ec;
    }
    write_log("FOUND KEY: %li\n", parent_fcb_key);
    write_log("FCB and UUID key found From Path\n");

    //Check write permissions
    if (!have_permission(parent_fcb, 'w')) {
        write_log("Permission denied\n");
        free(parent_fcb);
        free(path_cpy);
        return -EACCES;
    }
    write_log("Permission granted\n");

    //Check path is actually to a directory
    myfcb *fcb_to_delete = calloc(1, sizeof(myfcb));
    ec = get_fcb_from_path(path, fcb_to_delete, NULL);
    if (ec != 0) {
        free(parent_fcb);
        free(path_cpy);
        free(fcb_to_delete);
        return ec;
    }
    if (!(fcb_to_delete->mode & S_IFDIR)) {
        write_log("Using rmdir on something that is not a directory\n");
        free(parent_fcb);
        free(path_cpy);
        free(fcb_to_delete);
        return -ENOTDIR;
    }

    //Check directory is empty
    if (fcb_to_delete->size != 0) {
        write_log("Directory not empty\n");
        free(parent_fcb);
        free(path_cpy);
        free(fcb_to_delete);
        return -ENOTEMPTY;
    }

    //Fetch parent FCB stored data
    uint8_t *parent_fcb_data = calloc(1, parent_fcb->size);
    int rc = fetch_data(parent_fcb->data_uuid, parent_fcb_data, parent_fcb->size);
    if (rc != UNQLITE_OK) {
        write_log("Error when using database(s); returning -EIO\n");
        free(parent_fcb);
        free(path_cpy);
        free(fcb_to_delete);
        free(parent_fcb_data);
        return -EIO;
    }

    write_log("Wanted parent FCB & data found okay\n");

    //Split fetched data into dirents (uuid & name) & loop through to find entry to remove
    int dirent_counter;
    int no_of_dirents = parent_fcb->size / sizeof(dirent);
    dirent *this_dirent = (dirent *) parent_fcb_data;
    for (dirent_counter = 0; dirent_counter < no_of_dirents; dirent_counter++) {
        this_dirent = (dirent *) (parent_fcb_data + dirent_counter * sizeof(dirent));
        //Check for name match
        if (strcmp(dir_name_to_remove, this_dirent->name) == 0) {
            break;
        }
    }

    //Dirent not found => Fatal error with system
    if (dirent_counter == no_of_dirents) {
        write_log("Dirent not found during traversal: Fatal error!\n");
        exit(0);
    }

    write_log("Wanted data block found in parent FCB data\n");

    //Deletes FCB associated with dirent and its data if there is any
    rc = delete_fcb(this_dirent->fcb_uuid);
    error_handler(rc);
    if (fcb_to_delete->size != 0) {
        rc = delete_data(fcb_to_delete->data_uuid);
        error_handler(rc);
    }
    free(fcb_to_delete);

    write_log("FCB and FCB data removed from DB okay\n");

    //Calculates indices of dirents to rearrange
    int dirent_to_delete_index = dirent_counter * sizeof(dirent);
    int last_dirent_index = (no_of_dirents - 1) * sizeof(dirent);

    //Create new data
    unsigned new_data_size = parent_fcb->size - sizeof(dirent);
    if (new_data_size == 0) {
        //No data left so delete entry
        delete_data(parent_fcb->data_uuid);
    } else {
        //Create and fill new data
        uint8_t *new_data = calloc(1, new_data_size);
        memcpy(new_data, parent_fcb_data, parent_fcb->size - sizeof(dirent)); //All but final dirent
        if (last_dirent_index != dirent_to_delete_index) {
            //Block to remove isn't last block, so put final block in place of deleted one
            memcpy(new_data + dirent_to_delete_index, parent_fcb_data + last_dirent_index, sizeof(dirent));
        }

        write_log("New data filled okay\n");

        //Store new data
        parent_fcb->size = new_data_size;
        rc = store_data(parent_fcb->data_uuid, new_data, new_data_size);
        if (rc != UNQLITE_OK) {
            write_log("Error when using database(s); returning -EIO\n");
            free(parent_fcb);
            free(path_cpy);
            free(parent_fcb_data);
            free(new_data);
            return -EIO;
        }
        free(new_data);
    }

    //Update and store FCB
    parent_fcb->size = new_data_size;
    rc = store_fcb(parent_fcb_key, parent_fcb);
    if (rc != UNQLITE_OK) {
        write_log("Error when using database(s); returning -EIO\n");
        free(parent_fcb);
        free(path_cpy);
        free(parent_fcb_data);
        return -EIO;
    }
    write_log("New data & FCB stored okay\n");

    free(parent_fcb);
    free(path_cpy);
    free(parent_fcb_data);
    return 0;
}

//Set update the times (actime, modtime) for a file - man 2 utime
static int myfs_utime(const char *path, struct utimbuf *ubuf) {
    write_log("\nmyfs_utime(path=\"%s\", ubuf=0x%08x)\n", path, ubuf);

    //Find FCB from path
    uuid_t this_fcb_key;
    myfcb *this_fcb = calloc(1, sizeof(myfcb));
    int ec = get_fcb_from_path(path, this_fcb, &this_fcb_key);
    if (ec != 0) {
        free(this_fcb);
        return ec;
    }
    write_log("FCB and FCB Key Found From Path\n");

    //Update times in FCB, setting to current time if NULL as described in UTIME(2) man page
    if (ubuf->modtime) this_fcb->mtime = ubuf->modtime;
    else this_fcb->mtime = time(0);

    if (ubuf->actime) this_fcb->atime = ubuf->actime;
    else this_fcb->atime = time(0);

    //Meta-data changed now
    this_fcb->ctime = time(0);

    //Store FCB
    int rc = store_fcb(this_fcb_key, this_fcb);
    if (rc != UNQLITE_OK) {
        write_log("Error when using database(s); returning -EIO\n");
        return -EIO;
    }

    free(this_fcb);
    return 0;
}

//Write to a file - man 2 write
static int myfs_write(const char *path, const char *buf, size_t size, off_t offset, struct fuse_file_info *fi) {
    write_log("\nmyfs_write(path=\"%s\", buf=0x%08x, size=%d, offset=%lld, fi=0x%08x)\n", path, buf, size, offset, fi);

    //Find FCB from path
    uuid_t this_fcb_key;
    myfcb *this_fcb = calloc(1, sizeof(myfcb));
    int ec = get_fcb_from_path(path, this_fcb, &this_fcb_key);
    if (ec != 0) {
        free(this_fcb);
        return ec;
    }
    write_log("FCB and FCB Key Found From Path\n");

    //Check current user has write permission
    if (!have_permission(this_fcb, 'w')) {
        write_log("No write permission\n");
        free(this_fcb);
        return -EACCES;
    }

    //Calculate wanted size for what will be stored after write
    size_t wanted_size = this_fcb->size + size - (this_fcb->size - offset);
    if (wanted_size < 0)
        wanted_size = 0;

    //Check write isn't too big
    if (wanted_size >= MY_MAX_FILE_SIZE) {
        write_log("myfs_write - EFBIG\n");
        return -EFBIG;
    }

    //Create new buffer and fetch data into it
    uint8_t *data = calloc(1, wanted_size);
    if (this_fcb->size != 0) {
        int rc = fetch_data(this_fcb->data_uuid, data, offset);
        if (rc != UNQLITE_OK) {
            free(this_fcb);
            free(data);
            write_log("Error when using database(s); returning -EIO\n");
            return -EIO;
        }
    }

    //Update meta data
    memcpy(data + offset, buf, size);
    this_fcb->size = wanted_size;
    this_fcb->mtime = time(0);
    this_fcb->ctime = time(0);
    this_fcb->atime = time(0);

    //Write data and FCB to DB
    int rc = store_fcb(this_fcb_key, this_fcb);
    if (rc != UNQLITE_OK) {
        write_log("Error when using database(s); returning -EIO\n");
        free(this_fcb);
        free(data);
        return -EIO;
    }
    rc = store_data(this_fcb->data_uuid, data, wanted_size);
    if (rc != UNQLITE_OK) {
        write_log("Error when using database(s); returning -EIO\n");
        free(this_fcb);
        free(data);
        return -EIO;
    }

    free(data);
    free(this_fcb);
    return size;
}

//Set the size of a file - man 2 truncate
int myfs_truncate(const char *path, off_t newsize) {
    write_log("\nmyfs_truncate(path=\"%s\", newsize=%lld)\n", path, newsize);

    // Check that the size is acceptable
    if (newsize >= MY_MAX_FILE_SIZE) {
        write_log("myfs_truncate - EFBIG\n");
        return -EFBIG;
    }

    //Find FCB from path
    uuid_t this_fcb_key;
    myfcb *this_fcb = calloc(1, sizeof(myfcb));
    int ec = get_fcb_from_path(path, this_fcb, &this_fcb_key);
    if (ec != 0) {
        free(this_fcb);
        return ec;
    }
    write_log("FCB and FCB Key Found From Path\n");

    //If truncate to same size, do nothing
    if (this_fcb->size == newsize) {
        write_log("New size same as old; doing nothing\n");
        free(this_fcb);
        return 0;
    }

    //If truncate is to 0, delete data, update FCB and return
    if (newsize == 0) {
        delete_data(this_fcb->data_uuid);
        this_fcb->size = newsize;

        //Write FCB and data to database(s)
        int rc = store_fcb(this_fcb_key, this_fcb);
        if (rc != UNQLITE_OK) {
            write_log("Error when using database(s); returning -EIO\n");
            free(this_fcb);
            return -EIO;
        }
        write_log("FCB written back to DB\n");
        free(this_fcb);
        return 0;
    }

    //Fetch newsize bytes of FCB data into new buffer
    uint8_t *new_data = calloc(1, newsize);
    if (newsize < this_fcb->size) {
        write_log("File size decreasing\n");

        int rc = fetch_data(this_fcb->data_uuid, new_data, this_fcb->size);
        if (rc != UNQLITE_OK) {
            write_log("Error when using database(s); returning -EIO\n");
            free(this_fcb);
            free(new_data);
            return -EIO;
        }

    } else {
        write_log("File size increasing\n");
        if (this_fcb->size == 0) {
            //No data exists, so just store new_data
            int rc = store_data(this_fcb->data_uuid, new_data, newsize);
            if (rc != UNQLITE_OK) {
                write_log("Error when using database(s); returning -EIO\n");
                free(this_fcb);
                free(new_data);
                return -EIO;
            }

        } else {

            int rc = fetch_data(this_fcb->data_uuid, new_data, newsize);
            if (rc != UNQLITE_OK) {
                write_log("Error when using database(s); returning -EIO\n");
                free(this_fcb);
                free(new_data);
                return -EIO;
            }
        }
    }
    write_log("Data copied\n");

    //Update FCB size
    this_fcb->size = newsize;

    //Write FCB and data to database(s)
    int rc = store_fcb(this_fcb_key, this_fcb);
    if (rc != UNQLITE_OK) {
        write_log("Error when using database(s); returning -EIO\n");
        free(this_fcb);
        free(new_data);
        return -EIO;
    }
    write_log("FCB written back to DB\n");
    rc = store_data(this_fcb->data_uuid, new_data, this_fcb->size);
    if (rc != UNQLITE_OK) {
        write_log("Error when using database(s); returning -EIO\n");
        free(this_fcb);
        free(new_data);
        return -EIO;
    }

    free(this_fcb);
    free(new_data);
    return 0;
}

//Set permissions - man 2 truncate
int myfs_chmod(const char *path, mode_t mode) {
    write_log("\nmyfs_chmod(path=\"%s\", mode=0%03o)\n", path, mode);

    //Find FCB from path
    uuid_t this_fcb_key;
    myfcb *this_fcb = calloc(1, sizeof(myfcb));
    int ec = get_fcb_from_path(path, this_fcb, &this_fcb_key);
    if (ec != 0) {
        free(this_fcb);
        return ec;
    }
    write_log("FCB and FCB Key Found From Path\n");

    //Check current user has permission (either owner or root)
    if (getuid() != 0 && !(getuid() == this_fcb->uid)) {
        //No permission to change file permissions
        write_log("Permission denied\n");
        free(this_fcb);
        return -EACCES;
    }

    //Swap in new mode
    this_fcb->mode = mode;

    //Write FCB back to DB
    int rc = store_fcb(this_fcb_key, this_fcb);
    if (rc != UNQLITE_OK) {
        write_log("Error when using database(s); returning -EIO\n");
        free(this_fcb);
        return -EIO;
    }

    free(this_fcb);
    return 0;
}

//Set ownership - man 2 chown
int myfs_chown(const char *path, uid_t uid, gid_t gid) {
    write_log("\nmyfs_chown(path=\"%s\", uid=%d, gid=%d)\n", path, uid, gid);

    //Find FCB from path
    uuid_t this_fcb_key;
    myfcb *this_fcb = calloc(1, sizeof(myfcb));
    int ec = get_fcb_from_path(path, this_fcb, &this_fcb_key);
    if (ec != 0) {
        free(this_fcb);
        return ec;
    }
    write_log("FCB and FCB Key Found From Path\n");

    //Swap in new uid & gid
    this_fcb->uid = uid;
    this_fcb->gid = gid;

    //Write FCB back to DB
    int rc = store_fcb(this_fcb_key, this_fcb);
    if (rc != UNQLITE_OK) {
        write_log("Error when using database(s); returning -EIO\n");
        free(this_fcb);
        return -EIO;
    }

    free(this_fcb);
    return 0;
}

// Flush any cached data.
int myfs_flush(const char *path, struct fuse_file_info *fi) {
    int retstat = 0;

    write_log("\nmyfs_flush(path=\"%s\", fi=0x%08x)\n", path, fi);

    return retstat;
}

// Release the file. There will be one call to release for each call to open.
int myfs_release(const char *path, struct fuse_file_info *fi) {

    write_log("\nmyfs_release(path=\"%s\", fi=0x%08x)\n", path, fi);
    int retstat = 0;

    return retstat;
}

// Open a file. Open should check if the operation is permitted for the given flags (fi->flags) - man 2 open
static int myfs_open(const char *path, struct fuse_file_info *fi) {
    write_log("\nmyfs_open(path = %s, file info ptr = %p)\n", path, fi);

    //Find FCB from path
    uuid_t this_fcb_key;
    myfcb *this_fcb = calloc(1, sizeof(myfcb));
    int ec = get_fcb_from_path(path, this_fcb, &this_fcb_key);
    if (ec != 0) {
        free(this_fcb);
        return ec;
    }
    write_log("FCB and FCB Key Found From Path\n");

    //Check permissions
    if (fi->flags == O_RDONLY && !have_permission(this_fcb, 'r')) {
        write_log("No read permission\n");
        free(this_fcb);
        return -EACCES;
    }
    if (fi->flags == O_WRONLY && !have_permission(this_fcb, 'w')) {
        write_log("No write permission\n");
        free(this_fcb);
        return -EACCES;
    }
    if (fi->flags == O_RDWR && (!have_permission(this_fcb, 'r') || !have_permission(this_fcb, 'w'))) {
        write_log("No permissions to read and write\n");
        free(this_fcb);
        return -EACCES;
    }

    //If directory and write wanted, return error (man 2 open)
    if ((this_fcb->mode & S_IFDIR) && (fi->flags == O_RDWR || fi->flags == O_WRONLY)) {
        write_log("Writing to dir wanted. Returning -EISDIR\n");
        free(this_fcb);
        return -EISDIR;
    }

    //Otherwise let FUSE do its stuff
    free(this_fcb);
    return 0;
}

//Rename a file - man 2 rename
int myfs_rename(const char *oldpath, const char *newpath) {
    write_log("\nmyfs_rename(oldpath=\"%s\", newpath=\"%s\")\n", oldpath, newpath);

    //Check for no work
    if (strcmp(oldpath, newpath) == 0) {
        write_log("Paths are same. Doing nothing\n");
        return 0;
    }

    //Check file/dir does exist at old location
    myfcb *temp = calloc(1, sizeof(myfcb));
    int ec = get_fcb_from_path(oldpath, temp, NULL);
    if (ec != 0) {
        free(temp);
        write_log("File/dir doesn't exist. Cancelling rename\n");
        return -ENOENT;
    }
    free(temp);
    write_log("File/Dir to move exists. Okay to proceed\n");

    //Check file/dir doesn't exist at new location
    temp = calloc(1, sizeof(myfcb));
    ec = get_fcb_from_path(newpath, temp, NULL);
    if (ec == 0) {
        free(temp);
        write_log("File/dir already exists. Cancelling rename\n");
        return -EEXIST;
    }
    free(temp);
    write_log("No current file/dir exists. Okay to proceed\n");


    //OLDPATH

    //Copy oldpath
    char *oldpath_cpy = malloc(strlen(oldpath + 1));
    strcpy(oldpath_cpy, oldpath);

    //Markers & counters for while loop
    int final_slash_index = 0;
    int penult_slash_index = 0;
    int this_index = 0;
    char this_char = oldpath_cpy[this_index];

    //Loop through path, finding second to last slash
    while (this_char != '\0') {
        if (this_char == '/') {
            final_slash_index = this_index;
            penult_slash_index = final_slash_index;
        }

        this_index++;
        this_char = oldpath_cpy[this_index];
    }

    //Know name is okay size, so save old file/dir name
    char old_file_name[MY_MAX_FILE_NAME];
    strcpy(old_file_name, oldpath_cpy + penult_slash_index + 1);
    write_log("Old File/Dir Name: %s\n", old_file_name);

    //Remove file name from path to form directory path
    oldpath_cpy[penult_slash_index + 1] = '\0';
    write_log("Old File/Dir Parent Dir Path: %s\n", oldpath_cpy);


    //NEWPATH

    //Copy newpath
    char *newpath_cpy = malloc(strlen(newpath + 1));
    strcpy(newpath_cpy, newpath);

    //Markers & counters for while loop
    final_slash_index = 0;
    penult_slash_index = 0;
    this_index = 0;
    this_char = newpath_cpy[this_index];

    //Loop through path, finding second to last slash
    while (this_char != '\0') {
        if (this_char == '/') {
            final_slash_index = this_index;
            penult_slash_index = final_slash_index;
        }

        this_index++;
        this_char = newpath_cpy[this_index];
    }

    //Check name isn't too long
    if (strlen(newpath) - (penult_slash_index + 1) > MY_MAX_FILE_NAME - 1) {
        write_log("File/dir not renamed: New name too long\n");
        free(oldpath_cpy);
        free(newpath_cpy);
        return -ENAMETOOLONG;
    }

    //Save new file/dir name
    char new_file_name[MY_MAX_FILE_NAME];
    strcpy(new_file_name, newpath_cpy + penult_slash_index + 1);
    write_log("New File/Dir Name: %s\n", new_file_name);

    //Remove file/dir name from path to form directory path
    newpath_cpy[penult_slash_index + 1] = '\0';
    write_log("New File/Dir Parent Dir Path: %s\n", newpath_cpy);


    //PERMISSIONS

    //Fetch old parent directory FCB & check permissions
    myfcb *old_parent_fcb = calloc(1, sizeof(myfcb));
    uuid_t old_parent_fcb_key;
    ec = get_fcb_from_path(oldpath_cpy, old_parent_fcb, &old_parent_fcb_key);
    if (ec != 0) {
        free(old_parent_fcb);
        free(oldpath_cpy);
        free(newpath_cpy);
        return ec;
    }

    write_log("Old parent directory prev size: %i\n", old_parent_fcb->size);

    if (!have_permission(old_parent_fcb, 'w')) {
        write_log("No write permission to old parent, so cancelling rename\n");
        free(old_parent_fcb);
        free(oldpath_cpy);
        free(newpath_cpy);
    }

    //Fetch new parent directory FCB & check permissions
    myfcb *new_parent_fcb = calloc(1, sizeof(myfcb));
    uuid_t new_parent_fcb_key;
    ec = get_fcb_from_path(newpath_cpy, new_parent_fcb, &new_parent_fcb_key);
    if (ec != 0) {
        free(old_parent_fcb);
        free(new_parent_fcb);
        free(oldpath_cpy);
        free(newpath_cpy);
        return -EACCES;
    }

    write_log("New parent directory prev size: %i\n", new_parent_fcb->size);

    if (!have_permission(new_parent_fcb, 'w')) {
        write_log("No write permission to new parent, so cancelling rename\n");
        free(old_parent_fcb);
        free(oldpath_cpy);
        free(newpath_cpy);
        free(new_parent_fcb);
        return -EACCES;
    }


    //REPLACE

    //Check whether to move to different parent directory or not
    if (strcmp(oldpath_cpy, newpath_cpy) == 0) {
        //Parent directory same, so only need old parent directory
        free(new_parent_fcb);

        //Fetch parent data. Know there's data since child, so don't check size
        uint8_t *parent_data = calloc(1, old_parent_fcb->size);
        int rc = fetch_data(old_parent_fcb->data_uuid, parent_data, old_parent_fcb->size);
        if (rc != UNQLITE_OK) {
            free(old_parent_fcb);
            free(parent_data);
            free(oldpath_cpy);
            free(newpath_cpy);
            write_log("Error when using database(s); returning -EIO\n");
            return -EIO;
        }

        //Loop through parent data to find wanted dirent, using name to compare
        int dirent_counter;
        int total_dirents = old_parent_fcb->size / sizeof(dirent);
        for (dirent_counter = 0; dirent_counter < total_dirents; dirent_counter++) {
            dirent *this_dirent = (dirent *) (parent_data + dirent_counter * sizeof(dirent));
            if (strcmp(this_dirent->name, old_file_name) == 0) break; //Break if match
        }

        //If no name found, critical error
        if (dirent_counter == total_dirents) {
            write_log("Dirent known to be in data not found => Critical error\n");
            exit(1);
        }

        //Replace name and store parent data
        strcpy(((dirent *) (parent_data + dirent_counter * sizeof(dirent)))->name, new_file_name);
        rc = store_data(old_parent_fcb->data_uuid, parent_data, old_parent_fcb->size);
        if (rc != UNQLITE_OK) {
            free(old_parent_fcb);
            free(parent_data);
            free(oldpath_cpy);
            free(newpath_cpy);
            write_log("Error when using database(s); returning -EIO\n");
            return -EIO;
        }

        //Finished
        free(parent_data);
        free(old_parent_fcb);
        free(oldpath_cpy);
        free(newpath_cpy);
        write_log("Replace complete\n");
        return 0;


    } else {
        //Moving to different directory

        //First fetch old parent data. Know there's data since child, so don't check size
        uint8_t *old_parent_data = calloc(1, old_parent_fcb->size);
        int rc = fetch_data(old_parent_fcb->data_uuid, old_parent_data, old_parent_fcb->size);
        if (rc != UNQLITE_OK) {
            free(old_parent_fcb);
            free(old_parent_data);
            free(oldpath_cpy);
            free(newpath_cpy);
            write_log("Error when using database(s); returning -EIO\n");
            return -EIO;
        }

        //Loop through old parent data to find wanted dirent, using name to compare
        int dirent_counter;
        int total_dirents = old_parent_fcb->size / sizeof(dirent);
        for (dirent_counter = 0; dirent_counter < total_dirents; dirent_counter++) {
            dirent *this_dirent = (dirent *) (old_parent_data + dirent_counter * sizeof(dirent));
            if (strcmp(this_dirent->name, old_file_name) == 0) break; //Break if match
        }

        //If no name found, critical error
        if (dirent_counter == total_dirents) {
            write_log("Dirent known to be in data not found => Critical error\n");
            exit(1);
        }

        //Make new dirent from found UUID and new name
        dirent *found_dirent = (dirent *) (old_parent_data + dirent_counter * sizeof(dirent));
        dirent *new_dirent = calloc(1, sizeof(dirent));
        memcpy(&(new_dirent->fcb_uuid), &(found_dirent->fcb_uuid), KEY_SIZE);
        strcpy(new_dirent->name, found_dirent->name);

        //Remove dirent from old parent dir, starting by calculating indices of dirents to rearrange
        int dirent_to_delete_index = dirent_counter * sizeof(dirent);
        int last_dirent_index = (total_dirents - 1) * sizeof(dirent);

        //Create new data
        unsigned new_data_size = old_parent_fcb->size - sizeof(dirent);
        if (new_data_size == 0) {
            //No data left so delete entry
            delete_data(old_parent_fcb->data_uuid);
        } else {
            //Create and fill new data
            uint8_t *new_data = calloc(1, new_data_size);
            memcpy(new_data, old_parent_data, new_data_size); //All but final dirent
            if (last_dirent_index != dirent_to_delete_index) {
                //Block to remove isn't last block, so put final block in place of deleted one
                memcpy(new_data + dirent_to_delete_index, old_parent_data + last_dirent_index, sizeof(dirent));
            }

            //Store new data in old parent data's place
            rc = store_data(old_parent_fcb->data_uuid, new_data, new_data_size);
            if (rc != UNQLITE_OK) {
                write_log("Error when using database(s); returning -EIO\n");
                free(old_parent_fcb);
                free(old_parent_data);
                free(oldpath_cpy);
                free(newpath_cpy);
                free(new_data);
                free(new_dirent);
                return -EIO;
            }
            free(new_data);
        }

        //Update and store old parent FCB
        old_parent_fcb->size = new_data_size;
        write_log("Old parent directory new size: %i\n", old_parent_fcb->size);
        rc = store_fcb(old_parent_fcb_key, old_parent_fcb);
        if (rc != UNQLITE_OK) {
            write_log("Error when using database(s); returning -EIO\n");
            free(old_parent_fcb);
            free(old_parent_data);
            free(oldpath_cpy);
            free(newpath_cpy);
            free(new_dirent);
            return -EIO;
        }
        write_log("Old parent directory changed okay\n");

        //Clean up a little
        free(old_parent_fcb);
        free(old_parent_data);
        free(oldpath_cpy);

        //New parent dir FCB already fetched for permission checking

        //Make new data for parent dir
        new_data_size = new_parent_fcb->size + sizeof(dirent);
        uint8_t *new_data = calloc(1, new_data_size);

        if (new_parent_fcb->size != 0) {
            //Fill with old data if exists
            uint8_t *new_parent_data = calloc(1, new_parent_fcb->size);
            rc = fetch_data(new_parent_fcb->data_uuid, new_parent_data, new_parent_fcb->size);
            if (rc != UNQLITE_OK) {
                free(new_parent_fcb);
                free(newpath_cpy);
                free(new_parent_data);
                free(new_data);
                free(new_dirent);
                write_log("Error when using database(s); returning -EIO\n");
                return -EIO;
            }

            //Copy data and add new dirent to end
            memcpy(new_data, new_parent_data, new_parent_fcb->size); //Copy over old data
            memcpy(new_data + new_parent_fcb->size, new_dirent, sizeof(dirent)); //Add dirent at end
            free(new_parent_data);
            free(new_dirent);
        } else {
            //No data exists, so just fill new data with dirent
            memcpy(new_data, new_dirent, sizeof(dirent));
            free(new_dirent);
        }

        //Store data
        rc = store_data(new_parent_fcb->data_uuid, new_data, new_data_size);
        if (rc != UNQLITE_OK) {
            write_log("Error when using database(s); returning -EIO\n");
            free(newpath_cpy);
            free(new_data);
            free(new_parent_fcb);
            return -EIO;
        }
        free(new_data);

        //Update and store FCB
        new_parent_fcb->size = new_data_size;
        write_log("New parent directory new size: %i\n", new_parent_fcb->size);
        rc = store_fcb(new_parent_fcb_key, new_parent_fcb);
        if (rc != UNQLITE_OK) {
            write_log("Error when using database(s); returning -EIO\n");
            free(newpath_cpy);
            free(new_parent_fcb);
            return -EIO;
        }

        //Finished
        write_log("New parent directory changed okay\n");
        free(newpath_cpy);
        free(new_parent_fcb);
    }

    write_log("Rename complete\n");
}

//=====================================
//====== FUSE FUNCTIONS END HERE ======
//=====================================

// Pointers to all functions for FUSE
static struct fuse_operations myfs_oper = {
        .getattr    = myfs_getattr,
        .readdir    = myfs_readdir,
        .open        = myfs_open,
        .read        = myfs_read,
        .create        = myfs_create,
        .utime        = myfs_utime,
        .write        = myfs_write,
        .truncate    = myfs_truncate,
        .flush        = myfs_flush,
        .release    = myfs_release,
        .mkdir      = myfs_mkdir,
        .chmod      = myfs_chmod,
        .chown      = myfs_chown,
        .unlink     = myfs_unlink,
        .rmdir      = myfs_rmdir,
        .rename     = myfs_rename,
};


//Recursive method to add all FCBs to "inode" table in memory - Called in init_fs(...)
void add_children_to_mem(myfcb *parent_fcb) {

    printf("Adding children FCBs to memory for FCB at pointer: %p\n", parent_fcb);

    //Base case of not being a directory
    if (!(S_IFDIR & parent_fcb->mode)) {
        printf("\tBase Case 1: This is not a directory\n");
        return;
    }

    //Size of 0 means no children - Base Case
    if (parent_fcb->size == 0) {
        printf("\tBase Case 2: There are no children\n");
        return;
    }

    //Fetch parent FCB stored data
    uint8_t *parent_fcb_data = calloc(1, parent_fcb->size);
    int rc = fetch_data(parent_fcb->data_uuid, parent_fcb_data, parent_fcb->size);
    if (rc != UNQLITE_OK) {
        printf("Error when fetching parent data during setup; exiting program\n");
        exit(rc);
    }

    //Split fetched data into dirents and add relating FCBs to in-memory database
    for (int i = 0; i < parent_fcb->size / sizeof(dirent); i++) {
        dirent *this_dirent = (dirent *) (parent_fcb_data + (i * sizeof(dirent)));

        myfcb *this_fcb = calloc(1, sizeof(myfcb));
        printf("\tAdding to mem dirent with name: %s\n", this_dirent->name);
        fetch_persistent_fcb(this_dirent->fcb_uuid, this_fcb); //Fetch from persistent database
        rc = store_mem_fcb(this_dirent->fcb_uuid, this_fcb); //Store in in-mem with UUID as key
        if (rc != UNQLITE_OK) {
            printf("Error when using in-memory database during setup; exiting program\n");
            exit(rc);
        }

        add_children_to_mem(this_fcb); //Recurse with this_fcb as parent
    }
}


//Function to initialise file system, recovering all previous data if it exists
void init_fs() {
    int rc;
    printf("init_fs\n");

    //Initialise key store
    uuid_clear(zero_uuid);
    printf("init_fs: Key store initialised\n");

    //Open persistent database
    rc = unqlite_open(&pDb, DATABASE_NAME, UNQLITE_OPEN_CREATE);
    if (rc != UNQLITE_OK) {
        printf("Error when opening in-memory database; exiting program\n");
        exit(rc);
    }
    printf("init_fs: Persistent database opened\n");

    //Open in-memory database
    rc = unqlite_open(&memDb, MEM_DB_NAME, UNQLITE_OPEN_IN_MEMORY);
    if (rc != UNQLITE_OK) {
        printf("Error when opening on-disk database; exiting program\n");
        exit(rc);
    }
    printf("init_fc: In-memory database opened\n");

    //Initialise root_fcb pointer
    root_fcb = calloc(1, sizeof(myfcb));

    //Fetch root FCB from persistent and store in memory (global pointer)
    rc = fetch_persistent_fcb(ROOT_OBJECT_KEY, root_fcb);

    if (rc == UNQLITE_NOTFOUND) {
        //No root FCB previously stored, so initialise new one
        printf("init_fs: No root FCB found - Initialising new one\n");
        root_fcb->mode |= S_IFDIR | S_IRWXU | S_IRWXG | S_IROTH;
        root_fcb->mtime = time(0);
        root_fcb->ctime = time(0);
        root_fcb->atime = time(0);
        root_fcb->uid = getuid();
        root_fcb->gid = getgid();
        root_fcb->size = 0;

        uuid_generate(root_fcb->data_uuid);

        //Store FCB in persistent database (already in mem using global pointer)
        rc = store_fcb(ROOT_OBJECT_KEY, root_fcb);
        if (rc != UNQLITE_OK) {
            write_log("Error when using database(s) during setup; exiting program\n");
            exit(rc);
        }

    } else {
        //Previous root FCB found, so recover rest of file tree
        printf("init_fs: Previous root FCB found - Recovering data\n");
        add_children_to_mem(root_fcb);
    }
}

void shutdown_fs() {
    free(root_fcb);
    unqlite_close(memDb); //Close in-mem DB
    unqlite_close(pDb); //Close on-disk DB
}

int main(int argc, char *argv[]) {
    int fuserc;
    struct myfs_state *myfs_internal_state;

    //Setup the log file and store the FILE* in the private data object for the file system.
    myfs_internal_state = malloc(sizeof(struct myfs_state));
    myfs_internal_state->logfile = init_log_file();

    //Initialise the file system. This is being done outside of fuse for ease of debugging.
    init_fs();

    printf("init complete\n");
    // Now pass our function pointers over to FUSE, so they can be called whenever someone
    // tries to interact with our filesystem. The internal state contains a file handle
    // for the logging mechanism
    fuserc = fuse_main(argc, argv, &myfs_oper, myfs_internal_state);

    printf("fuse complete\n");
    //Shutdown the file system.
    shutdown_fs();

    printf("shutdown complete\n");

    return fuserc;
}

