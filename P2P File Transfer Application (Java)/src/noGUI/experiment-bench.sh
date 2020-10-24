# File to send
FILE="../../test_files/cawiki-20140129-stub-articles.xml"

# Get dir to store files
# echo "Directory to store files?"
# read DIR
DIR="/cs/scratch/sjs31/"

# Change timining format
TIMEFORMAT=%R

# Get number of nodes to send to
echo "Number of nodes?"
read NODES

# # Get file to read into
# echo "Data file?"
# read DATAFILE
DATAFILE="data_bench.csv"

# Get scp password
echo "SCP Password?"
read -s PASS

# Send files. Wrapped in function for timing purposes
function sendFiles() {
    for i in $(seq 1 ${NODES}); do
        # scp to each destination
        sshpass -p ${PASS} scp ${FILE} ${DEST[i]}:${DIR}
    done
}

# Get IPs to send to
    for i in $(seq 1 ${NODES}); do
        # Read IP into array
        echo "Destination ${i}?"
        read DEST[i]
    done

# Loop
for i in {1..100}; do
    echo "Iteration ${i}"
    OUTPUT=$( { time sendFiles; } 2>&1 )
    echo ${OUTPUT}
    while [ "${OUTPUT}" == "" ]; do
        # Do nothing until output received
        echo -n ${OUTPUT}
    done
    echo "${NODES}, ${OUTPUT}" >>${DATAFILE}
    OUTPUT=""
done
echo "done"