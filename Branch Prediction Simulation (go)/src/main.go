package main

import (
	"bufio"
	"errors"
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"
)

// Predictor represents a precitor's interface, such as gshare
type Predictor interface {
	/*
	* Setup the predictor. Takes an int to decide two-bit history table size.
	 */
	Setup(int, string)

	/* Take a branch as a string and return the prediction as a boolean
	* - Predict taken => True
	* - Predict not taken => False
	 */
	Predict(string) bool

	/*
	* Update the state of a predictor using the outcome of the prediction for the branch
	 */
	Update(string, bool)
}

// ApplyMask is an auxillary function for predictors to apply a mask to an address
func ApplyMask(addr string, mask int) int {
	// Cast address to int for masking
	intAddr, err := strconv.Atoi(addr)
	if err != nil {
		log.Fatal(err)
	}

	// Apply mask & return
	return intAddr & mask
}

// BoolArrToInt is an auxillary function for predictors to convert a binary string
// represented as Bools into an int
func BoolArrToInt(boolArr []bool) int {
	// Convert bool array to binary string
	binString := ""
	for _, thisBool := range boolArr {
		if thisBool {
			binString += "1"
		} else {
			binString += "0"
		}
	}

	// Binary string => Decimal int
	asInt, err := strconv.ParseInt(binString, 2, 0)
	if err != nil {
		log.Fatal(err)
	}
	return int(asInt)
}

// Print usage to stdout
func printUsage() {
	fmt.Println("\nUsage: go run main.go <PREDICTOR> <BRANCH_TRACE_DIRPATH> <BRANCH_TRACE_FILENAME_1> ... <BRANCH_TRACE_FILENAME_N>")
	fmt.Println("\t<PREDICTOR>: 2-bit, always-taken, gshare, profiled")
}

func main() {

	// Table sizes tobe used for gshare and 2-bit predictors
	tableSizes := []int{512, 1024, 2048, 4096}

	// Verify command line arguments
	if len(os.Args) < 4 {
		// Not enough arguments
		printUsage()
		os.Exit(0)
	}

	// Parse command line arguments
	predictorString := os.Args[1]
	traceDirpath := os.Args[2]
	traceFilenames := os.Args[3:]

	// Select predictor from input
	var predictor Predictor
	switch predictorString {
	case "always-taken":
		// Only one setting, so remove table sizes
		tableSizes = []int{0}
		predictor = &AlwaysTakenPredictor{}
		break
	case "2-bit":
		predictor = &TwoBitPredictor{}
		break
	case "gshare":
		// Set table sizes history lengths
		tableSizes = []int{8, 9, 10, 11, 12}
		predictor = &GSharePredictor{}
		break
	case "profiled":
		predictor = &ProfiledPredictor{}
		tableSizes = []int{1, 2, 4, 8, 64, 256, 2048}
		// Set table sizes to numbers of segments
		break

	default:
		printUsage()
		os.Exit(0)
	}

	// Print CSV headers
	fmt.Println("sep=,")
	fmt.Println("Predictor, Tracefile, Correct Predictions, Incorrect Predictions, Misprediction Rate")

	// Loop table sizes
	for _, tableSize := range tableSizes {

		// Loop files
		for _, traceFilename := range traceFilenames {

			// Open file
			file, err := os.Open(traceDirpath + traceFilename)
			if err != nil {
				log.Fatal(err)
			}
			defer file.Close()

			// Setup predictor
			predictor.Setup(tableSize, traceDirpath+traceFilename)

			// Correct / incorrect guesses counters
			correct := 0
			incorrect := 0

			// Scan file line by line
			scanner := bufio.NewScanner(file)

			for scanner.Scan() {
				line := scanner.Text()

				// Split line into address and taken & verify
				addrAndTaken := strings.Split(line, " ")
				if len(addrAndTaken) != 2 {
					log.Fatal(err)
				}

				// Convert taken 1/0 into a bool
				var taken bool
				switch addrAndTaken[1] {
				case "1":
					taken = true
					break
				case "0":
					taken = false
					break
				default:
					log.Fatal(errors.New("Taken is neither 1 nor 0"))
					break
				}

				// Use predictor to predict
				prediction := predictor.Predict(addrAndTaken[0])

				// Update predictor state
				predictor.Update(addrAndTaken[0], taken)

				// Compare prediction to result & increment counters
				if prediction == taken {
					correct++
				} else {
					incorrect++
				}
			}

			// Calculate misprediction rate & print results as CSV
			predictionRate := float64(correct) / (float64(correct) + float64(incorrect))
			mispredictionRate := 1.0 - predictionRate
			if tableSize != 0 {
				fmt.Printf("%s %d, %s, %d, %d, %f\n", predictorString, tableSize, traceFilename, correct, incorrect, mispredictionRate)
			} else {
				fmt.Printf("%s, %s, %d, %d, %f\n", predictorString, traceFilename, correct, incorrect, mispredictionRate)

			}

		}

	}

}
