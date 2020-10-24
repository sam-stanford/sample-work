# File to send
FILE="../../test_files/cawiki-20140129-stub-articles.xml"

# Get number of nodes
echo "How many nodes?"
read NODES

# Get data file
# echo "Data filename?"
# read DATAFILE
DATAFILE="data1.csv"

# Variables
OUTPUT=""
echo $OUTPUT

# Loop
for i in {1..100}; do
    echo "Iteration ${i}"
    OUTPUT=$(java p2p send ${FILE} ${NODES})
    echo ${OUTPUT}
    while [ "${OUTPUT}" == "" ]; do
        # Do nothing until output received
        echo -n ${OUTPUT}
    done
    echo "${NODES},${OUTPUT}" >>${DATAFILE}
    OUTPUT=""
done
echo "done"
