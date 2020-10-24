// package src;

import java.util.HashMap;


import java.io.*;
import java.util.*;

public class UserFriendlyIP {

    HashMap<String, String> numToWord = new HashMap<>();
    HashMap<String, String> wordToNum = new HashMap<>();

    public UserFriendlyIP(String wordsFilepath) throws FileNotFoundException {
        File wordsFile = new File(wordsFilepath);
        Scanner scanner = new Scanner(wordsFile);
        scanner.useDelimiter(",");

        int counter = 0;
        while (scanner.hasNext()) {
            // Read word
            String word = scanner.next();

            // Add to hash maps
            numToWord.put(Integer.toString(counter), word);
            wordToNum.put(word, Integer.toString(counter));

            // Increment
            counter += 1;
        }
        scanner.close();
    }

    public String[] ipToWords(String ip) {
        // Split IP & create return array
        String[] ipSegments = ip.split("\\.");
        String[] words = new String[ipSegments.length];

        // Convert IP segments to words using map
        for (int i = 0; i < ipSegments.length; i += 1) {
            words[i] = numToWord.get(ipSegments[i]);
        }

        return words;
    }

    public String wordsToIp(String[] words) {
        // Initialise return string
        String ip = "";

        // Fetch values from map & add to ip
        for (int i = 0; i < words.length; i += 1) {
            ip = ip.concat(wordToNum.get(words[i]));
            // Add "." if not last iteration
            if (i != words.length - 1)
                ip = ip.concat(".");
        }

        return ip;
    }

    // Main for testing
    public static void main(String[] args) throws Exception{
        UserFriendlyIP ufip = new UserFriendlyIP("./assets/UserFriendlyIPWords.csv");
        String word = ufip.numToWord.get("255");
        System.out.println(word);
        System.out.println(ufip.wordToNum.get("card"));
    }
}