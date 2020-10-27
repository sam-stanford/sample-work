package main

// This file is used to test the pub-sub system.
// Please start the pub-sub system with the -test flag, then execute this built file

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strconv"
	"strings"

	"github.com/google/uuid"
)

// UUIDStruct is used in tests to unmarshal a UUID in JSON format
type UUIDStruct struct {
	UUID uuid.UUID `json:"ID"`
}

// GameDesc holds the game data returned as part of a didcovery request - Copy from pub-sub.go
type GameDesc struct {
	GameName        string    `json:"gameName"`        // Name of the game
	GameID          uuid.UUID `json:"gameID"`          // ID of the game
	CurrentPlayers  int       `json:"currentPlayers"`  // Number of currently players in the game
	RequiredPlayers int       `json:"requiredPlayers"` // Number of required players for the game to start

}

// GamesListDTO contains the list of games returned to a discovery request- Copy from pub-sub.go
type GamesListDTO struct {
	Games []GameDesc `json:"games"` // Slice of game descriptions
}

// PlayerGameDTO contains the IDs for a player and a game - Used in joining and deleting a game, and pulling moves - Copy from pub-sub.go
type PlayerGameDTO struct {
	GameID   uuid.UUID `json:"gameID"`   // ID of the game
	PlayerID uuid.UUID `json:"playerID"` // ID of the player
}

// TakeTurnNowDTO contains the takeTurnNow boolean returned from a successful Join request
type TakeTurnNowDTO struct {
	TakeTurnNow bool `json:"takeTurnNow"`
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

// MAIN METHOD - ALL TESTS
func main() {
	// =====================================
	// ======== TESTING CONSTANTS ==========
	// =====================================

	const zeroID = "00000000-0000-0000-0000-000000000000"

	// ==============================
	// =========== TEST 1 ===========
	// ==============================

	fmt.Printf("TEST 1: /GenID gives no errors for standard input - ")

	// Make GET request to GenID endpoint
	response, err := http.Get("http://localhost:3099/GenID")
	if err != nil {
		fmt.Printf("FAIL\n\t- Error: %s", err)
		return
	}
	// Check for OK status
	if response.Status != "200 OK" {
		fmt.Printf("FAIL\n\t- Got: %s, Wanted: %s", response.Status, "200 OK")
		return
	}
	fmt.Printf("PASS")

	// ==============================
	// =========== TEST 2 ===========
	// ==============================

	fmt.Printf("\nTEST 2: /GenID response is a UUID - ")

	// Body -> JSON bytes
	bytes, err := ioutil.ReadAll(response.Body)
	if err != nil {
		fmt.Printf("FAIL\n\t- Error: %s", err)
		return
	}
	// JSON bytes -> UUID inside struct
	var uuidStruct UUIDStruct
	err = json.Unmarshal(bytes, &uuidStruct)
	if err != nil {
		fmt.Printf("FAIL\n\t- Error: %s", err)
		return
	}
	// Check UUID inside stuct is non-zero
	if uuidStruct.UUID.String() == zeroID {
		fmt.Printf("FAIL\n\t- Zero ID retrieved")
		return
	}
	fmt.Printf("PASS")

	// ==============================
	// =========== TEST 3 ===========
	// ==============================

	fmt.Printf("\nTEST 3: /GenID returns differernt IDs - ")
	// Get another UUID
	response, err = http.Get("http://localhost:3099/GenID")
	if err != nil {
		fmt.Printf("FAIL\n\t- Error: %s", err)
		return
	}
	// Body -> JSON bytes
	bytes, err = ioutil.ReadAll(response.Body)
	if err != nil {
		fmt.Printf("FAIL\n\t- Error: %s", err)
		return
	}
	// JSON bytes -> UUID inside struct
	var nextUUIDStruct UUIDStruct
	err = json.Unmarshal(bytes, &nextUUIDStruct)
	if err != nil {
		fmt.Printf("FAIL\n\t- Error: %s", err)
		return
	}
	// Check UUID inside stuct is non-zero
	if nextUUIDStruct.UUID.String() == zeroID {
		fmt.Printf("FAIL\n\t- Zero ID retrieved")
		return
	}
	// Check UUIDs aren't the same
	if uuidStruct.UUID.String() == nextUUIDStruct.UUID.String() {
		fmt.Printf("FAIL\n\t- Error: %s", err)
		return
	}
	fmt.Printf("PASS")

	// ==============================
	// =========== TEST 4 ===========
	// ==============================
	fmt.Printf("\nTEST 4: /Create rejects incomplete request - ")
	// Create & send incomplete request
	request := "{}"
	response, err = http.Post("http://localhost:3099/Create", "application/json", strings.NewReader(request))
	if err != nil {
		// Request should give 400, but not fail
		fmt.Printf("FAIL\n\t- Error: %s", err)
		return
	}
	// Check correct response is given
	if response.Status != "400 Bad Request" {
		fmt.Printf("FAIL\n\t- Got: %s, Wanted: %s", response.Status, "400 Bad Request")
		return
	}
	fmt.Printf("PASS")

	// ==============================
	// =========== TEST 5 ===========
	// ==============================
	fmt.Printf("\nTEST 5: /Create gives no errors for standard input - ")
	// Create dummy game
	gameCreatorID := uuidStruct.UUID
	gameID := nextUUIDStruct.UUID
	gameName := "GameName"
	requiredPlayers := "2"
	gameSpec := "GameRules.json"
	request = `{"creatorID":"` + gameCreatorID.String() + `",` +
		`"gameID":"` + gameID.String() + `",` +
		`"gameName":"` + gameName + `",` +
		`"requiredPlayers":` + requiredPlayers + `,` +
		`"gameSpec":"` + gameSpec + `"` + `}`

	// Send game to /Create endpoint
	response, err = http.Post("http://localhost:3099/Create", "application/json", strings.NewReader(request))
	if err != nil {
		fmt.Printf("FAIL\n\t- Error: %s", err)
		return
	}
	// Check for OK status
	if response.Status != "200 OK" {
		fmt.Printf("FAIL\n\t- Got: %s, Wanted: %s", response.Status, "200 OK")
		return
	}
	fmt.Printf("PASS")

	// ==============================
	// =========== TEST 6 ===========
	// ==============================
	fmt.Printf("\nTEST 6: /Create does not allow duplicate game ID - ")
	// Resend same request as TEST 5
	response, err = http.Post("http://localhost:3099/Create", "application/json", strings.NewReader(request))
	if err != nil {
		fmt.Printf("FAIL\n\t- Error: %s", err)
		return
	}
	// Check for correct response code
	if response.Status != "400 Bad Request" {
		fmt.Printf("FAIL\n\t- Got: %s, Wanted: %s", response.Status, "400 Bad Request")
		return
	}
	fmt.Printf("PASS")

	// ==============================
	// =========== TEST 7 ===========
	// ==============================
	fmt.Printf("\nTEST 7: /Discover returns created game with no errors - ")
	// Send GET request to /Discover
	response, err = http.Get("http://localhost:3099/Discover")
	if err != nil {
		fmt.Printf("FAIL\n\t- Error: %s", err)
		return
	}
	// Check for OK code
	if response.Status != "200 OK" {
		fmt.Printf("FAIL\n\t- Got: %s, Wanted: %s", response.Status, "200 OK")
		return
	}
	// Body -> Bytes
	bytes, err = ioutil.ReadAll(response.Body)
	if err != nil {
		fmt.Printf("FAIL\n\t- Error: %s", err)
		return
	}
	// Bytes -> Games list
	var gameList GamesListDTO
	err = json.Unmarshal(bytes, &gameList)
	if err != nil {
		fmt.Printf("FAIL\n\t- Error: %s", err)
		return
	}
	// Check only 1 game returned
	if len(gameList.Games) != 1 {
		fmt.Printf("FAIL\n\t- Wanted: %d game, Got: %d game(s)", 1, len(gameList.Games))
		return
	}
	// Check game matches that which was submitted earlier
	if gameList.Games[0].CurrentPlayers != 1 ||
		gameList.Games[0].GameID.String() != gameID.String() ||
		gameList.Games[0].GameName != gameName ||
		strconv.Itoa(gameList.Games[0].RequiredPlayers) != requiredPlayers {
		fmt.Printf("FAIL\n\t- Game description does not match that of stored game")
		fmt.Printf("\n\t\tcurrentPlayers, gameID, gameName, requiredPlayers")
		fmt.Printf("\n\t\tWanted: %d, %s, %s, %s", 1, gameID.String(), gameName, requiredPlayers)
		fmt.Printf("\n\t\tGot: %d, %s, %s, %d", gameList.Games[0].CurrentPlayers,
			gameList.Games[0].GameID.String(), gameList.Games[0].GameName, gameList.Games[0].RequiredPlayers)
		return
	}
	fmt.Printf("PASS")

	// ==============================
	// =========== TEST 8 ===========
	// ==============================
	fmt.Printf("\nTEST 8: /Create allows multiple games, discover returns them all - ")
	// Send same game, but with new UUID
	gameID2 := uuid.New()
	request = `{"creatorID":"` + gameCreatorID.String() + `",` +
		`"gameID":"` + gameID2.String() + `",` +
		`"gameName":"` + gameName + `",` +
		`"requiredPlayers":` + requiredPlayers + `,` +
		`"gameSpec":"` + gameSpec + `"` + `}`
	response, err = http.Post("http://localhost:3099/Create", "application/json", strings.NewReader(request))
	if err != nil {
		fmt.Printf("FAIL\n\t- Error: %s", err)
		return
	}
	// Response code should be OK
	if response.Status != "200 OK" {
		fmt.Printf("FAIL\n\t- Got: %s, Wanted: %s", response.Status, "200 OK")
		return
	}
	// Send another GET request to /Discover to see if new game is found
	response, err = http.Get("http://localhost:3099/Discover")
	if err != nil {
		fmt.Printf("FAIL\n\t- Error: %s", err)
		return
	}
	// Should not cause a problem
	if response.Status != "200 OK" {
		fmt.Printf("FAIL\n\t- Got: %s, Wanted: %s", response.Status, "200 OK")
		return
	}
	// Body -> bytes
	bytes, err = ioutil.ReadAll(response.Body)
	if err != nil {
		fmt.Printf("FAIL\n\t- Error: %s", err)
		return
	}
	// Bytes -> Games list (as before)
	err = json.Unmarshal(bytes, &gameList)
	if err != nil {
		fmt.Printf("FAIL\n\t- Error: %s", err)
		return
	}
	// Should be two games now
	if len(gameList.Games) != 2 {
		fmt.Printf("FAIL\n\t- Wanted: %d games, Got: %d game(s)", 2, len(gameList.Games))
		return
	}
	// Endpoint should return two different games
	if gameList.Games[0].GameID.String() == gameList.Games[1].GameID.String() {
		fmt.Printf("FAIL\n\t- Discover returned duplicate game IDs")
		return
	}
	fmt.Printf("PASS")

	// ==============================
	// =========== TEST 9 ===========
	// ==============================
	fmt.Printf("\nTEST 9: /Delete only permits creator to delete game - ")
	// Send DELETE request to /Delete
	request = `{"gameID":"` + gameID2.String() + `","playerID":"` + uuid.New().String() + `"}`
	httpReq, err := http.NewRequest("DELETE", "http://localhost:3099/Delete", strings.NewReader(request))
	httpReq.Header.Set("Content-Type", "application/json")
	client := &http.Client{}
	response, err = client.Do(httpReq)
	if err != nil {
		fmt.Printf("FAIL\n\t- Error: %s", err)
		return
	}
	// Check for error code
	if response.Status != "400 Bad Request" {
		fmt.Printf("FAIL\n\t- Got: %s, Wanted: %s", response.Status, "400 Bad Request")
		return
	}
	fmt.Printf("PASS")

	// ==============================
	// ========== TEST 10 ===========
	// ==============================
	fmt.Printf("\nTEST 10: /Delete returns no errors for proper request - ")
	// Send DELETE request to /Delete
	request = `{"gameID":"` + gameID2.String() + `","playerID":"` + gameCreatorID.String() + `"}`
	httpReq, err = http.NewRequest("DELETE", "http://localhost:3099/Delete", strings.NewReader(request))
	httpReq.Header.Set("Content-Type", "application/json")
	client = &http.Client{}
	response, err = client.Do(httpReq)
	if err != nil {
		fmt.Printf("FAIL\n\t- Error: %s", err)
		return
	}
	// Check for OK code
	if response.Status != "200 OK" {
		fmt.Printf("FAIL\n\t- Got: %s, Wanted: %s", response.Status, "200 OK")
		return
	}
	fmt.Printf("PASS")

	// ==============================
	// ========== TEST 11 ===========
	// ==============================
	fmt.Printf("\nTEST 11: /Delete removes game as expected - ")
	// Send Discover GET request
	response, err = http.Get("http://localhost:3099/Discover")
	if err != nil {
		fmt.Printf("FAIL\n\t- Error: %s", err)
		return
	}
	// Check for OK code
	if response.Status != "200 OK" {
		fmt.Printf("FAIL\n\t- Got: %s, Wanted: %s", response.Status, "200 OK")
		return
	}
	// Body -> Bytes
	bytes, err = ioutil.ReadAll(response.Body)
	if err != nil {
		fmt.Printf("FAIL\n\t- Error: %s", err)
		return
	}
	// Bytes -> Games list
	err = json.Unmarshal(bytes, &gameList)
	if err != nil {
		fmt.Printf("FAIL\n\t- Error: %s", err)
		return
	}
	// Check only 1 game returned
	if len(gameList.Games) != 1 {
		fmt.Printf("FAIL\n\t- Wanted: %d game, Got: %d game(s)", 1, len(gameList.Games))
		return
	}
	// Check game ID does not match one which was removed
	if gameList.Games[0].GameID.String() == gameID2.String() {
		fmt.Printf("FAIL\n\t- Incorrect game was removed.")
		return
	}
	fmt.Printf("PASS")

	// ==============================
	// ========== TEST 11 ===========
	// ==============================
	fmt.Printf("\nTEST 12: /Discover returns empty array if no games - ")
	// Send DELETE request to /Delete to remove remaining game
	request = `{"gameID":"` + gameID.String() + `","playerID":"` + gameCreatorID.String() + `"}`
	httpReq, err = http.NewRequest("DELETE", "http://localhost:3099/Delete", strings.NewReader(request))
	httpReq.Header.Set("Content-Type", "application/json")
	client = &http.Client{}
	response, err = client.Do(httpReq)
	if err != nil {
		fmt.Printf("FAIL\n\t- Error: %s", err)
		return
	}
	// Check for error code
	if response.Status != "200 OK" {
		fmt.Printf("FAIL\n\t- Got: %s, Wanted: %s", response.Status, "200 OK")
		return
	}
	// Send GET to /Discover
	response, err = http.Get("http://localhost:3099/Discover")
	if err != nil {
		fmt.Printf("FAIL\n\t- Error: %s", err)
		return
	}
	// Check for OK code
	if response.Status != "200 OK" {
		fmt.Printf("FAIL\n\t- Got: %s, Wanted: %s", response.Status, "200 OK")
		return
	}
	// Body -> Bytes
	bytes, err = ioutil.ReadAll(response.Body)
	if err != nil {
		fmt.Printf("FAIL\n\t- Error: %s", err)
		return
	}
	// Bytes -> Games list
	err = json.Unmarshal(bytes, &gameList)
	if err != nil {
		fmt.Printf("FAIL\n\t- Error: %s", err)
		return
	}
	// Check 0 games returned
	if len(gameList.Games) != 0 {
		fmt.Printf("FAIL\n\t- Wanted: %d games, Got: %d game(s)", 0, len(gameList.Games))
		return
	}
	fmt.Printf("PASS")

	// ==============================
	// ========== TEST 12 ===========
	// ==============================
	fmt.Printf("\nTEST 12: /Create allows reuse of IDs from deleted games - ")
	// Create dummy game matching TEST 5, except 3 players
	requiredPlayers = "3"
	request = `{"creatorID":"` + gameCreatorID.String() + `",` +
		`"gameID":"` + gameID.String() + `",` +
		`"gameName":"` + gameName + `",` +
		`"requiredPlayers":` + requiredPlayers + `,` +
		`"gameSpec":"` + gameSpec + `"` + `}`

	// Send game to /Create endpoint
	response, err = http.Post("http://localhost:3099/Create", "application/json", strings.NewReader(request))
	if err != nil {
		fmt.Printf("FAIL\n\t- Error: %s", err)
		return
	}
	// Check for OK status
	if response.Status != "200 OK" {
		fmt.Printf("FAIL\n\t- Got: %s, Wanted: %s", response.Status, "200 OK")
		return
	}
	fmt.Printf("PASS")

	// ==============================
	// ========== TEST 13 ===========
	// ==============================
	fmt.Printf("\nTEST 13: /Join gives no errors - ")
	// Send POST request to /Join
	secondPlayerID := uuid.New()
	request = `{"playerID":"` + secondPlayerID.String() + `","gameID":"` + gameID.String() + `"}`
	response, err = http.Post("http://localhost:3099/Join", "application/json", strings.NewReader(request))
	if err != nil {
		fmt.Printf("FAIL\n\t- Error: %s", err)
		return
	}
	// Check for OK status
	if response.Status != "200 OK" {
		fmt.Printf("FAIL\n\t- Got: %s, Wanted: %s", response.Status, "200 OK")
		return
	}
	fmt.Printf("PASS")

	// ==============================
	// ========== TEST 14 ===========
	// ==============================
	fmt.Printf("\nTEST 14: /Join returns takeTurnNow as false for not last player - ")
	// Body -> Bytes
	bytes, err = ioutil.ReadAll(response.Body)
	if err != nil {
		fmt.Printf("FAIL\n\t- Error: %s", err)
		return
	}
	// Bytes -> TakeTurnNowDTO
	var ttn TakeTurnNowDTO
	err = json.Unmarshal(bytes, &ttn)
	if err != nil {
		fmt.Printf("FAIL\n\t- Error: %s", err)
		return
	}
	// Check value is false
	if ttn.TakeTurnNow != false {
		fmt.Printf("FAIL\n\t- Wanted: takeTurnNow=%t, Got: takeTurnNow=%t", false, ttn.TakeTurnNow)
	}
	fmt.Printf("PASS")

	// ==============================
	// ========== TEST 15 ===========
	// ==============================
	fmt.Printf("\nTEST 15: /Join adds player to game as expected - ")
	// Send GET request to /Discover
	response, err = http.Get("http://localhost:3099/Discover")
	if err != nil {
		fmt.Printf("FAIL\n\t- Error: %s", err)
		return
	}
	// Check for OK code
	if response.Status != "200 OK" {
		fmt.Printf("FAIL\n\t- Got: %s, Wanted: %s", response.Status, "200 OK")
		return
	}
	// Body -> Bytes
	bytes, err = ioutil.ReadAll(response.Body)
	if err != nil {
		fmt.Printf("FAIL\n\t- Error: %s", err)
		return
	}
	// Bytes -> Games list
	err = json.Unmarshal(bytes, &gameList)
	if err != nil {
		fmt.Printf("FAIL\n\t- Error: %s", err)
		return
	}
	// Check only 2 players in
	if gameList.Games[0].CurrentPlayers != 2 {
		fmt.Printf("FAIL\n\t- Got: %d players, Wanted: %d players", gameList.Games[0].CurrentPlayers, 2)
		return
	}
	fmt.Printf("PASS")

	// ==============================
	// ========== TEST 16 ===========
	// ==============================
	fmt.Printf("\nTEST 16: /Join does not allow host to join their own game - ")
	// Send POST request to /Join
	request = `{"playerID":"` + gameCreatorID.String() + `","gameID":"` + gameID.String() + `"}`
	response, err = http.Post("http://localhost:3099/Join", "application/json", strings.NewReader(request))
	if err != nil {
		fmt.Printf("FAIL\n\t- Error: %s", err)
		return
	}
	// Check for error status
	if response.Status != "400 Bad Request" {
		fmt.Printf("FAIL\n\t- Got: %s, Wanted: %s", response.Status, "400 Bad Request")
		return
	}
	fmt.Printf("PASS")

	// ==============================
	// ========== TEST 17 ===========
	// ==============================
	fmt.Printf("\nTEST 17: /Join does not allow the same player to join twice - ")
	// Send POST request to /Join
	request = `{"playerID":"` + secondPlayerID.String() + `","gameID":"` + gameID.String() + `"}`
	response, err = http.Post("http://localhost:3099/Join", "application/json", strings.NewReader(request))
	if err != nil {
		fmt.Printf("FAIL\n\t- Error: %s", err)
		return
	}
	// Check for error status
	if response.Status != "400 Bad Request" {
		fmt.Printf("FAIL\n\t- Got: %s, Wanted: %s", response.Status, "400 Bad Request")
		return
	}
	fmt.Printf("PASS")

	// ==============================
	// ========== TEST 18 ===========
	// ==============================
	fmt.Printf("\nTEST 18: /Join returns takeTurnNow as true for last player to join - ")
	// Join last player - POST to /Join
	thirdPlayerID := uuid.New()
	request = `{"playerID":"` + thirdPlayerID.String() + `","gameID":"` + gameID.String() + `"}`
	response, err = http.Post("http://localhost:3099/Join", "application/json", strings.NewReader(request))
	if err != nil {
		fmt.Printf("FAIL\n\t- Error: %s", err)
		return
	}
	// Check for OK status
	if response.Status != "200 OK" {
		fmt.Printf("FAIL\n\t- Got: %s, Wanted: %s", response.Status, "200 OK")
		return
	}
	// Body -> Bytes
	bytes, err = ioutil.ReadAll(response.Body)
	if err != nil {
		fmt.Printf("FAIL\n\t- Error: %s", err)
		return
	}
	// Bytes -> TakeTurnNowDTO
	err = json.Unmarshal(bytes, &ttn)
	if err != nil {
		fmt.Printf("FAIL\n\t- Error: %s", err)
		return
	}
	// Check value is true
	if ttn.TakeTurnNow != true {
		fmt.Printf("FAIL\n\t- Wanted: takeTurnNow=%t, Got: takeTurnNow=%t", true, ttn.TakeTurnNow)
	}
	fmt.Printf("PASS")

	// ==============================
	// ========== TEST 19 ===========
	// ==============================
	fmt.Printf("\nTEST 19: /Join does not allow players to join a full game - ")
	// POST to /Join with new player ID
	request = `{"playerID":"` + uuid.New().String() + `","gameID":"` + gameID.String() + `"}`
	response, err = http.Post("http://localhost:3099/Join", "application/json", strings.NewReader(request))
	if err != nil {
		fmt.Printf("FAIL\n\t- Error: %s", err)
		return
	}
	// Check for Bad Request status
	if response.Status != "400 Bad Request" {
		fmt.Printf("FAIL\n\t- Got: %s, Wanted: %s", response.Status, "400 Bad Request")
		return
	}
	fmt.Printf("PASS")

	// ==============================
	// ========== TEST 20 ===========
	// ==============================
	fmt.Printf("\nTEST 20: /Discover endpoint does not show a full game - ")
	// Send Discover GET request
	response, err = http.Get("http://localhost:3099/Discover")
	if err != nil {
		fmt.Printf("FAIL\n\t- Error: %s", err)
		return
	}
	// Check for OK code
	if response.Status != "200 OK" {
		fmt.Printf("FAIL\n\t- Got: %s, Wanted: %s", response.Status, "200 OK")
		return
	}
	// Body -> Bytes
	bytes, err = ioutil.ReadAll(response.Body)
	if err != nil {
		fmt.Printf("FAIL\n\t- Error: %s", err)
		return
	}
	// Bytes -> Games list
	err = json.Unmarshal(bytes, &gameList)
	if err != nil {
		fmt.Printf("FAIL\n\t- Error: %s", err)
		return
	}
	// Check no games returned, as only game left is full
	if len(gameList.Games) != 0 {
		fmt.Printf("FAIL\n\t- Wanted: %d games, Got: %d game(s)", 0, len(gameList.Games))
		return
	}
	fmt.Printf("PASS")

	// ==============================
	// ========== TEST 21 ===========
	// ==============================
	fmt.Printf("\nTEST 21: /Publish returns an error for an incomplete request - ")
	// Send POST request to /Publish
	request = `{}`
	response, err = http.Post("http://localhost:3099/Join", "application/json", strings.NewReader(request))
	if err != nil {
		fmt.Printf("FAIL\n\t- Error: %s", err)
		return
	}
	// Check for Bad Request code
	if response.Status != "400 Bad Request" {
		fmt.Printf("FAIL\n\t- Got: %s, Wanted: %s", response.Status, "400 Bad Request")
		return
	}
	fmt.Printf("PASS")

	// ==============================
	// ========== TEST 22 ===========
	// ==============================
	fmt.Printf("\nTEST 22: /Publish does not allow players outside of game to publish moves - ")
	// Send POST request to /Publish
	request = `{"gameID":"` + gameID.String() + `",` +
		`"playerID":"` + uuid.New().String() + `",` +
		`"moveNumber":"0","moveType":"bid","moveValue":"1"}`
	response, err = http.Post("http://localhost:3099/Publish", "application/json", strings.NewReader(request))
	if err != nil {
		fmt.Printf("FAIL\n\t- Error: %s", err)
		return
	}
	// Check for Bad Request code
	if response.Status != "400 Bad Request" {
		fmt.Printf("FAIL\n\t- Got: %s, Wanted: %s", response.Status, "400 Bad Request")
		return
	}
	fmt.Printf("PASS")

	// ==============================
	// ========== TEST 23 ===========
	// ==============================
	fmt.Printf("\nTEST 23: /Publish has no errors for proper request - ")
	// Send POST request to /Publish
	request = `{"gameID":"` + gameID.String() + `",` +
		`"playerID":"` + gameCreatorID.String() + `",` +
		`"moveNumber":1
		,"moveType":"bid","moveValue":"1"}`
	response, err = http.Post("http://localhost:3099/Publish", "application/json", strings.NewReader(request))
	if err != nil {
		fmt.Printf("FAIL\n\t- Error: %s", err)
		return
	}
	// Check for OK code
	if response.Status != "200 OK" {
		fmt.Printf("FAIL\n\t- Got: %s, Wanted: %s", response.Status, "200 OK")
		return
	}
	fmt.Printf("PASS")

	// ==============================
	// ========== TEST 24 ===========
	// ==============================
	fmt.Printf("\nTEST 24: /Publish does not allow messages to be added to non-existent game - ")
	// Send POST request to /Publish
	request = `{"gameID":"` + uuid.New().String() + `",` +
		`"playerID":"` + gameCreatorID.String() + `",` +
		`"moveNumber":1,"moveType":"bid","moveValue":"1"}`
	response, err = http.Post("http://localhost:3099/Publish", "application/json", strings.NewReader(request))
	if err != nil {
		fmt.Printf("FAIL\n\t- Error: %s", err)
		return
	}
	// Check for Bad Request code
	if response.Status != "400 Bad Request" {
		fmt.Printf("FAIL\n\t- Got: %s, Wanted: %s", response.Status, "400 Bad Request")
		return
	}
	fmt.Printf("PASS")

	// ==============================
	// ========== TEST 25 ===========
	// ==============================
	fmt.Printf("\nTEST 25: /Publish does not allow messages to be added which don't increment move count - ")
	// Send POST request to /Publish
	request = `{"gameID":"` + gameID.String() + `",` +
		`"playerID":"` + gameCreatorID.String() + `",` +
		`"moveNumber":1,"moveType":"bid","moveValue":"1"}`
	response, err = http.Post("http://localhost:3099/Publish", "application/json", strings.NewReader(request))
	if err != nil {
		fmt.Printf("FAIL\n\t- Error: %s", err)
		return
	}
	// Check for Bad Request code
	if response.Status != "400 Bad Request" {
		fmt.Printf("FAIL\n\t- Got: %s, Wanted: %s", response.Status, "400 Bad Request")
		return
	}
	// Send POST request to /Publish
	request = `{"gameID":"` + uuid.New().String() + `",` +
		`"playerID":"` + gameCreatorID.String() + `",` +
		`"moveNumber":-1,"moveType":"bid","moveValue":"1"}`
	response, err = http.Post("http://localhost:3099/Publish", "application/json", strings.NewReader(request))
	if err != nil {
		fmt.Printf("FAIL\n\t- Error: %s", err)
		return
	}
	// Check for Bad Request code
	if response.Status != "400 Bad Request" {
		fmt.Printf("FAIL\n\t- Got: %s, Wanted: %s", response.Status, "400 Bad Request")
		return
	}
	// Send POST request to /Publish
	request = `{"gameID":"` + uuid.New().String() + `",` +
		`"playerID":"` + gameCreatorID.String() + `",` +
		`"moveNumber":3,"moveType":"bid","moveValue":"1"}`
	response, err = http.Post("http://localhost:3099/Publish", "application/json", strings.NewReader(request))
	if err != nil {
		fmt.Printf("FAIL\n\t- Error: %s", err)
		return
	}
	// Check for Bad Request code
	if response.Status != "400 Bad Request" {
		fmt.Printf("FAIL\n\t- Got: %s, Wanted: %s", response.Status, "400 Bad Request")
		return
	}
	fmt.Printf("PASS")

	// ==============================
	// ========== TEST 26 ===========
	// ==============================
	fmt.Printf("\nTEST 26: /Pull returns error for incomplete request - ")
	// Send GET request to /Pull
	request = `{}`
	httpReq, err = http.NewRequest("GET", "http://localhost:3099/Pull", strings.NewReader(request))
	httpReq.Header.Set("Content-Type", "application/json")
	client = &http.Client{}
	response, err = client.Do(httpReq)
	if err != nil {
		fmt.Printf("FAIL\n\t- Error: %s", err)
		return
	}
	// Check for Bad Request code
	if response.Status != "400 Bad Request" {
		fmt.Printf("FAIL\n\t- Got: %s, Wanted: %s", response.Status, "400 Bad Request")
		return
	}
	fmt.Printf("PASS")

	// ==============================
	// ========== TEST 27 ===========
	// ==============================
	fmt.Printf("\nTEST 27: /Pull returns empty list for players not in game - ")
	// Send GET request to /Pull
	request = `{"gameID":"` + gameID.String() + `","playerID":"` + uuid.New().String() + `"}`
	httpReq, err = http.NewRequest("GET", "http://localhost:3099/Pull", strings.NewReader(request))
	httpReq.Header.Set("Content-Type", "application/json")
	client = &http.Client{}
	response, err = client.Do(httpReq)
	if err != nil {
		fmt.Printf("FAIL\n\t- Error: %s", err)
		return
	}
	// Check for OK code
	if response.Status != "200 OK" {
		fmt.Printf("FAIL\n\t- Got: %s, Wanted: %s", response.Status, "200 OK")
		return
	}
	// Body -> bytes
	bytes, err = ioutil.ReadAll(response.Body)
	if err != nil {
		fmt.Printf("FAIL\n\t- Error: %s", err)
		return
	}
	// Bytes -> Moves list
	var moveList MoveListDTO
	err = json.Unmarshal(bytes, &moveList)
	if err != nil {
		fmt.Printf("FAIL\n\t- Error: %s", err)
		return
	}
	// Should be no moves
	if len(moveList.Moves) != 0 {
		fmt.Printf("FAIL\n\t- Got: %d move(s), Wanted: %d moves", len(moveList.Moves), 0)
		return
	}
	fmt.Printf("PASS")

	// ==============================
	// ========== TEST 28 ===========
	// ==============================
	fmt.Printf("\nTEST 28: /Pull returns moves yet to be acknowledged without errors - ")
	// Send GET request to /Pull
	request = `{"gameID":"` + gameID.String() + `","playerID":"` + thirdPlayerID.String() + `"}`
	httpReq, err = http.NewRequest("GET", "http://localhost:3099/Pull", strings.NewReader(request))
	httpReq.Header.Set("Content-Type", "application/json")
	client = &http.Client{}
	response, err = client.Do(httpReq)
	if err != nil {
		fmt.Printf("FAIL\n\t- Error: %s", err)
		return
	}
	// Check for OK code
	if response.Status != "200 OK" {
		fmt.Printf("FAIL\n\t- Got: %s, Wanted: %s", response.Status, "200 OK")
		return
	}
	// Body -> bytes
	bytes, err = ioutil.ReadAll(response.Body)
	if err != nil {
		fmt.Printf("FAIL\n\t- Error: %s", err)
		return
	}
	// Bytes -> Moves list
	err = json.Unmarshal(bytes, &moveList)
	if err != nil {
		fmt.Printf("FAIL\n\t- Error: %s", err)
		return
	}
	// Should be one move only
	if len(moveList.Moves) != 1 {
		fmt.Printf("FAIL\n\t- Got: %d move(s), Wanted: %d move", len(moveList.Moves), 1)
		return
	}
	// Check move number matches that of published move
	if moveList.Moves[0].MoveNumber != 1 {
		fmt.Printf("FAIL\n\t- Wanted: Move number %d, Got: Move number %d", 1, moveList.Moves[0].MoveNumber)
		return
	}
	fmt.Printf("PASS")

	// ==============================
	// ========== TEST 29 ===========
	// ==============================
	fmt.Printf("\nTEST 29: /Acknowledge returns error for incomplete request - ")
	// Send POST request to /Acknowledge
	request = `{}`
	response, err = http.Post("http://localhost:3099/Acknowledge", "application/json", strings.NewReader(request))
	if err != nil {
		fmt.Printf("FAIL\n\t- Error: %s", err)
		return
	}
	// Check for Bad Request code
	if response.Status != "400 Bad Request" {
		fmt.Printf("FAIL\n\t- Got: %s, Wanted: %s", response.Status, "400 Bad Request")
		return
	}
	fmt.Printf("PASS")

	// ==============================
	// ========== TEST 30 ===========
	// ==============================
	fmt.Printf("\nTEST 30: /Acknowledge returns error for player not in game - ")
	// Send POST request to /Acknowledge
	request = `{"gameID":"` + gameID.String() + `","playerID":"` + uuid.New().String() +
		`","moveID":"` + moveList.Moves[0].MoveID.String() + `"}`
	response, err = http.Post("http://localhost:3099/Acknowledge", "application/json", strings.NewReader(request))
	if err != nil {
		fmt.Printf("FAIL\n\t- Error: %s", err)
		return
	}
	// Check for Bad Request code
	if response.Status != "400 Bad Request" {
		fmt.Printf("FAIL\n\t- Got: %s, Wanted: %s", response.Status, "400 Bad Request")
		return
	}
	fmt.Printf("PASS")

	// ==============================
	// ========== TEST 31 ===========
	// ==============================
	fmt.Printf("\nTEST 31: /Acknowledge accepts proper request - ")
	// Send POST request to /Acknowledge
	request = `{"gameID":"` + gameID.String() + `","playerID":"` +
		thirdPlayerID.String() + `","moveID":"` + moveList.Moves[0].MoveID.String() + `"}`
	response, err = http.Post("http://localhost:3099/Acknowledge", "application/json", strings.NewReader(request))
	if err != nil {
		fmt.Printf("FAIL\n\t- Error: %s", err)
		return
	}
	// Check for OK code
	if response.Status != "200 OK" {
		fmt.Printf("FAIL\n\t- Got: %s, Wanted: %s", response.Status, "200 OK")
		return
	}
	fmt.Printf("PASS")

	// ==============================
	// ========== TEST 32 ===========
	// ==============================
	fmt.Printf("\nTEST 32: /Pull does not return acknowledged moves - ")
	// Send GET request to /Pull - Duplicate of request in TEST 27
	request = `{"gameID":"` + gameID.String() + `","playerID":"` + thirdPlayerID.String() + `"}`
	httpReq, err = http.NewRequest("GET", "http://localhost:3099/Pull", strings.NewReader(request))
	httpReq.Header.Set("Content-Type", "application/json")
	client = &http.Client{}
	response, err = client.Do(httpReq)
	if err != nil {
		fmt.Printf("FAIL\n\t- Error: %s", err)
		return
	}
	// Check for OK code
	if response.Status != "200 OK" {
		fmt.Printf("FAIL\n\t- Got: %s, Wanted: %s", response.Status, "200 OK")
		return
	}
	// Body -> bytes
	bytes, err = ioutil.ReadAll(response.Body)
	if err != nil {
		fmt.Printf("FAIL\n\t- Error: %s", err)
		return
	}
	// Bytes -> Moves list
	err = json.Unmarshal(bytes, &moveList)
	if err != nil {
		fmt.Printf("FAIL\n\t- Error: %s", err)
		return
	}
	// Should be no moves
	if len(moveList.Moves) != 0 {
		fmt.Printf("FAIL\n\t- Got: %d move(s), Wanted: %d moves", len(moveList.Moves), 0)
		return
	}
	fmt.Printf("PASS")

}
