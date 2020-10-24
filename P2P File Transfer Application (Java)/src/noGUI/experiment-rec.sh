# Get dir to store files
# echo "Directory to store files?"
# read DIR
DIR="/cs/scratch/sjs31/"

# Init scratch
pushd .;
cd ${DIR};
touch hello.txt;
popd;


# Get host IP
# echo "Hostname?"
# read HOST
HOST="138.251.30.74"

for i in {1..100}
do
    FILEPATH="${DIR}${i}.mp4"
    java p2p rec ${HOST} ${FILEPATH};
    sleep 0.2; # Wait for server to restart
done
