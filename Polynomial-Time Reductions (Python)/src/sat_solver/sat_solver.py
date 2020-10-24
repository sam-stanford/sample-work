from pysat.formula import CNF
from pysat.solvers import Lingeling
import sys


# Check file is supplied as cli argument
if (len(sys.argv) != 2):
    print("Usage: sat_solver.py <cnf_file_to_solve>")
    sys.exit(0)

# Import CNF object from given file
formula = CNF(from_file=sys.argv[1])

# Solve CNF object and print result
with Lingeling(bootstrap_with=formula.clauses, with_proof=True) as l:
    if l.solve() == False:
        print("UNSATISFIABLE")
        print(l.get_proof())
    else:
        print("SATISFIABLE")
