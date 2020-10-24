package main

import (
	"encoding/json"
	"errors"
	"flag"
	"fmt"
	"github.com/google/uuid"
	"github.com/gorilla/mux"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"
	"time"
)

// ======================================
// ====== INTERNAL DATA STRUCTURES ======
// ======================================

// Message represents the data and headers sent by a publisher
type Message struct {
	UUID              uuid.UUID `json:"id"`           // Unique identifier
	Topic             string    `json:"topic"`        // Topic of the message
	Attributes        []string  `json:"attributes"`   // Attributes for the message
	Data              []byte    `json:"data"`         // Message payload as bytes
	RecTimestamp      int64     `json:"receivedTS"`   // Timestamp for received time
	LastSentTimestamp int64     `json:"lastSentTS"`   // Timestamp for last attempted send - internal use only
	SubsToSendTo      []string  `json:"subsToSendTo"` // Subscriber UUIDs left to send to - internal use only
}

// Channel wraps the messages as a specialised queue with a topic
type Channel struct {
	Topic        string      `json:"topic"`        // Topic of the channel
	MessageQueue []uuid.UUID `json:"messageQueue"` // UUIDs to messages in DB
	SubEndpoints []string    `json:"subscribers"`  // Slice of all subscriber endpoints
}

// Subscriber represents a subscriber (message receiver) in the system
type Subscriber struct {
	Endpoint     string      `json:"endpoint"`     // Endpoint of the subscriber - Unique
	SubbedTopics []string    `json:"subbedTopics"` // List of subscribed-to topics
	MessageQueue []uuid.UUID `json:"messageQueue"` // UUIDs to messages in DB
}

// SystemState holds system variables which should be persisted in the database
type SystemState struct {
	TopicCount      int `json:"topicCount"`   // Number of topics
	SubscriberCount int `json:"subCount"`     // Number of subscribers
	MessageCount    int `json:"messageCount"` // Number of messages across all topics
}

// ======================================
// ========== GLOBAL VARIABLES ==========
// ======================================

// CurrentState is the global instantiation of the SystemState stuct
var CurrentState SystemState

// ======================================
// ========= JSON API STRUCTURES ========
// ======================================

// SuccessDTO representsa a general JSON success object
type SuccessDTO struct {
	Success bool `json:"success"` // Always true
}

// PublishConfirmDTO represents a JSON object to confirm a publish request
type PublishConfirmDTO struct {
	UUID        string `json:"id"`
	Timestamp   int64  `json:"timestamp"`
	Subscribers int    `json:"subscribers"`
}

// PullRequest represents a JSON object sent to this API during a pull request
type PullRequest struct {
	Endpoint string   `json:"endpoint"` // Endpoint of the subscriber
	Topics   []string `json:"topics"`   // Topics to pull messages from - Empty to mean all
}

// PullResponseDTO represents a JSON object sent from the system in repsonse to a pull request
type PullResponseDTO struct {
	Messages []Message `json:"messages"`
}

// TopicDTO resresents a JSON object only containing a topic
type TopicDTO struct {
	Topic string `json:"topic"`
}

// TopicsDTO represents a JSON object containing an array of topics
type TopicsDTO struct {
	Topics []string `json:"topics"`
}

// SubscriberDTO represents a JSON object only containing a subscriber endpoint
type SubscriberDTO struct {
	Endpoint string `json:"endpoint"`
}

// SubscribersDTO represents a JSON object containing an array of subscriber endpoints
type SubscribersDTO struct {
	Endpoints []string `json:"endpoints"`
}

// SubscriptionDTO represents a JSON object containing the information for a subscription (Endpoint & Topic)
type SubscriptionDTO struct {
	Topic    string `json:"topic"`
	Endpoint string `json:"endpoint"`
}

// AcknowledgementDTO represents a JSON object containing a subscriber's endpoint and the message ID to acknowledge
type AcknowledgementDTO struct {
	Endpoint  string `json:"endpoint"`
	MessageID string `json:"id"`
}

// UUIDDTO represents a JSON object only containing a UUID
type UUIDDTO struct {
	UUID uuid.UUID `json:"id"`
}

// ======================================
// ======== AUXILLIARY FUNCTIONS ========
// ======================================

// Remove a string from a slice. Error returned if slice does not contain string
func removeString(item string, slice []string) ([]string, error) {
	itemIndex := -1
	for index, element := range slice {
		if element == item {
			itemIndex = index
			break
		}
	}

	if itemIndex == -1 {
		// Does not contain
		return slice, errors.New("Slice does not contain string")
	}

	// Cut out element
	return append(slice[:itemIndex], slice[itemIndex+1:]...), nil
}

// Remove a UUID from a slice. Error returned if slice does not contain UUID
func removeUUID(item string, slice []uuid.UUID) ([]uuid.UUID, error) {
	itemIndex := -1
	for index, element := range slice {
		if element.String() == item {
			itemIndex = index
			break
		}
	}

	if itemIndex == -1 {
		// Does not contain
		return slice, errors.New("Slice does not contain element")
	}

	// Cut out element
	return append(slice[:itemIndex], slice[itemIndex+1:]...), nil
}

// Push event to subs
func pushMessage(messageToPush Message) {

	// Log signature
	LogTime()
	LogString("Pushing Message:")

	// Remove message if lifetime exceded
	if Config.messageLifeTime != -1 {
		if time.Now().Unix() > messageToPush.RecTimestamp+Config.messageLifeTime {
			LogString("\n\tMessage passed lifetime")
			removeMessage(messageToPush.UUID)
			return
		}
	}

	// Stop pushing if message has no subs
	if len(messageToPush.SubsToSendTo) == 0 {
		LogString("\n\tNo subs to push to -> Ending push timeouts")
		return
	}

	// Convert message to JSON string
	jsonBytes, _ := json.Marshal(messageToPush)
	messageAsJSONString := string(jsonBytes)

	// Loop through all subs, posting to each
	for _, thisSubEndpoint := range messageToPush.SubsToSendTo {
		_, err := http.Post(thisSubEndpoint, "application/json", strings.NewReader(messageAsJSONString)) // Ignore response, as acknowledgement exists
		if err != nil {
			// Log error, but don't return
			LogString("\n\tError when posting to subscriber with endpoint: " + thisSubEndpoint)
		} else {
			LogString("\n\tMessage posted to subscriber with endpoint: " + thisSubEndpoint)
		}
	}

	// Set new timestamp and set timeout to recall push
	messageToPush.LastSentTimestamp = time.Now().Unix()
	time.AfterFunc(time.Duration(Config.pushDelay)*time.Second, func() {
		pushMessage(messageToPush)
	})
	return
}

// Return a JSON error object to given writer
func returnError(w http.ResponseWriter, errorMessage string) {
	// Log error
	LogString("\n\t" + errorMessage + " -> Error response sent")

	// Send error
	http.Error(w, errorMessage, http.StatusBadRequest)
	return
}

// Removes a message from the system
func removeMessage(messageIDToRemove uuid.UUID) {

	// Log signature
	LogTime()
	LogString("Removing Message:")

	// Check message still exists (i.e. hasn't been pulled by all subs)
	storedMessage, err := FetchMessage(messageIDToRemove)
	if err != nil {
		LogString("\n\tError when fetching message stored at UUID")
		return
	}
	if storedMessage.Topic == "" {
		// Message does not exist
		LogString("\n\tMessage does not exist in system")
		return
	}

	// Log message info
	LogString("\n\tMessage ID: " + messageIDToRemove.String())
	LogString("\n\tNumber of subs left to send to: " + strconv.Itoa(len(storedMessage.SubsToSendTo)))

	// Remove message from channel
	channel, err := FetchChannel(storedMessage.Topic)
	if err != nil {
		// Log, but don't return
		LogString("\n\tERROR: Error when fetching channel")
	}
	channel.MessageQueue, err = removeUUID(storedMessage.UUID.String(), channel.MessageQueue)
	if err != nil {
		// Log, but don't return
		LogString("\n\tERROR: Channel does not contain message")
	}
	err = StoreChannel(channel)
	if err != nil {
		// Error when storing channel
		LogString("\n\tERROR: Error when storing channel")
	}
	LogString("\n\tMessage's channel updated")

	// Remove message from each subscriber left in current system
	for _, thisSubEndpoint := range storedMessage.SubsToSendTo {

		// Get sub
		thisSub, err := FetchSubscriber(thisSubEndpoint)
		if err != nil {
			LogString("\n\tERROR: Error when fetching subscriber with endpoint: " + thisSubEndpoint)
			continue
		}

		// Remove message
		thisSub.MessageQueue, err = removeUUID(storedMessage.UUID.String(), thisSub.MessageQueue)
		if err != nil {
			LogString("\n\tERROR: Subscriber does not have message in their queue. Endpoint: " + thisSubEndpoint)
			continue
		}

		// Store sub
		err = StoreSubscriber(thisSub)
		if err != nil {
			LogString("\n\tERROR: Error when updating subscriber with endpoint: " + thisSubEndpoint)
			continue
		}
		LogString("\n\tMessage removed from subscriber with endpoint: " + thisSubEndpoint)

	}
	LogString("\n\tMessage removed from all subscribers")

	// Update system state
	CurrentState.MessageCount--
	err = StoreSystemState(CurrentState)
	if err != nil {
		LogString("\n\tERROR: Cannot update system state")
	}
	LogString("\n\tMessage removal complete")
	return

}

// Find oldest message from a slice of messages
func getOldestMessageIndex(messageIDs []uuid.UUID) (int, error) {

	// Check messages have been returned
	if len(messageIDs) == 0 {
		return -1, errors.New("No message IDs provided")
	}

	// Find oldest index
	var oldestTime int64
	var oldestIndex int = len(messageIDs) - 1
	for i, thisMessageID := range messageIDs {
		thisMessage, err := FetchMessage(thisMessageID)
		if err != nil {
			LogString("\n\tError when fetching message")
			return -1, err
		}
		if thisMessage.RecTimestamp < oldestTime {
			oldestTime = thisMessage.RecTimestamp
			oldestIndex = i
		}
	}

	// Return
	return oldestIndex, nil
}

// ======================================
// ========== REQUEST HANDLERS ==========
// ======================================

// Adds a message to the system (POST)
func addMessage(w http.ResponseWriter, r *http.Request) {

	// Log signature
	LogTime()
	LogString("Add Message:")

	// Check under maximum message count for system
	if Config.maxMessages > 0 {
		if CurrentState.MessageCount+1 > Config.maxMessages {
			if Config.messageOverflowType == "Reject" {
				// Respond with error to reject
				returnError(w, "Maximum number of messages in system reached")
				return
			}

			// Else delete oldest => Get all channels
			allChannels, err := FetchAllChannels()
			if err != nil {
				returnError(w, "Error when fetching all channels")
				return
			}

			// Combine all message UUIDs from each channel into one slice
			allMessageIDs := make([]uuid.UUID, 0)
			for _, thisChannel := range allChannels {
				allMessageIDs = append(allMessageIDs, thisChannel.MessageQueue...)
			}

			// Delete oldest message
			oldestIndex, err := getOldestMessageIndex(allMessageIDs)
			if err != nil {
				returnError(w, "Error finding oldest message")
				return
			}
			removeMessage(allMessageIDs[oldestIndex])
			LogString("\n\tOldest message deleted")

			// Update system state in case of error later in function
			CurrentState.MessageCount--
			err = StoreSystemState(CurrentState)
			if err != nil {
				returnError(w, "Error when updating system state")
				return
			}
			LogString("\n\tStored state updated: " + strconv.Itoa(CurrentState.MessageCount) + " messages")
		}
	}

	// Retrieve data from message
	requestBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		returnError(w, "Error when reading request")
		return
	}

	// Check request has a body
	if len(requestBody) == 0 {
		returnError(w, "Request has no body")
		return
	}

	// Create message from data
	var messageToPublish Message
	err = json.Unmarshal(requestBody, &messageToPublish)
	if err != nil {
		returnError(w, "Error when parsing JSON")
		return
	}

	if messageToPublish.Topic == "" {
		// No topic => Error
		returnError(w, "No topic for message")
		return
	}
	LogString("\n\tMessage contents read")

	// Check message is under maximum size
	if Config.maxMessageSize > 0 && Config.maxMessageSize < len(messageToPublish.Data) {
		returnError(w, "Message payload too large")
		return
	}

	// Check message attribute count is under maximum
	if Config.maxAttributeCount > 0 && Config.maxAttributeCount < len(messageToPublish.Attributes) {
		returnError(w, "Message has too many attributes")
		return
	}

	// Find channel for the message's topic
	topicChannel, err := FetchChannel(messageToPublish.Topic)
	if err != nil || topicChannel.Topic == "" {
		// No channel exists => Error
		returnError(w, "Provided topic does not exist")
		return
	}

	// Check channel does not exceed maximum message count
	if Config.maxMessagesPerTopic > 0 {
		if Config.maxMessagesPerTopic > len(topicChannel.MessageQueue)+1 {
			if Config.messageOverflowType == "Reject" {
				// Send rejection
				returnError(w, "Topic already has maximum number of messages")
				return
			}

			// Else delete oldest message in topic
			oldestIndex, _ := getOldestMessageIndex(topicChannel.MessageQueue)
			removeMessage(topicChannel.MessageQueue[oldestIndex])

			// Update system state in case of error late in function
			CurrentState.MessageCount--
			err = StoreSystemState(CurrentState)
			if err != nil {
				returnError(w, "Failed to update system state")
				return
			}
			LogString("\n\tUpdated system state: " + strconv.Itoa(CurrentState.MessageCount) + " messages")
		}
	}

	// Add timestamp if one not provided
	if messageToPublish.RecTimestamp == 0 {
		messageToPublish.RecTimestamp = time.Now().Unix()
		LogString("\n\tTimestamp added to message")
	} else {
		LogString("\n\tTimestamp assigned by publisher")
	}

	// Add UUID to message if one not provided
	if messageToPublish.UUID.String() == "00000000-0000-0000-0000-000000000000" {
		messageToPublish.UUID = uuid.New()
		LogString("\n\tUUID added to message")
	} else {
		LogString("\n\tUUID assigned by publisher")

		// Check message ID is not duplicate
		existingMessage, err := FetchMessage(messageToPublish.UUID)
		if err != nil {
			returnError(w, "Error when checking UUID in database")
			return
		}
		if existingMessage.Topic != "" {
			// UUID already exists
			returnError(w, "Duplicate message. UUID already exists in system")
			return
		}
	}

	// Add subs to send message to
	messageToPublish.SubsToSendTo = make([]string, len(topicChannel.SubEndpoints))
	copy(messageToPublish.SubsToSendTo, topicChannel.SubEndpoints)

	// Add message to each subscriber's message queue
	for _, thisSubEndpoint := range messageToPublish.SubsToSendTo {
		// Fetch
		thisSub, err := FetchSubscriber(thisSubEndpoint)

		// Update
		if err != nil {
			returnError(w, "Error when fetching subscriber")
			return
		}
		thisSub.MessageQueue = append(thisSub.MessageQueue, messageToPublish.UUID)

		// Store
		err = StoreSubscriber(thisSub)
		if err != nil {
			returnError(w, "Error when storing subscriber")
			return
		}

	}
	LogString("\n\tSubscriber message queues updated")

	// Add message to topic channel
	topicChannel.MessageQueue = append(topicChannel.MessageQueue, messageToPublish.UUID)
	err = StoreChannel(topicChannel)
	if err != nil {
		returnError(w, "Error updating topic channel")
		return
	}

	// Log message info
	stringToLog := "\n\tNew Message Data:"
	stringToLog += "\n\t\t- Message ID: " + messageToPublish.UUID.String()
	stringToLog += "\n\t\t- Message Topic: " + messageToPublish.Topic
	stringToLog += "\n\t\t- Message Data Size (Bytes): " + strconv.Itoa(len(messageToPublish.Data))
	stringToLog += "\n\t\t- Message Attributes: "
	if len(messageToPublish.Attributes) == 0 {
		stringToLog += "[NONE]"
	} else {
		for i := 0; i < len(messageToPublish.Attributes); i++ {
			stringToLog += messageToPublish.Attributes[i]
			if i != len(messageToPublish.Attributes)-1 {
				stringToLog += ", "
			}

		}
	}
	stringToLog += "\n\t\t- Message Subscriber Endpoints: "
	if len(messageToPublish.SubsToSendTo) == 0 {
		stringToLog += "[NONE]"
	} else {
		for i := 0; i < len(messageToPublish.SubsToSendTo); i++ {
			stringToLog += messageToPublish.SubsToSendTo[i]
			if i != len(messageToPublish.SubsToSendTo)-1 {
				stringToLog += ", "
			}
		}
	}
	LogString(stringToLog)

	// Write to database & cache before confirming
	if len(messageToPublish.SubsToSendTo) > 0 {
		// Only write if non-zero subs
		err = StoreMessage(messageToPublish)
		if err != nil {
			returnError(w, "Error when storing message")
			return
		}
		LogString("\n\tMessage stored to database")
	} else {
		LogString("\n\tNo subscribers, so not storing message")
	}

	// Update stored state
	CurrentState.MessageCount++
	StoreSystemState(CurrentState)
	LogString("\n\tSystem state updated: " + strconv.Itoa(CurrentState.MessageCount) + " messages")

	// Return publishConfirmDTO to publisher
	confirmDTO := PublishConfirmDTO{
		UUID:        messageToPublish.UUID.String(),
		Timestamp:   messageToPublish.RecTimestamp,
		Subscribers: len(messageToPublish.SubsToSendTo)}
	jsonBytes, _ := json.Marshal(confirmDTO)
	fmt.Fprintln(w, string(jsonBytes))
	LogString("\n\tMessage confirmation sent")

	// Set up message for push or pull
	if Config.pushOrPull == "Push" {

		// Push system => Start push loop
		go pushMessage(messageToPublish)

	} else {

		// Pull system => Add message removal timer
		time.AfterFunc(time.Duration(Config.messageLifeTime)*time.Second, func() {
			removeMessage(messageToPublish.UUID)
		})

	}
	return
}

// Pulls a message from the system (GET)
func pullMessages(w http.ResponseWriter, r *http.Request) {
	// Log signature
	LogTime()
	LogString("Pull Messages:")

	// Only accept if system is using pull
	if Config.pushOrPull == "Push" {
		returnError(w, "Cannot pull. System is set to push")
		return
	}

	// Get message from request body
	requestBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		returnError(w, "Error when parsing JSON")
		return
	}

	// Replace empty body with JSON
	if len(requestBody) == 0 {
		requestBody = []byte("{}")
	}

	// Convert data into a pull request object
	var pullRequest PullRequest
	err = json.Unmarshal(requestBody, &pullRequest)
	if err != nil {
		returnError(w, "Error when parsing JSON")
		return
	}
	LogString("\n\tRequest contents read")

	// Log request contents
	stringToLog := "\n\tParsed request data"
	stringToLog += "\n\t\t- Subscriber's Endpoint: " + pullRequest.Endpoint
	stringToLog += "\n\t\t- Specified Topics: "
	if len(pullRequest.Topics) == 0 {
		stringToLog += "[NONE]"
	} else {
		for i := 0; i < len(pullRequest.Topics); i++ {
			stringToLog += pullRequest.Topics[i]
			if i != len(pullRequest.Topics)-1 {
				stringToLog += ", "
			}
		}
	}
	LogString(stringToLog)

	// Get subscriber from database/cache
	subscriber, err := FetchSubscriber(pullRequest.Endpoint)
	if err != nil {
		returnError(w, "Error when fetching subscriber")
		return
	}
	if subscriber.Endpoint == "" {
		returnError(w, "Subscriber does not exist")
		return
	}
	LogString("\n\tSubscriber found from endpoint")

	// Fetch each message from the subscriber's message queue, and add to response if requested
	LogString("\n\tAdding messages:")
	var responseDTO PullResponseDTO
	for _, thisMessageID := range subscriber.MessageQueue {

		// Fetch
		thisMessage, err := FetchMessage(thisMessageID)
		if err != nil {
			returnError(w, "Error when fetching message")
			return
		}

		if len(pullRequest.Topics) == 0 {
			// No specific topics requested => Add message to response
			LogString("\n\t\tAdding Message with ID: " + thisMessageID.String())
			responseDTO.Messages = append(responseDTO.Messages, thisMessage)

		} else {
			// Check message topic is specified
			topicIsSpecified := false
			for _, thisSpecifiedTopic := range pullRequest.Topics {
				if thisSpecifiedTopic == thisMessage.Topic {
					// Match found
					topicIsSpecified = true
					break
				}
			}

			// Add message to response if topic is specified
			if topicIsSpecified {
				responseDTO.Messages = append(responseDTO.Messages, thisMessage)
			}
		}
	}

	// Log returned message info
	stringToLog = "\n\tMessages Returning: "
	stringToLog += "\n\t\t- Count: " + strconv.Itoa(len(responseDTO.Messages))
	stringToLog += "\n\t\t- Message IDs and Topics: "
	if len(responseDTO.Messages) == 0 {
		stringToLog += "[NONE]"
	} else {
		for i := 0; i < len(responseDTO.Messages); i++ {
			stringToLog += "\n\t\t\t- Topic: " + responseDTO.Messages[i].Topic
			stringToLog += ", ID: " + responseDTO.Messages[i].UUID.String()
		}
	}
	LogString(stringToLog)

	// Set send time in messages
	if Config.ackWindow != -1 {
		for _, thisMessage := range responseDTO.Messages {
			thisMessage.LastSentTimestamp = time.Now().Unix()
			err = StoreMessage(thisMessage)
			if err != nil {
				returnError(w, "Error when updating message timestamps")
				return
			}
		}
		LogString("\n\tLast sent timestamps updated for pulled messages")
	}

	// Form JSON - Can't use json.Marshal, as data bytes are merged
	responseString := "{\"messages\":["
	for messageIndex, thisMessage := range responseDTO.Messages {
		responseString += "{"

		responseString += "\"id\":\"" + thisMessage.UUID.String() + "\","

		responseString += "\"attibutes\":["
		for attributeIndex, thisAttribute := range thisMessage.Attributes {
			responseString += "\"" + thisAttribute + "\""
			if attributeIndex != len(thisMessage.Attributes)-1 {
				responseString += ","
			}
		}
		responseString += "],"

		responseString += "\"receivedTS\":" + strconv.FormatInt(thisMessage.RecTimestamp, 10) + ","

		responseString += "\"data\":["
		for byteIndex, thisByte := range thisMessage.Data {
			responseString += strconv.Itoa(int(thisByte))
			if byteIndex != len(thisMessage.Data)-1 {
				responseString += ","
			}
		}
		responseString += "]"

		responseString += "}"
		if messageIndex != len(responseDTO.Messages)-1 {
			responseString += ","
		}
	}
	responseString += "]}"

	// Return response to puller
	fmt.Fprintln(w, responseString)

	LogString("\n\tResponse sent")
	return
}

// Receives acknowledgement for a message (POST)
func receiveAcknowledgement(w http.ResponseWriter, r *http.Request) {

	// Log signature
	LogTime()
	LogString("Receive Acknowledgement:")

	// Get message from request body
	requestBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		returnError(w, "Error when parsing JSON")
		return
	}

	// Check request has a body
	if len(requestBody) == 0 {
		returnError(w, "Request has no body")
		return
	}

	// Convert data into a pull request object
	var ackDTO AcknowledgementDTO
	err = json.Unmarshal(requestBody, &ackDTO)
	if err != nil {
		returnError(w, "Error when parsing JSON")
		return
	}
	LogString("\n\tRequest contents read")

	// Check DTO is complete
	if ackDTO.Endpoint == "" || ackDTO.MessageID == "" {
		returnError(w, "Acknowledgement JSON is incomplete")
		return
	}
	LogString("\n\tAcknowledgement JSON is complete")

	// Check subscriber exists
	subscriber, err := FetchSubscriber(ackDTO.Endpoint)
	if err != nil {
		returnError(w, "Error when fetching the subscriber")
		return
	}
	if subscriber.Endpoint == "" {
		returnError(w, "Subscriber does not exist")
		return
	}
	LogString("\n\tSubscriber exists")

	// Check message exists
	messageUUID, err := uuid.Parse(ackDTO.MessageID)
	if err != nil {
		returnError(w, "Error when parsing message ID")
		return
	}
	message, err := FetchMessage(messageUUID)
	if err != nil {
		returnError(w, "Error when fetching message")
		return
	}
	if message.Topic == "" {
		returnError(w, "Message does not exist")
		return
	}
	LogString("\n\tMessage exists")

	// Check acknowledgement is within window
	if Config.ackWindow != -1 {
		if message.LastSentTimestamp+Config.ackWindow < time.Now().Unix() {
			returnError(w, "Acknowledgement is outside of window")
			return
		}
	}

	// Check message channel exists
	channel, err := FetchChannel(message.Topic)
	if err != nil {
		returnError(w, "Error when fetching channel")
		return
	}
	if channel.Topic == "" {
		returnError(w, "Message channel does not exist")
		return
	}
	LogString("\n\tChannel exists")

	// Remove message from subscriber's queue
	subscriber.MessageQueue, err = removeUUID(ackDTO.MessageID, subscriber.MessageQueue)
	if err != nil {
		// Not in sub's message list
		returnError(w, "Subscriber cannot acknowledge message")
		return
	}
	err = StoreSubscriber(subscriber)
	if err != nil {
		returnError(w, "Error when storing subscriber")
		return
	}
	LogString("\n\tMessage removed from subscriber")

	// Remove subscriber from message's list
	message.SubsToSendTo, err = removeString(ackDTO.Endpoint, message.SubsToSendTo)
	if err != nil {
		returnError(w, "Message cannot be acknowledged by subscriber")
		return
	}
	err = StoreMessage(message)
	if err != nil {
		returnError(w, "Error when storing message")
		return
	}
	LogString("\n\tSubscriber removed from message")

	// Remove message from channel & database if no more subs
	if len(message.SubsToSendTo) == 0 {

		// Remove message from channel
		channel.MessageQueue, err = removeUUID(ackDTO.MessageID, channel.MessageQueue)
		if err != nil {
			// Not in message channel
			returnError(w, "Message does not exist in channel")
			return
		}
		err = StoreChannel(channel)
		if err != nil {
			returnError(w, "Error when storing channel")
			return
		}
		LogString("\n\tMessage removed from channel")

		// Remove message from DB
		messageID, err := uuid.Parse(ackDTO.MessageID)
		if err != nil {
			returnError(w, "Error when parsing message ID")
		}
		err = DeleteMessage(messageID)
		if err != nil {
			returnError(w, "Error when deleting message")
			return
		}

		// Update system state
		CurrentState.MessageCount--
		StoreSystemState(CurrentState)
		LogString("\n\tSystem state updated: " + strconv.Itoa(CurrentState.MessageCount) + " messages")
	}

	LogString("\n\tMessage acknowledged")
	LogString("\n\tRemaining acknowledgements until message deleted: " + strconv.Itoa(len(message.SubsToSendTo)))

	// Respond to user
	successDTO := SuccessDTO{Success: true}
	jsonBytes, _ := json.Marshal(successDTO)
	fmt.Fprintln(w, string(jsonBytes))
	LogString("\n\tResponse sent")
	return
}

// Add a topic to the system (POST)
func createTopic(w http.ResponseWriter, r *http.Request) {

	// Log signature
	LogTime()
	LogString("Create Topic:")

	// Check maximum count not exceeded
	if Config.maxTopics > 0 && Config.maxTopics < CurrentState.TopicCount+1 {
		returnError(w, "Maximum number of topics reached")
		return
	}

	// Get message from request body
	requestBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		returnError(w, "Error when parsing JSON")
		return
	}

	// Check request has a body
	if len(requestBody) == 0 {
		returnError(w, "Request has no body")
		return
	}

	// Convert data into a topic
	var topicDTO TopicDTO
	err = json.Unmarshal(requestBody, &topicDTO)
	if err != nil {
		returnError(w, "Error when parsing JSON")
		return
	}
	LogString("\n\tRequest contents read")

	// Find and log topic
	topic := topicDTO.Topic
	stringToLog := "\n\tTopic retrieved: " + topic
	LogString(stringToLog)

	// Fetch channel from cache/database to see if it exists
	topicChannel, err := FetchChannel(topic)
	if err != nil {
		returnError(w, "Error when fetching channel")
		return
	}

	if topicChannel.Topic != "" {
		// Already exists, so error
		returnError(w, "Channel already exists")
		return
	}

	// Add new channel
	newChannel := Channel{Topic: topic}
	err = StoreChannel(newChannel)
	if err != nil {
		returnError(w, "Error when storing channel")
		return
	}
	LogString("\n\tChannel created")

	// Create channel bucket
	CreateBucket("TOPIC:" + newChannel.Topic)

	// Update state
	CurrentState.TopicCount++
	StoreSystemState(CurrentState)
	LogString("\n\tSystem state updated: " + strconv.Itoa(CurrentState.TopicCount) + " topics")

	// Respond to user
	successDTO := SuccessDTO{Success: true}
	jsonBytes, _ := json.Marshal(successDTO)
	fmt.Fprintln(w, string(jsonBytes))
	LogString("\n\tResponse sent")
	return
}

// Remove a topic from the system (DELETE)
func deleteTopic(w http.ResponseWriter, r *http.Request) {

	// Log signature
	LogTime()
	LogString("Delete Topic:")

	// Get message from request body
	requestBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		returnError(w, "Error when parsing JSON")
		return
	}

	// Check request has a body
	if len(requestBody) == 0 {
		returnError(w, "Request has no body")
		return
	}

	// Convert data into a topic
	var topicDTO TopicDTO
	err = json.Unmarshal(requestBody, &topicDTO)
	if err != nil {
		returnError(w, "Error when parsing JSON")
		return
	}
	LogString("\n\tRequest contents read")

	// Find and log topic
	topic := topicDTO.Topic
	stringToLog := "\n\tTopic retrieved: " + topic
	LogString(stringToLog)

	// Fetch channel from cache/database
	topicChannel, err := FetchChannel(topic)
	if err != nil {
		returnError(w, "Error when fetching channel")
		return
	}
	if topicChannel.Topic == "" {
		// Channel doesn't exist => Error
		returnError(w, "Channel does not exist")
		return
	}

	// Delete topic channel
	err = DeleteChannel(topic)
	if err != nil {
		returnError(w, "Error when deleting channel")
		return
	}
	LogString("\n\tTopic channel deleted")

	// Update system state
	CurrentState.TopicCount--
	StoreSystemState(CurrentState)
	LogString("\n\tSystem state updated: " + strconv.Itoa(CurrentState.TopicCount) + " topics")

	// Respond to user
	successDTO := SuccessDTO{Success: true}
	jsonBytes, _ := json.Marshal(successDTO)
	fmt.Fprintln(w, string(jsonBytes))
	LogString("\n\tResponse sent")

}

// View all topics, or all topics for a sub (GET)
func getTopics(w http.ResponseWriter, r *http.Request) {
	// Log signature
	LogTime()
	LogString("Get Topics:")

	// Get message from request body
	requestBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		returnError(w, "Error when parsing JSON")
		return
	}

	// Replace empty body with JSON
	if len(requestBody) == 0 {
		requestBody = []byte("{}")
	}

	// Convert data into a subscriber
	var subDTO SubscriberDTO
	err = json.Unmarshal(requestBody, &subDTO)
	if err != nil {
		returnError(w, "Error when parsing JSON")
		return
	}
	LogString("\n\tRequest contents read")

	stringToLog := "\n\tSubscriber endpoint retrieved: "
	if subDTO.Endpoint == "" {
		stringToLog += "[NONE]"
	} else {
		stringToLog += subDTO.Endpoint
	}
	LogString(stringToLog)

	if subDTO.Endpoint == "" {
		// No specified subscriber => Get all topics
		LogString("\n\tFetching all topics")

		// Get all channels
		channels, err := FetchAllChannels()
		if err != nil {
			returnError(w, "Error when fetching all channels")
			return
		}

		// Log fetched channels
		stringToLog := "\n\tFetched channels:"
		for _, channel := range channels {
			stringToLog += "\n\t\t- " + channel.Topic
			stringToLog += ": " + strconv.Itoa(len(channel.MessageQueue)) + " messages"
			stringToLog += ", " + strconv.Itoa(len(channel.SubEndpoints)) + " subscribers"
		}
		LogString(stringToLog)

		// Return channels to user
		var topicsDTO TopicsDTO
		for _, channel := range channels {
			if channel.Topic != "" {
				topicsDTO.Topics = append(topicsDTO.Topics, channel.Topic)
			}
		}
		jsonBytes, _ := json.Marshal(topicsDTO)
		fmt.Fprintln(w, string(jsonBytes))
		LogString("\n\tResponse sent")

	} else {
		// Subscriber provided => Get topics for subscriber
		LogString("\n\tFetching subscriber from cache/database")

		// Fetch subscriber
		subscriber, err := FetchSubscriber(subDTO.Endpoint)
		if err != nil {
			returnError(w, "Error when fetching subscriber")
			return
		}

		// Log subscriptions list
		stringToLog := "\n\tFetched channels:"
		for _, thisTopic := range subscriber.SubbedTopics {
			stringToLog += "\n\t\t- " + thisTopic
		}

		// Return subscriptions list
		var topicsDTO TopicsDTO
		for _, thisTopic := range subscriber.SubbedTopics {
			topicsDTO.Topics = append(topicsDTO.Topics, thisTopic)
		}
		jsonBytes, _ := json.Marshal(topicsDTO)
		fmt.Fprintln(w, string(jsonBytes))
		LogString("\n\tResponse sent")

	}
}

// Add a subscriber to the system (POST)
func addSubcriber(w http.ResponseWriter, r *http.Request) {
	// Log signature
	LogTime()
	LogString("Add Subscriber:")

	// Check system does not have maximum number of subsribers
	if Config.maxSubs > 0 && Config.maxSubs < CurrentState.SubscriberCount+1 {
		returnError(w, "Maximum subscriber count already reached")
		return
	}

	// Get message from request body
	requestBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		returnError(w, "Error when parsing JSON")
		return
	}

	// Check request has a body
	if len(requestBody) == 0 {
		returnError(w, "Request has no body")
		return
	}

	// Convert data into a subscriber
	var subDTO SubscriberDTO
	err = json.Unmarshal(requestBody, &subDTO)
	if err != nil {
		returnError(w, "Error when parsing JSON")
		return
	}
	LogString("\n\tRequest contents read")

	// Check endpoint was provided
	if subDTO.Endpoint == "" {
		returnError(w, "Endpoint not provided")
		return
	}

	// Check subscriber doesn't already exist
	currentSub, err := FetchSubscriber(subDTO.Endpoint)
	if err != nil {
		returnError(w, "Error when checking if subscriber already exists")
		return
	}
	if currentSub.Endpoint != "" {
		returnError(w, "Subscriber already exists")
		return
	}

	// Add subscriber to system
	var subscriber Subscriber
	subscriber.Endpoint = subDTO.Endpoint
	err = StoreSubscriber(subscriber)
	if err != nil {
		returnError(w, "Error when storing subscriber")
		return
	}

	// Update system state
	CurrentState.SubscriberCount++
	StoreSystemState(CurrentState)
	LogString("\n\tSystem state updated: " + strconv.Itoa(CurrentState.SubscriberCount) + " subscribers")

	// Return success value
	successDTO := SuccessDTO{Success: true}
	jsonBytes, _ := json.Marshal(successDTO)
	fmt.Fprintln(w, string(jsonBytes))
	LogString("\n\tResponse sent")
	return
}

// Remove a subscriber from the system (DELETE)
func removeSubscriber(w http.ResponseWriter, r *http.Request) {
	// Log signature
	LogTime()
	LogString("Remove Subscriber:")

	// Get message from request body
	requestBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		returnError(w, "Error when parsing JSON")
		return
	}

	// Check request has a body
	if len(requestBody) == 0 {
		returnError(w, "Request has no body")
		return
	}

	// Convert data into a subscriber
	var subDTO SubscriberDTO
	err = json.Unmarshal(requestBody, &subDTO)
	if err != nil {
		returnError(w, "Error when parsing JSON")
		return
	}
	LogString("\n\tRequest contents read")

	// Check subscriber exists
	currentSub, err := FetchSubscriber(subDTO.Endpoint)
	if err != nil {
		returnError(w, "Error when checking if subscriber exists")
		return
	}
	if currentSub.Endpoint == "" {
		returnError(w, "Subscriber does not exist")
		return
	}

	// Remove subsciber endpoint from each message
	for _, thisMessageUUID := range currentSub.MessageQueue {
		// Fetch
		thisMessage, err := FetchMessage(thisMessageUUID)
		if err != nil {
			returnError(w, "Error when fetching subscriber's messages")
			return
		}
		// Update
		thisMessage.SubsToSendTo, err = removeString(currentSub.Endpoint, thisMessage.SubsToSendTo)
		if err != nil {
			returnError(w, "Error when removing subscriber from message")
		}
		// Store
		err = StoreMessage(thisMessage)
		if err != nil {
			returnError(w, "Error when storing updated message")
			return
		}
	}

	// Remove subscriber from system
	err = DeleteSubscriber(subDTO.Endpoint)
	if err != nil {
		returnError(w, "Error when deleting subscriber")
		return
	}
	LogString("\n\tSubscriber removed from database")

	// Update stored state
	CurrentState.SubscriberCount--
	StoreSystemState(CurrentState)
	LogString("\n\tSystem state updated: " + strconv.Itoa(CurrentState.SubscriberCount) + " subscribers")

	// Return success value
	successDTO := SuccessDTO{Success: true}
	jsonBytes, _ := json.Marshal(successDTO)
	fmt.Fprintln(w, string(jsonBytes))
	LogString("\n\tResponse sent")
	return
}

// View all subscribers and their subscriptions (GET)
func getSubscribers(w http.ResponseWriter, r *http.Request) {
	// Log signature
	LogTime()
	LogString("Get Subscribers:")

	// Get all subs from database
	subscribers, err := FetchAllSubscribers()
	if err != nil {
		returnError(w, "Error when fetching subscribers")
		return
	}
	LogString("\n\tAll subscribers fetched")

	// Log all subs
	stringToLog := "\n\tSubscribers:"
	for _, subscriber := range subscribers {
		stringToLog += "\n\t\t- " + subscriber.Endpoint
		stringToLog += "\n\t\t\t- Subscriptions: " + strconv.Itoa(len(subscriber.SubbedTopics))
		stringToLog += "\n\t\t\t- Messages to collect: " + strconv.Itoa(len(subscriber.MessageQueue))
	}
	LogString(stringToLog)

	// Send response
	var subscribersDTO SubscribersDTO
	for _, subscriber := range subscribers {
		subscribersDTO.Endpoints = append(subscribersDTO.Endpoints, subscriber.Endpoint)
	}
	jsonBytes, _ := json.Marshal(subscribersDTO)
	fmt.Fprintln(w, string(jsonBytes))
	LogString("\n\tResponse sent")

}

// Subscribe a subscriber to a topic (POST)
func addSubscription(w http.ResponseWriter, r *http.Request) {

	// Log signature
	LogTime()
	LogString("Add Subscription:")

	// Get message from request body
	requestBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		returnError(w, "Error when parsing JSON")
		return
	}

	// Check request has a body
	if len(requestBody) == 0 {
		returnError(w, "Request has no body")
		return
	}

	// Convert data into a subscription DTO
	var subscriptionDTO SubscriptionDTO
	err = json.Unmarshal(requestBody, &subscriptionDTO)
	if err != nil {
		returnError(w, "Error when parsing JSON")
		return
	}
	LogString("\n\tRequest contents read")

	if subscriptionDTO.Endpoint == "" || subscriptionDTO.Topic == "" {
		// Subscription not complete => Error
		returnError(w, "Subscription description incomplete")
		return
	}

	// Log contents
	stringToLog := "\n\tSubscription: "
	stringToLog += "\n\t\t- Subscriber: " + subscriptionDTO.Endpoint
	stringToLog += "\n\t\t- Topic: " + subscriptionDTO.Topic
	LogString(stringToLog)

	// Check if subscriber exists
	subscriber, err := FetchSubscriber(subscriptionDTO.Endpoint)
	if err != nil {
		returnError(w, "Error when fetching subscriber")
		return
	}
	if subscriber.Endpoint == "" {
		// Subscriber doesn't exist => Error
		returnError(w, "Subscriber does not exist")
		return
	}
	LogString("\n\tSubscriber exists")

	// Check subscriber doesn't exceed max subscription count per subscriber
	if Config.maxTopicsPerSub > 0 && len(subscriber.SubbedTopics)+1 > Config.maxTopicsPerSub {
		// Reject new subscription
		returnError(w, "Subscriber already subscribed to maximum number of topics")
		return
	}

	// Check if topic channel exists
	channel, err := FetchChannel(subscriptionDTO.Topic)
	if err != nil {
		returnError(w, "Error when fetching topic channel")
		return
	}
	if channel.Topic == "" {
		// Topic doesn't exist => Error
		returnError(w, "Topic channel does not exist")
		return
	}
	LogString("\n\tTopic channel exists")

	// Check subscriber doesn't exceed max subscriptions on topic
	if Config.maxSubsPerTopic > 0 && len(channel.SubEndpoints)+1 > Config.maxSubsPerTopic {
		// Reject new subscription
		returnError(w, "Topic already has maximum number of subscribers")
		return
	}

	// Check subscription doesn't already exist
	subscriptionExists := false
	for _, subbedTopic := range subscriber.SubbedTopics {
		if subbedTopic == subscriptionDTO.Topic {
			subscriptionExists = true
			break
		}
	}
	if subscriptionExists {
		// Subscription doesn't exist => Error
		returnError(w, "Subscription already exists")
		return
	}
	LogString("\n\tSubscription doesn not exist")

	// All checks passed => Create subscription
	subscriber.SubbedTopics = append(subscriber.SubbedTopics, subscriptionDTO.Topic)
	err = StoreSubscriber(subscriber)
	if err != nil {
		returnError(w, "Error when updating subscriber")
		return
	}
	LogString("\n\tSubscriber updated")

	channel.SubEndpoints = append(channel.SubEndpoints, subscriptionDTO.Endpoint)
	err = StoreChannel(channel)
	if err != nil {
		returnError(w, "Error when updating channel")
		return
	}
	LogString("\n\tChannel updated")

	LogString("\n\tSubscription complete")

	// Return success value
	successDTO := SuccessDTO{Success: true}
	jsonBytes, _ := json.Marshal(successDTO)
	fmt.Fprintln(w, string(jsonBytes))
	LogString("\n\tResponse sent")
}

// Unsubscribe a subscriber from a topic (DELETE)
func removeSubscription(w http.ResponseWriter, r *http.Request) {

	// Log signature
	LogTime()
	LogString("Remove Subscription:")

	// Get message from request body
	requestBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		returnError(w, "Error when parsing JSON")
		return
	}

	// Check request has a body
	if len(requestBody) == 0 {
		returnError(w, "Request has no body")
		return
	}

	// Convert data into a subscription DTO
	var subscriptionDTO SubscriptionDTO
	err = json.Unmarshal(requestBody, &subscriptionDTO)
	if err != nil {
		returnError(w, "Error when parsing JSON")
		return
	}
	LogString("\n\tRequest contents read")

	if subscriptionDTO.Endpoint == "" || subscriptionDTO.Topic == "" {
		// Subscription not complete => Error
		returnError(w, "Subscription description incomplete")
		return
	}

	// Log contents
	stringToLog := "\n\tSubscription: "
	stringToLog += "\n\t\t- Subscriber: " + subscriptionDTO.Endpoint
	stringToLog += "\n\t\t- Topic: " + subscriptionDTO.Topic
	LogString(stringToLog)

	// Check if subscriber exists
	subscriber, err := FetchSubscriber(subscriptionDTO.Endpoint)
	if err != nil {
		returnError(w, "Error when fetching subscriber")
		return
	}
	if subscriber.Endpoint == "" {
		// Subscriber doesn't exist => Error
		returnError(w, "Subscriber does not exist")
		return
	}
	LogString("\n\tSubscriber exists")

	// Check if topic channel exists
	channel, err := FetchChannel(subscriptionDTO.Topic)
	if err != nil {
		returnError(w, "Error when fetching topic channel")
		return
	}
	if channel.Topic == "" {
		// Topic doesn't exist => Error
		returnError(w, "Topic channel does not exist")
		return
	}
	LogString("\n\tTopic channel exists")

	// Check subscription exists
	subscriptionExists := false
	subscriberTopicIndex := -1 // Index for topic in subscriber's SubbedTopics
	for index, subbedTopic := range subscriber.SubbedTopics {
		if subbedTopic == subscriptionDTO.Topic {
			subscriptionExists = true
			subscriberTopicIndex = index
			break
		}
	}
	if !subscriptionExists {
		// Subscription doesn't exist => Error
		returnError(w, "Subscription does not exist")
		return
	}
	LogString("\n\tSubscription exists")

	// All checks passed => Delete subscription

	// Remove topic from subscriber's subscription then store (index found earlier)
	subscriber.SubbedTopics = append(subscriber.SubbedTopics[:subscriberTopicIndex], subscriber.SubbedTopics[subscriberTopicIndex+1:]...)
	err = StoreSubscriber(subscriber)
	if err != nil {
		returnError(w, "Error when updating subscriber")
		return
	}
	LogString("\n\tSubscriber updated")

	// Find subscriber endpoint in channel SubEndpoints slice
	channelEndpointIndex := -1
	for index, endpoint := range channel.SubEndpoints {
		if endpoint == subscriptionDTO.Endpoint {
			channelEndpointIndex = index
			break
		}
	}
	if channelEndpointIndex == -1 {
		// Endpoint not found
		returnError(w, "Error when updating channel")
		return
	}

	// Remove endpoint from subscriber
	channel.SubEndpoints = append(channel.SubEndpoints[:channelEndpointIndex], channel.SubEndpoints[channelEndpointIndex+1:]...)
	err = StoreChannel(channel)
	if err != nil {
		returnError(w, "Error when updating channel")
		return
	}
	LogString("\n\tChannel updated")

	LogString("\n\tSubscription deleted")

	// Return success value
	successDTO := SuccessDTO{Success: true}
	jsonBytes, _ := json.Marshal(successDTO)
	fmt.Fprintln(w, string(jsonBytes))
	LogString("\n\tResponse sent")
}

// Generate a UUID for a publisher to include in a message (GET)
func generateUUID(w http.ResponseWriter, r *http.Request) {
	// Log signature
	LogTime()
	LogString("Generate UUID:")

	// Return new UUID
	responseDTO := UUIDDTO{UUID: uuid.New()}
	LogString("\n\tUUID generated: " + responseDTO.UUID.String())
	jsonBytes, _ := json.Marshal(responseDTO)
	fmt.Fprintln(w, string(jsonBytes))
	LogString("\n\tRepsonse sent")
	return
}

// Add all endpoints to program
func handleRequests() {
	// Mux router setup
	router := mux.NewRouter().StrictSlash(true)

	// Publish, pull and acknowledge messages
	router.HandleFunc("/publish", addMessage).Methods("POST")
	router.HandleFunc("/pull", pullMessages).Methods("GET")
	router.HandleFunc("/ack", receiveAcknowledgement).Methods("POST")

	// Create, delete and list topics
	router.HandleFunc("/topics", createTopic).Methods("POST")
	router.HandleFunc("/topics", deleteTopic).Methods("DELETE")
	router.HandleFunc("/topics", getTopics).Methods("GET")

	// Create, delete and list subscribers
	router.HandleFunc("/subscribers", addSubcriber).Methods("POST")
	router.HandleFunc("/subscribers", removeSubscriber).Methods("DELETE")
	router.HandleFunc("/subscribers", getSubscribers).Methods("GET")

	// Create and delete subscriptions
	router.HandleFunc("/subscriptions", addSubscription).Methods("POST")
	router.HandleFunc("/subscriptions", removeSubscription).Methods("DELETE")

	// Get system-compliant UUID
	router.HandleFunc("/generate", generateUUID).Methods("GET")

	// Start listening on specified port in config file
	log.Fatal(http.ListenAndServe(":"+strconv.Itoa(Config.port), router))
}

// ======================================
// ============ MAIN METHOD =============
// ======================================

func main() {

	// Define flags
	purgeFlagPtr := flag.Bool("purge", false, "Clear database and log file")
	configFileFlagPtr := flag.String("config", "./../assets/options.conf", "Set the location of the config file used")
	databaseFileFlagPtr := flag.String("database", "./../assets/storage.db", "Set the location of the database file used")

	// Read flags
	flag.Parse()

	// If purge flag set, clear log and database
	if *purgeFlagPtr == true {
		err := os.Remove("./../assets/storage.db")
		if err != nil {
			panic(err)
		}
		err = os.Remove("./../assets/storage.db.lock")
		if err != nil {
			panic(err)
		}
		_, err = os.Create("./../assets/log.txt")
		if err != nil {
			panic(err)
		}
	}

	// Open log file
	err := OpenLog()
	if err != nil {
		log.Fatal("Could not open log file")
	}
	LogTime()
	LogString("Log file opened")

	// Read config file, using specified location if flag set
	err = ReadConfigFile(*configFileFlagPtr)
	if err != nil {
		log.Fatal("Error when reading configuration. Please check the file.")
	}
	LogTime()
	LogString("Configuration read")

	// Start DB and cache
	err = InitialiseDB(*databaseFileFlagPtr)
	if err != nil {
		log.Fatal("Database unable to start")
	}
	LogTime()
	LogString("Database opened")

	// Read previous program state
	CurrentState, err = FetchSystemState()
	if err != nil {
		log.Fatal("Unable to read previous state")
	}
	LogTime()
	LogString("Previous state read from database")

	// Start REST API
	LogTime()
	LogString("Starting API")
	handleRequests()

	// Close DB
	err = CloseDB()
	if err != nil {
		log.Fatal("Database unable to close")
	}
	LogTime()
	LogString("Database closed")

	// Close log file
	LogTime()
	LogString("Closing log file")
	err = CloseLog()
	if err != nil {
		log.Fatal("Log file unable to close")
	}
}
