package GameLogic.Core;

import GameLogic.DeckAndCards.Card;
import GameLogic.DeckAndCards.Suit;
import Network.Events.BidEvent;
import Network.Events.PlayCardEvent;

/**
 * A player that represents a networked player.
 */
public class PlayerNetworked extends Player {
	
	public PlayerNetworked(int number, String name, Game.GameState gameState) {
		super(number, name, gameState);
	}
	
	@Override
	public Bid receiveBid() {
		
		// Get bid
		BidEvent e = (BidEvent) this.gameState.networkNetworkGame.receiveEvent(this.getNumber());
		
		if (e.value < 0) {
			// Negative value => Bid is a Pass
			return new Bid(Bid.BidType.PASS);
		}
		if (e.doubling) {
			// Doubling true => Bid is a double/redouble
			return new Bid(Bid.BidType.DOUBLE);
		}
		
		// Convert suit to Suit enum
		Suit suit = Card.suitStringToEnum(e.suit);
		if (suit == null) return null;
		
		// Create Bid object & return
		return new Bid(e.value, suit, e.blindBid);
	}
	
	@Override
	public Card receiveMove() {
		
		// Get card
		PlayCardEvent e = (PlayCardEvent) this.gameState.networkNetworkGame.receiveEvent(this.getNumber());
		
		// Convert suit to Suit enum
		Suit suit = Card.suitStringToEnum(e.suit);
		if (suit == null) return null;
		
		// Convert value to int
		int value = Card.rankStringToInt(e.rank, gameState.gameSpec.deck.rankOrder);
		if (value == -1) return null;
		
		// Form card from received data & return
		return new Card(value, suit, 0);
		
	}
	
	
}
