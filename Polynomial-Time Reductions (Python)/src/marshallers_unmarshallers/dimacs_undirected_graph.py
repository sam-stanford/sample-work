import sys
import os

# This file is used to marshall/unmarshall DIMACS undirected graph problem files


# Class to represent a graph problem
class graph:
    def __init__(self):
        self.nodes = set()
        self.num_nodes = 0
        self.edges = set()  # Tuple set
        self.num_edges = 0


# Function to unmarshall program input into graph problem object
def unmarshall_graph(infile):

    # Create graph object to return
    returnObj = graph()

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

            # Check problem is an undirected graph
            if (problem_line[1] != "edge"):
                print("\tERROR: Problem file incorrect - Problem of incorrect type")
                sys.exit(0)

            # Read variable & clause counts
            try:
                returnObj.num_nodes = int(problem_line[2])
                returnObj.num_edges = int(problem_line[3])
            except ValueError:
                print(
                    "ERROR: Problem file incorrect - Could not read integers from problem line")
                sys.exit(0)
            line = infile.readline()
            continue

        # Edge line from here
        if(returnObj.num_edges == -1 or returnObj.num_nodes == -1):
            print("\tERROR: Problem file incorrect - Edge defined before problem line")
            sys.ext(0)

        edge_nodes = line.strip().split()

        # First in line must be letter e
        if (edge_nodes[0] != "e"):
            print("\tERROR: Problem file incorrect - Edge line does not start with e")
            sys.exit(0)

        # Must be three in line
        if (len(edge_nodes) != 3):
            print("\tERROR: Problem file incorrect - Edge line has more than two nodes")
            sys.exit(0)

        # Parse nodes to integers
        node1 = None
        node2 = None
        try:
            node1 = int(edge_nodes[1])
            node2 = int(edge_nodes[2])
        except ValueError:
            print("\tERROR: Problem file incorrect - Edge line uses non-integer nodes")
            sys.exit(0)

        if (node1 == None or node2 == None):
            print("\tERROR: Problem file incorrect - Edge line uses non-integer nodes")
            sys.exit(0)

        # Check edge tuple/reverse edge tuple aren't in edge set
        if((node1, node2) in returnObj.edges or (node2, node1) in returnObj.edges):
            print("\tERROR: Problem file incorrect - Duplicate edge specified")
            sys.exit(0)

        # Add nodes to node set
        returnObj.nodes.add(node1)
        returnObj.nodes.add(node2)

        # Add edge to edge set
        returnObj.edges.add((node1, node2))

        # Iterate to next line
        line = infile.readline()

    # Check consistency
    if (len(returnObj.nodes) != returnObj.num_nodes):
        print("\tERROR: Problem file incorrect - More nodes than stated")
        sys.exit(0)

    if(len(returnObj.edges) != returnObj.num_edges):
        print("\tERROR: Problem file incorrect - More edges than stated")
        sys.exit(0)

    return returnObj


# Function to marshall graph problem object to stdout
def marshall_graph(graph_object):

    # Check is CNF object
    if (not isinstance(graph_object, graph)):
        print("\tERROR: Provided argument is not a graph object")
        sys.exit(0)

    # Check object is complete
    if(not(graph_object.num_edges > 0 and graph_object.num_nodes > 0
        and len(graph_object.edges) == graph_object.num_edges
        and len(graph_object.nodes) == graph_object.num_nodes)):
            print("\tERROR: Provided graph object is incomplete")
            sys.exit(0)


    # Print conventional comment line to file
    print("c This is a graph problem created by a graph object marshaller in Python")

    # Print problem line to file
    print("p edge " + str(graph_object.num_nodes) + " " + str(graph_object.num_edges) )

    # Print each edge to the file
    for this_edge in graph_object.edges:
        print("e " + str(this_edge[0]) + " " + str(this_edge[1]))