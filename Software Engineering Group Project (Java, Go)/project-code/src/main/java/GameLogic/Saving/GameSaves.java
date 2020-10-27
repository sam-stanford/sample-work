package GameLogic.Saving;

import GameLogic.Core.Player;
import GameLogic.DeckAndCards.*;

import java.util.ArrayList;

public class GameSaves {

    String saveName;

    public Player[] players; // All players
    public int dealerPlayerNumber; // Player number of dealer for this hand
    public int currentPlayerNumber; // Player number for next move
    public int firstPlayerNumber; // Number of first player to play in current trick
    public int prevWinnerNumber; // Player number for previous trick/hand winner

    public Table currentTable; // Current table, including cards

    public int mersenneTwisterSeed;
    public int shuffleCount;


    public ArrayList<Card> prevTrick; // Previous trick

    public String gameFilePath; // Path to gamespec

    public int turnNumber; // Current turn number in trick
    public int trickNumber; // Current trick number in hand
    public int handNumber; // Current hand number in game
    public int gameNumber; // Current game number in session
    public int sessionNumber; // Current session (used for re-runs)

    public Suit trumpSuit; // Current trump suit

    public ArrayList<Suit> allowedSuits; // Suits next card should be - null if any
    public ArrayList<Integer> allowedValues; // Values next card should be - null if any

    public int currentHandSize; // Hand size for current hand
    public boolean isTeamGame; // Bool to show if game uses teams (i.e. > 1 player per team)

    public boolean isAsyncGame; // Bool to show if game is played using pub-sub or not

    //constructor
    public GameSaves(String saveName, Player[] players, int dealerPlayerNumber, int currentPlayerNumber, int firstPlayerNumber,
                     int prevWinnerNumber, Table currentTable, int mersenneTwisterSeed, int shuffleCount,
                     ArrayList<Card> prevTrick, String gameFilePath, int turnNumber, int trickNumber,
                     int handNumber, int gameNumber, int sessionNumber, Suit trumpSuit, ArrayList<Suit> allowedSuits,
                     ArrayList<Integer> allowedValues, int currentHandSize, boolean isTeamGame, boolean isAsyncGame) {

        this.saveName = saveName;

        this.players = players;
        this.dealerPlayerNumber = dealerPlayerNumber;
        this.currentPlayerNumber = currentPlayerNumber;
        this.firstPlayerNumber = firstPlayerNumber;
        this.prevWinnerNumber = prevWinnerNumber;
        this.currentTable = currentTable;
        this.mersenneTwisterSeed = mersenneTwisterSeed;
        this.shuffleCount = shuffleCount;
        this.prevTrick = prevTrick;
        this.gameFilePath = gameFilePath;
        this.turnNumber = turnNumber;
        this.trickNumber = trickNumber;
        this.handNumber = handNumber;
        this.gameNumber = gameNumber;
        this.sessionNumber = sessionNumber;
        this.trumpSuit = trumpSuit;
        this.allowedSuits = allowedSuits;
        this.allowedValues = allowedValues;
        this.currentHandSize = currentHandSize;
        this.isTeamGame = isTeamGame;
        this.isAsyncGame = isAsyncGame;


    }

    public String getSaveName() {
        return saveName;
    }

    public Player[] getPlayers() {
        return players;
    }

    public int getDealerPlayerNumber() {
        return dealerPlayerNumber;
    }

    public int getCurrentPlayerNumber() {
        return currentPlayerNumber;
    }

    public int getFirstPlayerNumber() {
        return firstPlayerNumber;
    }

    public int getPrevWinnerNumber() {
        return prevWinnerNumber;
    }

    public Table getCurrentTable() {
        return currentTable;
    }

    public int getMersenneTwisterSeed() {
        return mersenneTwisterSeed;
    }

    public int getShuffleCount() {
        return shuffleCount;
    }


    public ArrayList<Card> getPrevTrick() {
        return prevTrick;
    }


    public String getGameFilePath() {
        return gameFilePath;
    }

    public int getTurnNumber() {
        return turnNumber;
    }

    public int getTrickNumber() {
        return trickNumber;
    }

    public int getHandNumber() {
        return handNumber;
    }

    public int getGameNumber() {
        return gameNumber;
    }

    public int getSessionNumber() {
        return sessionNumber;
    }

    public Suit getTrumpSuit() {
        return trumpSuit;
    }

    public ArrayList<Suit> getAllowedSuits() {
        return allowedSuits;
    }

    public ArrayList<Integer> getAllowedValues() {
        return allowedValues;
    }

    public int getCurrentHandSize() {
        return currentHandSize;
    }

    public boolean isTeamGame() {
        return isTeamGame;
    }

    public boolean isAsyncGame() {
        return isAsyncGame;
    }
}