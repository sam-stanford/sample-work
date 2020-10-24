package main

import (
	"bytes"
	"encoding/json"
	"github.com/boltdb/bolt"
	"github.com/google/uuid"
)

// ======================================
// === GLOBAL VARIABLES (IN-MEM DATA) ===
// ======================================

// Database (KV Store)
var database *bolt.DB

// Global constant buckets/keys
const programDataBucketName = "Program Data Bucket"
const subscribersBucketName = "Subscribers Bucket"
const channelsBucketName = "Channels Bucket"
const messagesBucketName = "Messages Bucket"
const systemStateKey = "System State"

// Caches
var channelCache map[string]Channel = make(map[string]Channel)          // Topics to channels
var subscriberCache map[string]Subscriber = make(map[string]Subscriber) // Endpoints to subscribers
var messageCache map[uuid.UUID]Message = make(map[uuid.UUID]Message)    // UUIDs to messages

// ======================================
// ======= DB INTERACTION METHODS =======
// ======================================

// CreateBucket creates a bucket with a specified name in the database
func CreateBucket(bucketName string) error {
	returnErr := database.Update(func(tx *bolt.Tx) error {
		_, err := tx.CreateBucketIfNotExists([]byte(bucketName))
		return err
	})

	return returnErr
}

// StoreKeyValue puts a specified key-value pair in a specified bucket
func StoreKeyValue(bucketName string, key string, value []byte) error {
	return database.Update(func(tx *bolt.Tx) error {
		err := tx.Bucket([]byte(bucketName)).Put([]byte(key), value)
		return err
	})
}

// FetchValue fetches a value using a specified key from a specified bucket
func FetchValue(bucketName string, key string) ([]byte, error) {
	var returnData []byte
	var returnErr error = database.View(func(tx *bolt.Tx) error {
		returnData = tx.Bucket([]byte(bucketName)).Get([]byte(key))
		return nil
	})
	return returnData, returnErr
}

// DeleteValue removes a value from a specified bucket using a specified key
func DeleteValue(bucketName string, key string) error {
	var returnErr error = database.Update(func(tx *bolt.Tx) error {
		err := tx.Bucket([]byte(bucketName)).Delete([]byte(key))
		return err
	})
	return returnErr
}

// ======================================
// ========== CACHE/DB METHODS ==========
// ======================================

// FetchMessage retrieves a message from the cache/database
func FetchMessage(messageUUID uuid.UUID) (Message, error) {
	// Check cache
	message := messageCache[messageUUID]
	if message.Topic != "" {
		// Was in cache
		return message, nil
	}

	// Else fetch from DB
	fetchedBytes, err := FetchValue(messagesBucketName, messageUUID.String())
	json.Unmarshal(fetchedBytes, &message)

	// Store in cache
	messageCache[messageUUID] = message

	// Return
	return message, err
}

// StoreMessage puts a message in the cache and database
func StoreMessage(message Message) error {

	// Store in DB
	bytesToStore := new(bytes.Buffer)
	json.NewEncoder(bytesToStore).Encode(message)
	err := StoreKeyValue(messagesBucketName, message.UUID.String(), bytesToStore.Bytes())
	if err != nil {
		return err
	}

	// Store in cache
	messageCache[message.UUID] = message
	return nil
}

// DeleteMessage removes a message from the cache and database
func DeleteMessage(messageUUID uuid.UUID) error {

	// Delete from DB
	err := DeleteValue(messagesBucketName, messageUUID.String())
	if err != nil {
		return err
	}

	// Check cache
	message := messageCache[messageUUID]
	if message.Topic != "" {
		// In cache, so delete
		delete(messageCache, messageUUID)
	}

	return nil
}

// FetchChannel retrieves a channel from the cache/database
func FetchChannel(topic string) (Channel, error) {
	// Check cache
	channel := channelCache[topic]

	if channel.Topic != "" {
		// Was in cache
		return channel, nil
	}

	// Else fetch from DB
	fetchedBytes, err := FetchValue(channelsBucketName, topic)
	json.Unmarshal(fetchedBytes, &channel)

	// Store in cache
	channelCache[topic] = channel

	// Return
	return channel, err
}

// FetchAllChannels retrieves all channels from the channel cache
func FetchAllChannels() ([]Channel, error) {
	channels := make([]Channel, 0)
	err := database.View(func(tx *bolt.Tx) error {
		// Assume bucket exists and has keys
		b := tx.Bucket([]byte(channelsBucketName))
		c := b.Cursor()
		for key, value := c.First(); key != nil; key, value = c.Next() {
			var channel Channel
			json.Unmarshal(value, &channel)
			channels = append(channels, channel)
		}
		return nil
	})
	return channels, err
}

// StoreChannel puts a channel in the cache and database
func StoreChannel(channel Channel) error {

	// Store in DB
	bytesToStore := new(bytes.Buffer)
	json.NewEncoder(bytesToStore).Encode(channel)
	err := StoreKeyValue(channelsBucketName, channel.Topic, bytesToStore.Bytes())
	if err != nil {
		return err
	}

	// Store in cache
	channelCache[channel.Topic] = channel
	return nil
}

// DeleteChannel removes a channel from the cache and database
func DeleteChannel(topic string) error {

	// Delete from DB
	err := DeleteValue(channelsBucketName, topic)
	if err != nil {
		return err
	}

	// Check cache
	channel := channelCache[topic]
	if channel.Topic != "" {
		// In cache, so delete
		delete(channelCache, topic)
	}

	return nil
}

// FetchSubscriber retrieves a subscriber from the cache/database
func FetchSubscriber(endpoint string) (Subscriber, error) {
	// Check cache
	sub := subscriberCache[endpoint]
	if sub.Endpoint != "" {
		// Was in cache
		return sub, nil
	}

	// Else fetch from DB
	fetchedBytes, err := FetchValue(subscribersBucketName, endpoint)
	json.Unmarshal(fetchedBytes, &sub)

	// Store in cache
	subscriberCache[endpoint] = sub

	// Return
	return sub, err
}

// FetchAllSubscribers retrieves all subscribers from the database
func FetchAllSubscribers() ([]Subscriber, error) {
	subscribers := make([]Subscriber, 0)
	err := database.View(func(tx *bolt.Tx) error {
		// Assume bucket exists and has keys
		b := tx.Bucket([]byte(subscribersBucketName))
		c := b.Cursor()
		for key, value := c.First(); key != nil; key, value = c.Next() {
			var sub Subscriber
			json.Unmarshal(value, &sub)
			subscribers = append(subscribers, sub)
		}
		return nil
	})
	return subscribers, err
}

// StoreSubscriber puts a subscriber in the cache and database
func StoreSubscriber(sub Subscriber) error {
	// Store in DB
	bytesToStore := new(bytes.Buffer)
	json.NewEncoder(bytesToStore).Encode(sub)
	err := StoreKeyValue(subscribersBucketName, sub.Endpoint, bytesToStore.Bytes())
	if err != nil {
		return err
	}

	// Store in cache
	subscriberCache[sub.Endpoint] = sub
	return nil
}

// DeleteSubscriber removes a subscriber from the cache and database
func DeleteSubscriber(endpoint string) error {

	// Delete from DB
	err := DeleteValue(subscribersBucketName, endpoint)
	if err != nil {
		return err
	}

	// Check cache
	subscriber := subscriberCache[endpoint]
	if subscriber.Endpoint != "" {
		// In cache, so delete
		delete(subscriberCache, endpoint)
	}

	return nil
}

// FetchSystemState retrieves the system state from the database
func FetchSystemState() (SystemState, error) {

	// Fetch from DB
	var state SystemState
	fetchedBytes, err := FetchValue(programDataBucketName, systemStateKey)
	json.Unmarshal(fetchedBytes, &state)

	// Return
	return state, err
}

// StoreSystemState puts the system state in the database
func StoreSystemState(state SystemState) error {
	bytesToStore := new(bytes.Buffer)
	json.NewEncoder(bytesToStore).Encode(state)
	err := StoreKeyValue(programDataBucketName, systemStateKey, bytesToStore.Bytes())
	if err != nil {
		return err
	}
	return err
}

// ======================================
// ======= CACHE/DB CLOSE METHOD ========
// ======================================

// CloseDB closes the database
func CloseDB() error {
	err := database.Close()
	return err
}

// ======================================
// ===== CACHE/DB INITIALISE METHOD =====
// ======================================

// InitialiseDB starts the database and creates the relevant buckets for the program
func InitialiseDB(databaseFilename string) error {

	// Open db
	var err error
	database, err = bolt.Open(databaseFilename, 0600, nil)
	if err != nil {
		return err
	}

	// Channels bucket
	err = CreateBucket(channelsBucketName)
	if err != nil {
		return err
	}

	// Subscriber bucket
	err = CreateBucket(subscribersBucketName)
	if err != nil {
		return err
	}

	// Program data bucket
	err = CreateBucket(programDataBucketName)
	if err != nil {
		return err
	}

	// Messages bucket
	err = CreateBucket(messagesBucketName)
	if err != nil {
		return err
	}

	// Success
	return nil
}
