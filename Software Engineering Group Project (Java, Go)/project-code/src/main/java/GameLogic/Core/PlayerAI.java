package GameLogic.Core;

import GameLogic.DeckAndCards.Card;
import GameLogic.DeckAndCards.Suit;

import java.util.List;
import java.util.Random;

public class PlayerAI extends Player {
	
	public static int minbid = 0;
	
	public PlayerAI(int number, String name, Game.GameState gameState) {
		super(number, name, gameState);
	}
	
	/**
	 * Method to retrieve the previous player.
	 * @param player
	 * @param gameState
	 * @return
	 */
	private Player getPrevPlayer(Player player, Game.GameState gameState) {
		// Find player number
		int wantedPlayerNumber = 0; // Placeholder for initialisation
		if (gameState.gameSpec.ascending_ordering) {
			// Turns go up regarding to player number
			wantedPlayerNumber = player.getNumber() - 1;
			if (wantedPlayerNumber == -1)
				wantedPlayerNumber = gameState.players.length - 1; // Wrap
		} else {
			// Turns go down regarding to player number
			wantedPlayerNumber = player.getNumber() + 1;
			if (wantedPlayerNumber == gameState.players.length)
				wantedPlayerNumber = 0; // Wrap
		}
		
		// Convert to player and return
		return gameState.players[wantedPlayerNumber];
	}
	
	/**
	 * Return the bid choice from the AI.
	 * @return
	 */
	@Override
	public Bid receiveBid() {
		GameParser.BidRules bidRules = this.gameState.gameSpec.bidRules;
		
		boolean isBlind = true;
		
		//If acsending bids then use previous players bid as min
		if (bidRules.ascendingBid) {
			Bid prev = this.getPrevPlayer(this, this.gameState).getBid();
			if (prev != null) {
				
				//Update the min bid
				if (prev.getValue() > PlayerAI.minbid) {
					PlayerAI.minbid = prev.getValue();
				}
				
				//If we cant bid higher than last player then pass.
				if (PlayerAI.minbid == gameState.gameSpec.bidRules.maxBid || prev.getBidType() == Bid.BidType.PASS) {
					return new Bid(Bid.BidType.PASS);
				}
				
				//We can bid higher than last player, do so by 1
				Suit bidSuit = bidRules.suitBidRank[new Random().nextInt(bidRules.suitBidRank.length)];
				isBlind = prev.isBlind();
				Bid bid = new Bid(prev.getValue()+1, bidSuit, isBlind);
				return bid;
			}
		} else {
			PlayerAI.minbid = gameState.gameSpec.bidRules.minBid;
		}
		
		//Get a random value of bid
		int val = PlayerAI.minbid+1;
		
		
		//Get a random bid suit
		Suit bidSuit = bidRules.suitBidRank[new Random().nextInt(bidRules.suitBidRank.length)];
		
		//Create the bid
		Bid bid = new Bid(val, bidSuit, isBlind);
		
		return bid;
	}
	
	/**
	 * Return the move choice from this ai
	 * @return
	 */
	@Override
	public Card receiveMove() {
		//Get the player hand
		List<Card> hand = this.getHand();
		
		//Return a random card.
		int cardIndex = new Random().nextInt(hand.size());
		return hand.get(cardIndex);
	}
	
	@Override
	public void sendGameState() {
		//Do nothing as their is no where to send game state to. i.e. no user
	}
	
	@Override
	public void sendTrickSummary(Card winningCard, String winnerName) {
		//Do nothing their is no interface
	}
}
