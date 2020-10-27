package GameLogic.Core;

import GameLogic.DeckAndCards.Card;

import java.util.ArrayList;
import java.util.List;

public class Player {

    // Attributes
    private int number;
    private ArrayList<Card> hand;
    private String name;
    private Bid bid; // Current bid
    private boolean seenCards = false; // Bool to decide whether player has viewed cards - used for blind bids
    private boolean vulnerable = false; // Vulnerable in game
    private ArrayList<ArrayList<Card>> tricksEarned; // Tricks earned this hand
    private boolean isDummy = false; // This player is a dummy in the game (i.e. cards are shown to others)

    // Scoring attributes
    private int tricksThisHand = 0; // Reset each hand
    private int pointsThisGame = 0; // Reset each game
    private int tricksThisGame = 0; // Reset each game
    private int gamesThisSession = 0; // Not reset

    protected Game.GameState gameState;

    // Constructor
    public Player(int number, String name, Game.GameState gameState) {
        this.number = number;
        this.name = name;
        this.hand = new ArrayList<>();
        this.gameState = gameState;
        this.tricksEarned = new ArrayList<>();
    }

    // Getters & setters
    public int getNumber() {
        return number;
    }

    public int getGamesThisSession() {
        return this.gamesThisSession;
    }

    public void setGamesThisSession(int gamesThisSession) {
        this.gamesThisSession = gamesThisSession;
    }

    public ArrayList<ArrayList<Card>> getTricksEarned() {
        return this.tricksEarned;
    }

    public boolean isIsDummy() {
        return this.isDummy;
    }

    public void setIsDummy(boolean isDummy) {
        this.isDummy = isDummy;
    }

    public void setTricksEarned(ArrayList<ArrayList<Card>> tricksEarned) {
        this.tricksEarned = tricksEarned;
    }

    public void appendTricksEarned(ArrayList<Card> trickToAppend) {
        this.tricksEarned.add(trickToAppend);
    }

    public boolean isVulnerable() {
        return this.vulnerable;
    }

    public void setVulnerable(boolean vulnerable) {
        this.vulnerable = vulnerable;
    }

    public int getTricksThisHand() {
        return this.tricksThisHand;
    }

    public void setTricksThisHand(int tricksThisHand) {
        this.tricksThisHand = tricksThisHand;
    }

    public void setPointsThisGame(int pointsThisGame) {
        this.pointsThisGame = pointsThisGame;
    }

    public int getTricksThisGame() {
        return this.tricksThisGame;
    }

    public void setTricksThisGame(int tricksThisGame) {
        this.tricksThisGame = tricksThisGame;
    }

    public int getPointsThisGame() {
        return pointsThisGame;
    }

    public ArrayList<Card> getHand() {
        return hand;
    }

    public String getName() {
        return name;
    }

    public Bid getBid() {
        return bid;
    }

    public boolean hasSeenCards() {
        return seenCards;
    }

    public void setSeenCards(boolean seenCards) {
        this.seenCards = seenCards;
    }

    public void setHand(ArrayList<Card> hand) {
        this.hand = hand;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public void setBid(Bid bid) {
        this.bid = bid;
    }

    // methods
    public void addToHand(Card card) {
        hand.add(card);
    }

    public void createStartingHand(ArrayList<Card> startingHand) {
        hand.addAll(startingHand);
    }

    void printHand() {
        for (int i = 0; i < hand.size(); i++) {
            System.out.print(hand.get(i).getValue() + "" + Card.suitToCharCode(hand.get(i).getSuit()) + " ");
        }
        System.out.println("");
    }

    /**
     * Recieves the bid from this player. Override to make a networked player.
     * 
     * @return
     */
    public Bid receiveBid() {
        return null;
    }

    /**
     * Recieves the move from this player. Override to make a networked player.
     * 
     * @return
     */
    public Card receiveMove() {
        return null;
    }

    /**
     * Sends the game state to this player.
     */
    public void sendGameState() {
    }

    public void sendSessionWinners(List<String> winners) {
    
    }
    
    /**
     * Sends the trick summary to this player.
     */
    public void sendTrickSummary(Card winningCard, String winnerName) {
    }

}
