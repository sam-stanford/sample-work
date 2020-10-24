package main

import (
	"bufio"
	"os"
	"strconv"
	"strings"
)

// ConfigStruct is the data structure for all options to be stored in
type ConfigStruct struct {
	// General settings
	pushOrPull string
	port       int

	// Message settings
	maxMessages         int
	maxMessagesPerTopic int
	messageLifeTime     int64
	ackWindow           int64
	pushDelay           int64
	messageOverflowType string
	maxMessageSize      int
	maxAttributeCount   int

	// Subscriber settings
	maxSubs         int
	maxSubsPerTopic int
	maxTopicsPerSub int

	// Topic/channel settings
	maxTopics int
}

// Config is the exported variable containing all. Call ReadConfigFile() before using
var Config ConfigStruct

// ReadConfigFile reads options in from file at filepath
func ReadConfigFile(filepath string) error {

	// Set defaults
	Config = ConfigStruct{
		pushOrPull:          "Pull",
		port:                3301,
		maxMessages:         -1,
		maxMessagesPerTopic: -1,
		messageLifeTime:     10000,
		ackWindow:           -1,
		pushDelay:           1000,
		messageOverflowType: "Reject",
		maxMessageSize:      -1,
		maxAttributeCount:   -1,
		maxSubs:             -1,
		maxSubsPerTopic:     -1,
		maxTopics:           -1,
		maxTopicsPerSub:     -1,
	}

	// Open file
	fileReader, err := os.Open(filepath)
	if err != nil {
		return err
	}

	// Open file scanner
	scanner := bufio.NewScanner(fileReader)

	// Read all lines
	isLine := scanner.Scan() // Bool to check if line exists
	for isLine {
		// Read & parse line
		thisLine := string(scanner.Bytes())
		err = parseConfigLine(thisLine)
		if err != nil {
			return err
		}

		// Advance scanner
		isLine = scanner.Scan()
	}

	// Success
	return nil
}

// Function to parse a line into Config struct fields
func parseConfigLine(line string) error {

	// Check if empty line or comment
	if len(line) == 0 || line[0] == '#' {
		return nil
	}

	// Split line at "=" to get variable name and its value
	varAndVal := strings.Split(line, "=")
	variable := varAndVal[0]
	value := varAndVal[1]

	// Assign value depending on variable
	switch variable {
	case "PushOrPull":
		Config.pushOrPull = value
		break

	case "Port":
		varAsInt, err := strconv.Atoi(value)
		if err != nil {
			return err
		}
		Config.port = varAsInt
		break

	case "MaxMessages":
		varAsInt, err := strconv.Atoi(value)
		if err != nil {
			return err
		}
		Config.maxMessages = varAsInt
		break

	case "MaxMessagesPerTopic":
		varAsInt, err := strconv.Atoi(value)
		if err != nil {
			return err
		}
		Config.maxMessagesPerTopic = varAsInt
		break

	case "MessageLifetime":
		varAsInt, err := strconv.ParseInt(value, 10, 64)
		if err != nil {
			return err
		}
		Config.messageLifeTime = varAsInt
		break

	case "AckWindow":
		varAsInt, err := strconv.ParseInt(value, 10, 64)
		if err != nil {
			return err
		}
		Config.ackWindow = varAsInt
		break

	case "PushDelay":
		varAsInt, err := strconv.ParseInt(value, 10, 64)
		if err != nil {
			return err
		}
		Config.pushDelay = varAsInt
		break

	case "MessageOverflowType":
		Config.messageOverflowType = value
		break

	case "MaxMessageSize":
		varAsInt, err := strconv.Atoi(value)
		if err != nil {
			return err
		}
		Config.maxMessageSize = varAsInt
		break

	case "MaxAttributeCount":
		varAsInt, err := strconv.Atoi(value)
		if err != nil {
			return err
		}
		Config.maxAttributeCount = varAsInt
		break

	case "MaxSubs":
		varAsInt, err := strconv.Atoi(value)
		if err != nil {
			return err
		}
		Config.maxSubs = varAsInt
		break

	case "MaxSubsPerTopic":
		varAsInt, err := strconv.Atoi(value)
		if err != nil {
			return err
		}
		Config.maxSubsPerTopic = varAsInt
		break

	case "MaxTopicsPerSub":
		varAsInt, err := strconv.Atoi(value)
		if err != nil {
			return err
		}
		Config.maxTopicsPerSub = varAsInt
		break

	case "MaxTopics":
		varAsInt, err := strconv.Atoi(value)
		if err != nil {
			return err
		}
		Config.maxTopics = varAsInt
		break

	}

	// Success
	return nil
}
