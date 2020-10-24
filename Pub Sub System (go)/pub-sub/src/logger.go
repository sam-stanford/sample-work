package main

import (
	"os"
	"time"
)

// Log file & file name global variable
var logFile *os.File

// LogString writes the provided string to the log file
func LogString(logString string) error {
	_, err := logFile.WriteString(logString)
	return err
}

// LogTime writes the current time to the log file
func LogTime() error {
	_, err := logFile.WriteString("\n\n")
	_, err = logFile.WriteString(time.Now().Format("2006-01-02 15:04:05"))
	_, err = logFile.WriteString("\n")
	return err
}

// OpenLog opens the log file
func OpenLog() error {
	var err error
	logFile, err = os.OpenFile("../assets/log.txt", os.O_APPEND|os.O_WRONLY, 0600)
	return err
}

// CloseLog closes the log file
func CloseLog() error {
	err := logFile.Close()
	return err
}
