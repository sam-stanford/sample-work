package main

import (
	"encoding/json"
	"flag"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"

	"./database"
	"github.com/google/uuid"
	"github.com/gorilla/mux"
)

// =====================================
// ========= DATA STRUCTURES ===========
// =====================================

// SystemState is a variable representation of the system
type SystemState struct {
	GameIDs []uuid.UUID `json:"gameIDs"` // All games being played with this system
}

// Game represents a game being played
type Game struct {
	GameID          uuid.UUID   `json:"gameID"`          // The UUID for the game
	CreatorID       uuid.UUID   `json:"creatorID"`       // The UUID of the game creator
	Name            string      `json:"gameName"`        // The name of the game
	RequiredPlayers int         `json:"requiredPlayers"` // Number of wanted players for the game
	PlayerIDs       []uuid.UUID `json:"playerIDs"`       // IDs of the players involved in the game
	Moves           []Move      `json:"moves"`           // Moves for player to receive
	MoveCounter     int         `json:"moveCounter"`     // Move counter for moves
}

// Move respresents a move published by a player to a game
type Move struct {
	MoveID       uuid.UUID   `json:"moveID"`       // Move ID
	Payload      string      `json:"payload"`      // Contains move info, e.g. card/bid, player no., etc.
	PlayerID     uuid.UUID   `json:"playerID"`     // Player ID who published the message
	PlayersToAck []uuid.UUID `json:"playersToAck"` // List of the players left to acknowledge the message
}

// =====================================
// ======= API DATA STRUCTURES =========
// =====================================

// UUIDDTO contains only a UUID - Used in genUUID()
type UUIDDTO struct {
	ID uuid.UUID `json:"ID"`
}

// NewGameInfoDTO contains the information for a new game to be created
type NewGameInfoDTO struct {
	CreatorID       uuid.UUID `json:"creatorID"`       // Game creator's ID
	GameID          uuid.UUID `json:"gameID"`          // Game's ID
	GameName        string    `json:"gameName"`        // Game's name
	RequiredPlayers int       `json:"requiredPlayers"` // Required number of players
	GameSpec        string    `json:"gameSpec"`        // JSON game spec
}

// GameDesc holds the game data returned as part of a didcovery request
type GameDesc struct {
	GameName        string    `json:"gameName"`        // Name of the game
	GameID          uuid.UUID `json:"gameID"`          // ID of the game
	CurrentPlayers  int       `json:"currentPlayers"`  // Number of currently players in the game
	RequiredPlayers int       `json:"requiredPlayers"` // Number of required players for the game to start

}

// GamesListDTO contains the list of games returned to a discovery request
type GamesListDTO struct {
	Games []GameDesc `json:"games"` // Slice of game descriptions
}

// PlayerGameDTO contains the IDs for a player and a game - Used in joining and deleting a game, and pulling moves
type PlayerGameDTO struct {
	GameID   uuid.UUID `json:"gameID"`   // ID of the game
	PlayerID uuid.UUID `json:"playerID"` // ID of the player
}

// MoveDTO contains the information of a published/pulled move
type MoveDTO struct {
	MoveID     uuid.UUID `json:"moveID"`     // ID of this move
	GameID     uuid.UUID `json:"gameID"`     // ID of the game which the message is associated with
	PlayerID   uuid.UUID `json:"playerID"`   // ID of the player making the move
	MoveNumber int       `json:"moveNumber"` // Move number in the game
	MoveType   string    `json:"moveType"`   // Which type of move this is ("bid", "card")
	MoveValue  string    `json:"moveValue"`  // The move's value - see md file
}

// MoveListDTO contains the list of moves returned to a pull request
type MoveListDTO struct {
	Moves []MoveDTO `json:"moves"` // List of moves
}

// PlayerGameMoveDTO contains the IDs for a player, a game, and a move - Used in acknowledging a move
type PlayerGameMoveDTO struct {
	PlayerID uuid.UUID `json:"playerID"`
	GameID   uuid.UUID `json:"gameID"`
	MoveID   uuid.UUID `json:"moveID"`
}

// TakeTurnDTO contains the takeTurnNow boolean returned when joining a game
type TakeTurnDTO struct {
	TakeTurnNow bool `json:"takeTurnNow"`
}

// =====================================
// ========= GLOBAL VARIABLES ==========
// =====================================

// Bucket names for the database
const gamesBucketName string = "games"
const programBucketName string = "program"

// Key for storing the sytsem state
const systemStateKey string = "state"

// Pub-sub state encapsulated as a JSON-encodable variable
var systemState SystemState

// =====================================
// ==== DATABASE FUNCTION WRAPPERS =====
// =====================================

// Store system state
func storeSystemState(state SystemState) error {

	// State variable to string
	stateAsString, err := JSONStructToString(state)
	if err != nil {
		return err
	}

	// Store string in database
	err = database.StoreKeyValue(systemStateKey, stateAsString, programBucketName)
	if err != nil {
		return err
	}

	return nil
}

// Fetch system state
func fetchSystemState() (SystemState, error) {

	// Fetch string from database
	stateAsString, err := database.FetchValue(systemStateKey, programBucketName)
	if err != nil {
		return *new(SystemState), err
	}

	if len(stateAsString) != 0 {
		// Convert to SystemState struct
		var readState SystemState
		err = json.Unmarshal([]byte(stateAsString), &readState)
		if err != nil {
			return *new(SystemState), err
		}

		// Successful decoding
		return readState, nil

	}
	// Else no state stored, so return empty new stae
	return *new(SystemState), nil

}

// Store game
func storeGame(game Game) error {

	// State to JSON string
	jsonString, err := JSONStructToString(game)
	if err != nil {
		return err
	}

	// Store string
	err = database.StoreKeyValue(game.GameID.String(), jsonString, gamesBucketName)
	if err != nil {
		return err
	}

	// Success
	return nil
}

// Fetch game from given ID
func fetchGame(gameID uuid.UUID) (Game, error) {

	// Fetch string from database
	stateAsString, err := database.FetchValue(gameID.String(), gamesBucketName)
	if err != nil {
		return *new(Game), err
	}

	// Return empty struct if no bytes retrieved
	if len(stateAsString) == 0 {
		return *new(Game), nil
	}

	// Convert to Game struct
	var readGame Game
	err = json.Unmarshal([]byte(stateAsString), &readGame)
	if err != nil {
		return *new(Game), err
	}

	// Successful decoding
	return readGame, nil
}

// =====================================
// ======= AUXILLARY FUNCTIONS =========
// =====================================

// JSONStructToString converts a given struct to a JSON string
func JSONStructToString(JSONStruct interface{}) (string, error) {
	// Convert struct to JSON string
	jsonBytes, err := json.Marshal(JSONStruct)
	if err != nil {
		return "", err
	}
	return string(jsonBytes), nil
}

// Writes a given string to the given RepsonseWriter with the given IANA HTTP status code in the header
func respond(w http.ResponseWriter, responseString string, statusCode int) {
	// Send response with status code
	w.WriteHeader(statusCode)
	fmt.Fprintln(w, responseString)
	return
}

// =====================================
// =========== API FUNCTIONS ===========
// =====================================

// Endpoint to generate a UUID
func genUUID(w http.ResponseWriter, r *http.Request) {
	// Create response
	returnDTO := UUIDDTO{ID: uuid.New()}

	// Write response as JSON
	responseString, err := JSONStructToString(returnDTO)
	if err != nil {
		respond(w, "Error converting responseDTO to string", http.StatusInternalServerError)
		return
	}
	respond(w, responseString, http.StatusOK)
	return
}

// Create a game
func createGame(w http.ResponseWriter, r *http.Request) {

	// Get request body as bytes
	requestBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		respond(w, "Error when parsing request body", http.StatusBadRequest)
		return
	}

	// Check request has a body
	if len(requestBody) == 0 {
		respond(w, "Request has no body", http.StatusBadRequest)
		return
	}

	// Convert body into NewGameInfoDTO
	var newGameInfoDTO NewGameInfoDTO
	err = json.Unmarshal(requestBody, &newGameInfoDTO)
	if err != nil {
		respond(w, "JSON in incorrect format", http.StatusBadRequest)
		return
	}

	// Check all fields are set
	if newGameInfoDTO.CreatorID.String() == "00000000-0000-0000-0000-000000000000" ||
		newGameInfoDTO.GameID.String() == "00000000-0000-0000-0000-000000000000" ||
		newGameInfoDTO.GameName == "" ||
		newGameInfoDTO.GameSpec == "" ||
		newGameInfoDTO.RequiredPlayers == 0 {
		respond(w, "JSON incomplete", http.StatusBadRequest)
		return
	}

	// Check game with same ID doesn't already exist
	currentGame, err := fetchGame(newGameInfoDTO.GameID)
	if err != nil {
		respond(w, "Error checking if database key is unused", http.StatusInternalServerError)
		return
	}
	if currentGame.Name != "" {
		// Game already exists
		respond(w, "Game with provided ID already exists", http.StatusBadRequest)
		return
	}

	// Add game to database
	newGame := Game{
		GameID:          newGameInfoDTO.GameID,
		CreatorID:       newGameInfoDTO.CreatorID,
		Name:            newGameInfoDTO.GameName,
		RequiredPlayers: newGameInfoDTO.RequiredPlayers,
	}
	newGame.PlayerIDs = append(newGame.PlayerIDs, newGameInfoDTO.CreatorID)
	err = storeGame(newGame)
	if err != nil {
		respond(w, "Error storing new game in database", http.StatusInternalServerError)
		return
	}

	// Add UUID to system state's list
	systemState.GameIDs = append(systemState.GameIDs, newGame.GameID)
	err = storeSystemState(systemState)
	if err != nil {
		respond(w, "Error updating system with new game", http.StatusInternalServerError)
	}

	// Respond & return
	respond(w, "Success", http.StatusOK)
	return

}

// Discover created games
func viewGames(w http.ResponseWriter, r *http.Request) {

	// Struct to store retrieved games in
	var returnDTO GamesListDTO

	// Use UUIDs stored in system state to access all stored games
	for _, thisGameID := range systemState.GameIDs {

		// Fetch game from ID
		thisGame, err := fetchGame(thisGameID)
		if err != nil {
			respond(w, "Error when fetching a game from the database", http.StatusInternalServerError)
			return
		}

		// If game has less than wanted players, add to return list
		if len(thisGame.PlayerIDs) < thisGame.RequiredPlayers {
			// Create desc struct from game struct
			thisGameDesc := GameDesc{
				GameName:        thisGame.Name,
				GameID:          thisGame.GameID,
				CurrentPlayers:  len(thisGame.PlayerIDs),
				RequiredPlayers: thisGame.RequiredPlayers,
			}

			// Add to return list
			returnDTO.Games = append(returnDTO.Games, thisGameDesc)
		}
	}

	// Respond to client
	responseString, err := JSONStructToString(returnDTO)
	if err != nil {
		respond(w, "Error when converting games into JSON", http.StatusInternalServerError)
		return
	}
	respond(w, responseString, http.StatusOK)
	return

}

// Join a player to a game
func joinGame(w http.ResponseWriter, r *http.Request) {

	// Get request body as bytes
	requestBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		respond(w, "Error when parsing request body", http.StatusBadRequest)
		return
	}

	// Check request has a body
	if len(requestBody) == 0 {
		respond(w, "Request has no body", http.StatusBadRequest)
		return
	}

	// Convert body into PlayerGameDTO (struct for player and game IDs only)
	var playerGameDTO PlayerGameDTO
	err = json.Unmarshal(requestBody, &playerGameDTO)
	if err != nil {
		respond(w, "JSON in incorrect format", http.StatusBadRequest)
		return
	}

	// Check both IDs are given
	if playerGameDTO.GameID.String() == "00000000-0000-0000-0000-000000000000" ||
		playerGameDTO.PlayerID.String() == "00000000-0000-0000-0000-000000000000" {
		respond(w, "Request JSON is incomplete", http.StatusBadRequest)
		return
	}

	// Check game exists
	game, err := fetchGame(playerGameDTO.GameID)
	if err != nil {
		respond(w, "Error fetching the game from the database", http.StatusInternalServerError)
		return
	}
	if game.Name == "" {
		respond(w, "Game does not exist", http.StatusBadRequest)
		return
	}

	// Check game has a space available
	if len(game.PlayerIDs) == game.RequiredPlayers {
		respond(w, "Game is already full", http.StatusBadRequest)
		return
	}

	// Check player is not already in game
	for _, thisPlayerID := range game.PlayerIDs {
		if thisPlayerID.String() == playerGameDTO.PlayerID.String() {
			// Player ID matches one already in the game
			respond(w, "Player is already in the game", http.StatusBadRequest)
			return
		}
	}

	// Add player to game & store
	game.PlayerIDs = append(game.PlayerIDs, playerGameDTO.PlayerID)
	err = storeGame(game)
	if err != nil {
		respond(w, "Error when updating the game in database", http.StatusInternalServerError)
		return
	}

	// Return TakeTurnDTO to tell players whether it is their go
	var takeTurnDTO TakeTurnDTO
	if len(game.PlayerIDs) == game.RequiredPlayers {
		takeTurnDTO.TakeTurnNow = true
	} else {
		takeTurnDTO.TakeTurnNow = false
	}
	responseString, err := JSONStructToString(takeTurnDTO)
	if err != nil {
		respond(w, "Error when forming response string", http.StatusInternalServerError)
		return
	}
	respond(w, responseString, http.StatusOK)
	return
}

// Publish a move to system
func publishMove(w http.ResponseWriter, r *http.Request) {

	// Get request body as bytes
	requestBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		respond(w, "Error when parsing request body", http.StatusBadRequest)
		return
	}

	// Check request has a body
	if len(requestBody) == 0 {
		respond(w, "Request has no body", http.StatusBadRequest)
		return
	}

	// Convert body into moveDTO (struct for move contents)
	var moveDTO MoveDTO
	err = json.Unmarshal(requestBody, &moveDTO)
	if err != nil {
		respond(w, "JSON in incorrect format", http.StatusBadRequest)
		return
	}

	// Check all fields are set properly
	if moveDTO.GameID.String() == "00000000-0000-0000-0000-000000000000" {
		respond(w, "gameID not included in JSON", http.StatusBadRequest)
		return
	}
	if moveDTO.MoveType == "" {
		respond(w, "moveType not included in JSON", http.StatusBadRequest)
		return
	}
	if moveDTO.MoveValue == "" {
		respond(w, "moveValue not included in JSON", http.StatusBadRequest)
		return
	}
	if moveDTO.PlayerID.String() == "00000000-0000-0000-0000-000000000000" {
		respond(w, "playerID not included in JSON", http.StatusBadRequest)
		return
	}

	// Check provided game ID matches a game in the system
	game, err := fetchGame(moveDTO.GameID)
	if err != nil {
		respond(w, "Error when fetching game from database", http.StatusInternalServerError)
		return
	}
	if game.Name == "" {
		respond(w, "Provided gameID does not match a game in the system", http.StatusBadRequest)
		return
	}

	// Check move counter increments from game unless first move
	if moveDTO.MoveNumber != game.MoveCounter+1 {
		respond(w, "Provided moveNumber does not increment the game's move counter", http.StatusBadRequest)
		return
	}

	// Give moveDTO a UUID
	moveDTO.MoveID = uuid.New()

	// Convert moveDTO to JSON string and store in new Message struct
	movePayload, err := JSONStructToString(moveDTO)
	if err != nil {
		respond(w, "Error when converting provided move to JSON string", http.StatusInternalServerError)
		return
	}
	move := Move{Payload: movePayload, PlayerID: moveDTO.PlayerID, MoveID: moveDTO.MoveID}

	// Add all other players in game to message to-acknowledge list
	// Also check that the player is in the game
	playerInGame := false
	for _, thisPlayerID := range game.PlayerIDs {
		if moveDTO.PlayerID.String() == thisPlayerID.String() {
			playerInGame = true
		} else {
			move.PlayersToAck = append(move.PlayersToAck, thisPlayerID)
		}
	}
	if !playerInGame {
		respond(w, "Provided playerID does not match one in the game", http.StatusBadRequest)
		return
	}

	// Add move to game, and increment move counter
	game.Moves = append(game.Moves, move)
	game.MoveCounter++
	err = storeGame(game)
	if err != nil {
		respond(w, "Error when updating game in database", http.StatusInternalServerError)
		return
	}

	// Respond
	respond(w, "Success", http.StatusOK)
	return
}

// Pull all relevant moves for one game from the system
func pullMoves(w http.ResponseWriter, r *http.Request) {

	// Get request body as bytes
	requestBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		respond(w, "Error when parsing request body", http.StatusBadRequest)
		return
	}

	// Check request has a body
	if len(requestBody) == 0 {
		respond(w, "Request has no body", http.StatusBadRequest)
		return
	}

	// Convert body into playerGameDTO (player ID and game ID)
	var playerGameDTO PlayerGameDTO
	err = json.Unmarshal(requestBody, &playerGameDTO)
	if err != nil {
		respond(w, "JSON in incorrect format", http.StatusBadRequest)
		return
	}

	// Check both IDs are set
	if playerGameDTO.GameID.String() == "00000000-0000-0000-0000-000000000000" {
		respond(w, "gameID not included in JSON", http.StatusBadRequest)
		return
	}
	if playerGameDTO.PlayerID.String() == "00000000-0000-0000-0000-000000000000" {
		respond(w, "playerID not included in JSON", http.StatusBadRequest)
		return
	}

	// Fetch game & check exists
	game, err := fetchGame(playerGameDTO.GameID)
	if err != nil {
		respond(w, "Error when fetching game from database", http.StatusInternalServerError)
		return
	}
	if game.Name == "" {
		respond(w, "Provided gameID does not match any game", http.StatusBadRequest)
		return
	}

	// Add all messages which player needs to acknowledge to responseDTO
	var responseDTO MoveListDTO
	for _, thisMove := range game.Moves { // Loop moves
		for _, thisPlayerID := range thisMove.PlayersToAck { // Loop players left to ack

			// If provided player matches a player to ack, add message to responseDTO
			if thisPlayerID.String() == playerGameDTO.PlayerID.String() {
				// Payload to struct
				var thisMoveDesc MoveDTO
				err = json.Unmarshal([]byte(thisMove.Payload), &thisMoveDesc)
				if err != nil {
					respond(w, "Error converting found message from JSON", http.StatusInternalServerError)
					return
				}

				// Add to response
				responseDTO.Moves = append(responseDTO.Moves, thisMoveDesc)
			}
		}
	}

	// Form response & respond
	responseString, err := JSONStructToString(responseDTO)
	if err != nil {
		respond(w, "Error when forming response string from messages", http.StatusInternalServerError)
		return
	}
	respond(w, responseString, http.StatusOK)
	return
}

// Acknowledge a move
func acknowledgeMove(w http.ResponseWriter, r *http.Request) {

	// Get request body as bytes
	requestBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		respond(w, "Error when parsing request body", http.StatusBadRequest)
		return
	}

	// Check request has a body
	if len(requestBody) == 0 {
		respond(w, "Request has no body", http.StatusBadRequest)
		return
	}

	// Convert body into playerGameMoveDTO (player ID, game ID, and move ID)
	var playerGameMoveDTO PlayerGameMoveDTO
	err = json.Unmarshal(requestBody, &playerGameMoveDTO)
	if err != nil {
		respond(w, "JSON in incorrect format", http.StatusBadRequest)
		return
	}

	// Check all fields are set
	if playerGameMoveDTO.PlayerID.String() == "00000000-0000-0000-0000-000000000000" {
		respond(w, "playerID not included in JSON", http.StatusBadRequest)
		return
	}
	if playerGameMoveDTO.GameID.String() == "00000000-0000-0000-0000-000000000000" {
		respond(w, "gameID not included in JSON", http.StatusBadRequest)
		return
	}
	if playerGameMoveDTO.MoveID.String() == "00000000-0000-0000-0000-000000000000" {
		respond(w, "moveID not included in JSON", http.StatusBadRequest)
		return
	}

	// Fetch game & check exists
	game, err := fetchGame(playerGameMoveDTO.GameID)
	if err != nil {
		respond(w, "Error when fetching game from database", http.StatusInternalServerError)
		return
	}
	if game.Name == "" {
		respond(w, "Provided gameID does not match any game", http.StatusBadRequest)
		return
	}

	// Check player is in game
	playerInGame := false
	for _, thisPlayerID := range game.PlayerIDs {
		// Loop through all players checking for match
		if thisPlayerID.String() == playerGameMoveDTO.PlayerID.String() {
			playerInGame = true
			break
		}
	}
	if !playerInGame {
		respond(w, "Provided playerID does not match any player in provided game", http.StatusBadRequest)
		return
	}

	// Find move in game from moveID
	for i, thisMove := range game.Moves {
		if thisMove.MoveID.String() == playerGameMoveDTO.MoveID.String() {
			// Found => Now find index of player in list of players left to ack message
			for j, thisPlayerID := range thisMove.PlayersToAck {
				if thisPlayerID.String() == playerGameMoveDTO.PlayerID.String() {
					// Found => Remove from list
					thisMove.PlayersToAck = append(thisMove.PlayersToAck[:j], thisMove.PlayersToAck[j+1:]...)
					game.Moves[i] = thisMove

					// Remove move from system if all players acknowledged
					if len(thisMove.PlayersToAck) == 0 {
						game.Moves = append(game.Moves[:i], game.Moves[i+1:]...)
					}

					// Store updated game
					err = storeGame(game)
					if err != nil {
						respond(w, "Error when updating game in database", http.StatusInternalServerError)
						return
					}

					// Respond with success
					respond(w, "Success. All players now acknowledged", http.StatusOK)
					return
				}
			}

			// Player does not exist in list of players to ack
			respond(w, "Provided playerID cannot acknowledge message with provided messageID", http.StatusBadRequest)
			return

		}

	}

	// No matching move found
	respond(w, "No move with given ID in game", http.StatusBadRequest)
	return

}

// Delete a game from the system
func deleteGame(w http.ResponseWriter, r *http.Request) {

	// Get request body as bytes
	requestBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		respond(w, "Error when parsing request body", http.StatusBadRequest)
		return
	}

	// Check request has a body
	if len(requestBody) == 0 {
		respond(w, "Request has no body", http.StatusBadRequest)
		return
	}

	// Convert body into PlayerGameDTO (struct for player and game IDs only)
	var playerGameDTO PlayerGameDTO
	err = json.Unmarshal(requestBody, &playerGameDTO)
	if err != nil {
		respond(w, "JSON in incorrect format", http.StatusBadRequest)
		return
	}

	// Check both IDs are given
	if playerGameDTO.GameID.String() == "00000000-0000-0000-0000-000000000000" ||
		playerGameDTO.PlayerID.String() == "00000000-0000-0000-0000-000000000000" {
		respond(w, "Request JSON is incomplete", http.StatusBadRequest)
		return
	}

	// Check game exists
	storedGame, err := fetchGame(playerGameDTO.GameID)
	if err != nil {
		respond(w, "Error when checking the game exists in the database", http.StatusInternalServerError)
		return
	}
	if storedGame.Name == "" {
		// No game existed
		respond(w, "No game with given ID exists", http.StatusBadRequest)
		return
	}

	// Check player is game creator
	if storedGame.CreatorID.String() != playerGameDTO.PlayerID.String() {
		respond(w, "Provided player ID does not match that of the game creator", http.StatusBadRequest)
		return
	}

	// Delete game
	err = database.DeleteKeyValue(playerGameDTO.GameID.String(), gamesBucketName)
	if err != nil {
		respond(w, "Error when deleting game from database", http.StatusInternalServerError)
	}
	return
}

// Start REST API
func handleAPIRequests() {

	// Mux router setup
	router := mux.NewRouter().StrictSlash(true)

	// Create endpoints
	router.HandleFunc("/GenID", genUUID).Methods("GET")                // Get a new UUID
	router.HandleFunc("/Create", createGame).Methods("POST")           // Create a new game
	router.HandleFunc("/Discover", viewGames).Methods("GET")           // Discover joinable games
	router.HandleFunc("/Join", joinGame).Methods("POST")               // Join a game
	router.HandleFunc("/Publish", publishMove).Methods("POST")         // Publish a move
	router.HandleFunc("/Pull", pullMoves).Methods("GET")               // Pull published moves
	router.HandleFunc("/Acknowledge", acknowledgeMove).Methods("POST") // Acknowledge a pulled move
	router.HandleFunc("/Delete", deleteGame).Methods("DELETE")         // Delete a game

	// Start router
	log.Fatal(http.ListenAndServe(":3099", router))
	return
}

// =====================================
// =========== MAIN FUNCTION ===========
// =====================================

func main() {

	// Check for testing flag
	testFlagPtr := flag.Bool("test", false, "Use a temporary database for testing?")
	flag.Parse()

	// Delete testing database if test flag set
	if *testFlagPtr {
		_, err := os.Stat("./test.db")
		if err == nil { // If err not nil, file doesn't exist
			err := os.Remove("./test.db")
			if err != nil {
				log.Fatal(err)
			}
		}
	}

	// Open database
	databaseFilename := "./database/AcesSeven.db"
	if *testFlagPtr {
		databaseFilename = "./test.db" // Set to different name if testing
	}
	err := database.Init(databaseFilename)
	if err != nil {
		log.Fatal(err)
	}
	defer database.Close() // Close DB at end of main

	// Create buckets in database for storage
	err = database.CreateBucket(programBucketName)
	if err != nil {
		log.Fatal(err)
	}
	err = database.CreateBucket(gamesBucketName)
	if err != nil {
		log.Fatal(err)
	}

	// Load system state
	systemState, err = fetchSystemState()
	if err != nil {
		log.Fatal(err)
	}

	// Start API
	handleAPIRequests()
}
