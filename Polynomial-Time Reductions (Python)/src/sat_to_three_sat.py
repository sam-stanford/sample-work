import sys
from marshallers_unmarshallers.dimacs_cnf import CNF
from marshallers_unmarshallers.dimacs_cnf import unmarshall_cnf
from marshallers_unmarshallers.dimacs_cnf import marshall_cnf

# Read SAT problem
in_problem = unmarshall_cnf(sys.stdin)

# Find highest value used for variable in SAT
highest_var_val = 0
for this_variable in in_problem.variables:
    if (this_variable > highest_var_val):
        highest_var_val = this_variable

# Increment found highest to use for fresh (new) literals
fresh_var_val = highest_var_val + 1

# Create new CNF problem to represent 3SAT output problem
out_problem = CNF()

# Substitute each clause in input problem
for this_in_clause in in_problem.clauses:

    # 1, 2 or 3 literal clauses remain same
    if(len(this_in_clause) <= 3):
        out_problem.clauses.append(this_in_clause)
        out_problem.num_clauses += 1
        continue

    # (Else) 4 or more literal clauses to be substituted
    this_sub_clause = list()
    for this_literal_index in range(len(this_in_clause)):

        this_literal = this_in_clause[this_literal_index]

        # First substitute clause - First literal
        if (this_literal_index == 0):
            this_sub_clause.append(this_literal)
            continue

        # First substitute clause - Second literal
        if (this_literal_index == 1):
            # Add literal
            this_sub_clause.append(this_literal)

            # Complete clause & add
            this_sub_clause.append(fresh_var_val)
            out_problem.clauses.append(this_sub_clause)
            out_problem.num_clauses += 1

            # Start new clause for next literal
            this_sub_clause = list()
            continue

        # Last substitute clause - Second-to-last literal
        if(this_literal_index == len(this_in_clause) - 2):
            # Add literal and negation of prev used fresh literal
            this_sub_clause.append(-1 * fresh_var_val)
            this_sub_clause.append(this_literal)

            # Increment highest literal for next input clause
            fresh_var_val += 1
            continue

        # Last substitute clause - Last literal
        if(this_literal_index == len(this_in_clause) - 1):
            # Complete final substitute clause then add
            this_sub_clause.append(this_literal) 
            out_problem.clauses.append(this_sub_clause)
            out_problem.num_clauses += 1
            continue

        # (Else) Other substitute clauses
        # Add negation of previously used fresh literal
        this_sub_clause.append(-1 * fresh_var_val)

        # Add literal from input clause
        this_sub_clause.append(this_literal)

        # Increment to new fresh literal and add to clause
        fresh_var_val += 1
        this_sub_clause.append(fresh_var_val)

        # Add substitute clause to list, then start new clause
        out_problem.clauses.append(this_sub_clause)
        out_problem.num_clauses += 1
        this_sub_clause = list()
        continue

# Sum variables used (fresh_var_val always +1 more than used)
fresh_vars_used = fresh_var_val - highest_var_val - 1
out_problem.num_vars = in_problem.num_vars + fresh_vars_used

# Add fresh variables used to variable list
out_problem.variables = in_problem.variables
for i in range(fresh_vars_used + 1):
    out_problem.variables.add(highest_var_val + i)

# Write 3SAT problem to file
marshall_cnf(out_problem)
