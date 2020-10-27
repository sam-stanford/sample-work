package GameLogic.Core;

import GameLogic.DeckAndCards.Card;
import GameLogic.DeckAndCards.Suit;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.stream.JsonReader;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

/**
 * A player that gets its input from terminal and uses the json messaging.
 */
public class PlayerLocalJson extends Player {
	
	/**
	 * Writer to write output to. Can be changed to not be stdout
	 */
	private PrintWriter writer;
	
	/**
	 * InputStream to recieve input from, can be changed to not be stdin
	 */
	public static InputStream inputStream = System.in;
	
	public PlayerLocalJson(int number, String name, Game.GameState gameState) {
		super(number, name, gameState);
		this.writer = new PrintWriter(System.out, true);
	}
	
	/**
	 * Recieves the bid from this player.
	 * Override to make a networked player.
	 * @return
	 */
	@Override
	public Bid receiveBid() {
		
		boolean done = false;
		while (!done) {
			String input = this.getBidChoiceFromPlayer("");
			
			switch (input) {
				case "Pass":
					return new Bid(Bid.BidType.PASS);
				
				case "Double":
					return new Bid(Bid.BidType.DOUBLE);
				
				default:
					done = true;
					break;
			}
		}
		
		done = false;
		String msg = "";
		int inputBidValue = 0;
		while (!done) {
			//Get bid value from input
			String input = this.getBidValueFromPlayer(msg);
			
			// Convert to number
			try {
				inputBidValue = Integer.parseInt(input);
				done = true;
			} catch (NumberFormatException e) {
				//Not a number => Fetch again
				msg = "INVALID CHOICE";
			}
		}
		
		
		// Get bid suit from input if in rules
		Suit inputBidSuit = null;
		done = false;
		msg = "";
		while (!done) {
			if (this.gameState.gameSpec.bidRules.trumpSuitBid) {
				// TODO: Make this flexible with rules. Needs interface integration
				
				// Read value
				String input = this.getBidTrumpSuitFromPlayer(msg);
				
				//Convert to number
				int inputSuitNumber;
				try {
					inputSuitNumber = Integer.parseInt(input);
					done = true;
					
					// Check number entered is an option
					if (inputSuitNumber < 0 || inputSuitNumber > 4) {
						//Not in range => Fetch again
						msg = "INVALID CHOICE - Please enter a number which matches to a suit";
						done = false;
					} else {
						// Convert to suit
						switch (inputSuitNumber) {
							case 0:
								break; // inputSuitNumber is already null
							case 1:
								inputBidSuit = Suit.SPADES;
								break;
							case 2:
								inputBidSuit = Suit.HEARTS;
								break;
							case 3:
								inputBidSuit = Suit.DIAMONDS;
								break;
							case 4:
								inputBidSuit = Suit.CLUBS;
								break;
						}
						
						done = true;
					}
					
					
				} catch (NumberFormatException e) {
					//Not a number => Fetch again
					msg = "INVALID CHOICE - Please enter a number";
				}
				
				
			}
		}
		
		
		// Create Bid object to return
		return new Bid(inputBidValue, inputBidSuit, this.hasSeenCards());
	}
	
	/**
	 * Recieves the move from this player.
	 * Override to make a networked player.
	 * @return
	 */
	@Override
	public Card receiveMove() {
		String msg = "";
		boolean done = false;
		while (!done) {
			//Get input
			String input = this.getCardMoveFromPlayer(msg);
			
			//Convert to number
			int inputValue;
			try {
				inputValue = Integer.parseInt(input);
				done = true;
				
				//Check number matches to a card
				if (inputValue >= 0 && inputValue < this.getHand().size()) {
					return this.getHand().get(inputValue); //Add chosen card
				} else {
					done = false;
					msg = "INVALID CHOICE";
				}
				
			} catch (NumberFormatException e) {
				//Not a number => Fetch again
				msg = "INVALID CHOICE";
			}
		}
		
		return null;
	}
	
	/**
	 * Gets the bid value from a player
	 * @param msg Description of state. e.g. you have got this wrong 5 times.
	 * @return
	 */
	public String getBidValueFromPlayer(String msg) {
		return getResponse("bid_value", msg);
	}
	
	/**
	 * Gets the bid trump suit from a player
	 * @param msg Description of state. e.g. you have got this wrong 5 times.
	 * @return
	 */
	public String getBidTrumpSuitFromPlayer(String msg) {
		return getResponse("bid_trump", msg);
	}
	
	/**
	 * Gets the bid a player has made
	 * @param msg Description of state. e.g. you have got this wrong 5 times.
	 * @return
	 */
	public String getBidChoiceFromPlayer(String msg) {
		return getResponse("bid_choice", msg);
	}
	
	/**
	 * Gets the card played by a user
	 * @param msg Description of state. e.g. you have got this wrong 5 times.
	 * @return
	 */
	public String getCardMoveFromPlayer(String msg) {
		return getResponse("card_move", msg);
	}
	
	/**
	 * Sends a request for information from the user interface with the appropriate request type.
	 * @param requestType
	 * @param msg
	 * @return
	 */
	public String getResponse(String requestType, String msg) {
		
		//This message will let the user interface know what we want
		JsonObject requestMessage = new JsonObject();
		requestMessage.addProperty("request_type", requestType);
		
		//If there is a message to send include it
		if (msg.length() > 0) {
			requestMessage.addProperty("msg", msg);
		}
		
		//Send to interface
		this.writer.println(requestMessage.toString());
		
		//Get response
		JsonObject response = new Gson().fromJson(new JsonReader(new InputStreamReader(inputStream)), JsonObject.class);
		
		//Return the card
		return response.get("value").getAsString();
	}
	
	@Override
	public void sendSessionWinners(List<String> winners) {
		JsonObject jsonObject = new JsonObject();
		JsonArray jsonArray = new JsonArray();
		
		jsonObject.addProperty("request_type", "session_winners");
		
		for (int i = 0; i < winners.size(); i++) {
			jsonArray.add(winners.get(i));
		}
		jsonObject.add("data", jsonArray);
		
		System.out.println(jsonObject.toString());
	}
	
	@Override
	public void sendGameState() {
		JsonObject object = new JsonObject();
		
		//Specify we are just sending the game state
		object.addProperty("request_type", "sending_game_state");
		
		//Encode the game
		//TODO: Use proper gson adapter.
		JsonObject game = new JsonObject();
		
		//Encode the cards played
		JsonArray cardsPlayedJson = new JsonArray();
		ArrayList<Card> cardsPlayed = gameState.currentTable.getCards();
		for (Card c : cardsPlayed) {
			cardsPlayedJson.add(c.printCardString(gameState.gameSpec.deck.rankOrder));
		}
		game.add("cards_played", cardsPlayedJson);
		
		//Add suit to follow
		if (gameState.allowedSuits != null && gameState.allowedSuits.size() == 1) {
			game.addProperty("follow_suit", Card.suitToCharCode(gameState.allowedSuits.get(0)));
		} else {
			game.addProperty("follow_suit", "none");
		}
		
		//Add trump suit
		if (gameState.trumpSuit != null) {
			game.addProperty("trump_suit", Card.suitToCharCode(gameState.trumpSuit));
		} else {
			game.addProperty("trump_suit", "none");
		}
		
		
		//Send prev trick if rules suggest to
		if (gameState.gameSpec.can_view_previous_trick) {
			if (gameState.prevTrick != null) {
				JsonArray prevTrickCards = new JsonArray();
				for (Card thisCard : gameState.prevTrick) {
					String cardStr = thisCard.printCardString(gameState.gameSpec.deck.rankOrder);
					prevTrickCards.add(cardStr);
				}
				game.add("prev_trick", prevTrickCards);
			}
		}
		
		//Get current player
		Player thisPlayer = gameState.players[gameState.currentPlayerNumber];
		
		//Bidding info
		JsonArray playerBids = new JsonArray();
		for (int i = 0; i < gameState.players.length; i++) {
			if (gameState.players[i].getBid() == null) {
				playerBids.add("");
			} else {
				playerBids.add(new Gson().fromJson(new Gson().toJson(gameState.players[i].getBid()), JsonObject.class));
			}
		}
		game.add("player_bids", playerBids);
		
		
		//Send the player whos go it is
		game.addProperty("player_to_go", thisPlayer.getNumber());
		
		game.addProperty("player_to_go_points", thisPlayer.getPointsThisGame());
		
		if (thisPlayer instanceof PlayerNetworked) {
			//Network player, so don't send cards
		} else {
			//Local player, so send cards
			ArrayList<Card> thisHand = thisPlayer.getHand();
			JsonArray cardsInHand = new JsonArray();
			for (int i = 0; i < thisHand.size(); i++) {
				if (!thisHand.get(i).printCardString(gameState.gameSpec.deck.rankOrder).equals("")) {
					cardsInHand.add(thisHand.get(i).printCardString(gameState.gameSpec.deck.rankOrder));
				}
			}
			game.add("cards_in_hand", cardsInHand);
		}
		
		object.add("game_state", game);
		
		writer.println(object.toString());
	}
	
	@Override
	public void sendTrickSummary(Card winningCard, String winnerName) {
		
		//Create the message
		JsonObject object = new JsonObject();
		object.addProperty("request_type", "send_trick_summary");
		
		// Trick count
		object.addProperty("trick_count", gameState.trickNumber);
		
		// Show winning card
		object.addProperty("winning_card", winningCard.printCardString(gameState.gameSpec.deck.rankOrder));
		
		// Show winning player
		object.addProperty("winning_player", winnerName);
		
		writer.println(object.toString());
	}
}
