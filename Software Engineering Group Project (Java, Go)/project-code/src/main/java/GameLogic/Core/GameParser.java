package GameLogic.Core;

import GameLogic.DeckAndCards.Card;
import GameLogic.Saving.FilesHelper;
import GameLogic.DeckAndCards.Suit;
import org.json.*;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

public class GameParser {

    // =============================================================
    // =============== JSON Game Representation ===============
    // =============================================================

    public String name; // Name of the game
    public String description; // Text description of the game
    public int numberOfPlayers; // Number of players in the game
    public int numReruns; // Number of times the game should be played
    boolean plain; // Plain or point taking
    public DeckSpec deck; // Optional
    public int[][] teams; // Optional
    boolean ascending_ordering; // Optional; Order in which to take turns; default true == clockwise
    public boolean can_view_previous_trick; // Optional, but advised; default false
    public BidRules bidRules; // Optional
    public int initialHandSize;
    int minimumHandSize;

    Map<String, String> rules; // Map for rules

    public static class Rule {
        String name; // Name of the rule - must match one of those described in spec
        String data; // Value of the rule - must match one of the given options for the named rule
    }

    public static class DeckSpec {
        boolean cut; // Optional
        public ArrayList<Card> cards; // Optional; NOTE: Super group card definition is slightly different
        public ArrayList<String> rankOrder; // Optional; ordering of ranks (e.g. ace high/low)
        int stock; // i.e. extra cards not used
    }

    public static class BidRules {
        public boolean trumpSuitBid; // If you bid on the trump suit (e.g. Bridge = true, Spades = false)
        boolean ascendingBid; // If bids need to increase from previous one; default false

        int pointsPerBid; // How many points for correct bid
        int overtrickPoints; // Points for tricks you win over the bid number; default 0
        int penaltyPoints; // Points subtracted per trick short of bid
        int pointsForMatching; // Bonus points for matching bid exactly

        int minBid; // Optional; minimum bid value which can be made; default 0
        int maxBid; // Optional; maximum bid value which can be made; default number of cards dealt
                    // initially to each player

        Suit[] suitBidRank; // Optional; Ranking of suits from lowest to highest
        int[] preset; // Optional; Pre-determined bids by nature of game, e.g. 3-5-7. Null means no
                      // preset
        boolean canPass; // If a valid bid can be passed

        Integer vulnerabilityThreshold; // Optional; number of hands won before a team is vulnerable. null to show no
                                        // vulnerability. Integer for null capability.
        boolean canDouble; // If it is possible to double a bid.
        boolean canRedouble; // If it is possible to redouble a bid

        SpecialBid[] specialBids; // Optional; any special value bids
        BonusScore[] bonusScores; // Optional; any bonus points for special situations
    }

    // Class to represent special bids which players can take
    public static class SpecialBid {
        int bidValue; // Value for the special bid. 0 means any bid. Default: 0
        Suit trumpSuit; // Optional; trump suit for the special bid. Default: null

        int bonusPoints; // Points gained for special bid. Default: 0
        int overtrickPoints; // Optional; points awarded for achieving over the bid. Default: 0
        int penalty; // Optional; penalty for failing to fulfil special bid contract.

        int undertrickPoints; // Optional; points awarded for undertricks (can be negative). Default: 0
        int[] undertrickIncrement; // Optional; describes if/how undertrick points ramp up for multiple
                                   // undertricks. One element in array means flat increase rate. Default: null
        String undertrickAwardedTo; // Optional; who the undertrick points are awarded to - "player" or "opponent".
                                    // Default: null

        boolean blindBid; // If the bid must be made blind. Default: false
        boolean vulnerable; // Optional; if the player must be in a vulnerable state. Default: null
        boolean doubled; // Optional; if the special bid can be doubled/redoubled.
        int contractPoints; // The points awarded for the contract bid. Default 0
    }

    // Class to represent special scores to be calculated at end of hand
    public static class BonusScore {
        int handScoreMin; // Minimum score for the hand for bonus points. Default: 0
        int handScoreMax; // Maximum score for the hand for bonus points. Default: 0
        Integer trickTotal; // Optional; total number of tricks won. Default: 0
        Boolean vulnerable; // Optional; if the player needs to be in a vulnerable state. Default: null
        int bonusPoints; // Number of points to be awarded. Default: 0
    }

    public enum Ranks {
        ACE, KING, QUEEN, JACK, TEN, NINE, EIGHT, SEVEN, SIX, FIVE, FOUR, THREE, TWO
    }

    // =============================================================
    // =============== JSON Parser Helpers ==================
    // =============================================================

    private JSONObject readJsonObj(JSONObject jsonObject, String valString, JSONObject defaultVal) { // Objects
        if (jsonObject.has(valString)) {
            try {
                return jsonObject.getJSONObject(valString); // Read value
            } catch (Exception e) {
                return defaultVal;
            }
        } else {
            return defaultVal; // Use default
        }
    }

    private boolean readJsonBool(JSONObject jsonObject, String valString, boolean defaultVal) { // Booleans
        if (jsonObject.has(valString)) {
            try {
                return jsonObject.getBoolean(valString); // Read value
            } catch (Exception e) {
                return defaultVal;
            }
        } else {
            return defaultVal; // Use default
        }
    }

    private String readJsonString(JSONObject jsonObject, String valString, String defaultVal) { // Strings
        if (jsonObject.has(valString)) {
            try {
                return jsonObject.getString(valString); // Read value
            } catch (Exception e) {
                return defaultVal;
            }
        } else {
            return defaultVal; // Use default
        }
    }

    private int readJsonInt(JSONObject jsonObject, String valString, int defaultVal) { // Numbers
        if (jsonObject.has(valString)) {
            try {
                return jsonObject.getInt(valString); // Read value
            } catch (Exception e) {
                return defaultVal;
            }
        } else {
            return defaultVal; // Use default
        }
    }

    private JSONArray readJsonArray(JSONObject jsonObject, String valString, JSONArray defaultVal) { // Arrays
        if (jsonObject.has(valString)) {
            try {
                return jsonObject.getJSONArray(valString); // Read value
            } catch (Exception e) {
                return defaultVal;
            }
        } else {
            return defaultVal; // Use default
        }
    }

    // =============================================================
    // =============== JSON Parser (Constructor) ============
    // =============================================================

    // Constructor for class, which reads all rules from a given game description
    // file into the attributes of this object
    public GameParser(String pathString) throws IOException {

        // Provided path to JSONObject
        Path filepath = Paths.get(pathString);
        String jsonString = FilesHelper.readString(filepath.toAbsolutePath(), StandardCharsets.US_ASCII);
        JSONObject json = new JSONObject(jsonString);

        // Simple value rules
        this.name = readJsonString(json, "name", "[No Name]");
        this.description = readJsonString(json, "description", "...");
        this.numberOfPlayers = readJsonInt(json, "players", 4);
        this.numReruns = readJsonInt(json, "numReruns", 1);
        this.ascending_ordering = readJsonBool(json, "ascending_ordering", true);
        this.initialHandSize = readJsonInt(json, "initialHandSize", 13);
        this.minimumHandSize = readJsonInt(json, "minimumHandSize", 0);
        this.can_view_previous_trick = readJsonBool(json, "can_view_previous_trick", true);

        // DeckAndCards
        JSONObject deckObj = readJsonObj(json, "deck", null);
        if (deckObj != null) {
            // Custom deck
            this.deck = new DeckSpec();
            this.deck.cut = readJsonBool(deckObj, "cut", false);
            this.deck.stock = readJsonInt(deckObj, "stock", 0);

            // Rank Order
            JSONArray rankOrder = readJsonArray(deckObj, "rankOrder", null);
            if (rankOrder == null)
                this.deck.rankOrder = createStandardRankOrder(); // No order specified =>
            else { // Custom rank order (high to low)
                this.deck.rankOrder = new ArrayList<>();
                for (int i = 0; i < rankOrder.length(); i++) {
                    this.deck.rankOrder.add(rankOrder.getString(i));
                }
            }

            // Cards
            JSONArray cards = readJsonArray(deckObj, "cards", null);
            if (cards == null)
                this.deck.cards = createStandardDeck(); // No cards specified => Standard deck
            else { // Custom set of cards
                this.deck.cards = new ArrayList<>();
                for (int i = 0; i < cards.length(); i++) {
                    JSONObject thisCard = cards.getJSONObject(i);
                    String thisCardRankString = readJsonString(thisCard, "rank", "ACE");
                    String thisCardSuitString = readJsonString(thisCard, "suit", "SPADES");
                    int thisCardPointValue = readJsonInt(thisCard, "pointValue", 0);
                    this.deck.cards.add(new Card(Card.rankStringToInt(thisCardRankString, this.deck.rankOrder),
                            Card.suitStringToEnum(thisCardSuitString), thisCardPointValue));
                }
            }

        } else {
            // No deck specified => Default deck
            this.deck = new DeckSpec();
            this.deck.cut = false;
            this.deck.cards = createStandardDeck();
            this.deck.rankOrder = createStandardRankOrder();
            this.deck.stock = 0;
        }

        // Teams
        JSONArray teamsArr = readJsonArray(json, "teams", null);
        if (teamsArr == null) {
            // No specified teams => split into single player
            this.teams = new int[numberOfPlayers][1];
            for (int i = 0; i < this.teams.length; i++) {
                this.teams[i][0] = i;
            }
        } else {
            // Team game
            this.teams = new int[teamsArr.length()][];
            // Loop through teams
            for (int i = 0; i < teamsArr.length(); i++) {
                JSONArray thisTeam = teamsArr.getJSONArray(i);
                this.teams[i] = new int[thisTeam.length()];
                // Fill team
                for (int j = 0; j < thisTeam.length(); j++) {
                    this.teams[i][j] = thisTeam.getInt(j);
                }

            }
        }

        // Rules
        this.rules = new HashMap<>();
        JSONArray rulesArray = readJsonArray(json, "rules", null);
        if (rulesArray != null) {
            for (int i = 0; i < rulesArray.length(); i++) {
                JSONObject thisRule = rulesArray.getJSONObject(i);

                // Parse rule to string
                String ruleName;
                String ruleData;
                try {
                    ruleName = thisRule.getString("name");
                    ruleData = thisRule.getString("data");
                } catch (org.json.JSONException e) {
                    ruleName = thisRule.getString("name");
                    ruleData = Integer.toString(thisRule.getInt("data"));
                }

                // Add to map
                rules.put(ruleName, ruleData);
            }
        }

        // Bid
        JSONObject bidObj = readJsonObj(json, "bid", null);
        if (bidObj != null) {
            // Custom bid
            this.bidRules = new BidRules();

            // Simple rules
            this.bidRules.trumpSuitBid = readJsonBool(bidObj, "trumpSuitBid", false);
            this.bidRules.ascendingBid = readJsonBool(bidObj, "ascendingBid", false);
            this.bidRules.pointsPerBid = readJsonInt(bidObj, "pointsPerBid", 1);
            this.bidRules.overtrickPoints = readJsonInt(bidObj, "overtrickPoints", 0);
            this.bidRules.pointsForMatching = readJsonInt(bidObj, "pointsForMatching", 0);
            this.bidRules.penaltyPoints = readJsonInt(bidObj, "penaltyPoints", 0);
            this.bidRules.minBid = readJsonInt(bidObj, "minBid", 0);
            this.bidRules.maxBid = readJsonInt(bidObj, "maxBid", this.initialHandSize);
            this.bidRules.canPass = readJsonBool(bidObj, "canPass", false);
            this.bidRules.canDouble = readJsonBool(bidObj, "canDouble", false);
            this.bidRules.canRedouble = readJsonBool(bidObj, "canRedouble", false);

            // Vulnerability threshold (number with potential value of null)
            JSONObject vulnerabilityThreshold = readJsonObj(bidObj, "vulnerabilityThreshold", null);
            if (vulnerabilityThreshold == null)
                this.bidRules.vulnerabilityThreshold = null;
            else
                this.bidRules.vulnerabilityThreshold = bidObj.getInt("vulnerabilityThreshold");

            // Rank of suits for bidding
            JSONArray suitBidRank = readJsonArray(bidObj, "suitBidRank", null);
            if (suitBidRank != null) {
                // Custom rank of suits for bidding
                this.bidRules.suitBidRank = new Suit[suitBidRank.length()];
                for (int i = 0; i < suitBidRank.length(); i++) {
                    if (suitBidRank.get(i) instanceof String) {
                        this.bidRules.suitBidRank[i] = Card.suitStringToEnum(suitBidRank.getString(i));
                    } else {
                        this.bidRules.suitBidRank[i] = null;
                    }
                }
            } else {
                this.bidRules.suitBidRank = null;
            }

            // Presets for bidding
            JSONArray biddingPresets = readJsonArray(bidObj, "preset", null);
            if (biddingPresets != null) {
                this.bidRules.preset = new int[biddingPresets.length()];
                for (int i = 0; i < biddingPresets.length(); i++) {
                    this.bidRules.preset[i] = biddingPresets.getInt(i);
                }
            } else {
                this.bidRules.preset = null;
            }

            // Special bids
            JSONArray specialBids = readJsonArray(bidObj, "specialBids", null);
            if (specialBids != null) {
                // Instantiate special bid array
                this.bidRules.specialBids = new SpecialBid[specialBids.length()];

                // Fill array
                for (int i = 0; i < specialBids.length(); i++) {
                    // Get special bid JSON to read from
                    JSONObject thisSpecialBid = specialBids.getJSONObject(i);

                    // Read into special bid array
                    this.bidRules.specialBids[i] = new SpecialBid();
                    this.bidRules.specialBids[i].bidValue = readJsonInt(thisSpecialBid, "bidValue", 0);
                    String trumpSuit = readJsonString(thisSpecialBid, "trumpSuit", null);
                    if (trumpSuit == null)
                        this.bidRules.specialBids[i].trumpSuit = null;
                    else
                        this.bidRules.specialBids[i].trumpSuit = Card.suitStringToEnum(trumpSuit);

                    // Next two are alternate names for same attribute
                    this.bidRules.specialBids[i].bonusPoints = readJsonInt(thisSpecialBid, "pointsGained", 0);
                    this.bidRules.specialBids[i].bonusPoints = readJsonInt(thisSpecialBid, "bonusPoints", 0);

                    this.bidRules.specialBids[i].overtrickPoints = readJsonInt(thisSpecialBid, "overtrickPoints", 0);
                    this.bidRules.specialBids[i].penalty = readJsonInt(thisSpecialBid, "penalty", 0);
                    this.bidRules.specialBids[i].undertrickPoints = readJsonInt(thisSpecialBid, "undertrickPoints", 0);

                    JSONArray undertrickIncrement = readJsonArray(thisSpecialBid, "undertrickIncrement", null);
                    if (undertrickIncrement != null) {
                        this.bidRules.specialBids[i].undertrickIncrement = new int[undertrickIncrement.length()];
                        for (int j = 0; j < undertrickIncrement.length(); j++) {
                            this.bidRules.specialBids[i].undertrickIncrement[j] = undertrickIncrement.getInt(j);
                        }
                    } else
                        this.bidRules.specialBids[i].undertrickIncrement = null;

                    this.bidRules.specialBids[i].undertrickAwardedTo = readJsonString(thisSpecialBid,
                            "undertrickAwardedTo", "opponent");
                    this.bidRules.specialBids[i].blindBid = readJsonBool(thisSpecialBid, "blindBid", false);
                    this.bidRules.specialBids[i].vulnerable = readJsonBool(thisSpecialBid, "vulnerable", false);
                    this.bidRules.specialBids[i].doubled = readJsonBool(thisSpecialBid, "doubled", false);
                    this.bidRules.specialBids[i].contractPoints = readJsonInt(thisSpecialBid, "contractPoints", 0);
                }
            } else
                this.bidRules.specialBids = null;

            // Bonus scores
            JSONArray bonusScores = readJsonArray(bidObj, "bonusScores", null);
            if (bonusScores != null) {
                // Instantiate bonus scores array
                this.bidRules.bonusScores = new BonusScore[bonusScores.length()];

                // Fill array
                for (int i = 0; i < bonusScores.length(); i++) {
                    // Get bonus score JSON
                    JSONObject thisBonusScore = bonusScores.getJSONObject(i);

                    // Read values into array
                    this.bidRules.bonusScores[i] = new BonusScore();
                    this.bidRules.bonusScores[i].handScoreMin = readJsonInt(thisBonusScore, "handScoreMin", 0);
                    this.bidRules.bonusScores[i].handScoreMax = readJsonInt(thisBonusScore, "handScoreMax", 0);

                    JSONObject vulnerable = readJsonObj(bidObj, "vulnerable", null);
                    if (vulnerable == null)
                        this.bidRules.bonusScores[i].vulnerable = null;
                    else
                        this.bidRules.bonusScores[i].vulnerable = bidObj.getBoolean("vulnerable");

                    JSONObject trickTotal = readJsonObj(thisBonusScore, "trickTotal", null);
                    if (trickTotal == null)
                        this.bidRules.bonusScores[i].trickTotal = null;
                    else
                        this.bidRules.bonusScores[i].trickTotal = thisBonusScore.getInt("trickTotal");

                    this.bidRules.bonusScores[i].bonusPoints = readJsonInt(thisBonusScore, "bonusPoints", 0);
                }
            }

        } // End bid

        //
        // this.deck = new DeckSpec();
        // this.deck.cut = readJsonBool(deckObj, "cut", false);
        // this.deck.stock = readJsonInt(deckObj, "stock", 0);
        //
        // // Rank Order
        // JSONArray rankOrder = readJsonArray(deckObj, "rankOrder", null);
        // if (rankOrder == null) this.deck.rankOrder = createStandardRankOrder(); // No
        // order specified =>
        // else { // Custom rank order (high to low)
        // this.deck.rankOrder = new ArrayList<>();
        // for (int i = 0; i < rankOrder.length(); i++) {
        // this.deck.rankOrder.add(rankOrder.getString(i));
        // }
        // }
        //
        // // Cards
        // JSONArray cards = readJsonArray(deckObj, "cards", null);
        // if (cards == null) this.deck.cards = createStandardDeck(); // No cards
        // specified => Standard deck
        // else { // Custom set of cards
        // this.deck.cards = new ArrayList<>();
        // for (int i = 0; i < cards.length(); i++) {
        // JSONObject thisCard = cards.getJSONObject(i);
        // String thisCardRankString = readJsonString(thisCard, "rank", "ACE");
        // String thisCardSuitString = readJsonString(thisCard, "suit", "SPADES");
        // int thisCardPointValue = readJsonInt(thisCard, "pointValue", 0);
        // this.deck.cards.add(new Card(
        // Card.rankStringToInt(thisCardRankString, this.deck.rankOrder),
        // Card.suitStringToEnum(thisCardSuitString),
        // thisCardPointValue));
        // }
        // }
    }

    // Method to create standard set of cards
    private static ArrayList<Card> createStandardDeck() {
        Suit[] suits = { Suit.CLUBS, Suit.DIAMONDS, Suit.HEARTS, Suit.SPADES };
        int[] ranks = { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 };

        // Generate each card, adding to deck
        ArrayList<Card> standardDeck = new ArrayList<>();
        for (Suit suit : suits) {
            for (int rank : ranks) {
                standardDeck.add(new Card(rank, suit, 0));
            }
        }

        return standardDeck;
    }

    // Method to create standard rank ordering (ace high)
    private static ArrayList<String> createStandardRankOrder() {
        /*String[] ranksArray = {"ACE", "KING", "QUEEN", "JACK", "TEN", "NINE", "EIGHT",
                "SEVEN", "SIX", "FIVE", "FOUR", "THREE", "TWO"};*/
        
        String[] ranksArray = {"TWO",
				"THREE",
				"FOUR",
				"FIVE",
				"SIX",
				"SEVEN",
				"EIGHT",
				"NINE",
				"TEN",
				"JACK",
				"QUEEN",
				"KING",
				"ACE"};
        
        
        return new ArrayList<>(Arrays.asList(ranksArray));
    }

    // Main method to test
    public static void main(String[] args) throws Exception {
        GameParser gameParser = new GameParser(args[0]);
        System.out.println(gameParser.name);
        System.out.println(gameParser.description);
    }

}
