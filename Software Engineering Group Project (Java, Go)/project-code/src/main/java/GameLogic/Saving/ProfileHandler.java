package GameLogic.Saving;

import GameLogic.AcesSeven;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;
import java.util.Scanner;

public class ProfileHandler {

    private final String FIRST_TIME_WELCOME = "Welcome to Aces 7! Please input your name, baby cardshark";
    private final String SAVE_PATH = "saves/profile_saves/save_profiles_";
    private final String EXTENSION = ".json";
    private final String SAVE_ERROR = "Saving could not be completed";

    ObjectMapper objectMapper = new ObjectMapper();

    public ProfileHandler() {

        File saveDir = new File("saves/profile_saves");
        if (saveDir != null && saveDir.list() != null) {
            if (saveDir.list().length == 0) {

                System.out.println(FIRST_TIME_WELCOME);
                Scanner scanner = new Scanner(System.in);
                String playerName = scanner.nextLine();
                while (playerName.contains("%")) {
                    System.out.println("Can't use '%', buster");
                    playerName = scanner.nextLine();
                }

                addPlayer(playerName);

            }
        }
    }

    public void awardWin(String playerName) {
        try {
            Map<String, Object> map = objectMapper.readValue(new File(SAVE_PATH + playerName + EXTENSION),
                    new TypeReference<Map<String, Object>>() {
                    });

            Profiles winner = new Profiles(((String) map.get("name")), (int) map.get("numberWins"));
            winner.setNumberWins(winner.getNumberWins() + 1);
            try {
                objectMapper.writeValue(new File(SAVE_PATH + playerName + EXTENSION), winner);
            } catch (IOException ex) {
                ex.printStackTrace();
            }
        } catch (IOException e) {
            System.out.println(SAVE_ERROR);
            e.printStackTrace();
        }
    }

    public void addPlayer(String playerName) {
        Profiles profile = new Profiles(playerName, 0);
        try {
            objectMapper.writeValue(new File(SAVE_PATH + playerName + EXTENSION), profile);
        } catch (IOException ex) {
            System.out.println(SAVE_ERROR);
            ex.printStackTrace();
        }
    }

    public static void removePlayer(String playerName) {
        File file = new File(playerName);
        file.delete();
    }

    public String displayProfileMenu(String[] profileFileNames) throws IOException {
        String newProfile = null;

        System.out.println("\n[" + 0 + "] " + "See Records" + "\n" + "Select this option to check your records");
        System.out.println();
        System.out.println("\n[" + 1 + "] " + "Switch GameLogic.Saving.Profiles" + "\n"
                + "Select this option to change the active profile");
        System.out.println();
        System.out.println("\n[" + 2 + "] " + "Add Profile" + "\n" + "Select this option to add a new profile");
        System.out.println();
        System.out.println("\n[" + 3 + "] " + "Delete Profile" + "\n" + "Select this option to delete a profile");
        System.out.println();

        int inputValue = -1;
        while (inputValue == -1) {
            // Choose game message
            System.out.println("Please select a profile option:\n");

            // Get input
            String input = readFromTerminal();

            // Convert to number
            try {
                inputValue = Integer.parseInt(input);
            } catch (NumberFormatException e) {
                inputValue = -1; // Fetch again
            }

            // Check number matches to a game
            if (!(inputValue >= 0 && inputValue < 4)) {
                inputValue = -1; // Fetch again
            }

        }

        switch (inputValue) {
            case 0:
                displayRecords(profileFileNames);
                break;
            case 1:
                newProfile = switchProfile(profileFileNames);
                break;
            case 2:
                System.out.println("Please input the name for your new profile");
                String name = readFromTerminal();
                addPlayer(name);
                break;
            case 3:
                deleteProfile(profileFileNames);
                break;
        }
        return newProfile;
    }

    private String switchProfile(String[] profileFileNames) throws IOException {
        String newProfile = " ";
        System.out.println("");
        for (int i = 0; i < profileFileNames.length; i++) {
            // Provided path to JSONObject
            Path filepath = Paths.get("saves/profile_saves/" + profileFileNames[i]);
            String jsonString = FilesHelper.readString(filepath.toAbsolutePath(), StandardCharsets.US_ASCII);
            JSONObject json = new JSONObject(jsonString);

            // Find name and description
            String name;
            int wins;
            if (json.has("name")) {
                name = json.getString("name");
            } else
                name = "GameLogic.Core.Player";
            if (json.has("wins")) {
                wins = json.getInt("wins");
            } else
                wins = 0;

            // Print number, name and description
            System.out.println("\n[" + i + "] " + name + "\n" + "Wins: " + wins);
            System.out.println();
        }

        int profInputValue = -1;
        while (profInputValue == -1) {
            // Choose game message
            System.out.println("Please choose a profile to switch to by entering the matching number:\n");

            // Get input
            String input = readFromTerminal();

            // Convert to number
            try {
                profInputValue = Integer.parseInt(input);
            } catch (NumberFormatException e) {
                profInputValue = -1; // Fetch again
            }

            // Check number matches to a game
            if (!(profInputValue >= 0 && profInputValue < profileFileNames.length)) {
                profInputValue = -1; // Fetch again
            }
            Path filepath = Paths.get("saves/profile_saves/" + profileFileNames[profInputValue]);
            String jsonString = FilesHelper.readString(filepath.toAbsolutePath(), StandardCharsets.US_ASCII);
            JSONObject json = new JSONObject(jsonString);
            String profileName = json.getString("name");
            newProfile = profileName;
            System.out.println("Active profile is: " + newProfile);
        }
        return newProfile;
    }

    // Method to read a string from terminal
    private static String readFromTerminal() {
        String returnString = null;
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));

        // Read line
        try {
            returnString = reader.readLine();
        } catch (IOException e) {
            System.out.println("IO Error when reading from terminal: " + e.getMessage());
        }

        return returnString;
    }

    private static void displayRecords(String[] profileFileNames) throws IOException {
        System.out.println("");
        for (int i = 0; i < profileFileNames.length; i++) {
            // Provided path to JSONObject
            Path filepath = Paths.get("saves/profile_saves/" + profileFileNames[i]);
            String jsonString = FilesHelper.readString(filepath.toAbsolutePath(), StandardCharsets.US_ASCII);
            JSONObject json = new JSONObject(jsonString);

            // Find name and description
            String name;
            int wins;
            if (json.has("name")) {
                name = json.getString("name");
            } else
                name = "GameLogic.Core.Player";
            if (json.has("wins")) {
                wins = json.getInt("wins");
            } else
                wins = 0;

            // Print number, name and description
            System.out.println("\n" + "Profile Name: " + name + "\n" + "Lifetime Wins: " + wins);
            System.out.println();
        }
        System.out.println("Enter any key when ready to leave.");
        String input = null;
        while (input == null) {
            input = readFromTerminal();
        }
    }

    private static void deleteProfile(String[] profileFileNames) throws IOException {
        System.out.println("Made It");
        for (int i = 0; i < profileFileNames.length; i++) {
            // Provided path to JSONObject
            Path filepath = Paths.get("saves/profile_saves/" + profileFileNames[i]);
            String jsonString = FilesHelper.readString(filepath.toAbsolutePath(), StandardCharsets.US_ASCII);
            JSONObject json = new JSONObject(jsonString);

            // Find name and description
            String name;
            int wins;
            if (json.has("name")) {
                name = json.getString("name");
            } else
                name = "GameLogic.Core.Player";
            if (json.has("wins")) {
                wins = json.getInt("wins");
            } else
                wins = 0;

            // Print number, name and description
            System.out.println("\n[" + i + "] " + name + "\n" + "Wins: " + wins);
            System.out.println();
        }

        int profInputValue = -1;
        while (profInputValue == -1) {
            // Choose game message
            System.out.println("Please choose a profile to delete by entering the matching number:\n");

            // Get input
            String input = readFromTerminal();

            // Convert to number
            try {
                profInputValue = Integer.parseInt(input);
            } catch (NumberFormatException e) {
                profInputValue = -1; // Fetch again
            }

            // Check number matches to a game
            if (!(profInputValue >= 0 && profInputValue < profileFileNames.length)) {
                profInputValue = -1; // Fetch again
            }
            // TODO prevent active profile from being deleted
            String deletePath = "saves/profile_saves/" + profileFileNames[profInputValue];
            if (!(profileFileNames[profInputValue].equals("save_profiles_" + AcesSeven.activeProfile))) {
                removePlayer(deletePath);
            } else {
                System.out.println("You can't delete yourself! Swtich the active profile first");
            }
        }
    }

    public static void main(String args[]) throws java.io.IOException {
        ProfileHandler pHandler = new ProfileHandler();
    }
}
