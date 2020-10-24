//
// Created by 170002815 on 30/09/2019.
//

#include <stdio.h>
#include <stdbool.h>

#include "blockHeader.h"
#include "myalloc.h"


//Loops through chunk specified by block header, printing out details
void describeChunk(Header *thisHeader) {

    printf("Description of Chunk at %p\n", (void *) thisHeader);

    long blockCounter = 0;
    long currentTotalMem = 0;
    long currentTotalAllocedMem = 0;

    while (thisHeader->nextBlockHeader) {
        printf("\tBlock Number %li:\n", blockCounter);

        long thisBlockMemSize = blockMemSize(thisHeader);

        if (!thisHeader->memAvailable) {
            currentTotalAllocedMem += thisBlockMemSize;
            printf("\t\t- Alloced: YES\n");
        } else {
            printf("\t\t- Alloced: NO\n");
        }
        printf("\t\t- Block's Memory: %li\n", thisBlockMemSize);
        printf("\t\t- Total Mem Alloced So Far: %li\n", currentTotalAllocedMem);


        blockCounter++;
        currentTotalMem += thisBlockMemSize + sizeof(Header);
        printf("\t\t- Current total mem described: %li\n", currentTotalMem);
        thisHeader = thisHeader->nextBlockHeader;
    }

    currentTotalMem += sizeof(Header); //Adds last header
    printf("\tFinal Header:\n");
    printf("\t\t- Current total mem described: %li\n", currentTotalMem);

    long headerMem = (blockCounter + 1) * sizeof(Header); //last header
    printf("\n\tMemory used for headers: %li", headerMem);

    long usedMem = currentTotalAllocedMem + headerMem;
    printf("\n\tTotal memory used in chunk = %li", usedMem);
    printf("\n\tTotal memory left in chunk = %li\n\n", currentTotalMem - usedMem);
}


void main() {
    printf("Size of header: %li\n\n", sizeof(Header));
    void *temp1 = myalloc(10000);
    Header *testHeader1 = (Header *) (temp1 - sizeof(Header));
    void *temp2 = myalloc(10);

    void *temp3 = myalloc(40);

    describeChunk(testHeader1);

    myfree(temp3);
    describeChunk(testHeader1);
    myfree(temp2);
    describeChunk(testHeader1);

    myfree(temp1);

    describeChunk(testHeader1);


    void *test = myalloc(60000);
    if (test) {
        printf("Oh yes\n");
    } else {
        printf("Oh no\n");
    }

    printf("\n\n...\n\n");
    void *mymem = myalloc(59000);
    describeChunk((Header *) (mymem - sizeof(Header)));

    void *awkmem = myalloc(904);
    describeChunk((Header *) (mymem - sizeof(Header)));
}