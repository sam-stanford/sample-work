# Asyncrhonous Game Play Protocol

This md file describes the order of events for asynchronous playing implemented for `Aces Seven`.

The asynchronous nature of the protocol comes from the use of a `pub-sub system` implemented in `Go`. The pub-sub system uses an `HTTP REST API` hosted on `port 3099` of the machine which runs executes the program.

Players send and receive moves from the system by interacting with the REST API, and can setup games, and discover and join games set up by other players.

---

## Aside: Endpoints

`Endpoints` are referenced multiple times in this file, and each one describes a point at which players can intereact with the pub-sub's interface.

## Aside: Running Go Programs

Go programs are relatively easy to build and run on a variety of machines. The steps below describe how to run this pub-sub system on nearly any machine.

- First, make sure Go is installed. You can install it here: https://golang.org/doc/install , or you can install it from the command line using one of the many online guides.

- Next, open the directory this file is in inside a terminal.

- Fetch the required packages by executing the following commands:

  - `go get github.com/google/uuid`
  - `go get github.com/boltdb/bolt`
  - `go get github.com/gorilla/mux`

- Once the above dependencies are installed, ensure you are in the directory with the `pub-sub.go` file, and execute the following command:

  - `go build`

  - NOTE: If you are struggling with the above step, try adding the directory with the `pub-sub.go` file in to your class path.

  - An executable file should have been built and placed in the same directory as `pub-sub.go`

- Execute the created executable.
  - You can include the `-h` flag to view all available flags, however the Aces Seven system does not come with any build-in flags.

---

## Game Setup

Before playing a game, players must either join an existing game, or set one up themselves. To set one up, the following HTTP requests must be made:

1. Complete two `GET` requests at the `/GenID` endpoint. The body for each request will be ignored, and a JSON object in the following format will be returned for each one, where the Xs are replaced by a unique combination of digits:

```json
{ "ID": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX" }
```

2. Send a `"POST"` request to the `/Create` endpoint, including a JSON string matching the format showed below in the request body.</br></br>The `creatorID` and `gameID` fields should each use one of the UUID's generated in Step 1, and the requesting program should remember which is used for which field.</br></br>The `gameSpec` field should be the JSON game specification object as a string, the `requiredPlayers` field must be the required number of players for the game, and the `gameName` field is recommended to match that in the game specification.

```json
{
  "creatorID": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
  "gameID": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
  "gameName": "<Game_Name_String>",
  "requiredPlayers": integer,
  "gameSpec": "{<Game_Spec_File_Name>}"
}
```

After completing these two steps, the game will be set up and available for players to discover and join. The host can delete the game at any time.

---

## Game Discovery

To work alongide the asynchronous playing, this pub-sub system also offers asynchronous game discovery to replace the Super Group's UDP discovery protocol.

The `/Discover` endpoint returns a list of all current games waiting for players to join. The endpoint should be access in the following way.

- Send a `"GET"` request to the `/Discover` endpoint. The request body will be ignored, and a list of available games will returned in the JSON format shown below. `gameName` is the name of the game being played, `gameID` is the UUID of the game, `currentPlayers` is the number of players currently in the game, and `requiredPlayers` is the number of players required to start the game.

```json
{
  "games": [
    {
      "gameName": "string",
      "gameID": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
      "currentPlayers": integer,
      "requiredPlayers": integer
    }
  ]
}
```

---

## Joining a Game

Once a game has been found through game discovery, a player may join another players' game by completing the following steps:

1. Send a `GET` request to the `/GenID` endpoint to retrive a unique ID for the player. The request body will be ignored, and will return a JSON object as a string matching the following format.

```json
{ "ID": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX" }
```

2. Send a `POST` request to the `/Join` endpoint, with a JSON object matching the format below as a string in the request body, where `gameID` matches the desired game's ID, and `playerID` matched the ID retrieved in Step 1.

```json
{
  "gameID": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
  "playerID": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
}
```

If the `POST` request is successful, the player will be added to the game, and a JSON object will be returned matching the format below. If `takeTurnNow` is true, the player was the last to join, and therefore should go first. For all other players `takeTurnNow` will be false.

```json
{
  "takeTurnNow": false
}
```

NOTE 1: Players may join as many games as they wish.

NOTE 2: The last player to join a game will be the first player to play a card/bid in the game, as this reduces the number of required accesses to the pub-sub system.

---

## Sending a Move

Once the required number of players have joined, the game will not be returned to `GET` requests at the `/Discover` endpoint, and the game will begin.

The first player to go is the last player to join, with turns progressing in reverse order of joining (i.e. the game's creator will go last).

In all circumstances, the pub-sub system assumes complete correctness from the game engine. The pub-sub system completes **no rule checking**, and will therefore not enforce any rules, including turn order.

The pub-sub system will however **enforce that players are receiving previous players' moves**, by requiring a move counter and rejecting messages which do not increment the move counter by 1. The move counter is reprsented by the `moveNumber` JSON variable, which should start at 1, and be incremented by 1 for each bid/card played.

Published moves will only be removed from the system once an acknowledgement has been received by all other players in the game through the `/Acknowledge` endpoint.

To publish a move or bid to others, players should make a `POST` request at the `/Publish` endpoint, with the request body containing a JSON object in the format below as a string.

```json
{
  "gameID": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
  "playerID": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
  "moveNumber": integer,
  "moveType": "string",
  "moveValue": "string"
}
```

As explained above, `moveNumber` should be 1 for the first move, and be incremented 1 for each proceeding move. `gameID` should be the ID of the game the message is being published to, and `playerID` should be the ID of the player publishing the message.

`moveType` should be a string to represent the type of move being played, and has either the value of `"bid"` or `"card"`. `moveValue` represents the move's value, and should be one of the following values:

- A card in the form: `"<Rank Number or Letter><Suit Letter"`, for example: `"AC"`, `"6H"`, `"10S"`, or `"JD"`.
- A bid in the form: `"<Bid Value><Bid Suit Letter>"`, using `N` for no suit, and `_` for games which don't include suit bidding. Examples include `"3_"`, `"6S"` and `"16N"`.
- A special bid in the form: `"pass"` or `"double"` to represent a pass or double/redouble.

---

## Receiving Moves

The advantage of using a pub-sub system over a message queue is that multiple moves can be received using one request, rather than having to wait for all players to acknowledge one message - this works splendidly for a trick-taking card game, where players need to wait for multiple other players to take their turns before taking a turn of their own.

To receive a players' unacknowledged moves, a `GET` request should be made to the `/Pull` endpoint. The request body should contain a JSON object matching the following format, where `gameID` is the ID of the game to receive moves for, and `playerID` is the ID of the player receiving moves.

```json
{
  "gameID": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
  "playerID": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
}
```

The response to a successful request will be a JSON object in the format showed below, where `moveType`, `moveNumber` and `moveValue` are the same as discussed in the **Sending a Move** section of this file, and `moveID` is the ID of the move, which is used for acknowledgement.

```json
{
  "moves": [
    {
      "moveID": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
      "playerID": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
      "moveNumber": integer,
      "moveType": "string",
      "moveValue": "string"
    }
  ]
}
```

---

## Acknowledging Moves

Once moves have been received by a player, they should be acknowledged by sending a `POST` request to the `/Acknowledge` endpoint. Once all players except the player have acknowledged a message, it will be deleted from the pub-sub system.

The `POST` request body should contain a JSON object in the following format, where `moveID` is the ID of the message being acknowledged, `gameID` is the ID of the game which the message is associated with, and `playerID` is the ID of the player acknowledging the message.

```json
{
  "gameID": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
  "moveID": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
  "playerID": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
}
```

---

## Ending/Deleting a Game

Once a game has been completed, it is the game creator's responsibility to delete the game.

To delete a game, a `DELETE` request should be made to the `/Delete` endpoint. The request body should contain a JSON object in the format below, where `gameID` is the ID of the game to be deleted, and `playerID` is the ID of the player who created the game.

```json
{
  "gameID": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
  "playerID": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
}
```

Deleting a game could cause confusion for other players expecting the game to keep going, so deleting a game should only occur if the game was created accidentally, the host does not want to play AND no other players have joined, or if the game has finished.a
