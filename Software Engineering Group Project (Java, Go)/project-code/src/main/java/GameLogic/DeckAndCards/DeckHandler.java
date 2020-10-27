package GameLogic.DeckAndCards;

import java.util.ArrayList;

import org.apache.commons.math3.random.MersenneTwister;

import GameLogic.Core.Player;

/*
*  Acts as a wrapper for the Deck class  
*/
public class DeckHandler {

    private Deck deck; // Deck which is currently being wrapped
    private Card lastDealt; // Last card dealt for reference in rules
    private int seed; // Seed for generator
    MersenneTwister twister; // Randomiser used for shuffling - should persist between hands
    private int shuffleCount; // Number of times shuffler has been used

    // Getters and Setters
    public int getSeed() {
        return this.seed;
    }
    public void setSeed(int seed) {
        this.seed = seed;
    }
    public int getShuffleCount() {
        return this.shuffleCount;
    }

    public void setShuffleCount(int shuffleCount) {
        this.shuffleCount = shuffleCount;
    }
    public Card getLastDealt() {
        return this.lastDealt;
    }

    public void setLastDealt(Card lastDealt) {
        this.lastDealt = lastDealt;
    }

    // Constructor
    public DeckHandler(ArrayList<Card> deckOrder, int seed) {
        // Create random generator from seed
        this.twister = new MersenneTwister(seed);
        this.seed = seed;
        this.shuffleCount = 0;

        // Create deck - Doesn't matter if called again
        createDeck(deckOrder);
    }

    // Creates a deck from a deck order - Used to replace old deck for new hand
    public void createDeck(ArrayList<Card> deckOrder) {
        // Create deck
        deck = new Deck();
        for (int i = deckOrder.size() - 1; i >= 0; i--) {
            Card cardToAdd = deckOrder.get(i);
            deck.push(new Card(cardToAdd.getValue(), cardToAdd.getSuit(), cardToAdd.getPointValue()));
        }
    }

    // Shuffles the deck in accordance with protocol (Fisher Yates)
    public void shuffleDeck() {

        // Naming to match shuffle_protocol.md
        int n = deck.size();
        for (int i = n - 1; i > 0; i--) {
            int j = Math.abs(Math.floorMod(twister.nextInt(), i + 1));
            Card temp = deck.get(i);
            deck.set(i, deck.get(j));
            deck.set(j, temp);
        }

        // Increment shuffle counter
        this.shuffleCount ++;
    }

    // Pop one card from deck
    private Card drawCard() {
        lastDealt = deck.pop();
        return lastDealt;
    }

    // Deals the entire deck to a given set of players (Fisher Yates)
    public void dealHand(Player[] players, int dealerPlayerIndex, boolean ascending, int handSize) {

        // Find first player to deal to
        int thisPlayerIndex = dealerPlayerIndex;
        if (ascending) {
            thisPlayerIndex++;
            if (thisPlayerIndex > players.length - 1) {
                // Manage overflow
                thisPlayerIndex = 0;
            }
        } else {
            thisPlayerIndex--;
            if (thisPlayerIndex < 0) {
                // Manage underflow
                thisPlayerIndex = players.length - 1;
            }
        }

        // Deal hand size to each player in round robin fashion
        for (int i = 0; i < handSize; i++) {
            for (int j = 0; j < players.length; j++) {
                
                // Give card
                players[thisPlayerIndex].addToHand(drawCard());

                // Advance player
                if (ascending) {
                    thisPlayerIndex++;
                    if (thisPlayerIndex > players.length - 1) {
                        // Manage overflow
                        thisPlayerIndex = 0;
                    }
                } else {
                    thisPlayerIndex--;
                    if (thisPlayerIndex < 0) {
                        // Manage underflow
                        thisPlayerIndex = players.length - 1;
                    }
                }
            }
        }
    }

}