package GameLogic.DeckAndCards;

import java.util.ArrayList;

/**
 * This is a class to describe all cards
 */

public class Card {
    // Attributes
    private int value; // Using int for easy comparison
    private Suit suit;
    private int pointValue;

    // Constructor
    public Card(int value, Suit suit, int pointValue) {
        this.suit = suit;
        this.value = value;
        this.pointValue = pointValue;
    }

    // Getters & Setters
    public int getValue() {
        return value;
    }

    public Suit getSuit() {
        return suit;
    }

    public int getPointValue() {
        return pointValue;
    }

    public void setValue(int value) {
        this.value = value;
    }

    public void setSuitEnum(Suit suit) {
        this.suit = suit;
    }


    // Equals override
    @Override
    public boolean equals(Object obj) {
        // Self
        if (obj == this) {
            return true;
        }

        // Not a Card
        if (!(obj instanceof Card)) {
            return false;
        }

        // Suit and value same
        return (((Card) obj).value == this.value && ((Card) obj).suit == this.suit); // True if cards same
    }


    //Method to convert suit to character code
    public static char suitToCharCode(Suit suit) {
        char suitCode = '\u0216';

        if (suit != null) {
            switch (suit) {
                case SPADES:
                    suitCode = 'S';
                    break;
                case DIAMONDS:
                    suitCode = 'D';
                    break;
                case CLUBS:
                    suitCode = 'C';
                    break;
                case HEARTS:
                    suitCode = 'H';
                    break;
            }
        }

        return suitCode;
    }


    // Method to convert String rank to rank value (int)
    public static int rankStringToInt(String rankString, ArrayList<String> rankOrder) {
        // Find given String from array. This is the value to represent the rank.
        return rankOrder.indexOf(rankString); // Returns -1 if no element
    }

    // Method to convert rank value (int) to rank string
    public static String rankIntToString(int rankValue, ArrayList<String> rankOrder) {
        try {
            return rankOrder.get(rankValue);
        } catch (IndexOutOfBoundsException e) {
            return null;
        }
    }

    // Method to convert String suit to suit enum
    public static Suit suitStringToEnum(String suitString) {
        switch (suitString) {
            case "CLUBS":
                return Suit.CLUBS;
            case "DIAMONDS":
                return Suit.DIAMONDS;
            case "HEARTS":
                return Suit.HEARTS;
            case "SPADES":
                return Suit.SPADES;
            default:
                return null;
        }
    }

    // Method to convert suit enum to suit string
    public static String suitEnumToString(Suit suit) {
        switch (suit) {
            case CLUBS:
                return "CLUBS";
            case DIAMONDS:
                return "DIAMONDS";
            case HEARTS:
                return "HEARTS";
            case SPADES:
                return "SPADES";
            default:
                return null;
        }
    }
    
    public String printCardString(ArrayList<String> rankOrder) {
        
        // Get string value
        String rankAsString = rankIntToString(this.getValue(), rankOrder);
        
        // Convert value to letter if needed
        if (rankAsString != null) {
            String valueToPrint;
            switch (rankAsString) {
                case "ACE":
                    valueToPrint = "A";
                    break;
                case "KING":
                    valueToPrint = "K";
                    break;
                case "QUEEN":
                    valueToPrint = "Q";
                    break;
                case "JACK":
                    valueToPrint = "J";
                    break;
                case "TEN":
                    valueToPrint = "10";
                    break;
                case "NINE":
                    valueToPrint = "9";
                    break;
                case "EIGHT":
                    valueToPrint = "8";
                    break;
                case "SEVEN":
                    valueToPrint = "7";
                    break;
                case "SIX":
                    valueToPrint = "6";
                    break;
                case "FIVE":
                    valueToPrint = "5";
                    break;
                case "FOUR":
                    valueToPrint = "4";
                    break;
                case "THREE":
                    valueToPrint = "3";
                    break;
                case "TWO":
                    valueToPrint = "2";
                    break;
                case "ONE":
                    valueToPrint = "A";
                    break;
                default:
                    valueToPrint = "ERROR";
                    break;
            }
            return valueToPrint + "" + suitToCharCode(this.getSuit());
        }
        else {
            return "ERROR2";
        }
    }

    //QUICK TEST
    public static void main(String[] args) {
        ArrayList<Card> cards = new ArrayList<>();
        Card tc = new Card(2, Suit.CLUBS, 0);
        Card tc2 = new Card(2, Suit.CLUBS, 0);

        cards.add(tc);
        if (cards.contains(tc2)) System.out.println("YEEET");
        else System.out.println("OH NO!!");
    }

}
