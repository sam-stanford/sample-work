import sys
import os

# This file is used to marshall/unmarshall DIMACS CNF files


# Class to represent a CNF problem
class CNF:
    def __init__(self):
        self.clauses = list()
        self.num_vars = 0
        self.variables = set()
        self.num_clauses = 0


# Function to unmarshall program input into CNF problem object
def unmarshall_cnf(infile):

    # Create CNF object to return
    returnObj = CNF()

    # Read input line-by-line
    line = infile.readline()
    while line:
        # Comment/empty line
        if (len(line.strip()) == 0 or line.strip()[0] == "c"):
            line = infile.readline()
            continue

        # Problem line
        if (line.strip()[0] == "p"):
            # Split into [p, PROBLEM, NUM_VARS, NUM_CLAUSES]
            problem_line = line.strip().split()
            if (len(problem_line) != 4):
                print("\tERROR: Problem file incorrect - Incorrect problem line format")
                sys.exit(0)

            # Check problem is CNF
            if (problem_line[1] != "cnf"):
                print("\tERROR: Problem file incorrect - Problem of incorrect type")
                sys.exit(0)

            # Read variable & clause counts
            try:
                returnObj.num_vars = int(problem_line[2])
                returnObj.num_clauses = int(problem_line[3])
            except ValueError:
                print(
                    "ERROR: Problem file incorrect - Could not read integers from problem line")
                sys.exit(0)
            line = infile.readline()
            continue

        # Clause line
        if (returnObj.num_clauses == -1 or returnObj.num_vars == -1):
            print("\tERROR: Problem file incorrect - Clause defined before problem line")
            sys.ext(0)

        clause_literals = line.strip().split()

        # Last in line must be 0
        if (clause_literals[len(clause_literals) - 1] != "0"):
            print("\tERROR: Problem file incorrect - Clause line does not end in 0")
            sys.exit(0)

        # Convert clause into list
        this_clause = list()
        for this_literal_index in range(len(clause_literals)):
            # Check 0 isn't used
            if(clause_literals[this_literal_index] == "0"):
                if (this_literal_index != len(clause_literals) - 1):
                    print("\tERROR: Problem file incorrect - 0 used as literal")
                    sys.exit(0)
                else:
                    continue

            # Convert literal to number
            this_literal = 0
            try:
                this_literal = int(clause_literals[this_literal_index])
            except ValueError:
                print("\tERROR: Problem file format - Literals are not integers")
                sys.exit(0)
            if (this_literal == 0):
                print("\tERROR: Problem file format - Literals are not integers")
                sys.exit(0)

            # Add literal to clause
            this_clause.append(this_literal)

            # Convert literal to variable and add to set
            variable = abs(this_literal)
            returnObj.variables.add(variable)

        # Add clause to clauses list
        returnObj.clauses.append(this_clause)

        # Iterate to next line
        line = infile.readline()

    # Check consistency
    if (len(returnObj.clauses) != returnObj.num_clauses):
        print("\tERROR: Problem file incorrect - More clauses than stated")
        sys.exit(0)

    if(len(returnObj.variables) != returnObj.num_vars):
        print("\tERROR: Problem file incorrect - More variables than stated")
        sys.exit(0)

    return returnObj


# Function to marshall CNF problem object to stdout
def marshall_cnf(cnf_object):

    # Check is CNF object
    if (not isinstance(cnf_object, CNF)):
        print("\tERROR: Provided argument is not a CNF object")
        sys.exit(0)

    # Check object is complete
    if(not (cnf_object.num_clauses > 0 and cnf_object.num_vars > 0
            and len(cnf_object.clauses) == cnf_object.num_clauses
            and len(cnf_object.variables) == cnf_object.num_vars)):

        print("\tERROR: Provided CNF object is incomplete")
        sys.exit(0)

    # Print conventional comment line
    print(
        "c This is a CNF problem created by a CNF object marshaller in Python")

    # Print problem line
    print("p cnf " + str(cnf_object.num_vars) +
                     " " + str(cnf_object.num_clauses))

    # Print each clause
    for this_clause in cnf_object.clauses:

        # Print each literal of each clause
        for this_literal in this_clause:
            print(str(this_literal) + " ", end='')

        # Print 0 at end of line
        print("0")