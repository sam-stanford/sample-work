package main

import (
	"github.com/google/uuid"
	"os"
	"reflect"
	"testing"
	"time"
)

// TestDatabaseCache checks all exported functions in database-cache.go run correctly
func TestDatabaseCache(t *testing.T) {

	// =================================
	// ============= SETUP =============
	// =================================

	// Run startup function
	err := InitialiseDB("../testing_assets/test.db")

	// Check for error
	if err != nil {
		t.Errorf("IntialiseDB function returns an error on setup")
	}

	// =================================
	// ========== TEST VALUES ==========
	// =================================

	// Test message
	testMessage := Message{
		UUID:              uuid.New(),
		Topic:             "test",
		Attributes:        []string{"test1", "test2"},
		Data:              []byte("This is a test"),
		RecTimestamp:      time.Now().Unix(),
		LastSentTimestamp: 0,
		SubsToSendTo:      []string{"testEndpoint1"},
	}

	// Test subscriber 1
	testSubscriber1 := Subscriber{
		Endpoint:     "testEndpoint1",
		SubbedTopics: []string{"test"},
		MessageQueue: []uuid.UUID{uuid.New(), uuid.New()},
	}

	// Test subscriber 2
	testSubscriber2 := Subscriber{
		Endpoint:     "testEndpoint2",
		SubbedTopics: []string{"test"},
		MessageQueue: []uuid.UUID{uuid.New(), uuid.New()},
	}

	// Test channel
	testChannel := Channel{
		Topic:        "test",
		MessageQueue: []uuid.UUID{uuid.New(), uuid.New()},
		SubEndpoints: []string{"testEndpoint1"},
	}

	// =================================
	// =========== MESSAGES ============
	// =================================

	// Check storing and fetching a message
	t.Run("StoreAndFetchMessage", func(t *testing.T) {

		// Store
		err := StoreMessage(testMessage)

		// Check error
		if err != nil {
			t.Errorf("StoreMessage returns an error")
		}

		// Fetch
		fetchedMessage, err := FetchMessage(testMessage.UUID)

		// Check error
		if err != nil {
			t.Errorf("FetchMessage returns an error")
		}

		// Compare stored and fetched messages
		if !reflect.DeepEqual(testMessage, fetchedMessage) {
			t.Errorf("Stored and fetched messages are not the same")
		}
	})

	// Check deleting a message
	t.Run("DeleteMessage", func(t *testing.T) {

		// Delete
		err := DeleteMessage(testMessage.UUID)

		// Check error
		if err != nil {
			t.Errorf("DeleteMessage returns an error")
		}

		// Fetch deleted message
		fetchedMessage, _ := FetchMessage(testMessage.UUID)

		// Check deleted message is empty
		if fetchedMessage.Topic != "" {
			t.Errorf("DeleteMessage does not delete message")
		}
	})

	// =================================
	// ========= SUBSCRIBERS ===========
	// =================================

	// Check storing and fetching a subscriber
	t.Run("StoreAndFetchSubscriber", func(t *testing.T) {

		// Store
		err := StoreSubscriber(testSubscriber1)

		// Check error
		if err != nil {
			t.Errorf("StoreSubscriber returns an error")
		}

		// Fetch
		fetchedSubscriber, err := FetchSubscriber(testSubscriber1.Endpoint)

		// Check error
		if err != nil {
			t.Errorf("FetchSubscriber returns an error")
		}

		// Compare stored and fetched subscribers
		if !reflect.DeepEqual(testSubscriber1, fetchedSubscriber) {
			t.Errorf("Stored and fetched subscribers are not the same")
		}
	})

	// Check deleting a subscriber
	t.Run("DeleteSubscriber", func(t *testing.T) {

		// Delete
		err := DeleteSubscriber(testSubscriber1.Endpoint)

		// Check error
		if err != nil {
			t.Errorf("DeleteSubscriber returns an error")
		}

		// Fetch deleted message
		fetchedSub, err := FetchSubscriber(testSubscriber1.Endpoint)
		if err != nil {
			t.Errorf("FetchSubscriber returns an error")
		}

		// Check deleted message is empty
		if fetchedSub.Endpoint != "" {
			t.Errorf("DeleteSubscriber does not delete subscriber")
		}
	})

	// Check fetchAllSubscribers fetches all subscribers error free
	t.Run("FetchAllSubscribers", func(t *testing.T) {

		// Store
		err1 := StoreSubscriber(testSubscriber1)
		err2 := StoreSubscriber(testSubscriber2)

		// Store error
		if err1 != nil || err2 != nil {
			t.Errorf("StoreSubscriber returns an error")
		}

		// Fetch all subs
		allSubs, err := FetchAllSubscribers()

		// Fetch error
		if err != nil {
			t.Errorf("FetchAllSubscribers returns an error")
		}

		// Check returned subs contain stored subs
		testSub1Stored := false
		testSub2Stored := false
		for _, thisStoredSub := range allSubs {
			if reflect.DeepEqual(testSubscriber1, thisStoredSub) {
				testSub1Stored = true
			}
			if reflect.DeepEqual(testSubscriber2, thisStoredSub) {
				testSub2Stored = true
			}
		}

		if !testSub1Stored || !testSub2Stored {
			t.Errorf("FetchAllSubscribers did not fetch all stored subscribers")
		}

		// Delete stored subs
		err = DeleteSubscriber(testSubscriber1.Endpoint)
		if err != nil {
			t.Errorf("DeleteSubscriber returns an error")
		}
		err = DeleteSubscriber(testSubscriber2.Endpoint)
		if err != nil {
			t.Errorf("DeleteSubscriber returns an error")
		}

	})

	// =================================
	// =========== CHANNELS ============
	// =================================

	// Check storing and fetching of channel
	t.Run("StoreAndFetchChannel", func(t *testing.T) {

		// Store
		err := StoreChannel(testChannel)

		// Check error
		if err != nil {
			t.Errorf("StoreSubscriber returns an error")
		}

		// Fetch
		fetchedChannel, err := FetchChannel(testChannel.Topic)

		// Check error
		if err != nil {
			t.Errorf("FetchChannel returns an error")
		}

		// Compare stored and fetched subscribers
		if !reflect.DeepEqual(testChannel, fetchedChannel) {
			t.Errorf("Stored and fetched channels are not the same")
		}

	})

	// =================================
	// ========= SYSTEM STATE ==========
	// =================================

	// Check storing and fetching of system state
	t.Run("StoreAndFetchSystemState", func(t *testing.T) {

		// Create dummty data
		testState := SystemState{
			TopicCount:      3,
			SubscriberCount: 4,
			MessageCount:    5,
		}

		// Store dummy state
		err := StoreSystemState(testState)
		if err != nil {
			t.Errorf("Error when storing state")
		}

		// Fetch state
		fecthedState, err := FetchSystemState()
		if err != nil {
			t.Errorf("Error when fetching state")
		}

		// Compare original and fetched state
		if !reflect.DeepEqual(testState, fecthedState) {
			t.Errorf("Stored and fetched state are not the same")
		}

	})

	// =================================
	// =========== TEARDOWN ============
	// =================================

	// Close DB
	err = CloseDB()
	if err != nil {
		t.Errorf("Closing database returns an error")
	}

	// Remove database files
	os.Remove("../testing_assets/test.db")
	os.Remove("../testing_assets/test.db.lock")
}

// TestDatabasePersistence tests whether the database is handled correctly on restart to persist the data
func TestDatabasePersistence(t *testing.T) {

	// Start database
	err := InitialiseDB("../testing_assets/test2.db")
	if err != nil {
		t.Errorf("Error when starting database for the first time")
	}

	// Create dummy data
	testSub1 := Subscriber{
		Endpoint:     "testEndpoint1",
		SubbedTopics: []string{"test1", "test2"},
		MessageQueue: []uuid.UUID{uuid.New()},
	}
	testSub2 := Subscriber{
		Endpoint:     "testEndpoint2",
		SubbedTopics: []string{"test1"},
		MessageQueue: []uuid.UUID{uuid.New()},
	}
	testChan := Channel{
		Topic:        "test1",
		MessageQueue: []uuid.UUID{uuid.New()},
		SubEndpoints: []string{"testEndpoint1", "testEndpoint2"},
	}
	testState := SystemState{
		TopicCount:      3,
		SubscriberCount: 4,
		MessageCount:    5,
	}

	// Store dummy data
	err1 := StoreSubscriber(testSub1)
	err2 := StoreSubscriber(testSub2)
	err3 := StoreChannel(testChan)
	err4 := StoreSystemState(testState)
	if err1 != nil || err2 != nil || err3 != nil || err4 != nil {
		t.Errorf("Error when storing test data")
	}

	// Close DB
	err = CloseDB()
	if err != nil {
		t.Errorf("Error when closing database")
	}

	// Reopen DB
	err = InitialiseDB("../testing_assets/test2.db")
	if err != nil {
		t.Errorf("Error when re-opening database")
	}

	// Fetch stored data
	fetchedSub1, err1 := FetchSubscriber(testSub1.Endpoint)
	fetchedSub2, err2 := FetchSubscriber(testSub2.Endpoint)
	fetchedChan, err3 := FetchChannel(testChan.Topic)
	fetchedState, err4 := FetchSystemState()

	// Fetch error checks
	if err1 != nil || err2 != nil {
		t.Errorf("Error when fetching subscribers from re-opened database")
	}
	if err3 != nil {
		t.Errorf("Error when fetching channel from re-opened database")
	}
	if err4 != nil {
		t.Errorf("Error when fetching system state from re-opened database")
	}

	// Compare fetched values to stored values
	if !reflect.DeepEqual(fetchedSub1, testSub1) || !reflect.DeepEqual(fetchedSub2, testSub2) {
		t.Errorf("Fetched subscribers do not match stored subscribers")
	}
	if !reflect.DeepEqual(fetchedChan, testChan) {
		t.Errorf("Fetched channel does not match stored channel")
	}
	if !reflect.DeepEqual(fetchedState, testState) {
		t.Errorf("Fetched state does not match stored state")
	}

	// Close DB
	err = CloseDB()
	if err != nil {
		t.Errorf("Error when closing database for the second time")
	}

	// Remove DB files
	os.Remove("../testing_assets/test2.db")
	os.Remove("../testing_assets/test2.db.lock")

}
