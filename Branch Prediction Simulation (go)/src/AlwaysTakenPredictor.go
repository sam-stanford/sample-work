package main

// AlwaysTakenPredictor represents a branch prediction which always predicts taken
type AlwaysTakenPredictor struct {
}

// Setup the predictor
func (predictor *AlwaysTakenPredictor) Setup(_ int, _ string) {
	// No setup required
	return
}

// Predict whether a branch should be taken
func (predictor *AlwaysTakenPredictor) Predict(_ string) bool {
	// Always predict taken
	return true
}

// Update the state of this predictor
func (predictor *AlwaysTakenPredictor) Update(_ string, _ bool) {
	// No state, so no update
	return
}
