package GameLogic.Core;

import GameLogic.DeckAndCards.Suit;

public class Bid {

    private BidType bidType; // Type of bid
    private int value; // Value of bid (i.e. how many tricks are won)
    private Suit suit; // Suit of bid. Value of null" to represent "NO TRUMP"
    private boolean isBlind; // Bid is blind
    private boolean doubled; // Bid is doubled
    private boolean isRedoubled; // Bid is redoubles

    // Constructors
    public Bid(int value, Suit suit, boolean isBlind) { // Ladder bid
        this.value = value;
        this.suit = suit;
        this.isBlind = isBlind;
        this.bidType = BidType.BID;
    }

    public Bid(BidType bidType) { // Pass, double or redouble
        this.bidType = bidType;
    }

    // Getters and setters
    public boolean isIsDoubled() {
        return this.doubled;
    }

    public void setIsDoubled(boolean doubled) {
        this.doubled = doubled;
    }

    public boolean isIsRedoubled() {
        return this.isRedoubled;
    }

    public void setIsRedoubled(boolean isRedoubled) {
        this.isRedoubled = isRedoubled;
    }

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }

    public Suit getSuit() {
        return suit;
    }

    public void setSuit(Suit suit) {
        this.suit = suit;
    }

    public BidType getBidType() {
        return bidType;
    }

    public void setBidType(BidType bidType) {
        this.bidType = bidType;
    }

    public boolean isBlind() {
        return isBlind;
    }

    public void setBlind(boolean blind) {
        isBlind = blind;
    }

    // Enum for bid type
    public enum BidType {
        BID, DOUBLE, PASS
    }

    // Compare to another bid to check if it is higher suit
    boolean isHigherSuitThan(Bid otherBid, Suit[] suitBidRank) {
        // Find index in array which matches the suit
        int otherBidSuitRank = 0;
        int thisBidSuitRank = 0;
        for (int i = 0; i < suitBidRank.length; i++) {
            if (otherBid.getSuit() == suitBidRank[i])
                otherBidSuitRank = i;
            if (this.getSuit() == suitBidRank[i])
                thisBidSuitRank = i;
        }

        // Compare indices to find result
        return thisBidSuitRank > otherBidSuitRank;
    }

    // Main method to test
    public static void main(String[] args) {
        Bid bid = new Bid(0, null, false);
        System.out.println(bid.value);
        System.out.println(bid.suit);
    }
    
    @Override
    public String toString() {
        return "{" +
                "\"bidType\":" + ((bidType == null) ? "" : bidType) +
                ", \"value\":" + ((Integer.toString(value) == null) ? "" : Integer.toString(value)) +
                ", \"suit\":" + ((suit == null) ? "" : suit) +
                ", \"isBlind\":" + isBlind +
                ", \"doubled\":" + doubled +
                ", \"isRedoubled\":" + isRedoubled +
                '}';
    }
}
