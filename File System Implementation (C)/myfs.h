//#include "fs.h"
#include <uuid/uuid.h>
#include "unqlite.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <unistd.h>
#include <time.h>
#include <fuse.h>

#define MY_MAX_FILE_NAME 256
#define MY_MAX_FILE_SIZE 1024*1024

/*
 *
 * File Control Block Structure
 *  -> Meta-data for the 'file'
 *
 * */
typedef struct _myfcb {
    uid_t  uid; //User
    gid_t  gid; //Group
    mode_t mode; //Protection

    time_t mtime; //Time of last modification
    time_t ctime; //Time of last meta data modification
    time_t atime; //Time of last access

    off_t size; //Size
    uuid_t data_uuid; //UUID for data DB entry

} myfcb;

/*
 *
 * Directory Entry structure
 *
 * */
typedef struct _dirent {
    uuid_t fcb_uuid; //Uuid for fcb db entry - equiv to inode no in linux
    char name[MY_MAX_FILE_NAME]; //File or directory name
} dirent;


//Well known key for root object
#define ROOT_OBJECT_KEY "root"
#define ROOT_OBJECT_KEY_SIZE 4

//Key size for all other keys - 16 bytes for UUID
#define KEY_SIZE 16

// Database names to hold FS
#define DATABASE_NAME "myfs.db"
#define MEM_DB_NAME ":mem:"

extern unqlite *pDb;
extern unqlite *memDb;

extern void error_handler(int);
void print_id(uuid_t *);

extern FILE* init_log_file();
extern void write_log(const char *, ...);

extern uuid_t zero_uuid;

// We can use the fs_state struct to pass information to fuse, which our handler functions can
// then access. In this case, we use it to pass a file handle for the file used for logging
struct myfs_state {
    FILE *logfile;
};
#define NEWFS_PRIVATE_DATA ((struct myfs_state *) fuse_get_context()->private_data)


// Some helper functions for logging etc.

// In order to log actions while running through FUSE, we have to give
// it a file handle to use. We define a couple of helper functions to do
// logging. No need to change this if you don't see a need
//

FILE *logfile;

// Open a file for writing so we can obtain a handle
FILE *init_log_file(){
    //Open logfile.
    logfile = fopen("myfs.log", "w");
    if (logfile == NULL) {
		perror("Unable to open log file. Life is not worth living.");
		exit(EXIT_FAILURE);
    }
    //Use line buffering
    setvbuf(logfile, NULL, _IOLBF, 0);
    return logfile;
}

// Write to the provided handle
void write_log(const char *format, ...){
    va_list ap;
    va_start(ap, format);
    vfprintf(NEWFS_PRIVATE_DATA->logfile, format, ap);
}

// Simple error handler which cleans up and quits
void error_handler(int rc){
	if( rc != UNQLITE_OK ){
		const char *zBuf;
		int iLen;
		unqlite_config(pDb,UNQLITE_CONFIG_ERR_LOG,&zBuf,&iLen);
		if( iLen > 0 ){
			perror("error_handler: ");
			perror(zBuf);
			write_log("Error Handler: ");
			write_log(zBuf);
		}
		if( rc != UNQLITE_BUSY && rc != UNQLITE_NOTIMPLEMENTED ){
            //Rollback databases
            unqlite_rollback(memDb);
			unqlite_rollback(pDb);
		}
		write_log("Shutting down filesystem\n");
		exit(rc);
	}
}

void print_id(uuid_t *id){
 	size_t i; 
    for (i = 0; i < sizeof *id; i ++) {
        printf("%02x ", (*id)[i]);
    }
}

