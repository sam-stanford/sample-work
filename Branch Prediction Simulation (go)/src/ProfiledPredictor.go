package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"
)

// ProfiledPredictor represents a branch prediction scheme which profiles the program
// it is predicting before it is run. This profiled predictor uses simple always-taken
// and always-not-taken schemes for sections of the program which have higher rates of taken
// and not-taken branches respecitvely.
type ProfiledPredictor struct {

	// Number of segments used in the profiling
	numSegments int

	// Borders for which prediction of always or always-not changes
	predictionBorders []int

	// predictions for each part of the program (true = always-taken, false = always-not-taken)
	predictions []bool

	// Number of lines in the tracefile
	numLines int

	// Current line in the tracefile
	currentLine int
}

// Setup the predictor
func (predictor *ProfiledPredictor) Setup(numSegments int, filepath string) {
	// Save numSegments & create slices in predictor of required size
	predictor.numSegments = numSegments
	predictor.predictionBorders = make([]int, numSegments)
	predictor.predictions = make([]bool, numSegments)

	// Open file
	file, err := os.Open(filepath)
	if err != nil {
		log.Fatal(err)
	}

	// Count number of lines using scanner & save
	lineCount := 0
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		lineCount++
	}
	predictor.numLines = lineCount

	// Assign borders
	segmentSize := lineCount / numSegments
	for i := 0; i < numSegments; i++ {
		predictor.predictionBorders[i] = segmentSize * (i + 1)
	}

	// Reset scanner to start of file
	file.Close()
	file, err = os.Open(filepath)
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()
	scanner = bufio.NewScanner(file)

	// Scan each segment to find number of branches taken & not taken
	thisSegmentTaken := 0
	thisSegmentNotTaken := 0
	// Loop segments
	for i := 0; i < numSegments; i++ {
		// Loop lines in segment
		for j := 0; j < segmentSize; j++ {
			// Scan & parse taken
			scanner.Scan()
			thisLine := scanner.Text()
			addrAndTaken := strings.Split(thisLine, " ")
			taken, err := strconv.Atoi(addrAndTaken[1])
			if err != nil {
				log.Fatal(err)
			}

			// Update counter
			if taken == 1 {
				thisSegmentTaken++
			} else {
				thisSegmentNotTaken++
			}
		}

		// Calculate prediction & save to prediction slice
		predictor.predictions[i] = false
		if thisSegmentTaken > thisSegmentNotTaken {
			predictor.predictions[i] = true
		}
	}

	fmt.Println(predictor.predictions)

	// Initialise current line counter
	predictor.currentLine = 0

	return
}

// Predict whether a branch should be taken
func (predictor *ProfiledPredictor) Predict(_ string) bool {
	// Find the lowest border the current line is before & return that prediction
	for i := range predictor.predictionBorders {
		if predictor.currentLine < predictor.predictionBorders[i] {
			return predictor.predictions[i]
		}
	}
	// Fail safe for rounded calculations for segment size
	return predictor.predictions[len(predictor.predictions)-1]
}

// Update the state of this predictor
func (predictor *ProfiledPredictor) Update(_ string, _ bool) {
	// Update line counter
	predictor.currentLine++
	return
}

/*
* Need to:
		- Save instruction pointers of borders in memory so they can easily be checked
			- Potentially have a dedicate comparator for these pointers & the current pointer to avoid control (??) hazards
		- Pre-run the program

	Could be used for:
		- Embedded systems as it's not overly complicated
		- Programs which have to be run with the same parameters, e.g. bootstrapping or startup programs
*/
