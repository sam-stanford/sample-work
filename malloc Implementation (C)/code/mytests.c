////
//// Created by 170002815 on 30/09/2019.
////

#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <unistd.h>
#include "myalloc.h"

void main() {

    //Test 1 - Simple malloc
    printf("\nTest 1: Simple Allocation\n");
    int *ptr1 = myalloc(80);
    if (ptr1) printf("\t- - PASS\n");



    //Test 2 - Simple free
    printf("\nTest 2: Simple Free\n");
    myfree(ptr1);
    printf("\t- PASS\n");



    //Test 3 - Alloc, assign, free
    printf("\nTest 3: Alloc, Assign & Free\n");
    int *ptr2 = myalloc(sizeof(int));
    *ptr2 = 26000;
    if (*ptr2 != 26000) exit(0);
    myfree(ptr2);
    printf("\t- PASS\n");



    //Test 4 - Alloc, multiple assigns, free
    printf("\nTest 4: Alloc, Multiple Assigns, Free\n");
    int *ptr3 = myalloc(10 * sizeof(int));
    for (int i = 0; i < 10; i++) {
        ptr3[i] = i;
    }
    myfree(ptr3);
    printf("\t- PASS\n");



    //Test 5 - Alloc 3, free middle, then outer blocks, realloc
    printf("\nTest 5: Coalesce Outer Blocks to Inner Block\n");
    ptr1 = myalloc(40);
    ptr2 = myalloc(40);
    ptr3 = myalloc(40);

    int *temp = ptr1; //Remember first block, as we want this back later

    myfree(ptr2); //Middle
    myfree(ptr1); //Outer
    myfree(ptr3); //Outer

    int *ptr4 = myalloc(40);
    if(ptr4 == temp) printf("\t- PASS\n");
    myfree(ptr4);



    //Test 6 - Alloc 3, free outer, then middle blocks, realloc
    printf("\nTest 6: Coalesce Inner Blocks to Outer Block\n");
    ptr1 = myalloc(40);
    ptr2 = myalloc(40);
    ptr3 = myalloc(40);

    *temp = (int *) ptr1; //Remember first block, as we want this back later

    myfree(ptr1); //Outer
    myfree(ptr3); //Outer
    myfree(ptr2); //Middle

    *ptr4 = myalloc(40);
    if(ptr4 == temp) printf("\t- PASS\n");
    myfree(ptr4);


    //Test 7 - Alloc exact size for one header with size of two pointers
    //Works for 1024 mmap size, 8 header size
    printf("\nTest 7: Exact Size for Header With No Memory\n");
    int *ptr5 = myalloc(1024 - 5*8);
    if(ptr5) printf("\t- PASS\n");
    if(ptr5) myfree(ptr5);


    //Test 8 - Alloc perfect size for no extra header
    //Works for 1024 mmap size, 8 header size
    printf("\nTest 8: Maximum Allocation Size\n");
    int *ptr6 = myalloc(1024 - 2*8);
    if(ptr6) printf("\t- PASS\n");
    myfree(ptr6);



    //Test 9 - Requesting near maximum request should round up
    //Works for 1024 mmap size, 8 header size
    printf("\nTest 9: Near Maximum Allocation Size\n");
    int *ptr7 = myalloc(1024 - 4*8);
    if(ptr7) printf("\t- PASS\n");
    myfree(ptr7);



    //Test 10 - Requesting too much mem should return NULL
    //Works for 1024 mmap size, 8 header size
    printf("\nTest 10: Too Large Allocation Size\n");
    int *ptr8 = myalloc(2000);
    if(!ptr8) printf("\t- PASS\n");


    //Test 11 - Freeing NULL pointer should do nothing
    printf("\nTest 11: myfree NULL Should do Nothing\n");
    myfree(ptr8);
    printf("\t- PASS\n");










}
