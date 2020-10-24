#include <stdlib.h>
#include <stdio.h>
#include <stdbool.h>
#include <sys/time.h>
#include <sys/mman.h>

#include "myalloc.h"
#include "blockHeader.h"

#define REQUEST_SIZE 60000

/**
 *
 * This file is the source code for myalloc.h
 *
 * */



//Function to calculate size of memory in a block specified by its header
long blockMemSize(Header *blockHead) {
    long size = ((void *) blockHead->nextBlockHeader) - ((void *) blockHead) - sizeof(Header);
    return size;
}


void *memToAlloc; //Points to mem given by OS
Header *firstHeader; //Header for all memory given by OS

void myallocSetup() {
    //Requests memory chunk from OS
    memToAlloc = mmap(NULL, REQUEST_SIZE, PROT_READ | PROT_WRITE | PROT_EXEC,
                                 MAP_PRIVATE | MAP_ANONYMOUS, 0, 0);

    //Creates header at end of chunk
    Header *lastHeader = (Header *) (memToAlloc + REQUEST_SIZE - sizeof(Header));
    lastHeader->memAvailable = false;

    //Creates header at start of chunk
    firstHeader = (Header *) memToAlloc;
    firstHeader->thisBlockMem = ((void *) firstHeader) + sizeof(Header);
    firstHeader->memAvailable = true;

    //Links headers
    firstHeader->nextBlockHeader = lastHeader;
    lastHeader->prevBlockHeader = firstHeader;

    return;
}


//Creates a header size bytes away from thisHeader
void createNextHeader(Header *thisHeader, long size) {
    //Saves header currently pointed to
    Header *nextNextHeader = thisHeader->nextBlockHeader;

    //Creates new header
    Header *nextHeader = (Header *) (((void *) thisHeader) + sizeof(Header) + size);
    nextHeader->memAvailable = true;
    nextHeader->thisBlockMem = ((void *) nextHeader) + sizeof(Header);

    //Completes list
    thisHeader->nextBlockHeader = nextHeader;
    nextHeader->prevBlockHeader = thisHeader;
    nextHeader->nextBlockHeader = nextNextHeader;
    nextNextHeader->prevBlockHeader = nextHeader;

    return;
}


//Implements myalloc as defined in myalloc.h
void *myalloc(int size) {
    //Setup if not already complete
    if (!memToAlloc) {
        myallocSetup();
    }

    //Return NULL if size 0 to match with man pages
    if (size <= 0) return NULL;

    Header *thisHeader = firstHeader; //Tracker for current header
    //Loops through all headers
    while (thisHeader->nextBlockHeader) {
        //Checks block's mem is free and big enough
        if (thisHeader->memAvailable && blockMemSize(thisHeader) >= size) {

            //If so, allocate this block's memory
            thisHeader->memAvailable = false;
            if (blockMemSize(thisHeader) - size >= sizeof(Header)) {
                createNextHeader(thisHeader, size); //Create new header if space
            }
            return thisHeader->thisBlockMem; //Return pointer to alloced memory
        }

        thisHeader = thisHeader->nextBlockHeader;
    }

    //If no blocks available, return NULL as specified in myalloc.h
    return NULL;
}


//Implements free as defined in myalloc.h
void myfree(void *ptr) {

    //Does nothing for NULL
    if (ptr) {
        //Finds header & sets mem to available
        Header *thisHeader = (Header *) (ptr - sizeof(Header));
        thisHeader->memAvailable = true;

        //If next block free, merge blocks (abandon next block's header)
        if (thisHeader->nextBlockHeader->memAvailable) {
            Header *nextNextBlockHeader = thisHeader->nextBlockHeader->nextBlockHeader;
            nextNextBlockHeader->prevBlockHeader = thisHeader;
            thisHeader->nextBlockHeader = nextNextBlockHeader;
        }

        //If prev block free, merge blocks (abandon this block's header)
        if(thisHeader->prevBlockHeader && thisHeader->prevBlockHeader->memAvailable){
            thisHeader->prevBlockHeader->nextBlockHeader = thisHeader->nextBlockHeader;
            thisHeader->nextBlockHeader->prevBlockHeader = thisHeader->prevBlockHeader;
        }

    }

    return;
}