package main

import (
	"math"
)

// GSharePredictor represents a branch prediction which always predicts taken
type GSharePredictor struct {

	// Shared history of past branches (taken / not taken)
	sharedHistory []bool

	// Branch predictor table of 2 bit predictors
	predictorTable [][]bool

	// Last prediction made
	lastPrediction bool

	// Last predicted predictorTable index
	lastPredictIndex int
}

// Setup the predictor
func (predictor *GSharePredictor) Setup(historyLength int, _ string) {

	// Instantiate historyLength bit shared history
	predictor.sharedHistory = make([]bool, historyLength)

	// Instantiate predictor table to have an index of historyLength bits (same length as sharedHistory)
	predictor.predictorTable = make([][]bool, int(math.Pow(2, float64(len(predictor.sharedHistory)))))

	// Initial state for all predictors = 01 = {false, true} (soft predict not taken)
	for i := range predictor.predictorTable {
		predictor.predictorTable[i] = make([]bool, 2)
		predictor.predictorTable[i][0] = false
		predictor.predictorTable[i][1] = true
	}

	// Initial history = 00000000
	for i := range predictor.sharedHistory {
		predictor.sharedHistory[i] = false
	}

	return
}

// Predict whether a branch should be taken
func (predictor *GSharePredictor) Predict(addr string) bool {

	// Convert shared history into an int
	historyInt := BoolArrToInt(predictor.sharedHistory)

	// Mask branch address, then XOR with shared history
	maskedAddr := ApplyMask(addr, len(predictor.predictorTable)-1)
	predictorTableIndex := maskedAddr ^ int(historyInt)

	// Save for access in update
	predictor.lastPredictIndex = predictorTableIndex

	// Access table & predict
	predictorTableValue := predictor.predictorTable[predictorTableIndex]

	if predictorTableValue[0] {
		// Predict taken for 11 and 10
		predictor.lastPrediction = true
		return true
	}
	// Predict not taken for 01 and 00
	predictor.lastPrediction = false

	return false
}

// Update the state of this predictor
func (predictor *GSharePredictor) Update(addr string, taken bool) {
	// Update prediction for this index
	if taken {
		// Branch taken
		if predictor.lastPrediction == taken {
			// 1_ => 11
			predictor.predictorTable[predictor.lastPredictIndex][0] = true
			predictor.predictorTable[predictor.lastPredictIndex][1] = true
		} else {
			// 0_
			if predictor.predictorTable[predictor.lastPredictIndex][1] {
				// 01 => 11
				predictor.predictorTable[predictor.lastPredictIndex][0] = true
				predictor.predictorTable[predictor.lastPredictIndex][1] = true
			} else {
				// 00 => 01
				predictor.predictorTable[predictor.lastPredictIndex][0] = false
				predictor.predictorTable[predictor.lastPredictIndex][1] = true
			}
		}
	} else {
		// Branch not taken
		if predictor.lastPrediction == taken {
			// 0_ => 00
			predictor.predictorTable[predictor.lastPredictIndex][0] = false
			predictor.predictorTable[predictor.lastPredictIndex][1] = false
		} else {
			// 1_
			if predictor.predictorTable[predictor.lastPredictIndex][1] {
				// 11 => 10
				predictor.predictorTable[predictor.lastPredictIndex][0] = true
				predictor.predictorTable[predictor.lastPredictIndex][1] = false
			} else {
				// 10 => 00
				predictor.predictorTable[predictor.lastPredictIndex][0] = false
				predictor.predictorTable[predictor.lastPredictIndex][1] = false
			}
		}
	}

	// // Update history
	// for i := len(predictor.sharedHistory) - 1; i >= 0; i-- {
	// 	// Shift all onwards one index in array
	// 	if i != 0 {
	// 		predictor.sharedHistory[i] = predictor.sharedHistory[i-1]
	// 	}
	// }
	// // Add new history to start
	// predictor.sharedHistory[0] = taken

	// Update history
	for i := 0; i < len(predictor.sharedHistory); i++ {
		// Shift all towards 0th index in array
		if i != 0 {
			predictor.sharedHistory[i-1] = predictor.sharedHistory[i]
		}
	}
	// Add new history to end of array
	predictor.sharedHistory[len(predictor.sharedHistory)-1] = taken

	return
}
