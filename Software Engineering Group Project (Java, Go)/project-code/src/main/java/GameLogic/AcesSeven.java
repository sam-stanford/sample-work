package GameLogic;

import GameLogic.Core.Game;
import GameLogic.Saving.FilesHelper;
import GameLogic.Saving.GameSaveHandler;
import GameLogic.Saving.ProfileHandler;
import Network.GameInitiation.GameInitiation;
import Network.GameInitiation.GameNetwork;
import Network.GameInitiation.NetworkCreationException;
import Network.GamePlay.NetworkGame;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.stream.JsonReader;
import org.json.JSONObject;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.nio.file.Paths;

//GameLogic.Core.Game wrapping class
public abstract class AcesSeven {

    public static String activeProfile;
    public static String[] saveGameFileNames;

    //Method to read a string from terminal
    private static String readFromTerminal() {
        String returnString = null;
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));

        //Read line
        try {
            returnString = reader.readLine();
        } catch (IOException e) {
            System.out.println("IO Error when reading from terminal: " + e.getMessage());
        }

        return returnString;
    }


    //Main method
    public static void main(String[] args) throws IOException {

        //Welcome message
        System.out.println("                           _____                      \n" +
                "     /\\                   / ____|                     \n" +
                "    /  \\   ___ ___  ___  | (___   _____   _____ _ __  \n" +
                "   / /\\ \\ / __/ _ \\/ __|  \\___ \\ / _ \\ \\ / / _ \\ '_ \\ \n" +
                "  / ____ \\ (_|  __/\\__ \\  ____) |  __/\\ V /  __/ | | |\n" +
                " /_/    \\_\\___\\___||___/ |_____/ \\___| \\_/ \\___|_| |_|\n" +
                "                                                      \n" +
                "                                                      ");


        ProfileHandler profileHandler = new ProfileHandler();

        GameSaveHandler gHandler = new GameSaveHandler();

        String[] gameFileNames = buildGameArray();

        String[] profileFileNames = buildProfileArray();

        saveGameFileNames = buildLoadArray();

        listProfiles(profileFileNames);

        int profInputValue = -1;
        while (profInputValue == -1) {
            //Choose game message
            System.out.println("Please choose your profile by entering the matching number:\n");

            //Get input
            String input = readFromTerminal();

            //Convert to number
            try {
                profInputValue = Integer.parseInt(input);
            } catch (NumberFormatException e) {
                profInputValue = -1; //Fetch again
            }

            //Check number matches to a game
            if (!(profInputValue >= 0 && profInputValue < profileFileNames.length)) {
                profInputValue = -1; //Fetch again
            }
            Path filepath = Paths.get("saves/profile_saves/" + profileFileNames[profInputValue]);
            String jsonString = FilesHelper.readString(filepath.toAbsolutePath(), StandardCharsets.US_ASCII);
            JSONObject json = new JSONObject(jsonString);
            String profileName = json.getString("name");
            activeProfile = profileName;
            System.out.println("Active profile is: " + activeProfile);
        }


        listGames(gameFileNames);

        //Get choice from user
        int inputValue = -1;
        while (inputValue == -1) {
            //Choose game message
            System.out.println("Please choose a game to play by entering the matching number:\n");

            //Get input
            String input = readFromTerminal();

            //Convert to number
            try {
                inputValue = Integer.parseInt(input);
            } catch (NumberFormatException e) {
                inputValue = -1; //Fetch again
            }

            //Check number matches to a game
            if (!(inputValue >= 0 && inputValue <= gameFileNames.length + 1)) {
                inputValue = -1; //Fetch again
            }

            if (inputValue == gameFileNames.length){
                if(saveGameFileNames != null) {
                    listSavedGames(saveGameFileNames);
                    String loadGameFilepath = loadMenu(saveGameFileNames);
//                    Game.GameState gs = gHandler.loadGame(loadGameFilepath);
//                    Game.runLoadedGame(gs.gameFilePath, gs); TODO
                }
                else{
                    System.out.println("No saved games!");
                    inputValue = -1;
                    listGames(gameFileNames);
                }
            }

            if (inputValue == gameFileNames.length + 1){
                String newProfile = profileHandler.displayProfileMenu(profileFileNames);
                if(newProfile != null){
                    activeProfile = newProfile;
                }
                inputValue = -1; //Fetch again
                profileFileNames = buildProfileArray();
                listGames(gameFileNames);
            }
        }
        
        Game game = new Game();
        if(!isNetwork()) {
            //Create GameState from file.
            GameFileLoader loader = new GameFileLoader();
            Game.GameState gameState = loader.loadGameFromFile("games/" + gameFileNames[inputValue], null, false);
            game.runGame(gameState, null, 4);
        } else{
            //Start chosen game network
            int hostVsJoin = hostVsJoin();
            if(hostVsJoin == 0) {
                int portNumber = getPortNumber();
                String gameSpec = "games/" + gameFileNames[inputValue];
                int maxPlayers = getMaxPlayers("games/" + gameFileNames[inputValue]);
//                int randomSeed = getRandomSeed();
                int randomSeed = 4;

                JsonObject f = new Gson().fromJson(new JsonReader(new InputStreamReader(new FileInputStream(gameSpec))), JsonObject.class);
    
                GameInitiation gameInitiation = new GameInitiation();
                try {
                    GameNetwork network = gameInitiation.hostGame(portNumber, f, maxPlayers, randomSeed, "");
    
                    NetworkGame networkGame = new NetworkGame(network);
    
                    //Create GameState from file.
                    GameFileLoader loader = new GameFileLoader();
                    Game.GameState gameState = loader.loadGameFromFile("games/" + gameFileNames[inputValue], networkGame, false);
    
                    game.runGame(gameState, networkGame, 4);
                } catch (NetworkCreationException e) {
                    System.out.println("Could not host game.\n");
                    e.printStackTrace();
                }
            } else {
                System.out.println("Host:");
                int portNumber = getPortNumber();
                String ipAddress = getIpAddress();

                System.out.println("Local port:");
                int localPortNumber = getPortNumber();
                GameInitiation gameInitiation = new GameInitiation();
                GameNetwork network = gameInitiation.discoverGame("",2349);
    
                NetworkGame networkGame = new NetworkGame(network);
    
                //Create GameState from file.
                GameFileLoader loader = new GameFileLoader();
                Game.GameState gameState = loader.loadGameFromFile("games/" + gameFileNames[inputValue], networkGame, false);
    
                game.runGame(gameState, networkGame, 4);
    
                //TODO: put gameplay in gamestate
    
            }
        }

    }

    private static void listGames(String[] gameFileNames) throws IOException {
        //List all games
        for (int i = 0; i < gameFileNames.length; i++) {
            //Provided path to JSONObject
            Path filepath = Paths.get("games/" + gameFileNames[i]);
            String jsonString = FilesHelper.readString(filepath.toAbsolutePath(), StandardCharsets.US_ASCII);
            JSONObject json = new JSONObject(jsonString);

            //Find name and description
            String name;
            String description;
            if (json.has("name")) {
                name = json.getString("name");
            } else name = "GameLogic.DeckAndCards.Card GameLogic.Core.Game";
            if (json.has("description")) {
                description = json.getString("description");
            } else description = "...";

            //Print number, name and description
            System.out.println("\n[" + i + "] " + name + "\n" + description);
        }
        System.out.println();
        System.out.println("===============================================");
        System.out.println();

        System.out.println("[" + gameFileNames.length + "] " + "Load");
        System.out.println("Load a saved game");
        System.out.println();

        System.out.println("[" + (gameFileNames.length + 1) + "]" + " GameLogic.Saving.Profiles");
        System.out.println("Take a look at your records or switch profile!");

        System.out.println();

    }

    private static void listProfiles(String[] profileFileNames) throws IOException {
        for (int i = 0; i < profileFileNames.length; i++) {
            //Provided path to JSONObject
            Path filepath = Paths.get("saves/profile_saves/" + profileFileNames[i]);
            String jsonString = FilesHelper.readString(filepath.toAbsolutePath(), StandardCharsets.US_ASCII);
            JSONObject json = new JSONObject(jsonString);

            //Find name and description
            String name;
            int wins;
            if (json.has("name")) {
                name = json.getString("name");
            } else name = "GameLogic.Core.Player";
            if (json.has("numberWins")) {
                wins = json.getInt("numberWins");
            } else wins = 0;

            //Print number, name and description
            System.out.println("\n[" + i + "] " + name + "\n" + "Wins: " + wins);
            System.out.println();
        }
    }

    private static void listSavedGames(String[] saveGameFileNames) throws IOException {
        for (int i = 0; i < saveGameFileNames.length; i++) {
            //Print number, name and description
            System.out.println("\n[" + i + "] " + saveGameFileNames[i]);
            System.out.println();
        }
    }

    private static String[] buildGameArray(){
        //Find game directory
        File gameDir = new File("games");
        String[] fileNamesArr = gameDir.list();
        if (fileNamesArr == null) {
            System.out.println("There are no games to play. Please add some to the \"games\" directory");
            System.exit(0);
        }

        //Find all game .json files and form new array
        int noOfGames = 0;
        for(int i = 0; i<fileNamesArr.length ;i++){
            if(fileNamesArr[i].substring(fileNamesArr[i].length() - 5).equals(".json")){
                noOfGames += 1;
            }
        }

        String[] gameFileNames = new String[noOfGames];
        int gameFileNamesIndex = 0;
        for(int i = 0; i<fileNamesArr.length ;i++){
            if(fileNamesArr[i].substring(fileNamesArr[i].length() - 5).equals(".json")){
                gameFileNames[gameFileNamesIndex] = fileNamesArr[i];
                gameFileNamesIndex += 1;
            }
        }
        return gameFileNames;
    }

    private static String[] buildProfileArray(){

        //Find profile directory
        File profDir = new File("saves/profile_saves");
        String[] profNamesArr = profDir.list();
        if (profNamesArr == null) {
            System.out.println("There has been an error loading profiles. Please contact system administrator");
            System.exit(0);
        }


        //Find all profile .json files and form new array
        int noOfProfiles = 0;
        for(int i = 0; i < profNamesArr.length ;i++){
            if(profNamesArr[i].substring(profNamesArr[i].length() - 5).equals(".json")){
                noOfProfiles += 1;
            }
        }
        String[] profileFileNames = new String[noOfProfiles];

        int profileFileNamesIndex = 0;
        for(int i = 0; i<profNamesArr.length ;i++){
            if(profNamesArr[i].substring(profNamesArr[i].length() - 5).equals(".json")){
                profileFileNames[profileFileNamesIndex] = profNamesArr[i];
                profileFileNamesIndex += 1;
            }
        }
        return profileFileNames;
    }

    private static String[] buildLoadArray(){

        //Find profile directory
        File gameSaveDir = new File("saves/game_saves");
        String[] gameSavesArr = gameSaveDir.list();
        if (gameSavesArr == null) {
            System.out.println("There are no saved games");
            return null;
        }


        //Find all profile .json files and form new array
        int noOfSavedGames = 0;
        for(int i = 0; i < gameSavesArr.length ;i++){
            if(gameSavesArr[i].substring(gameSavesArr[i].length() - 5).equals(".json")){
                noOfSavedGames += 1;
            }
        }
        String[] saveGameFileNames = new String[noOfSavedGames];

        int saveGameFileNamesIndex = 0;
        for(int i = 0; i < gameSavesArr.length ;i++){
            if(gameSavesArr[i].substring(gameSavesArr[i].length() - 5).equals(".json")){
                saveGameFileNames[saveGameFileNamesIndex] = gameSavesArr[i];
                saveGameFileNamesIndex += 1;
            }
        }
        return saveGameFileNames;
    }

    private static String loadMenu(String[] saveGameFileNames) throws IOException {
        int profInputValue = -1;
        while (profInputValue == -1) {
            //Choose game message
            System.out.println("Please choose the save to load by entering the matching number:\n");

            //Get input
            String input = readFromTerminal();

            //Convert to number
            try {
                profInputValue = Integer.parseInt(input);
            } catch (NumberFormatException e) {
                profInputValue = -1; //Fetch again
            }

            //Check number matches to a game
            if (!(profInputValue >= 0 && profInputValue < saveGameFileNames.length)) {
                profInputValue = -1; //Fetch again
            }

        }
        String loadGameFilePath = saveGameFileNames[profInputValue];
        return loadGameFilePath;
    }

    private static boolean isNetwork(){

        System.out.println("Would you like to play Local or via a Network?");
        System.out.println("\n[" + 0 + "] " + "Local");
        System.out.println();
        System.out.println("\n[" + 1 + "] " + "Network");
        System.out.println();

        int inputValue = -1;
        while (inputValue == -1) {
            //Choose game message
            System.out.println("Please choose an option by entering the matching number:\n");

            //Get input
            String input = readFromTerminal();

            //Convert to number
            try {
                inputValue = Integer.parseInt(input);
            } catch (NumberFormatException e) {
                inputValue = -1; //Fetch again
            }

            //Check number matches to a game
            if (!(inputValue >= 0 && inputValue <= 2)) {
                inputValue = -1; //Fetch again
            }

        }
        boolean isNetwork = false;
        switch (inputValue){
            case 0:
                break;
            case 1:
                isNetwork = true;
                break;
        }

        return isNetwork;
    }

    private static int hostVsJoin(){

        System.out.println("Would you like to Host a game of Join a game?");
        System.out.println("\n[" + 0 + "] " + "Host");
        System.out.println();
        System.out.println("\n[" + 1 + "] " + "Join");
        System.out.println();

        int inputValue = -1;
        while (inputValue == -1) {
            //Choose game message
            System.out.println("Please choose an option by entering the matching number:\n");

            //Get input
            String input = readFromTerminal();

            //Convert to number
            try {
                inputValue = Integer.parseInt(input);
            } catch (NumberFormatException e) {
                inputValue = -1; //Fetch again
            }

            //Check number matches to a game
            if (!(inputValue >= 0 && inputValue <= 2)) {
                inputValue = -1; //Fetch again
            }

        }
        int hostVsJoin = 0;
        switch (inputValue){
            case 0:
                break;
            case 1:
                hostVsJoin = 1;
                break;
        }

        return hostVsJoin;
    }

    private static int getPortNumber(){
        System.out.println("Please input your Port Number");
        int portNumber = Integer.parseInt(readFromTerminal());
        return portNumber;
    }

    private static String getIpAddress(){
        System.out.println("Please input desired IP Address");
        String ipAddress = readFromTerminal();
        return ipAddress;
    }

    public static int getMaxPlayers(String pathString){
        Path filepath = Paths.get(pathString);
        String jsonString = null;
        try {
            jsonString = FilesHelper.readString(filepath.toAbsolutePath(), StandardCharsets.US_ASCII);
        } catch (IOException e) {
            e.printStackTrace();
        }
        JSONObject json = new JSONObject(jsonString);
        int numberOfPlayers = 0;
        if(json.has("players")) {
            numberOfPlayers = json.getInt("players");
        } else System.out.println("Fatal error - missing critical info " + "number of players");
        return numberOfPlayers;
    }


}
