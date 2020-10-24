package main

import (
	"testing"
)

// TestReadConfigFile1 checks a standard config file can be read (test-config-1.conf)
func TestReadConfigFile1(t *testing.T) {

	// Read file
	err := ReadConfigFile("../testing_assets/test-config-1.conf")

	// Check error
	if err != nil {
		t.Errorf("Error occured when reading config file 1")
	}

	// Check values
	if Config.pushOrPull != "Push" {
		t.Errorf("Value of pushOrPull for config file 1 was incorrect, got: %s, wanted: Push", Config.pushOrPull)
	}
	if Config.port != 3301 {
		t.Errorf("Value of port for config file 1 was incorrect, got: %d, wanted: 3301", Config.port)
	}
	if Config.maxMessages != 100 {
		t.Errorf("Value of maxMessages for config file 1 was incorrect, got: %d, wanted: 100", Config.maxMessages)
	}
	if Config.maxMessagesPerTopic != -1 {
		t.Errorf("Value of maxMessagesPerTopic for config file 1 was incorrect, got: %d, wanted: -1", Config.maxMessagesPerTopic)
	}
	if Config.messageLifeTime != 10000 {
		t.Errorf("Value of messageLifeTime for config file 1 was incorrect, got: %d, wanted: 10000", Config.messageLifeTime)
	}
	if Config.ackWindow != 100 {
		t.Errorf("Value of ackWindow for config file 1 was incorrect, got: %d, wanted: 100", Config.ackWindow)
	}
	if Config.pushDelay != 1000 {
		t.Errorf("Value of pushDelay for config file 1 was incorrect, got: %d, wanted: 1000", Config.pushDelay)
	}
	if Config.messageOverflowType != "Reject" {
		t.Errorf("Value of messageOverflowType for config file 1 was incorrect, got: %s, wanted: Reject", Config.messageOverflowType)
	}
	if Config.maxMessageSize != -1 {
		t.Errorf("Value of maxMessageSize for config file 1 was incorrect, got: %d, wanted: -1", Config.maxMessageSize)
	}
	if Config.maxAttributeCount != 3 {
		t.Errorf("Value of maxAttributeCount for config file 1 was incorrect, got: %d, wanted: 3", Config.maxAttributeCount)
	}
	if Config.maxSubs != -1 {
		t.Errorf("Value of maxSubs for config file 1 was incorrect, got: %d, wanted: -1", Config.maxSubs)
	}
	if Config.maxTopicsPerSub != 3 {
		t.Errorf("Value of maxTopicsPerSub for config file 1 was incorrect, got: %d, wanted: 3", Config.maxTopicsPerSub)
	}
	if Config.maxTopics != 10 {
		t.Errorf("Value of maxTopics for config file 1 was incorrect, got: %d, wanted: 10", Config.maxTopics)
	}
	if Config.maxSubsPerTopic != -1 {
		t.Errorf("Value of maxSubsPerTopic for config file 1 was incorrect, got: %d, wanted: -1", Config.maxSubsPerTopic)
	}
}

// TestReadConfigFile2 checks a half-com,plete config file can be read, with defaults being set for empty settings (test-config-2.conf)
func TestReadConfigFile2(t *testing.T) {

	// Read file
	err := ReadConfigFile("../testing_assets/test-config-2.conf")

	// Check error
	if err != nil {
		t.Errorf("Error occured when reading config file 2")
	}

	// Check read values

	if Config.port != 3301 {
		t.Errorf("Value of port for config file 2 was incorrect, got: %d, wanted: 3301", Config.port)
	}
	if Config.maxMessagesPerTopic != -1 {
		t.Errorf("Value of maxMessagesPerTopic for config file 2 was incorrect, got: %d, wanted: -1", Config.maxMessagesPerTopic)
	}
	if Config.messageLifeTime != 10000 {
		t.Errorf("Value of messageLifeTime for config file 2 was incorrect, got: %d, wanted: 10000", Config.messageLifeTime)
	}
	if Config.ackWindow != 100 {
		t.Errorf("Value of ackWindow for config file 2 was incorrect, got: %d, wanted: 100", Config.ackWindow)
	}
	if Config.pushDelay != 1000 {
		t.Errorf("Value of pushDelay for config file 2 was incorrect, got: %d, wanted: 1000", Config.pushDelay)
	}
	if Config.messageOverflowType != "Reject" {
		t.Errorf("Value of messageOverflowType for config file 2 was incorrect, got: %s, wanted: Reject", Config.messageOverflowType)
	}

	if Config.maxMessageSize != -1 {
		t.Errorf("Value of maxMessageSize for config file 2 was incorrect, got: %d, wanted: -1", Config.maxMessageSize)
	}
	if Config.maxAttributeCount != 3 {
		t.Errorf("Value of maxAttributeCount for config file 2 was incorrect, got: %d, wanted: 3", Config.maxAttributeCount)
	}
	if Config.maxSubs != -1 {
		t.Errorf("Value of maxSubs for config file 2 was incorrect, got: %d, wanted: -1", Config.maxSubs)
	}
	if Config.maxTopicsPerSub != 3 {
		t.Errorf("Value of maxTopicsPerSub for config file 2 was incorrect, got: %d, wanted: 3", Config.maxTopicsPerSub)
	}
	if Config.maxTopics != 10 {
		t.Errorf("Value of maxTopics for config file 2 was incorrect, got: %d, wanted: 10", Config.maxTopics)
	}
	if Config.maxSubsPerTopic != -1 {
		t.Errorf("Value of maxSubsPerTopic for config file 2 was incorrect, got: %d, wanted: -1", Config.maxSubsPerTopic)
	}

	// Check default values
	if Config.pushOrPull != "Pull" {
		t.Errorf("Value of pushOrPull for config file 2 was set to default correctly, got: %s, wanted: Pull", Config.pushOrPull)
	}
	if Config.maxMessages != -1 {
		t.Errorf("Value of maxMessages for config file 2 was set to default correctly, got: %d, wanted: -1", Config.maxMessages)
	}
}

// TestReadEmptyConfigFile checks an empty config file can be read, with defaults being set (test-config-empty.config)
func TestReadEmptyConfigFile(t *testing.T) {

	// Read file
	err := ReadConfigFile("../testing_assets/test-config-empty.conf")

	// Check error
	if err != nil {
		t.Errorf("Error occured when reading an empty config file")
	}

	// Check values
	if Config.pushOrPull != "Pull" {
		t.Errorf("Value of pushOrPull for an empty config file was incorrect, got: %s, wanted: Pull", Config.pushOrPull)
	}
	if Config.port != 3301 {
		t.Errorf("Value of port for an empty config file was incorrect, got: %d, wanted: 3301", Config.port)
	}
	if Config.maxMessages != -1 {
		t.Errorf("Value of maxMessages for an empty config file was incorrect, got: %d, wanted: -1", Config.maxMessages)
	}
	if Config.maxMessagesPerTopic != -1 {
		t.Errorf("Value of maxMessagesPerTopic for an empty config file was incorrect, got: %d, wanted: -1", Config.maxMessagesPerTopic)
	}
	if Config.messageLifeTime != 10000 {
		t.Errorf("Value of messageLifeTime for an empty config file was incorrect, got: %d, wanted: 10000", Config.messageLifeTime)
	}
	if Config.ackWindow != -1 {
		t.Errorf("Value of ackWindow for an empty config file was incorrect, got: %d, wanted: -1", Config.ackWindow)
	}
	if Config.pushDelay != 1000 {
		t.Errorf("Value of pushDelay for an empty config file was incorrect, got: %d, wanted: 1000", Config.pushDelay)
	}
	if Config.messageOverflowType != "Reject" {
		t.Errorf("Value of messageOverflowType for an empty config file was incorrect, got: %s, wanted: Reject", Config.messageOverflowType)
	}
	if Config.maxMessageSize != -1 {
		t.Errorf("Value of maxMessageSize for an empty config file was incorrect, got: %d, wanted: -1", Config.maxMessageSize)
	}
	if Config.maxAttributeCount != -1 {
		t.Errorf("Value of maxAttributeCount for an empty config file was incorrect, got: %d, wanted: -1", Config.maxAttributeCount)
	}
	if Config.maxSubs != -1 {
		t.Errorf("Value of maxSubs for an empty config file was incorrect, got: %d, wanted: -1", Config.maxSubs)
	}
	if Config.maxTopicsPerSub != -1 {
		t.Errorf("Value of maxTopicsPerSub for an empty config file was incorrect, got: %d, wanted: -1", Config.maxTopicsPerSub)
	}
	if Config.maxTopics != -1 {
		t.Errorf("Value of maxTopics for an empty config file was incorrect, got: %d, wanted: -1", Config.maxTopics)
	}
	if Config.maxSubsPerTopic != -1 {
		t.Errorf("Value of maxSubsPerTopic for an empty config file was incorrect, got: %d, wanted: -1", Config.maxSubsPerTopic)
	}
}

// TestReadBrokenConfigFile checks an error is thrown for an incorrect config file (test-config-broken.config)
func TestReadBrokenConfigFile(t *testing.T) {
	// Catch panic
	defer func() {
		if err := recover(); err == nil {
			t.Errorf("Did not panic")
		}
	}()

	// Read file
	err := ReadConfigFile("../testing_assets/test-config-broken.conf")

	// Check error
	if err == nil {
		t.Errorf("Error occured when reading config file 1")
	}

}
