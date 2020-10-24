package main

// TwoBitPredictor represents a branch predictor which uses two bits as state to form predictions
type TwoBitPredictor struct {
	// Branch history table
	historyTable [][]bool

	// Table size for branch history table
	tableSize int

	// Last prediction made
	lastPrediction bool

	// Last predicted predictorTable index
	lastPredictIndex int
}

// Setup the predictor
func (predictor *TwoBitPredictor) Setup(tableSize int, _ string) {
	// Save table size
	predictor.tableSize = tableSize

	// Instantiate history table to be tableSize
	predictor.historyTable = make([][]bool, tableSize)

	// Initial state for all histories = 01 = {false, true} (soft predict not taken)
	for i := range predictor.historyTable {
		predictor.historyTable[i] = make([]bool, 2)
		predictor.historyTable[i][0] = false
		predictor.historyTable[i][1] = true
	}
}

// Predict whether a branch should be taken
func (predictor *TwoBitPredictor) Predict(addr string) bool {

	// Find index for history table using mask on address
	historyIndex := ApplyMask(addr, predictor.tableSize-1)

	// Save index for update
	predictor.lastPredictIndex = historyIndex

	// Access table using found index
	history := predictor.historyTable[historyIndex]

	if history[0] {
		// Predict taken for 11 and 10
		predictor.lastPrediction = true
		return true
	}
	// Predict not taken for 01 and 00
	predictor.lastPrediction = false
	return false
}

// Update the state of this predictor
func (predictor *TwoBitPredictor) Update(addr string, taken bool) {
	// Update used prediction
	if taken {
		// Branch taken
		if predictor.lastPrediction == taken {
			// 1_ => 11
			predictor.historyTable[predictor.lastPredictIndex][0] = true
			predictor.historyTable[predictor.lastPredictIndex][1] = true
		} else {
			// 0_
			if predictor.historyTable[predictor.lastPredictIndex][1] {
				// 01 => 11
				predictor.historyTable[predictor.lastPredictIndex][0] = true
				predictor.historyTable[predictor.lastPredictIndex][1] = true
			} else {
				// 00 => 01
				predictor.historyTable[predictor.lastPredictIndex][0] = false
				predictor.historyTable[predictor.lastPredictIndex][1] = true
			}
		}
	} else {
		// Branch not taken
		if predictor.lastPrediction == taken {
			// 0_ => 00
			predictor.historyTable[predictor.lastPredictIndex][0] = false
			predictor.historyTable[predictor.lastPredictIndex][1] = false
		} else {
			// 1_
			if predictor.historyTable[predictor.lastPredictIndex][1] {
				// 11 => 10
				predictor.historyTable[predictor.lastPredictIndex][0] = true
				predictor.historyTable[predictor.lastPredictIndex][1] = false
			} else {
				// 10 => 00
				predictor.historyTable[predictor.lastPredictIndex][0] = false
				predictor.historyTable[predictor.lastPredictIndex][1] = false
			}
		}
	}
}
