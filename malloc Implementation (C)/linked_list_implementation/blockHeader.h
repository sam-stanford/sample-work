//
// Created by 170002815 on 02/10/2019.
//

#ifndef PRACITCAL1_BLOCKHEADER_H
#define PRACITCAL1_BLOCKHEADER_H

//Struct for header of every memory block in a chunk
typedef struct header {
    bool memAvailable; //Bool to indicate if this block's memory is allocatable
    void *thisBlockMem; //Points to memory for this block
    struct header *nextBlockHeader; //Points to header for next block
    struct header *prevBlockHeader; //Points to header for previous block
} Header;

//Function to calculate size of memory in a block specified by its header
extern long blockMemSize(Header *blockHead);

#endif //PRACITCAL1_BLOCKHEADER_H
