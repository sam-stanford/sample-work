package GameLogic.Saving;

import GameLogic.Core.Game;
import GameLogic.Core.Player;
import GameLogic.DeckAndCards.Card;
import GameLogic.DeckAndCards.DeckHandler;
import GameLogic.DeckAndCards.Suit;
import GameLogic.DeckAndCards.Table;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;


import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class GameSaveHandler {

    private final String SAVE_ERROR = "Saving could not be completed";
    private final String LOAD_ERROR = "Saving could not be loaded";

    Gson gson = new GsonBuilder().setPrettyPrinting().create();

    ObjectMapper objectMapper = new ObjectMapper();

    public void saveGame(Game.GameState gameState) {

        Date date = new Date();

        SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyyHH:mm:ss");

        GameSaves savedGame = new GameSaves("save_test", gameState.players, gameState.dealerPlayerNumber,
                gameState.currentPlayerNumber, gameState.firstPlayerNumber, gameState.prevWinnerNumber,
                gameState.currentTable, gameState.deckHandler.getSeed(), gameState.deckHandler.getShuffleCount(),
                gameState.prevTrick, gameState.gameFilePath, gameState.turnNumber, gameState.trickNumber, gameState.handNumber,
                gameState.gameNumber, gameState.sessionNumber, gameState.trumpSuit, gameState.allowedSuits,
                gameState.allowedValues, gameState.currentHandSize, gameState.isTeamGame, gameState.isAsyncGame);

        try {
            objectMapper.writeValue(new File("" + gameState.gameSpec.name + "save" +
                    formatter.format(date) + ".json"), savedGame);
        } catch (IOException e) {
            System.out.println(SAVE_ERROR);
            e.printStackTrace();
        }

    }

    //TODO: Code must be written when this loadGame function is called that grabs the int values for the seed and
    //TODO: shuffle count in order to feed them to a new deckHandler object and maybe remove appropriate cards?
    public Game.GameState loadGame(String saveGameName) {
        ArrayList<Card> deck;
        ArrayList<Card> prevTrick;


        try {
            Map<String, Object> map = objectMapper.readValue(new File("" + saveGameName),
                    new TypeReference<Map<String, Object>>() {
                    });

            if (map.get("deck") != null) {
                deck = deckToList(map);
            } else {
                deck = new ArrayList<Card>();
            }

            if (map.get("prevTrick") != null) {
                prevTrick = trickToList(map);
            } else {
                prevTrick = new ArrayList<Card>();
            }

            String teamGameString = (String) map.get("isTeamGame");
            Boolean isTeamGame = checkBool(teamGameString);

            String asyncGameString = (String) map.get("isAsyncGame");
            Boolean isAsyncGame = checkBool(asyncGameString);

            Player[] players = playersToArray(map);

            Table table = tableBuilder(map);

            Suit suit = suitParser(map);

            ArrayList<Suit> allowedSuits = suitArrayBuild(map);

            ArrayList<Integer> allowedValues = valuesArrayBuild(map);


            GameSaves loadedGame = new GameSaves(saveGameName, players, (int) map.get("dealerPlayerNumber"),
                    (int) map.get("currentPlayerNumber"), (int) map.get("firstPlayerNumber"),
                    (int) map.get("prevWinnerNumber"), table, (int) map.get("mersenneTwisterSeed"),
                    (int) map.get("shuffleCount"), prevTrick, (String) map.get("gameFilePath"),
                    (int) map.get("turnNumber"), (int) map.get("trickNumber"), (int) map.get("handNumber"),
                    (int) map.get("gameNumber"), (int) map.get("sessionNumber"), suit, allowedSuits,
                    allowedValues, (int) map.get("currentHandSize"),
                    isTeamGame, isAsyncGame);

            Game.GameState loadedGameState = new Game.GameState();

            loadedGameState.players = loadedGame.players;

            loadedGameState.dealerPlayerNumber = loadedGame.dealerPlayerNumber;
            loadedGameState.currentPlayerNumber = loadedGame.currentPlayerNumber;
            loadedGameState.firstPlayerNumber = loadedGame.firstPlayerNumber;
            loadedGameState.prevWinnerNumber = loadedGame.prevWinnerNumber;

            loadedGameState.currentTable = loadedGame.currentTable;

            loadedGameState.deckHandler.setSeed(loadedGame.mersenneTwisterSeed);
            loadedGameState.deckHandler.setShuffleCount(loadedGame.shuffleCount);

            loadedGameState.prevTrick = loadedGame.prevTrick;

            loadedGameState.gameFilePath = loadedGame.gameFilePath;

            loadedGameState.turnNumber = loadedGame.turnNumber;
            loadedGameState.trickNumber = loadedGame.trickNumber;
            loadedGameState.handNumber = loadedGame.handNumber;
            loadedGameState.gameNumber = loadedGame.gameNumber;
            loadedGameState.sessionNumber = loadedGame.sessionNumber;

            loadedGameState.trumpSuit = loadedGame.trumpSuit;
            loadedGameState.allowedSuits = loadedGame.allowedSuits;
            loadedGameState.allowedValues = loadedGame.allowedValues;

            loadedGameState.currentHandSize = loadedGame.currentHandSize;

            loadedGameState.isTeamGame = loadedGame.isTeamGame;
            loadedGameState.isAsyncGame = loadedGame.isAsyncGame;

            return null;

        } catch (IOException e) {
            System.out.println(LOAD_ERROR);
            e.printStackTrace();
        }

        System.out.println(LOAD_ERROR);
        return null;
    }


    private Boolean checkBool(String bool){
        if (bool.equals("True")){
            return true;
        }
        else{
            return false;
        }
    }

    //when loading the game, cast to Map is unchecked, so the map must be loaded as a String and recreated
    private Map<String, String> rulesToMap(Map<String, Object> map) {
        Map<String, String> rules = new HashMap<>();
        String rulesString = map.get("rules").toString();
        String cleanRules = rulesString.replace("{", "").replace(" ", "")
                .replace("}", " ");
        String[] ruleSplit = cleanRules.split(",");
        for (int i = 0; i < ruleSplit.length; i++) {
            String[] ruleToMap = ruleSplit[i].split("=");
            rules.put(ruleToMap[0], ruleToMap[1]);
        }
        return rules;
    }

    private ArrayList<Card> deckToList(Map<String, Object> map) {
        ArrayList<Card> deck = new ArrayList<Card>();

        String deckString = map.get("deck").toString();
//        System.out.println(deckString);
        String cleanDeck = deckString.replace("[", "").replace("]", " ")
                .replace(" ", "").replace("{", "")
                .replaceAll("},", "}/");
//        System.out.println(cleanDeck);
        String[] cardString = cleanDeck.split("}");
//        System.out.println(cardString[0]);
        try {
            for (int i = 0; i < cardString.length; i++) {
                int value = 0;
                int pointValue = 0;
                String suit = "";
                Suit suitEnum = Suit.HEARTS;
                String[] cardAttributes = cardString[i].split(",");
                for (int j = 0; j < cardAttributes.length; j++) {
                    String[] attribtuesToCard = cardAttributes[j].split("=");
                    if (j == 0) {
                        value = Integer.parseInt(attribtuesToCard[1]);
                    } else if (j == 2) {
                        pointValue = Integer.parseInt(attribtuesToCard[1]);
                    } else if (j == 3) {
                        suit = attribtuesToCard[1];
                    }
                }
                switch (suit) {
                    case "HEARTS":
                        suitEnum = Suit.HEARTS;
                        break;
                    case "CLUBS":
                        suitEnum = Suit.CLUBS;
                        break;
                    case "DIAMONDS":
                        suitEnum = Suit.DIAMONDS;
                        break;
                    case "SPADES":
                        suitEnum = Suit.SPADES;
                        break;
                }
                Card card = new Card(value, suitEnum, pointValue);
                deck.add(card);
            }
        } catch (java.lang.ArrayIndexOutOfBoundsException e) {
            return deck;
        }
        return deck;
    }

    //TODO: Have to evauluate how Tricks are serialised in order to desereailise them
    private ArrayList<Card> trickToList(Map<String, Object> map) {
        ArrayList<Card> deck = new ArrayList<Card>();

        String deckString = map.get("deck").toString();
//        System.out.println(deckString);
        String cleanDeck = deckString.replace("[", "").replace("]", " ")
                .replace(" ", "").replace("{", "")
                .replaceAll("},", "}/");
//        System.out.println(cleanDeck);
        String[] cardString = cleanDeck.split("}");
//        System.out.println(cardString[0]);
        try {
            for (int i = 0; i < cardString.length; i++) {
                int value = 0;
                int pointValue = 0;
                String suit = "";
                Suit suitEnum = Suit.HEARTS;
                String[] cardAttributes = cardString[i].split(",");
                for (int j = 0; j < cardAttributes.length; j++) {
                    String[] attribtuesToCard = cardAttributes[j].split("=");
                    if (j == 0) {
                        value = Integer.parseInt(attribtuesToCard[1]);
                    } else if (j == 2) {
                        pointValue = Integer.parseInt(attribtuesToCard[1]);
                    } else if (j == 3) {
                        suit = attribtuesToCard[1];
                    }
                }
                switch (suit) {
                    case "HEARTS":
                        suitEnum = Suit.HEARTS;
                        break;
                    case "CLUBS":
                        suitEnum = Suit.CLUBS;
                        break;
                    case "DIAMONDS":
                        suitEnum = Suit.DIAMONDS;
                        break;
                    case "SPADES":
                        suitEnum = Suit.SPADES;
                        break;
                }
                Card card = new Card(value, suitEnum, pointValue);
                deck.add(card);
            }
        } catch (java.lang.ArrayIndexOutOfBoundsException e) {
            return deck;
        }
        return deck;
    }

    private ArrayList<Card> deckToList(String deckString) {
        ArrayList<Card> deck = new ArrayList<Card>();

//        System.out.println(deckString);
        String cleanDeck = deckString.replace("[", "").replace("]", " ")
                .replace(" ", "").replace("{", "")
                .replaceAll("},", "}/");
//        System.out.println(cleanDeck);
        String[] cardString = cleanDeck.split("}");
//        System.out.println(cardString[0]);
        for (int i = 0; i < cardString.length; i++) {
            int value = 0;
            int pointValue = 0;
            String suit = "";
            Suit suitEnum = Suit.HEARTS;
            String[] cardAttributes = cardString[i].split(",");
            for (int j = 0; j < cardAttributes.length; j++) {
                String[] attribtuesToCard = cardAttributes[j].split("=");
                if (j == 0) {
                    value = Integer.parseInt(attribtuesToCard[1]);
                } else if (j == 2) {
                    pointValue = Integer.parseInt(attribtuesToCard[1]);
                } else if (j == 3) {
                    suit = attribtuesToCard[1];
                }
            }
            switch (suit) {
                case "HEARTS":
                    suitEnum = Suit.HEARTS;
                    break;
                case "CLUBS":
                    suitEnum = Suit.CLUBS;
                    break;
                case "DIAMONDS":
                    suitEnum = Suit.DIAMONDS;
                    break;
                case "SPADES":
                    suitEnum = Suit.SPADES;
                    break;
            }
            Card card = new Card(value, suitEnum, pointValue);
            deck.add(card);
//            System.out.println(card.getValue()+ "" + card.getSuit() + "" + card.getPointValue());
        }
        return deck;
    }

    private Player[] playersToArray(Map<String, Object> map) {
        String playerString = map.get("players").toString();
        //inserting a unique regex to split up players
        String cleanPlayers = playerString.replaceAll("}, \\{number", "},% {number");
        String playerSplit[] = cleanPlayers.split("%");
//        System.out.println(playerSplit[2]);

        Player players[] = new Player[playerSplit.length];

//        System.out.println(playerString);

        for (int i = 0; i < playerSplit.length; i++) {
            String frontNumberBreak[] = playerSplit[i].split("number=");
            String backNumberBreak[] = frontNumberBreak[1].split(",");
            int number = Integer.parseInt(backNumberBreak[0]);
//            System.out.println(number);

            String frontPointBreak[] = playerSplit[i].split("points=");
            String backPointBreak[] = frontPointBreak[1].split(",");
            int points = Integer.parseInt(backPointBreak[0]);
//            System.out.println(points);

            String frontCardsPlayedBreak[] = playerSplit[i].split("cardsPlayedThisTurn=");
            String backCardsPlayedBreak[] = frontCardsPlayedBreak[1].split(",");
            int cardsPlayedThisTurn = Integer.parseInt(backCardsPlayedBreak[0]);
//            System.out.println(cardsPlayedThisTurn);

            String frontNameBreak[] = playerSplit[i].split("name=");
            String backNameBreak[] = frontNameBreak[1].split(",");
            String name = backNameBreak[0];
//            System.out.println(name);

            String frontStackBreak[] = playerSplit[i].split("stack=");
            String backStackBreak[] = frontStackBreak[1].split(",");
            int stack = Integer.parseInt(backStackBreak[0]);
//            System.out.println(stack);

            String frontNetworkBreak[] = playerSplit[i].split("networkPlayer=");
            String backNetworkBreak[] = frontNetworkBreak[1].split("}");
            Boolean networkPlayer = Boolean.getBoolean(backNetworkBreak[0]);
//            System.out.println(networkPlayer);

            String frontHandBreak[] = playerSplit[i].split("\\[");
            String backHandBreak[] = frontHandBreak[frontHandBreak.length - 1].split("]");
            String hand = backHandBreak[0];
            ArrayList<Card> newHand = deckToList(hand);

            Player player = new Player(number, name, null);//TODO add the ability to save this info
            player.setHand(newHand);
            players[i] = player;
        }
        return players;
    }

    public Table tableBuilder(Map<String, Object> map) {
        String tableString = map.get("currentTable").toString();
//        System.out.println(tableString);

        String frontPotBreak[] = tableString.split("pot=");
        String backPotBreak[] = frontPotBreak[1].split(",");
        int pot = Integer.parseInt(backPotBreak[0]);

        String frontCardsBreak[] = tableString.split("cards=\\[");
        String backCardsBreak[] = frontCardsBreak[1].split("]");
        try {
            ArrayList<Card> cards = deckToList(backCardsBreak[0]);
            Table table = new Table(cards);
            return table;
        } catch (java.lang.ArrayIndexOutOfBoundsException e) {
            ArrayList<Card> cards = new ArrayList<>();
            Table table = new Table(cards);
        }
        return null;
    }

    public Suit suitParser(Map<String, Object> map) {
        String suitString = map.get("trumpSuit").toString();
//        System.out.println(suitString);

        Suit suit = Suit.HEARTS;

        switch (suitString) {
            case "HEARTS":
                suit = Suit.HEARTS;
                break;
            case "CLUBS":
                suit = Suit.CLUBS;
                break;
            case "SPADES":
                suit = Suit.SPADES;
                break;
            case "DIAMONDS":
                suit = Suit.DIAMONDS;
                break;
        }
        return suit;
    }

    public Suit suitParser(String suitString) {

        Suit suit = Suit.HEARTS;

        switch (suitString) {
            case "HEARTS":
                suit = Suit.HEARTS;
                break;
            case "CLUBS":
                suit = Suit.CLUBS;
                break;
            case "SPADES":
                suit = Suit.SPADES;
                break;
            case "DIAMONDS":
                suit = Suit.DIAMONDS;
                break;
        }
        return suit;
    }

    public ArrayList<Suit> suitArrayBuild(Map<String, Object> map) {
        ArrayList<Suit> allowedSuits = new ArrayList<>();
        try {
            String suitListString = map.get("allowedSuits").toString();
            String cleanSuits = suitListString.replace("[", "").replace(" ", "")
                    .replace("]", "");
            String suitSplit[] = cleanSuits.split(",");
            for (int i = 0; i < suitSplit.length; i++) {
                Suit suit = suitParser(suitSplit[i]);
                allowedSuits.add(suit);
            }
            return allowedSuits;
        } catch (java.lang.NullPointerException e) {
            return allowedSuits;
        }
    }

    public ArrayList<Integer> valuesArrayBuild(Map<String, Object> map) {
        ArrayList<Integer> allowedValues = new ArrayList<>();
        try {
            String valueString = map.get("allowedValues").toString();
            String cleanValues = valueString.replace("[", "").replace(" ", "")
                    .replace("]", "");
            String splitValues[] = cleanValues.split(",");
            for (int i = 0; i < splitValues.length; i++) {
                allowedValues.add(Integer.parseInt(splitValues[i]));
            }
        } catch (java.lang.NullPointerException e) {
            return allowedValues;
        }
        return allowedValues;
    }


}

