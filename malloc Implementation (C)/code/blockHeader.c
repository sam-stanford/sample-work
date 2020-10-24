#include <stdlib.h>
#include <stdio.h>
#include <stdbool.h>
#include <sys/time.h>
#include <sys/mman.h>

#include "myalloc.h"
#include "blockHeader.h"


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

bool getBlockFinalBit(Header *thisHeader){
    return thisHeader->headerData & thisBlockFinalMask;
}


long getThisBlockSize(Header *thisHeader) {
    return thisHeader->headerData & thisBlockSizeMask;
}

Header *getNextHeader(Header *thisHeader) {
    return (Header *) (((void *) thisHeader) + getThisBlockSize(thisHeader) + sizeof(Header));
}

Header *getPrevFreeHeader(Header *thisFreeHeader) {
    //Previous free header pointer directly after this free header
    return (Header *) ((thisFreeHeader + 1)->headerData);
}

Header *getNextFreeHeader(Header *thisFreeHeader) {
    //Next free header pointer directly after previous free header pointer
    return (Header *) ((thisFreeHeader + 2)->headerData);
}

/**
 *
 * Setter functions associated with Headers
 *
 * */

void setPrevBlockFreeBit(Header *thisHeader, bool toSet) {
    thisHeader->headerData &= ~prevBlockFreeMask; //Clear bit
    if(toSet){
        thisHeader->headerData |= (long) prevBlockFreeMask; //Set bit
    }
    return;
}

void setThisBlockFreeBit(Header *thisHeader, bool toSet) {
    thisHeader->headerData &= ~thisBlockFreeMask; //Clear bit
    if(toSet){
        thisHeader->headerData |= (long) thisBlockFreeMask; //Set bit
    }
    return;
}

void setThisBlockFinalBit(Header *thisHeader, bool toSet){
    thisHeader->headerData &= ~thisBlockFinalMask; //Clear bit
    if(toSet){
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

