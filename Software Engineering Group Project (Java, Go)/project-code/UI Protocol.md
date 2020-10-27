# Text JSON protocol for user interface

This document describes the text protocol used by the game to communicate with other programs through stdin and stdout. A user interface can open a socket to connect to the game and so can be written in any programming language.

## Requests from game that require a response

These messages need the user interface to 'reply', by sending an appropriate response.

```json
{
  "request_type": ["bid_choice", "bid_trump", "bid_value", "card_move"],
  "msg": ""
}
```

The request_type can be any value listed, the user interface should respond with a message such as:

```json
{ "value": "" }
```

Here value is whatever an appropriate response is.

## Messages from the game that do not require a response

These messages need no response and are just for the user interface to update how it looks.

#### Sending Game State

```json
{
  "request_type":"sending_game_state",
  "game_state":{
    "cards_played":["A♦", ...],
    "follow_suit":"♠️",
    "trump_suit":"♦",
    "prev_tricks":["A♦", ...],
    "player_to_go":1,
    "cards_in_hand":["A♦", ...]
  }
}
```

#### Sending Trick Summary

```json
{
  "request_type":"sending_tick_summary",
  "trick_count":3,
  "winning_card":"A♦",
  "winning_player":"Name of winner",
  "points_totals":7,
}
```
