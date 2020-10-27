package GameLogic.Saving;

import GameLogic.AcesSeven;

import java.io.IOException;

public class Saver {
    private static String loadMenu() throws IOException {
        int profInputValue = -1;
        while (profInputValue == -1) {
            //Choose game message
            System.out.println("Please choose the save to load by entering the matching number:\n");

            //Get input
            String input = "";

            //Convert to number
            try {
                profInputValue = Integer.parseInt(input);
            } catch (NumberFormatException e) {
                profInputValue = -1; //Fetch again
            }

            //Check number matches to a game
            if (!(profInputValue >= 0 && profInputValue < AcesSeven.saveGameFileNames.length)) {
                profInputValue = -1; //Fetch again
            }

        }
        return AcesSeven.saveGameFileNames[profInputValue];

    }

    private static void listSavedGames() throws IOException {
        for (int i = 0; i < AcesSeven.saveGameFileNames.length; i++) {
            //Print number, name and description
            System.out.println("\n[" + i + "] " + AcesSeven.saveGameFileNames[i]);
            System.out.println();
        }
    }

}


