#include <stdlib.h>
#include <stdio.h>
#include <stdbool.h>
#include <sys/time.h>
#include <sys/mman.h>

#include "myalloc.h"

#define MMAP_REQUEST_SIZE 800*1024*1024 //32MB per program
#define MIN_WORD_ALLOC 3


/**
 *
 * Header struct definition
 * - One for each block
 * - Size of one word to match with word addressing (common in Linux)
 * - Assuming little endianness (common in Linux)
 * - First 3 bits always free since block size always rounded to
 *
 * - Structure of Header:
 *      //Header memory starts
 *      1 tag bit to describe if previous block is free
 *      1 tag bit to describe if this block is free
 *      1 tag bit to describe if this block is the final block
 *      (word - 3) bits to describe length of this block, not including header
 *      //Header memory ends
 *      [If block is free, there are 2 words directly after header to complete free list]
 *      1 word for previous free block pointer
 *      1 word for next free block pointer

 *
 * */

typedef struct header {
    long headerData;
} Header;




/**
 *
 * Bit masks associated with Headers
 *
 * */
//Assume small endian for Linux x86_64
long prevBlockFreeMask = 1; //All 0s except smallest bit
long thisBlockFreeMask = 2; //All 0s except second smallest bit
long thisBlockFinalMask = 4; //All 0s except third smallest bit
long thisBlockSizeMask = ~7; //All 1s except final 3 bits




/**
 *
 * Getter functions associated with Headers
 *
 * */

bool getPrevBlockFreeBit(Header *thisHeader) {
    return thisHeader->headerData & prevBlockFreeMask;
}

bool getThisBlockFreeBit(Header *thisHeader) {
    return thisHeader->headerData & thisBlockFreeMask;
}

bool getBlockFinalBit(Header *thisHeader) {
    return thisHeader->headerData & thisBlockFinalMask;
}


long getThisBlockSize(Header *thisHeader) {
    return thisHeader->headerData & thisBlockSizeMask;
}

Header *getNextHeader(Header *thisHeader) {
    return (Header *) (((void *) thisHeader) + getThisBlockSize(thisHeader) + sizeof(Header));
}

Header *getPrevFreeHeader(Header *thisFreeHeader) {
    //Must be free block
    if (getThisBlockFreeBit(thisFreeHeader)) {
        //Previous free header pointer directly after this free header
        return (Header *) ((thisFreeHeader + 1)->headerData);
    } else {
        return NULL;
    }
}

Header *getNextFreeHeader(Header *thisFreeHeader) {
    //Must be free block
    if (getThisBlockFreeBit(thisFreeHeader)) {
        //Next free header pointer directly after previous free header pointer
        return (Header *) ((thisFreeHeader + 2)->headerData);
    } else {
        return NULL;
    }

}


/**
 *
 * Setter functions associated with Headers
 *
 * */

void setPrevBlockFreeBit(Header *thisHeader, bool toSet) {
    thisHeader->headerData &= ~prevBlockFreeMask; //Clear bit
    if (toSet) {
        thisHeader->headerData |= (long) prevBlockFreeMask; //Set bit
    }
    return;
}

void setThisBlockFreeBit(Header *thisHeader, bool toSet) {
    thisHeader->headerData &= ~thisBlockFreeMask; //Clear bit
    if (toSet) {
        thisHeader->headerData |= (long) thisBlockFreeMask; //Set bit
    }
    return;
}

void setThisBlockFinalBit(Header *thisHeader, bool toSet) {
    thisHeader->headerData &= ~thisBlockFinalMask; //Clear bit
    if (toSet) {
        thisHeader->headerData |= (long) thisBlockFinalMask; //Set bit
    }
    return;
}

void setThisBlockSize(Header *thisHeader, long toSet) {
    thisHeader->headerData &= ~thisBlockSizeMask; //Clear all bits except tag bits
    thisHeader->headerData |= toSet; //Set bits previously cleared
}

void setPrevFreeHeader(Header *thisFreeHeader, Header *prevFreeHeader) {
    *(&(thisFreeHeader->headerData) + 1) &= (long) 0; //Clears current bits
    *(&(thisFreeHeader->headerData) + 1) |= (long) prevFreeHeader; //Sets to new pointer
}

void setNextFreeHeader(Header *thisFreeHeader, Header *nextFreeHeader) {
    *(&(thisFreeHeader->headerData) + 2) &= (long) 0; //Clears current bits
    *(&(thisFreeHeader->headerData) + 2) |= (long) nextFreeHeader; //Sets to new pointer
}


/**
 *
 * Global variables for myalloc functionality
 *
 * */

void *memToAlloc; //Points to mem given by OS
Header *firstHeader; //Header for all memory given by OS
Header *firstFreeHeader; //Header for free list



/**
 *
 * Testing function to print out all blocks and their info
 *
 * */

void printBlocks(Header *thisHeader) {
    printf("\n");
    while (!getBlockFinalBit(thisHeader)) {
        printf("\nBlock: %p\n", thisHeader);
        printf("\t- Size: %li\n", getThisBlockSize(thisHeader));
        printf("\t- Free Bit: %i\n", getThisBlockFreeBit(thisHeader));
        printf("\t- Prev Free Bit: %i\n", getPrevBlockFreeBit(thisHeader));
        printf("\t- Final Block Bit: %i\n", getBlockFinalBit(thisHeader));
        printf("\n");
        printf("\t- Next Block: %p\n", getNextHeader(thisHeader));
        printf("\t- Previous Free Block Pointer: %p\n", getPrevFreeHeader(thisHeader));
        printf("\t- Next Free Block Pointer: %p\n", getNextFreeHeader(thisHeader));

        thisHeader = getNextHeader(thisHeader);
    }

    printf("\nBlock: %p\n", thisHeader);
    printf("\t- Size: %li\n", getThisBlockSize(thisHeader));
    printf("\t- Free Bit: %i\n", getThisBlockFreeBit(thisHeader));
    printf("\t- Prev Free Bit: %i\n", getPrevBlockFreeBit(thisHeader));
    printf("\t- Final Block Bit: %i\n", getBlockFinalBit(thisHeader));
    printf("\n");
    printf("\t- Next Block: %p\n", getNextHeader(thisHeader));
    printf("\t- Previous Free Block Pointer: %p\n", getPrevFreeHeader(thisHeader));
    printf("\t- Next Free Block Pointer: %p\n", getNextFreeHeader(thisHeader));

    printf("\nCurrent first free header: %p\n", firstFreeHeader);
    printf("Current first header: %p\n\n", firstHeader);

}


/**
 *
 * Setup for myalloc(...) and free(...)
 *
 * */

void myallocSetup() {
    //Requests memory chunk from OS
    memToAlloc = mmap(NULL, MMAP_REQUEST_SIZE, PROT_READ | PROT_WRITE | PROT_EXEC,
                      MAP_PRIVATE | MAP_ANONYMOUS, 0, 0);

    //Creates first & last headers
    firstHeader = (Header *) memToAlloc;
    Header *lastHeader = (Header *) (memToAlloc + MMAP_REQUEST_SIZE - sizeof(Header));

    //Fills first header
    setThisBlockSize(firstHeader, MMAP_REQUEST_SIZE - 2 * sizeof(Header));
    setThisBlockFreeBit(firstHeader, true);
    setPrevBlockFreeBit(firstHeader, false);
    setThisBlockFinalBit(firstHeader, false);

    //Fills last header
    setThisBlockSize(lastHeader, 0);
    setThisBlockFreeBit(lastHeader, false);
    setPrevBlockFreeBit(lastHeader, true);
    setThisBlockFinalBit(lastHeader, true);

    //Starts free list
    firstFreeHeader = firstHeader;
}


/**
 *
 * Method to create new header (size + sizeof(Header)) bytes away from thisHeader, used in myalloc(...)
 *
 * */

Header *createNewFreeHeader(Header *thisHeader, long size) {

    Header *newHeader = (Header *) (((void *) thisHeader) + sizeof(Header) + size); //New header location

    setThisBlockSize(newHeader, getThisBlockSize(thisHeader) - size - sizeof(Header)); //New block size
    setThisBlockSize(thisHeader, size); //This block size

    //New block free & not last
    setThisBlockFreeBit(newHeader, true);
    setThisBlockFinalBit(newHeader, false);

    //This block not free
    setThisBlockFreeBit(thisHeader, false);
    setPrevBlockFreeBit(newHeader, false);

    //Locates previous and next free headers
    Header *prevFreeHeader = getPrevFreeHeader(thisHeader);
    Header *nextFreeHeader = getNextFreeHeader(thisHeader);

    //Replaces thisHeader with newHeader in free list
    if (prevFreeHeader) {
        //Prev header exists
        setNextFreeHeader(prevFreeHeader, newHeader);
    } else {
        //Prev header doesnt exist
        firstFreeHeader = newHeader;
        setPrevFreeHeader(newHeader, NULL);
    }
    if (nextFreeHeader) {
        //Next header exists
        setPrevFreeHeader(nextFreeHeader, newHeader);
    } else {
        //Next header doesnt exist
        setNextFreeHeader(newHeader, NULL);
    }
}


/**
 *
 * Method to remove a block from the free list, used in myalloc(...)
 *
 * */

void removeFromFreeList(Header *thisFreeHeader) {
    //This block not free
    setThisBlockFreeBit(thisFreeHeader, false);
    setPrevBlockFreeBit(getNextHeader(thisFreeHeader), false);

    //No resizing, meaning blocks may be rounded up

    //Locates previous and next free headers
    Header *prevFreeHeader = getPrevFreeHeader(thisFreeHeader);
    Header *nextFreeHeader = getNextFreeHeader(thisFreeHeader);

    //Drops thisFreeHeader from linked list
    if (prevFreeHeader) {
        //Prev header exists
        if (nextFreeHeader) {
            //Prev & next headers exist
            setNextFreeHeader(prevFreeHeader, nextFreeHeader);
            setPrevFreeHeader(nextFreeHeader, prevFreeHeader);
        } else {
            //Only prev header exists
            setNextFreeHeader(prevFreeHeader, NULL);
        }

    } else {
        //Prev header doesn't exist
        firstFreeHeader = nextFreeHeader; //Could be null
    }
    if (nextFreeHeader) {
        //Only next header exists
        setPrevFreeHeader(nextFreeHeader, NULL);
    }
}


/**
 *
 * myalloc(...) implemented as specified in myalloc.h
 *
 * */

void *myalloc(int size) {
    //Completes setup if not already
    if (!memToAlloc) {
        myallocSetup();
    }

    //Adjusts alloc request size for word addressing
    if (size < MIN_WORD_ALLOC * sizeof(long)) {
        //Ensures alloc is at least three words
        size = MIN_WORD_ALLOC * sizeof(long);
    } else {
        //Ensures alloc is a multiple of word length
        if (size % sizeof(long) != 0) {
            size += sizeof(long) - (size % sizeof(long));
        }
    }

    Header *thisFreeHeader = firstFreeHeader; //Marker for traversing free list
    //Traverses free list
    printf("FFH: %p\n", firstFreeHeader);
    while (thisFreeHeader) {
        printf("bibblybobbly\n");

        //If block is big enough for allocation...
        if (getThisBlockSize(thisFreeHeader) >= size) {
            if (getThisBlockSize(thisFreeHeader) >= size + (sizeof(Header) * MIN_WORD_ALLOC)) {

                //Create new free header if space, replacing current header in free list
                createNewFreeHeader(thisFreeHeader, size); //Also manages this block's size & tag bits
            } else {
                //If no new header, drop current header from free list
                removeFromFreeList(thisFreeHeader); //Also manages this block's size & tag bits
            }

            //Returns caller mem block location, ending this myalloc call
            return ((void *) thisFreeHeader) + sizeof(Header);
        }

        thisFreeHeader = getNextFreeHeader(thisFreeHeader); //Increments free list
    }

    //No empty block large enough found
    return NULL;
}


/**
 *
 * Function to join two ADJACENT FREE blocks, used in coalesce(...)
 * -> Blocks must be ADJACENT AND FREE or implementation undefined
 * -> absorber takes on target's header and available memory and adds it to its own memory
 *
 * */

void joinFreeBlocks(Header *absorber, Header *target) {
    //absorber takes on target's memory block and header as own memory block
    setThisBlockSize(absorber, getThisBlockSize(absorber) + sizeof(Header) + getThisBlockSize(target));

    //Move free list pointers from target to absorber (could be NULL)
    if (getNextFreeHeader(target)) {
        setPrevFreeHeader(getNextFreeHeader(target), absorber);
    }
    setNextFreeHeader(absorber, getNextFreeHeader(target));


    //Change head of free list if needed
    if (firstFreeHeader == target || firstFreeHeader == NULL) {
        firstFreeHeader = absorber;
    }

    return;
}


/**
 *
 * Function to join (coalesce) all adjacent free blocks in free list, used in myfree(...)
 *
 * */

void coalesce(Header *thisFreeHeader, Header *target) {

    //Loop through all Free headers
    while (thisFreeHeader) {

        //target is previous header to current free header
        if (getPrevBlockFreeBit(thisFreeHeader)) {
            joinFreeBlocks(target, thisFreeHeader);
            return;
        }

        //target is next header to current free header
        if (getThisBlockFreeBit(getNextHeader(thisFreeHeader))) {
            joinFreeBlocks(thisFreeHeader, target);

            //Next free header could also be adjacent to target. NOTE: nextFreeHeader changed by joinFreeBlocks(...)
            if (getThisBlockFreeBit(getNextHeader(target))) {
                joinFreeBlocks(thisFreeHeader, getNextHeader(target));
            }

            return;
        }

        thisFreeHeader = getNextFreeHeader(thisFreeHeader);
    }

    return;
}


/**
 *
 * myfree(...) implemented as specified in myalloc.h
 *
 * */

void myfree(void *ptr) {

    //No action if NULL
    if (ptr) {
        //Finds header from ptr
        Header *thisHeader = (Header *) (ptr - sizeof(Header));

        //Flip thisBlockFreeBit
        setThisBlockFreeBit(thisHeader, true);

        //Flip next blocks prevBlockFreeBit
        setPrevBlockFreeBit(getNextHeader(thisHeader), true);

        //Clean pointers from any left over data
        setPrevFreeHeader(thisHeader, NULL);
        setNextFreeHeader(thisHeader, NULL);

        if (firstFreeHeader) {
            //Free blocks exist
            if (getPrevBlockFreeBit(thisHeader) || getThisBlockFreeBit(getNextHeader(thisHeader))) {
                //If any adjacent to this block, coalesce
                coalesce(firstFreeHeader, thisHeader);
            } else {
                //Neither prev or next free, so add to free list at start
                setNextFreeHeader(thisHeader, firstFreeHeader);
                setPrevFreeHeader(firstFreeHeader, thisHeader);
                firstFreeHeader = thisHeader;
            }

        } else {
            //No free blocks, so thisHeader is new start of free list
            firstFreeHeader = thisHeader;
        }

    }
    return;
}



