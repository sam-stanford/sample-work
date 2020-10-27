import sys
from marshallers_unmarshallers.dimacs_cnf import CNF
from marshallers_unmarshallers.dimacs_cnf import unmarshall_cnf
from marshallers_unmarshallers.dimacs_undirected_graph import graph
from marshallers_unmarshallers.dimacs_undirected_graph import marshall_graph

# Read input as SAT problem
in_problem = unmarshall_cnf(sys.stdin)

# Create graph object to represent output problem
out_graph = graph()

# Find highest value used for variable in 3SAT problem
highest_var_val = 0
for this_variable in in_problem.variables:
    if (this_variable > highest_var_val):
        highest_var_val = this_variable

# Increment found highest to use for fresh (new) literals
fresh_var_val = highest_var_val + 1

# Assign False to first fresh value; Ground to second fresh literal
false_literal = fresh_var_val
fresh_var_val += 1

ground_literal = fresh_var_val
fresh_var_val += 1

# Add False and Ground to output graph
out_graph.nodes.add(false_literal)
out_graph.nodes.add(ground_literal)
out_graph.num_nodes += 2

out_graph.edges.add((false_literal, ground_literal))  # Connected
out_graph.num_edges += 1

# Add clause-gadget to graph for each clause
for this_clause in in_problem.clauses:
    # Check input is 3SAT
    if (len(this_clause) > 3):
        print("ERROR: Input is not 3SAT problem")
        sys.exit(0)

    # Single-literal clause => New node connected to False and Ground
    if (len(this_clause) == 1):
        # Add literal node
        out_graph.nodes.add(this_clause[0])
        out_graph.num_nodes += 1

        # Connect to False and Ground nodes
        out_graph.edges.add((false_literal, this_clause[0]))
        out_graph.edges.add((ground_literal, this_clause[0]))
        out_graph.num_edges += 2

        continue

    # Two-literal clause => OR-gadget
    if(len(this_clause) == 2):
        # Add literal nodes
        out_graph.nodes.add(this_clause[0])
        out_graph.nodes.add(this_clause[1])
        out_graph.num_nodes += 2

        # Add adjacent-to-literal nodes (ATL nodes)
        atl_node_1 = fresh_var_val
        fresh_var_val += 1
        atl_node_2 = fresh_var_val
        fresh_var_val += 1

        out_graph.nodes.add(atl_node_1)
        out_graph.nodes.add(atl_node_2)
        out_graph.num_nodes += 2

        # Connect ATL nodes to oneanother & literals
        out_graph.edges.add((atl_node_1, atl_node_2))
        out_graph.edges.add((atl_node_1, this_clause[0]))
        out_graph.edges.add((atl_node_2, this_clause[1]))
        out_graph.num_edges += 3

        # Add output node & connect to Ground, False and ATL nodes
        output_node = fresh_var_val
        fresh_var_val += 1

        out_graph.nodes.add(output_node)
        out_graph.num_nodes += 1

        out_graph.edges.add((output_node, atl_node_1))
        out_graph.edges.add((output_node, atl_node_2))
        out_graph.edges.add((output_node, ground_literal))
        out_graph.edges.add((output_node, false_literal))
        out_graph.num_edges += 4

        continue

    # (Else) Three-literal clause => 2 * OR-gadgets
    # Add literal nodes
    out_graph.nodes.add(this_clause[0])
    out_graph.nodes.add(this_clause[1])
    out_graph.nodes.add(this_clause[2])
    out_graph.num_nodes += 3

    # Add adjacent-to-literal nodes (ATL nodes)
    atl_node_1 = fresh_var_val
    fresh_var_val += 1
    atl_node_2 = fresh_var_val
    fresh_var_val += 1
    atl_node_3 = fresh_var_val
    fresh_var_val += 1

    out_graph.nodes.add(atl_node_1)
    out_graph.nodes.add(atl_node_2)
    out_graph.nodes.add(atl_node_3)
    out_graph.num_nodes += 3

    # Connect ATL nodes to respective literals
    out_graph.edges.add((this_clause[0], atl_node_1))
    out_graph.edges.add((this_clause[1], atl_node_2))
    out_graph.edges.add((this_clause[2], atl_node_3))
    out_graph.num_edges += 3

    # Connect ATL nodes for first and second literals
    out_graph.edges.add((atl_node_1, atl_node_2))
    out_graph.num_edges += 1

    # Create & connect half-output node (HO node) for disjunction of first and second literals
    ho_node = fresh_var_val
    fresh_var_val += 1

    out_graph.nodes.add(ho_node)
    out_graph.num_nodes += 1

    out_graph.edges.add((ho_node, atl_node_1))
    out_graph.edges.add((ho_node, atl_node_2))
    out_graph.edges.add((ho_node, ground_literal))
    out_graph.num_edges += 3

    # Create adjacent-to-half-output node (ATHO)
    atho_node = fresh_var_val
    fresh_var_val += 1

    out_graph.nodes.add(atho_node)
    out_graph.num_nodes += 1

    # Connect ATHO node to HO node and ATL node for third literal
    out_graph.edges.add((atho_node, ho_node))
    out_graph.edges.add((atho_node, atl_node_3))
    out_graph.num_edges += 2

    # Create output node & connect
    output_node = fresh_var_val
    fresh_var_val += 1

    out_graph.nodes.add(output_node)
    out_graph.num_nodes += 1

    out_graph.edges.add((output_node, atho_node))
    out_graph.edges.add((output_node, atl_node_3))
    out_graph.edges.add((output_node, ground_literal))
    out_graph.edges.add((output_node, false_literal))
    out_graph.num_edges += 4

# Connect negations of each node to each other and ground
for this_node_1 in out_graph.nodes:
    for this_node_2 in out_graph.nodes:
        if (this_node_1 == -1 * this_node_2):
            out_graph.edges.add((this_node_1, this_node_2)) # Each other
            out_graph.edges.add((this_node_1, ground_literal)) # Ground
            out_graph.edges.add((this_node_2, ground_literal)) # Ground

# Can't ensure added edges aren't duplicates
out_graph.num_edges = len(out_graph.edges)
out_graph.num_nodes = len(out_graph.nodes)

# Find back-to-front edges to remove from edges set
edges_to_remove = set()
for this_edge_1 in out_graph.edges:
    for this_edge_2 in out_graph.edges:
        # Check for back-to-front match
        if(this_edge_1[0] == this_edge_2[1] and this_edge_1[1] == this_edge_2[0]):
            # Check other isn't already to be removed
            if (not (this_edge_2[1], this_edge_2[0]) in edges_to_remove):
                edges_to_remove.add(this_edge_2)

for this_edge_to_remove in edges_to_remove:
    out_graph.edges.remove(this_edge_to_remove)

out_graph.num_edges -= len(edges_to_remove)

# Write output to file
marshall_graph(out_graph)
