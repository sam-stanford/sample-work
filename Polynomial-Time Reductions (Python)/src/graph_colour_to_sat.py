import sys
from marshallers_unmarshallers.dimacs_cnf import CNF
from marshallers_unmarshallers.dimacs_cnf import marshall_cnf
from marshallers_unmarshallers.dimacs_undirected_graph import graph
from marshallers_unmarshallers.dimacs_undirected_graph import unmarshall_graph

# Function to find variable int value from colour and node
# colour_num is the int value of the colour (0 <= colour_num < num_colours); num_colours is the total number of colours
def variable_from_node_and_colour(node_num, colour_num, num_colours):
    return node_num * num_colours + colour_num


# Check number of colours is given as argument
if (len(sys.argv) != 2):
    print("Usage: cat <input_filepath> | python graph_colour_to_sat.py <number_of_colours>")
    sys.exit(0)

# Convert colour number input to int
num_colours = -1
try:
    num_colours = int(sys.argv[1])
except ValueError:
    print("Usage: cat <input_filepath> | python graph_colour_to_sat.py <number_of_colours> <output_filepath>")
    sys.exit(0)

if (num_colours == -1):
    print("Usage: cat <input_filepath> | python graph_colour_to_sat.py <number_of_colours> <output_filepath>")
    sys.exit(0)

# Check number of colours is postive int
if (num_colours <= 0):
    print("ERROR: Number of colours must be positive")
    sys.exit(0)

# Read graph from input
in_graph = unmarshall_graph(sys.stdin)

# Output SAT problem
out_problem = CNF()

# 1) Each graph node has at least one colour & 2) Each node has no more than one colour
for this_node in in_graph.nodes:

    # 1) Starts here

    # Loop all colours for this node, adding combination to clause
    this_clause = list()
    for this_colour in range(num_colours):
        # Fetch colour-node variable
        this_literal = variable_from_node_and_colour(
            this_node, this_colour, num_colours)

        # Append to clause & literals set
        this_clause.append(this_literal)
        out_problem.variables.add(this_literal)
        out_problem.num_vars += 1

    # Append clause to problem
    out_problem.clauses.append(this_clause)
    out_problem.num_clauses += 1

    # 2) Starts here

    # Loop all two-colour combinations
    for this_colour_1 in range(num_colours):
        for this_colour_2 in range(this_colour_1 + 1, num_colours):
            this_clause = list()

            # Fetch colour-node variables & add to problem set
            variable_1 = variable_from_node_and_colour(
                this_node, this_colour_1, num_colours)
            variable_2 = variable_from_node_and_colour(
                this_node, this_colour_2, num_colours)
            out_problem.variables.add(variable_1)
            out_problem.variables.add(variable_2)

            # Append negations to clause
            this_clause.append(-1 * variable_1)
            this_clause.append(-1 * variable_2)

            # Append clause to problem
            out_problem.clauses.append(this_clause)
            out_problem.num_clauses += 1


# 3) No two adjacent graph nodes have the same colour
for this_edge in in_graph.edges:

    # Check every colour
    for this_colour in range(num_colours):
        this_clause = list()

        # Fetch colour-node variables & add to problem set
        variable_1 = variable_from_node_and_colour(
            this_edge[0], this_colour, num_colours)
        variable_2 = variable_from_node_and_colour(
            this_edge[1], this_colour, num_colours)
        out_problem.variables.add(variable_1)
        out_problem.variables.add(variable_2)

        # Append negations to clause
        this_clause.append(-1 * variable_1)
        this_clause.append(-1 * variable_2)

        # Append clause to problem
        out_problem.clauses.append(this_clause)
        out_problem.num_clauses += 1


# Complete CNF object and marshall to file
# Too time-consuming to check earlier
out_problem.num_vars = len(out_problem.variables)
marshall_cnf(out_problem)
