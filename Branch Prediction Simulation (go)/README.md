# Program Usage

To run the source code for this practical, execute the following steps.

1. Ensure Go is installed on the machine you are using. Go can be installed via this link https://golang.org/dl/, and is available on the School of Computer Science lab machines.

2. Change into the src directory.

3. Execute `go build` to compile the code and create an executable.

4. Execute the created executable in step 3 with the following command line arguments.

- ’always-taken’ ,’2-bit’,’gshare’ or ’profiled’ to use an always-taken predictor, two-bit predictor, gshare predictor or profiled predictor respectively.

- The directory path to the branch trace files.

- A list of branch trace files to be experimented on, separated by spaces.

An example of this would be executing

`.\src.exe 2-bit ..\branchtraces\choices coremark.out g++.out picalc.out`

to run an experiment using a 2-bit predictor to evaluate the coremark, g++ and picalc files in the../branchtraces/choicesdirectory in Windows Powershell.

5. Interpret the output of the program manually fromstdout, or pipe into a CSV file and open usinga spreadsheet application.
