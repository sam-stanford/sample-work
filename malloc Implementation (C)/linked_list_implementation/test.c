#include "myalloc.h"
#include <stdio.h>

// A simple test program to show the  use of the library
// By default, myalloc() simply calls malloc() so this will
// work.
// Kasim Terzic, Sep 2017

void main()
{
    print("Sizeof(Header) = %li\n", sizeof(Header));
    printf("Allocating 1024 * sizeof(int)... \n");

    int* ptr = myalloc(1024*sizeof(int));
    ptr[0] = 42;    

    printf("Allocated num: %i\n", ptr[0]);
    printf("Freeing the allocated memory... \n");
    myfree(ptr);

    printf("Yay!\n");

}
