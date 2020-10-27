package GameLogic.Core;

import GameLogic.AcesSeven;
import GameLogic.Core.Bid.BidType;
import GameLogic.Core.GameParser.SpecialBid;
import GameLogic.DeckAndCards.*;
import GameLogic.Saving.GameSaveHandler;
import GameLogic.Saving.ProfileHandler;
import Network.Events.BidEvent;
import Network.Events.PlayCardEvent;
import Network.GamePlay.NetworkGame;

import java.util.ArrayList;

public class Game {

    // =============================================================
    // ================= Game State Definition ===============
    // =============================================================

    // Class to represent current state of game
    public static class GameState {
        public GameSaveHandler gameSaveHandler = new GameSaveHandler();

        public Player[] players; // All players
        public int dealerPlayerNumber; // Player number of dealer for this hand
        public int currentPlayerNumber; // Player number for next move
        public int firstPlayerNumber; // Number of first player to play in current trick
        public int prevWinnerNumber; // Player number for previous trick/hand winner

        public Table currentTable; // Current table, including cards

        public DeckHandler deckHandler; // Deck handler

        public ArrayList<Card> prevTrick; // Previous trick

        public GameParser gameSpec; // Parsed game specification

        public String gameFilePath; // Path to gamespec

        public int turnNumber = 0; // Current turn number in trick
        public int trickNumber = 0; // Current trick number in hand
        public int handNumber = 0; // Current hand number in game
        public int gameNumber = 0; // Current game number in session
        public int sessionNumber = 0; // Current session (used for re-runs)

        public Suit trumpSuit; // Current trump suit

        public ArrayList<Suit> allowedSuits = null; // Suits next card should be - null if any
        public ArrayList<Integer> allowedValues = null; // Values next card should be - null if any

        public int currentHandSize; // Hand size for current hand
        public boolean isTeamGame; // Bool to show if game uses teams (i.e. > 1 player per team)

        public NetworkGame networkNetworkGame; // Networking implementation
        public boolean isNetworked; // Bool to show if game is networked or not

        public boolean isAsyncGame; // Bool to show if game is played using pub-sub or not
    }

    // =============================================================
    // =================== Auxiliary Functions =====================
    // =============================================================
    
    // Method to retrieve the previous player
    public Player getPrevPlayer(Player player, GameState gameState) {
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

    // =============================================================
    // =========== Game Setup & Shutdown Functions ==========
    // =============================================================

    // Method to complete dealing and associated rules for start of a game
    private void startGame(GameState gameState, int shuffleSeed) {

        // Create deck & shuffle
        gameState.deckHandler.createDeck(gameState.gameSpec.deck.cards);
        gameState.deckHandler.shuffleDeck();

        // Deal
        gameState.dealerPlayerNumber = 0; // Reset to host every game - Super Group specification
        gameState.deckHandler.dealHand(gameState.players, gameState.dealerPlayerNumber,
                gameState.gameSpec.ascending_ordering, gameState.currentHandSize);

        // Create table
        gameState.currentTable = new Table(new ArrayList<Card>());

        // Set initial trump suit (can leave null if no designated initial trump)
        String trumpPickingMode = gameState.gameSpec.rules.get("trumpPickingMode");
        switch (trumpPickingMode) {
            case "lastDealt":
                gameState.trumpSuit = gameState.deckHandler.getLastDealt().getSuit();
                break;

            case "fixed":
            case "predefined":
                String trumpSuitString = gameState.gameSpec.rules.get("trumpSuit");
                gameState.trumpSuit = Card.suitStringToEnum(trumpSuitString);
                break;

            default:
                gameState.trumpSuit = null;
                break;
        }

        // Set fixed first card if needed
        String leadingCardRule = gameState.gameSpec.rules.get("validLeadingCardFirstTrick");
        if (leadingCardRule == null)
            leadingCardRule = "any";
        if (leadingCardRule.equals("fixed")) {
            // Finds fixed card
            String cardString = gameState.gameSpec.rules.get("validLeadingCardFirstTrickCard");

            // Split into value and suit with " " as delimiter
            int indexOfSpace = cardString.indexOf(" ");
            if (indexOfSpace == -1)
                leadingCardRule = "any"; // Card not specified properly, so adapt rules
            String valueString = cardString.substring(0, indexOfSpace);
            String suitString = cardString.substring(indexOfSpace + 1);

            // Convert suit to Suit enum
            Suit suit = Card.suitStringToEnum(suitString);
            if (suit == null) {
                // Suit not described properly, so adapt rules
                leadingCardRule = "any";
            }

            // Convert value to int
            int value = Card.rankStringToInt(valueString, gameState.gameSpec.deck.rankOrder);
            if (value == -1) {
                // Value not described properly, so adapt rules
                leadingCardRule = "any";
            }

            // Create card from found values
            Card firstCard = new Card(value, suit, 0);

            // Find player who owns card. That player starts
            for (Player thisPlayer : gameState.players) {
                if (thisPlayer.getHand().contains(firstCard)) {
                    gameState.firstPlayerNumber = thisPlayer.getNumber();
                }
            }

            // Enforce chosen card
            gameState.allowedSuits = new ArrayList<>();
            gameState.allowedSuits.add(suit);
            gameState.allowedValues = new ArrayList<>();
            gameState.allowedValues.add(value);

        }

        // If any card goes first and there's no bidding, left to dealer goes first
        if (leadingCardRule.equals("any") && gameState.gameSpec.bidRules == null) {
            gameState.firstPlayerNumber = gameState.dealerPlayerNumber;
            if (gameState.firstPlayerNumber >= gameState.players.length) {
                gameState.firstPlayerNumber = 0;
            }
        } else {
            // Use dealer as default
            gameState.firstPlayerNumber = gameState.dealerPlayerNumber;
        }

        // Set current player to first player
        gameState.currentPlayerNumber = gameState.firstPlayerNumber;
    }

    // Method to end session
    private void endSession(GameState gameState) {

        // Find winner(s)
        ArrayList<String> winners = new ArrayList<>();

        if (gameState.isTeamGame) {
            // Team game => Find winning team
            int[] teamPointsArr = new int[gameState.gameSpec.teams.length];
            int largestScore = 0;
            int winningTeamIndex = 0;
            for (int i = 0; i < gameState.gameSpec.teams.length; i++) {
                int[] thisTeam = gameState.gameSpec.teams[i];

                // Add points for each player to their team score
                for (int thisPlayerNumber : thisTeam) {
                    teamPointsArr[i] += gameState.players[i].getGamesThisSession();
                }

                // Set as largest if that's the case
                if (teamPointsArr[i] > largestScore) {
                    largestScore = teamPointsArr[i];
                    winningTeamIndex = i;
                }
            }

            // Add winners from team to winners list
            for (int thisPlayerIndex : gameState.gameSpec.teams[winningTeamIndex]) {
                winners.add(gameState.players[thisPlayerIndex].getName());
            }

        } else {
            // Not team game => Find top player
            String winningPlayer = "0";
            int mostGamesWon = -1;
            for (Player thisPlayer : gameState.players) {
                if (thisPlayer.getGamesThisSession() > mostGamesWon) {
                    winningPlayer = thisPlayer.getName();
                    mostGamesWon = thisPlayer.getGamesThisSession();
                }
            }

            // Add to winners array
            winners.add(winningPlayer);
        }

        // Send session winners to players.
        for (int i = 0; i < gameState.players.length; i++) {
            gameState.players[i].sendSessionWinners(winners);
        }
        

        // Reset players
        for (Player thisPlayer : gameState.players) {
            thisPlayer.setGamesThisSession(0);
            thisPlayer.setPointsThisGame(0);
            thisPlayer.setTricksThisGame(0);
            thisPlayer.setTricksThisHand(0);
            thisPlayer.setBid(null);
            thisPlayer.setSeenCards(false);
            thisPlayer.setVulnerable(false);
            thisPlayer.setIsDummy(false);
        }

        // Reset session
        gameState.turnNumber = 0;
        gameState.trickNumber = 0;
        gameState.handNumber = 0;
        gameState.gameNumber = 0;
        gameState.currentHandSize = gameState.gameSpec.initialHandSize;

        // Increment session counter
        gameState.sessionNumber++;
    }

    // Method to end reruns
    private boolean runsComplete(GameState gameState) {
        if (gameState.sessionNumber >= gameState.gameSpec.numReruns) {
            return true;
        }
        return false;
    }

    // =============================================================
    // ====================== Network Functions ====================
    // =============================================================

    // Method to quit if another player cheats
    private void rageQuit() {
        System.out.println("Rage Quitting");
        System.exit(0);
    }

    // Method to send this machine's move to other players
    public static void sendBidToOtherPlayers(Bid bid, Game.GameState gameState, boolean isBlind) {

        // Create an event to distribute on the network
        BidEvent bidEvent = new BidEvent();
        bidEvent.type = "bid";
        bidEvent.suit = Card.suitEnumToString(bid.getSuit());
        bidEvent.blindBid = isBlind;

        switch (bid.getBidType()) {
            default:
            case BID:
                bidEvent.value = bid.getValue();
                break;
            case PASS:
                bidEvent.value = -1;
                break;
            case DOUBLE:
                bidEvent.doubling = true;
                break;
        }

        // Send the event to the network.
        gameState.networkNetworkGame.sendEvent(bidEvent);
    }

    // Method to send this machine's move to other players
    public static void sendMoveToOtherPlayers(Card card, Game.GameState gameState) throws RuleBreachException {

        // Convert suit to string
        String suit = Card.suitEnumToString(card.getSuit());
        if (suit == null)
            throw new RuleBreachException();

        // Convert value to int
        String value = Card.rankIntToString(card.getValue(), gameState.gameSpec.deck.rankOrder);
        if (value == null)
            throw new RuleBreachException();

        // Create an event to distribute on the network
        PlayCardEvent cardEvent = new PlayCardEvent();
        cardEvent.suit = suit;
        cardEvent.rank = value;
        cardEvent.type = "play";

        // Send the event to the network.
        gameState.networkNetworkGame.sendEvent(cardEvent);
    }

    // =============================================================
    // ================= Game State Functions ======================
    // =============================================================

    // Method to lock in bid. Return false means bid invalid
    private boolean makeBid(GameState gameState, Player player, Bid bid) {

        if (gameState.gameSpec.bidRules.ascendingBid) {

            // If final player after no bids in first auction loop, this player MUST bid
            boolean allPasses = true;
            for (Player thisPlayer : gameState.players) {
                if (thisPlayer.getNumber() != player.getNumber()) {
                    // If not this player, and not pass, then not all passes
                    if (thisPlayer.getBid() != null && thisPlayer.getBid().getBidType() != Bid.BidType.PASS) {
                        allPasses = false;
                        break;
                    }
                }
            }
            if (allPasses) {
                if (bid.getBidType() != Bid.BidType.BID) {
                    return false;
                }
            }

            /*
             * Should be increasing from last made bid (value or suit) or pass/double
             * OPTIONS: - 1) Pass - 2) Double (opposition) - 3) Redouble (team mate) - 4)
             * Bid
             */

            // Player has played a pass (OPTION 1)
            if (bid.getBidType() == Bid.BidType.PASS) {
                if (gameState.gameSpec.bidRules.canPass) {
                    player.setBid(bid);
                    return true;
                } else {
                    // Passing when not in rules
                    return false;
                }
            }

            // Player has played a double/redouble (OPTION 2, OPTION 3)
            if (bid.getBidType() == Bid.BidType.DOUBLE) {

                // Check doubling is allowed in rules
                if (!gameState.gameSpec.bidRules.canDouble)
                    return false;

                // Check for other doubles since last bid
                int doubleCount = 0;
                Player thisPlayerMarker = getPrevPlayer(player, gameState);

                // Loop through all players until last bid or this player looped to to count all
                // doubles
                while (thisPlayerMarker != player && thisPlayerMarker.getBid() != null
                        && thisPlayerMarker.getBid().getBidType() != Bid.BidType.BID) {

                    // Increment counter if double played
                    if (thisPlayerMarker.getBid().getBidType() == Bid.BidType.DOUBLE)
                        doubleCount += 1;
                    // Move to prev player
                    thisPlayerMarker = getPrevPlayer(thisPlayerMarker, gameState);
                }

                // Can't play double if no bid played
                if (thisPlayerMarker.getBid() == null)
                    return false;

                // Check if this player is on current bidding player's team
                boolean contractTeam = false;
                for (int[] thisTeam : gameState.gameSpec.teams) {
                    boolean contractorInTeam = false;
                    boolean doublerInTeam = false;
                    for (int thisTeamMember : thisTeam) {
                        if (thisPlayerMarker.getNumber() == thisTeamMember) {
                            // Contractor in this team
                            contractorInTeam = true;
                        }
                        if (player.getNumber() == thisTeamMember) {
                            // Doubler in this team
                            doublerInTeam = true;
                        }
                    }

                    // If both contractor and doubler on same team, say so
                    if (contractorInTeam && doublerInTeam) {
                        contractTeam = true;
                    }
                }

                // Can play second double if redouble allowed
                if (gameState.gameSpec.bidRules.canRedouble && doubleCount == 1) {
                    // Player must be on same team
                    if (contractTeam) {
                        player.setBid(bid);
                        return true;
                    } else {
                        return false;
                    }
                }

                // Otherwise no more than 1 double
                if (doubleCount > 1) {
                    return false;
                }

                // Getting to here means player wants to double. Must be on opposing team
                if (!contractTeam) {
                    player.setBid(bid);
                    return true;
                }

                return false;
            }

            // Else player has made a bid (OPTION 4)

            // Check value against rule boundaries
            if (bid.getValue() < gameState.gameSpec.bidRules.minBid)
                return false; // Below min
            if (bid.getValue() > gameState.gameSpec.bidRules.maxBid)
                return false; // Above max

            // Get previous bid
            Bid prevBid = null;
            Player thisPlayerMarker = getPrevPlayer(player, gameState);
            while (thisPlayerMarker != player && prevBid == null) {
                if (thisPlayerMarker.getBid() != null) {
                    if (thisPlayerMarker.getBid().getBidType() == Bid.BidType.BID)
                        prevBid = thisPlayerMarker.getBid();
                } else
                    break; // No prev bids
                thisPlayerMarker = getPrevPlayer(thisPlayerMarker, gameState);
            }

            // No previous bid made => Bid okay
            if (prevBid == null) {
                player.setBid(bid);
                return true;
            }

            // Previous bid made => Need to compare
            if (bid.getValue() > prevBid.getValue()) {
                // Greater value always okay
                player.setBid(bid);
                return true;
            }

            if (bid.isHigherSuitThan(prevBid, gameState.gameSpec.bidRules.suitBidRank)
                    && bid.getValue() == prevBid.getValue()) {
                // Greater suit, but same value is okay
                player.setBid(bid);
                return false;
            }

            // No other option for bid to be accepted
            return false;

        } // End if (ascending bidding)

        // Check bid is of type bid
        if (bid.getBidType() != Bid.BidType.BID)
            return false;

        // Check value against rule boundaries
        if (bid.getValue() < gameState.gameSpec.bidRules.minBid)
            return false; // Below min
        if (bid.getValue() > gameState.gameSpec.bidRules.maxBid)
            return false; // Above max

        // Make bid
        player.setBid(bid);
        return true;
    }

    // Method to check if a contract can be declared in auction bidding
    private boolean canDeclareContract(GameState gameState) {

        // Can only declare if all but next player in rotation passed
        Player thisPlayer = gameState.players[gameState.currentPlayerNumber];
        for (int i = 0; i < gameState.players.length; i++) {
            if (thisPlayer.getBid().getBidType() == Bid.BidType.BID) {
                return (i == gameState.players.length - 1); // If last player, then everyone has had a turn
            }
            if (thisPlayer.getBid() == null || thisPlayer.getBid().getBidType() != Bid.BidType.PASS) {
                return false; // Not everyone has made a bid, or their bids were not passes
            }
            thisPlayer = getPrevPlayer(thisPlayer, gameState); // Cycle to next player
        }
        return false; // Happy compilation
    }

    // Method to declare a contract - Must check if possible before hand
    private void declareContract(GameState gameState) {

        // Loop players, finding player who made contract. Also find if double or
        // redouble applied
        Bid contractBid = null;
        Player contractPlayer = null;
        boolean contractDoubled = false;
        boolean contractRedoubled = true;
        for (Player thisPlayer : gameState.players) {
            if (thisPlayer.getBid().getBidType() == Bid.BidType.BID) {
                contractBid = thisPlayer.getBid();
                contractPlayer = thisPlayer;
            } else if (thisPlayer.getBid().getBidType() == Bid.BidType.DOUBLE) {
                if (!contractDoubled) {
                    // If first double, is a double
                    contractDoubled = true;
                } else {
                    // If second double, is a redouble
                    contractRedoubled = true;
                }
            }
        }

        // Update found contract with doubling/redoubling
        contractBid.setIsDoubled(contractDoubled);
        contractBid.setIsRedoubled(contractRedoubled);

        // Set trump suit to contract if rules say to
        String trumpPickingMode = gameState.gameSpec.rules.get("trumpPickingMode");
        if (trumpPickingMode.equals("bid")) {
            gameState.trumpSuit = contractBid.getSuit();
        }

        // Set first player depending on rules
        String firstPlayerRule = gameState.gameSpec.rules.get("firstTrickLeader");
        switch (firstPlayerRule) {
            case "bidWinner":
            case "contractWinner":
                gameState.firstPlayerNumber = contractPlayer.getNumber();
                gameState.currentPlayerNumber = contractPlayer.getNumber();
                break;
            default:
                break;
        }
    }

    // Method to complete a move. Return false means move invalid
    private boolean makeMove(GameState gameState, Player player, Card cardToPlay) {

        // Check if player owns card
        if (!player.getHand().contains(cardToPlay))
            return false;

        // Check if move needs to follow suit, and does so if needed
        if (gameState.allowedSuits != null) {
            if (!gameState.allowedSuits.contains(cardToPlay.getSuit())) {
                // Move doesn't follow suit, so check rules
                if (gameState.gameSpec.rules.get("nextLegalCardMode").equals("trick")) {
                    // Assume trick rule allows any card to be played, provided wanted suit is not
                    // held
                    for (Card thisCard : player.getHand()) {
                        if (gameState.allowedSuits.contains(thisCard.getSuit())) {
                            // Requests new move if player has card of suit
                            return false;
                        }
                    }
                } else {
                    // No rules to allow exceptions
                    return false;
                }
            }
        }

        // Check if move needs to follow value, and does so if needed
        if (gameState.allowedValues != null) {
            if (!gameState.allowedValues.contains(cardToPlay.getValue())) {
                // Move doesn't follow value, so check rules
                if (gameState.gameSpec.rules.get("nextLegalCardMode").equals("trick")) {
                    // Assume trick rule allows any card to be played, provided wanted value is not
                    // held
                    for (Card thisCard : player.getHand()) {
                        if (gameState.allowedValues.contains(thisCard.getValue())) {
                            // Requests new move if player has card of value
                            return false;
                        }
                    }

                } else {
                    // No rules to allow exceptions
                    return false;
                }
            }
        }

        // MAKE MOVE, ADJUSTING TABLE AND HANDS

        // Remove from hand
        player.getHand().remove(cardToPlay);

        // Add to suits to follow depending on rules
        String nextLegalCardRule = gameState.gameSpec.rules.get("nextLegalCardMode");
        if (nextLegalCardRule.equals("trick")) {
            if (gameState.allowedSuits == null) {
                // Suit to follow is first played suit
                gameState.allowedSuits = new ArrayList<>();
                gameState.allowedSuits.add(cardToPlay.getSuit());
            }
        }

        // Add to table
        gameState.currentTable.addCard(cardToPlay);

        // Move made, so return true
        return true;
    }

    // Method to move to next player
    private void advancePlayer(GameState gameState) {

        // Move to next player
        if (gameState.gameSpec.ascending_ordering) {
            // Turns go up regarding to player number
            gameState.currentPlayerNumber += 1;
            if (gameState.currentPlayerNumber == gameState.players.length)
                gameState.currentPlayerNumber = 0;
        } else {
            // Turns go down regarding to player number
            gameState.currentPlayerNumber -= 1;
            if (gameState.currentPlayerNumber == -1)
                gameState.currentPlayerNumber = gameState.players.length - 1;
        }

    }

    // Method to move to next turn
    private void advanceTurn(GameState gameState) {

        // Move to next player
        advancePlayer(gameState);

        // Clear required suits and values if needed (First trick first hand)
        String leadingCardRule = gameState.gameSpec.rules.get("validLeadingCardFirstTrick");
        if (leadingCardRule != null && leadingCardRule.equals("fixed") && gameState.turnNumber == 0
                && gameState.trickNumber == 0) {
            // Clear requirements for first card
            if (gameState.allowedValues != null && gameState.allowedValues.size() != 0) {
                gameState.allowedValues.remove(0);
                if (gameState.allowedValues.size() == 0)
                    gameState.allowedValues = null;
            }
            if (gameState.allowedSuits != null && gameState.allowedSuits.size() != 0) {
                gameState.allowedSuits.remove(0);
                if (gameState.allowedSuits.size() == 0)
                    gameState.allowedSuits = null;
            }
        }

        // Increment number
        gameState.turnNumber += 1;

    }

    // Method to move to next trick
    private void advanceTrick(GameState gameState) {

        // Find rules
        String legalCardModeRule = gameState.gameSpec.rules.get("nextLegalCardMode");
        if (legalCardModeRule == null)
            legalCardModeRule = "any"; // Adapt rules if incomplete

        // Find winning card of trick
        Card leadingCard = gameState.currentTable.getCards().get(0);
        Card winningCard = leadingCard;
        for (Card thisCard : gameState.currentTable.getCards()) {

            // Choose winner depending on rules
            if (legalCardModeRule.equals("trick")) {
                // Trick rules => Card not trump and not following suit is regarded lowly
                if (!thisCard.equals(winningCard)) { // Same card means first played wins
                    /*
                     * Three cases this card beats another card: 1) Trump when other card not 2)
                     * Greater value than other card when both are same suit as leading card 3)
                     * Greater value than other card when both are trumps
                     */
                    if (thisCard.getValue() > winningCard.getValue()) {
                        if (thisCard.getSuit() == gameState.trumpSuit) {
                            winningCard = thisCard; // 3 & part of 1)
                        } else if (thisCard.getSuit() == leadingCard.getSuit()) {
                            winningCard = thisCard; // 2)
                        }
                    } else if (winningCard.getSuit() != gameState.trumpSuit
                            && thisCard.getSuit() == gameState.trumpSuit) {
                        winningCard = thisCard; // Rest of 1)
                    }
                }
            } else {
                // leadingCardModeRule == "any"
                // Any card allowed => get highest trump, and if no trumps, then highest other
                // value
                if (!thisCard.equals(winningCard)) { // Same card means first played wins
                    /*
                     * Three cases this card beats another card: 1) Trump when other card is not 2)
                     * Greater value than other card when both not trumps 3) Greater value than
                     * other card when both trumps
                     */

                    if (winningCard.getSuit() != gameState.trumpSuit && thisCard.getSuit() == gameState.trumpSuit) {
                        winningCard = thisCard; // 1)
                    } else if (thisCard.getValue() > winningCard.getValue()) { // Same value => First played wins
                        if (thisCard.getSuit() == gameState.trumpSuit && winningCard.getSuit() == gameState.trumpSuit) {
                            winningCard = thisCard; // 3)
                        } else if (winningCard.getSuit() != gameState.trumpSuit) {
                            winningCard = thisCard; // 2)
                        }
                    }
                }
            }
        }

        // Find owner of winning card
        int winningIndex = gameState.currentTable.getCards().indexOf(winningCard);
        int winningPlayerIndex = gameState.firstPlayerNumber + winningIndex;
        if (winningPlayerIndex >= gameState.players.length) {
            winningPlayerIndex -= gameState.players.length;
        }
        Player winner = gameState.players[winningPlayerIndex];
        gameState.prevWinnerNumber = winner.getNumber(); // Saves winner

        // Add trick to winners'count
        winner.setTricksThisGame(winner.getTricksThisGame() + 1);
        winner.setTricksThisHand(winner.getTricksThisHand() + 1);

        // Store trick for hand scoring
        winner.appendTricksEarned(gameState.currentTable.getCards());

        // Decide who takes first turn of next trick
        // Only one case for now of winner going first - Rules.md only specifies one
        // option
        gameState.firstPlayerNumber = winner.getNumber();
        gameState.currentPlayerNumber = gameState.firstPlayerNumber;

        // Reset allowed suits if rules say so
        if (gameState.gameSpec.rules.get("nextLegalCardMode").equals("trick")) {
            gameState.allowedSuits = null;
        }

        // Clear table & adjust counters
        gameState.turnNumber = 0;
        gameState.trickNumber++;
        gameState.prevTrick = gameState.currentTable.getCards();
        gameState.currentTable.clearTableCards();

        // Send trick summary to every player
        for (Player p : gameState.players) {
            p.sendTrickSummary(winningCard, winner.getName());
        }
    }

    // Method to move to next hand after all tricks complete
    private void advanceHand(GameState gameState) {

        // Parse rules
        String scoringRule = gameState.gameSpec.rules.get("calculateScore"); // "tricksWon", "bid", "trumpPointValue"
        String scoringDirection = gameState.gameSpec.rules.get("scoring"); // "golf" or "standard"
        if (scoringDirection == null) {
            scoringDirection = "standard"; // Default
        }
        int trickThreshold = 0;
        try {
            String trickThresholdRule = gameState.gameSpec.rules.get("trickThreshold");
            if (trickThresholdRule != null) {
                trickThreshold = Integer.parseInt(trickThresholdRule);
            }
        } catch (NumberFormatException e) {
            // Ignore to adapt rules
        }

        // Rule-dependent switch
        switch (scoringRule) {

            case "bid": // Each player gets points based on tricks in comparison to their bids

                // Loop through players, scoring each and finding winners
                for (Player thisPlayer : gameState.players) {

                    // Check their bid is a bid. Do not score for pass, double, etc...
                    if (thisPlayer.getBid().getBidType() == Bid.BidType.BID) {
                        // Calculate difference between bid and result. +ve => overtricks, -ve =>
                        // undertricks
                        int trickDifference = (thisPlayer.getTricksEarned().size() - trickThreshold)
                                - thisPlayer.getBid().getValue();

                        // Calculate points to add to player and opponents
                        int pointsToGive = 0;
                        int pointsToGiveOpponent = 0;

                        // Check all special bids for a match to current state
                        boolean specialBid = false;
                        for (SpecialBid thisSpecialBid : gameState.gameSpec.bidRules.specialBids) {

                            // Check all conditions for this special bid
                            if ((thisSpecialBid.bidValue == thisPlayer.getBid().getValue()
                                    || thisSpecialBid.bidValue == -1)
                                    && (thisSpecialBid.trumpSuit == gameState.trumpSuit
                                            || !gameState.gameSpec.bidRules.trumpSuitBid)
                                    && thisSpecialBid.doubled == thisPlayer.getBid().isIsDoubled()
                                    && thisSpecialBid.vulnerable == thisPlayer.isVulnerable()
                                    && thisSpecialBid.blindBid == thisPlayer.getBid().isBlind()) {

                                // Match found => Apply special bid to score

                                // Overtrick
                                if (trickDifference > 0) {
                                    pointsToGive += thisSpecialBid.bonusPoints;
                                    pointsToGive += thisSpecialBid.overtrickPoints * trickDifference;
                                }

                                // Undertrick
                                if (trickDifference < 0) {
                                    pointsToGive -= thisSpecialBid.penalty;

                                    int undertrickPointsTotal = 0;
                                    int undertricks = Math.abs(trickDifference);

                                    if (thisSpecialBid.undertrickIncrement != null
                                            && thisSpecialBid.undertrickIncrement.length != 0) {
                                        // Increase points per undertrick
                                        for (int i = 0; i < undertricks; i++) {

                                            // Use final value if more undertricks than increments
                                            int incrementIndex = i;
                                            if (incrementIndex >= thisSpecialBid.undertrickIncrement.length) {
                                                incrementIndex = thisSpecialBid.undertrickIncrement.length - 1;
                                            }

                                            // Add to score
                                            undertrickPointsTotal += thisSpecialBid.undertrickIncrement[incrementIndex];

                                        }

                                    } else {
                                        // Points per undertrick is uniform
                                        undertrickPointsTotal += undertricks * thisSpecialBid.undertrickPoints;
                                    }

                                    // Award undertrick points to team specified in rules
                                    if (thisSpecialBid.undertrickAwardedTo.equals("player")) {
                                        // Award undertrick points to player
                                        pointsToGive += undertrickPointsTotal;
                                    } else { // Equals "opponent"
                                        // Award undertrick points to first player in opposing team
                                        pointsToGiveOpponent += undertrickPointsTotal;
                                    }
                                }

                            }
                        }

                        // No special bid applied, so give standard points for bid
                        if (!specialBid) {

                            // Overtrick
                            if (trickDifference > 0) {
                                pointsToGive += gameState.gameSpec.bidRules.pointsPerBid
                                        * thisPlayer.getBid().getValue();
                                pointsToGive += gameState.gameSpec.bidRules.overtrickPoints * trickDifference;
                            }

                            // Match
                            if (trickDifference == 0) {
                                pointsToGive += gameState.gameSpec.bidRules.pointsPerBid
                                        * thisPlayer.getBid().getValue();
                                pointsToGive += gameState.gameSpec.bidRules.pointsForMatching;
                            }

                            // Undertrick
                            if (trickDifference < 0) {
                                // NOTE: trickDifference is negative
                                pointsToGive += gameState.gameSpec.bidRules.penaltyPoints * trickDifference;
                            }

                        }

                        // Add bonus score if applicable (only add highest value one)
                        int maxBonusScore = 0;
                        for (GameParser.BonusScore thisBonusScore : gameState.gameSpec.bidRules.bonusScores) {
                            if (thisBonusScore.handScoreMax > pointsToGive && thisBonusScore.handScoreMin < pointsToGive
                                    && (thisBonusScore.trickTotal == null
                                            || thisBonusScore.trickTotal == (thisPlayer.getBid().getValue()
                                                    - trickThreshold))
                                    && (thisBonusScore.vulnerable == null
                                            || thisBonusScore.vulnerable == thisPlayer.isVulnerable())) {

                                // Bonus score matches
                                if (thisBonusScore.bonusPoints > maxBonusScore) {
                                    maxBonusScore = thisBonusScore.bonusPoints;
                                }
                            }
                        }
                        pointsToGive += maxBonusScore;

                        // Add points to this player
                        thisPlayer.setPointsThisGame(thisPlayer.getPointsThisGame() + pointsToGive);

                        // Add points to other team(s)
                        for (int[] thisTeam : gameState.gameSpec.teams) {
                            // If team does not contain this player, add points to one team member
                            boolean contains = false;
                            for (int thisTeamPlayerNum : thisTeam) {
                                if (thisTeamPlayerNum == thisPlayer.getNumber()) {
                                    contains = true;
                                    break;
                                }
                            }
                            if (!contains) {
                                Player otherTeamPlayer = gameState.players[thisTeam[0]];
                                otherTeamPlayer
                                        .setPointsThisGame(otherTeamPlayer.getPointsThisGame() + pointsToGiveOpponent);
                            }
                        }
                    }
                }

                break;

            case "trumpPointValue": // Each player gets points for trump cards in tricks they earned

                // Loop through players, scoring each, and finding winners
                for (Player thisPlayer : gameState.players) {

                    int pointsToGive = 0;
                    for (ArrayList<Card> thisTrick : thisPlayer.getTricksEarned()) { // Earned tricks loop
                        for (Card thisCard : thisTrick) { // Cards in trick loop

                            // Add points if card is of trump suit
                            if (thisCard.getSuit().equals(gameState.trumpSuit) || gameState.trumpSuit == null) {
                                pointsToGive += thisCard.getPointValue();
                            }
                        }
                    } // End earned tricks loop

                    // Add points to player's total
                    thisPlayer.setPointsThisGame(thisPlayer.getPointsThisGame() + pointsToGive);
                }
                break;

            default: // Each player gets points for tricks earned - Default

                // Loop through players, scoring each, and finding winners
                for (Player thisPlayer : gameState.players) {

                    // Only give points for tricks over threshold
                    int pointsToGive = thisPlayer.getTricksThisHand();
                    try {
                        pointsToGive -= trickThreshold;
                        if (pointsToGive < 0)
                            pointsToGive = 0; // No negative scores for tricks
                    } catch (NumberFormatException e) {
                        // Ignore, as mistake is in rules
                    }

                    // Add points to score
                    thisPlayer.setPointsThisGame(thisPlayer.getPointsThisGame() + pointsToGive);
                }
                break;
        }

        // Clear each player's trick counter
        for (Player thisPlayer : gameState.players) {
            thisPlayer.setTricksThisHand(0);
            thisPlayer.setTricksEarned(new ArrayList<>());
        }

        // Change hand-size if in rules
        String handSizeRule = gameState.gameSpec.rules.get("handSize");
        if (handSizeRule != null) {
            switch (handSizeRule) {
                case "decreasing":
                    gameState.currentHandSize -= 1;
                    if (gameState.currentHandSize == 0)
                        break;

                case "decreasingCyclic":
                    gameState.currentHandSize -= 1;
                    if (gameState.currentHandSize == 0)
                        gameState.currentHandSize = gameState.gameSpec.initialHandSize;
            }
        }

        // Advance dealer
        if (gameState.gameSpec.ascending_ordering) {
            gameState.dealerPlayerNumber++;
            if (gameState.dealerPlayerNumber == gameState.players.length) {
                // Handle overflow
                gameState.dealerPlayerNumber = 0;
            }
        } else {
            gameState.dealerPlayerNumber--;
            if (gameState.dealerPlayerNumber == -1) {
                // Handle underflow
                gameState.dealerPlayerNumber = gameState.players.length - 1;
            }
        }

        
        // Deal a new hand
        gameState.deckHandler.createDeck(gameState.gameSpec.deck.cards);
        gameState.deckHandler.dealHand(gameState.players, gameState.dealerPlayerNumber,
                gameState.gameSpec.ascending_ordering, gameState.currentHandSize);

        // Increment counter
        gameState.handNumber += 1;

    }

    // Method to move to the next game
    private void advanceGame(GameState gameState) {

        // Calculate game winners
        int winningTeamIndex = 0;
        int winningTeamScore = 0;
        for (int i = 0; i < gameState.gameSpec.teams.length; i++) {
            int[] thisTeam = gameState.gameSpec.teams[i];

            // Calculate team score
            int thisTeamScore = 0;
            for (int thisPlayerNum : thisTeam) {
                thisTeamScore += gameState.players[thisPlayerNum].getPointsThisGame();
            }

            // Set as winners if greatest score
            if (thisTeamScore > winningTeamScore) {
                winningTeamScore = thisTeamScore;
                winningTeamIndex = i;
            }
        }

        // Add win onto first player in team
        Player teamMarker = gameState.players[gameState.gameSpec.teams[winningTeamIndex][0]];
        teamMarker.setGamesThisSession(teamMarker.getGamesThisSession() + 1);

        // Set team's vulnerability if in rules
        if (gameState.gameSpec.bidRules != null) {
            if (gameState.gameSpec.bidRules.vulnerabilityThreshold != null) {
                if (teamMarker.getGamesThisSession() > gameState.gameSpec.bidRules.vulnerabilityThreshold) {

                    // This team is now vulnerable => Remove all current vulnerability in game
                    for (Player thisPlayer : gameState.players) {
                        thisPlayer.setVulnerable(false);
                    }

                    // Set new team to vulnerable
                    for (int thisPlayerIndex : gameState.gameSpec.teams[winningTeamIndex]) {
                        gameState.players[thisPlayerIndex].setVulnerable(true);
                    }
                }
            }
        }
        // Clear each player's counters
        for (Player thisPlayer : gameState.players) {
            thisPlayer.setPointsThisGame(0);
            thisPlayer.setTricksThisGame(0);
        }

        // Clear players' hands, as advanceHand is called prior to this
        for (Player thisPlayer:gameState.players) {
            thisPlayer.setHand(new ArrayList<>());
        }
        
        gameState.gameNumber += 1;
    }

    // Method to check if trick is complete
    private boolean trickHasEnded(GameState gameState) {
        // Currently only supports trick ending when all players have played
        return (gameState.currentPlayerNumber == gameState.firstPlayerNumber && gameState.turnNumber != 0);
    }

    // Method to check if hand is complete
    private boolean handHasEnded(GameState gameState) {
        // Only supports when a player is below the minimum number of cards
        for (Player player : gameState.players) {
            if (player.getHand().size() <= gameState.gameSpec.minimumHandSize)
                return true;
        }
        return false;
    }

    // Method to check if game is complete
    private boolean gameHasEnded(GameState gameState) {
        String gameEndRule = gameState.gameSpec.rules.get("gameEnd");
        if (gameEndRule == null) {
            return true; // Adapt to incomplete rules by ending game now
        }
        switch (gameEndRule) {
            case "handsPlayed":
                try {
                    int maxValue = Integer.parseInt(gameState.gameSpec.rules.get("gameEndValue"));
                    if (gameState.handNumber >= maxValue) {
                        return true;
                    }
                } catch (NumberFormatException e) {
                    return true; // Adapt to rules by ending game now
                }
                break;

            case "scoreThreshold":
                try {
                    int maxValue = Integer.parseInt(gameState.gameSpec.rules.get("gameEndValue"));
                    for (Player thisPlayer : gameState.players) {
                        if (thisPlayer.getPointsThisGame() >= maxValue) {
                            return true;
                        }
                    }
                } catch (NumberFormatException e) {
                    return true;
                }
                break;

            default:
                // No rule specified, so end after 1 trick
                return true;
        }
        return false;
    }

    // Method to check for a tie
    private boolean gameHasTie(GameState gameState) {
        // Either print winning team or winning player
        if (gameState.isTeamGame) {
            // Sum team points
            int[] teamPointsArr = new int[gameState.gameSpec.teams.length];
            for (int i = 0; i < gameState.gameSpec.teams.length; i++) {
                int[] thisTeam = gameState.gameSpec.teams[i];
                int thisTeamScore = 0;
                for (int thisPlayerIndex : thisTeam) {
                    thisTeamScore += gameState.players[thisPlayerIndex].getPointsThisGame();
                }
                teamPointsArr[i] = thisTeamScore;
            }

            // Find teams with most points and second most points
            int winningTeamValue = 0;
            int secondTeamValue = 0;
            for (int i = 1; i < teamPointsArr.length; i++) {
                if (teamPointsArr[i] > winningTeamValue) {
                    secondTeamValue = winningTeamValue;
                    winningTeamValue = teamPointsArr[i];
                } else if (teamPointsArr[i] > secondTeamValue) {
                    secondTeamValue = teamPointsArr[i];
                }
            }

            return (winningTeamValue == secondTeamValue);

        } else {
            // Find winner and second place
            Player winner = gameState.players[0];
            Player second = gameState.players[0];
            for (Player thisPlayer : gameState.players) {
                if (thisPlayer.getPointsThisGame() > winner.getPointsThisGame()) {
                    second = winner;
                    winner = thisPlayer;
                } else if (thisPlayer.getPointsThisGame() > second.getPointsThisGame())
                    second = thisPlayer;
            }

            // Tie if winner and second place points are the same
            return (winner.getPointsThisGame() == second.getPointsThisGame());

        }
    }

    // Method to check if session has ended
    private boolean sessionHasEnded(GameState gameState) {
        String sessionEndRule = gameState.gameSpec.rules.get("sessionEnd");
        if (sessionEndRule == null) {
            return true; // Adapt to incomplete rules by ending session now
        }
        switch (sessionEndRule) {
            case "gamesPlayed":
                try {
                    int maxValue = Integer.parseInt(gameState.gameSpec.rules.get("sessionEndValue"));
                    if (gameState.gameNumber >= maxValue) {
                        return true;
                    }
                } catch (NumberFormatException e) {
                    return true; // Adapt to rules by ending game now
                }
                break;

            case "bestOf":
                // Player or team must have at least half the max number of games played
                try {
                    int maxGames = Integer.parseInt(gameState.gameSpec.rules.get("sessionEndValue"));
                    if (maxGames % 2 == 0) {
                        // Add a game if not odd bestOf
                        maxGames++;
                    }
                    for (Player thisPlayer : gameState.players) {
                        if (thisPlayer.getGamesThisSession() > maxGames / 2) {
                            return true;
                        }
                    }
                } catch (NumberFormatException e) {
                    return true;
                }
                break;

            default:
                // No rule specified, so end after 1 trick
                return true;
        }

        return false;
    }

    // =============================================================
    // ===================== Session Function ======================
    // =============================================================

    // Method to run session - Runs one session, with multiple games, but named for
    // legacy reasons
    public void runGame(GameState gameState, NetworkGame networkNetworkGame, int shuffleSeed) {
        // Create a DeckHandler to reuse RNG to avoid duplicate cards - as per SG spec
        gameState.deckHandler = new DeckHandler(gameState.gameSpec.deck.cards, shuffleSeed);
        //GameSaveHandler gameSaveHandler = new GameSaveHandler();
        //gameSaveHandler.saveGame(gameState);
        
        /*
         * SESSION LOOP (i.e. RE-RUNS)
         */
        while (!runsComplete(gameState)) {

            /*
             * GAME LOOP
             */
            while (!sessionHasEnded(gameState)) {

                /*
                 * ROUND LOOP
                 */
                while (!gameHasEnded(gameState) || gameHasTie(gameState)) {

                    // Start a new game
                    startGame(gameState, shuffleSeed);

                    /*
                     * BID LOOP
                     */
                    if (gameState.gameSpec.bidRules != null) {
                        // Bidding is part of the game

                        if (gameState.gameSpec.bidRules.ascendingBid) { // Implies auction
                            // Auction bid - Loop through players until all but one player passes

                            boolean contractDeclared = false;
                            while (!contractDeclared) { // Loop until contract is agreed
                                Player currentPlayer = gameState.players[gameState.currentPlayerNumber]; // Player to
                                                                                                         // bid
                                                                                                         // first

                                // Updates interface for this player. A network player will do nothing on this
                                // call.
                                // An ai player would use the data to make a decision.
                                currentPlayer.sendGameState();

                                // Receive bid
                                Bid thisBid = currentPlayer.receiveBid();

                                // Loop until bid is made (is a valid bid)
                                boolean bidMade = makeBid(gameState, currentPlayer, thisBid);
                                while (!bidMade) {
                                    if (currentPlayer instanceof PlayerNetworked) {
                                        // Network player made incorrect bid
                                        rageQuit();
                                    } else {
                                        // Local player made invalid bid => Notify & re-fetch
                                        thisBid = currentPlayer.receiveBid();
                                        bidMade = makeBid(gameState, currentPlayer, thisBid);
                                    }
                                }

                                // If bid agreed upon, apply and exit loop
                                if (canDeclareContract(gameState)) {
                                    declareContract(gameState);
                                    contractDeclared = true;
                                }

                                // Advance player for either next bid or start of hand
                                advancePlayer(gameState);
                            }

                        } else {
                            // Not auction bidding - everyone makes one bid
                            for (int i = 0; i < gameState.players.length; i++) {

                                // Gets player who is to make the next bid
                                Player currentPlayer = gameState.players[gameState.currentPlayerNumber];

                                // Updates interface for this player.
                                currentPlayer.sendGameState();

                                // Fetch and set bid
                                boolean bidMade = false; // Set by makeBid(...) to see if bid was legal
                                Bid thisBid = null; // Value to retrieve bid into
                                // Loop until valid bid is made
                                while (!bidMade) {
                                    thisBid = currentPlayer.receiveBid();
                                    bidMade = makeBid(gameState, currentPlayer, thisBid);
                                    if (!bidMade) {
                                        // Illegal bid
                                        if (currentPlayer instanceof PlayerNetworked) {
                                            // Network player made incorrect bid
                                            rageQuit();
                                        } else {
                                            // Local player made invalid bid => Notify & re-fetch
                                            // System.out.println("INVALID MOVE: Please choose another");
                                            thisBid = currentPlayer.receiveBid();
                                            bidMade = makeBid(gameState, currentPlayer, thisBid);
                                        }
                                    }
                                }

                                // Send move over network if needed
                                if (gameState.isNetworked && !(currentPlayer instanceof PlayerNetworked)) {
                                    sendBidToOtherPlayers(thisBid, gameState, false);
                                }

                                // Advance player for either next bid or start of hand
                                advancePlayer(gameState);
                            }
                        }
                    }

                    /*
                     * TRICK LOOP
                     */
                    while (!handHasEnded(gameState)) {

                        /*
                         * TURN LOOP
                         */
                        while (!trickHasEnded(gameState)) {

                            // Gets player who is to take the next move
                            Player currentPlayer = gameState.players[gameState.currentPlayerNumber];

                            // Updates interface for this player.
                            currentPlayer.sendGameState();

                            // Fetch and make move
                            boolean moveMade = false; // Set by makeMove(...) to see if move was legal
                            Card thisMove = null; // Value to retrieve move into
                            while (!moveMade) {
                                thisMove = currentPlayer.receiveMove();
                                moveMade = makeMove(gameState, currentPlayer, thisMove);
                                if (!moveMade) {
                                    // Illegal move
                                    if (currentPlayer instanceof PlayerNetworked) {
                                        // Network player made incorrect move
                                        rageQuit();
                                    } else {
                                        // Local player made incorrect move => Notify and re-fetch
                                        // System.out.println("INVALID MOVE: Please choose another");
                                        thisMove = currentPlayer.receiveMove();
                                        moveMade = makeMove(gameState, currentPlayer, thisMove);
                                    }
                                }
                            }

                            // Send move over network if needed
                            if (gameState.isNetworked && !(currentPlayer instanceof PlayerNetworked)) {
                                try {
                                    sendMoveToOtherPlayers(thisMove, gameState);
                                } catch (RuleBreachException e) {
                                    rageQuit();
                                }
                            }

                            // Move to next player
                            advanceTurn(gameState);
                        } // End turn loop

                        // Move to next trick
                        advanceTrick(gameState);
                    } // End trick loop

                    // Move to next hand
                    advanceHand(gameState);
                } // End hand loop

                // Move to next game
                advanceGame(gameState);
            } // End game loop

            // End session
            endSession(gameState);
        }
        // End re-runs
        return;
    }
}