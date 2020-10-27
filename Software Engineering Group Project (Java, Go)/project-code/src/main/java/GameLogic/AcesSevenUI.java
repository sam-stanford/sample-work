package GameLogic;

import GameLogic.Core.Game;
import Network.GameInitiation.GameInitiation;
import Network.GameInitiation.GameNetwork;
import Network.GameInitiation.NetworkCreationException;
import Network.GamePlay.NetworkGame;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.stream.JsonReader;
import org.apache.commons.cli.*;

import java.io.*;
import java.net.*;
import java.util.List;
import java.util.Random;
import java.util.Scanner;

/**
 * An alternative main class that does not support multiple users.
 */
public class AcesSevenUI {
	
	public static void main(String[] args) {
		
		//Configure command line options
		Options options = new Options();
		options.addOption("h", "host", true, "Host a game, port is the local port to listen for connections on.");
		options.addOption("j", "join", true, "Join a game, port is the local port to listen for connections on.");
		options.addOption("g", "gamelabel", true, "The label of game to join when joinging a network game.");
		options.addOption("a", "ai", false, "Make all but one player be ai players.");
		options.addOption("f", "gamefile", true, "The json game description file. Use only with host and local games.");
		options.addOption("l", false, "Prints games it finds.");
		try {
			//Parse command line arguments
			CommandLineParser parser = new DefaultParser();
			CommandLine cmd = parser.parse(options, args);
			
			
			//Is the game run over a network?
			boolean isNetworked = (cmd.hasOption("h") || cmd.hasOption("j"));
			
			
			if (cmd.hasOption("a") && isNetworked) {
				throw new ParseException("Cannot have an ai game and networked game.");
			}
			
			if (isNetworked) {
				
				// Host a game or join a game.
				if (cmd.hasOption("h") && cmd.hasOption("f")) {
					
					//Host game
					hostNetworkGame(cmd.getOptionValue("f"), Integer.parseInt(cmd.getOptionValue("h")), cmd.getOptionValue('g'));
					
				} else if (cmd.hasOption("j") && cmd.hasOption("g")) {
					
					//Join game
					joinNetworkGame(Integer.parseInt(cmd.getOptionValue("j")), cmd.getOptionValue("g"));
					
				}
				
			} else if (cmd.hasOption('a')) {
				//Start a game with ai players
				startLocalSinglePlayerGame(cmd.getOptionValue('f'));
			} else if (cmd.hasOption('l')) {
				listGames();
			} else {
				//Start a normal local game
				startLocalGame(cmd.getOptionValue('f'));
			}
			
			
		} catch (ParseException | NullPointerException e) {
			HelpFormatter helpFormatter = new HelpFormatter();
			helpFormatter.printHelp("AcesSevenUI [gamefile]", options);
		} catch (IndexOutOfBoundsException e) {
			HelpFormatter helpFormatter = new HelpFormatter();
			helpFormatter.printHelp("AcesSevenUI [gamefile]", options);
		} catch (FileNotFoundException e) {
			System.out.println("Could not find game file.");
		} catch (IOException e) {
			System.out.println("Could not write network game to file.");
			e.printStackTrace();
		} catch (NetworkCreationException e) {
			e.printStackTrace();
		}
		
		
	}
	
	public static void hostNetworkGame(String gameFileName, int localPortNumber, String gameLabel) throws FileNotFoundException, NetworkCreationException {
		//Extract the gamefile
		JsonObject gameFileJson = new Gson().fromJson(new JsonReader(new InputStreamReader(new FileInputStream(gameFileName))), JsonObject.class);
		
		//Prepare to start the game.
		int maxPlayers = AcesSeven.getMaxPlayers(gameFileName);
		int portNumber = localPortNumber;
		
		//Initiate the game with the network.
		GameInitiation gameInitiation = new GameInitiation();
		GameNetwork network = gameInitiation.hostGame(portNumber, gameFileJson, maxPlayers, new Random().nextInt(1000), gameLabel);
		
		NetworkGame networkGame = new NetworkGame(network);
		
		//Create GameState from file
		GameFileLoader loader = new GameFileLoader();
		Game.GameState gameState = loader.loadGameFromFile(gameFileName, networkGame, false);
		
		//Start the game.
		Game game = new Game();
		game.runGame(gameState, networkGame, networkGame.seed);
	}
	
	public static void joinNetworkGame(int localPortNumber, String gameLabel) throws IOException {
		//Prepare to start the game.
		int portNumber = localPortNumber;
		
		//Initiate the game with the network.
		GameInitiation gameInitiation = new GameInitiation();
		GameNetwork network = gameInitiation.discoverGame(gameLabel, portNumber);
		
		//Write the spec to a file
		String gameFileName = "games/" + gameLabel + ".json";
		FileWriter fileWriter = new FileWriter(gameFileName);
		fileWriter.write(network.gameSpec);
		fileWriter.close();
		
		NetworkGame networkGame = new NetworkGame(network);
		
		//Create GameState from file
		GameFileLoader loader = new GameFileLoader();
		Game.GameState gameState = loader.loadGameFromFile(gameFileName, networkGame, false);
		
		//Start the game.
		Game game = new Game();
		game.runGame(gameState, networkGame, networkGame.seed);
	}
	
	public static void startLocalGame(String gameFileName) throws FileNotFoundException {
		//Extract the gamefile
		JsonObject gameFileJson = new Gson().fromJson(new JsonReader(new InputStreamReader(new FileInputStream(gameFileName))), JsonObject.class);
		
		
		//Create GameState from file.
		GameFileLoader loader = new GameFileLoader();
		Game.GameState gameState = loader.loadGameFromFile(gameFileName, null, false);
		
		//Local game.
		Game game = new Game();
		game.runGame(gameState, null, new Random().nextInt(1000));
	}
	
	public static void startLocalSinglePlayerGame(String gameFileName) throws FileNotFoundException {
		//ai game
		
		//Extract the gamefile
		JsonObject gameFileJson = new Gson().fromJson(new JsonReader(new InputStreamReader(new FileInputStream(gameFileName))), JsonObject.class);
		
		
		//Create GameState from file.
		GameFileLoader loader = new GameFileLoader();
		Game.GameState gameState = loader.loadGameFromFile(gameFileName, null, true);
		
		//Local game.
		Game game = new Game();
		game.runGame(gameState, null, new Random().nextInt(1000));
	}
	
	public static void listGames() {
		
		try {
			//Join the multicast group.
			InetAddress group = InetAddress.getByName("239.40.40.6");
			
			int port = 1903; // From spec
			
			//Create and configure multicast socket to receive messages over.
			MulticastSocket socket = new MulticastSocket(port);
			socket.setLoopbackMode(true);
			socket.setReuseAddress(true);
			socket.joinGroup(group);
			
			while (!Thread.currentThread().isInterrupted()) {
				
				byte[] buf = new byte[256];
				DatagramPacket packet = new DatagramPacket(buf, buf.length);
				
				//Wait for a beacon
				socket.receive(packet);
				
				Scanner sc = new Scanner(new String(buf, "UTF8"));
				String dataString = sc.nextLine();
				//System.out.println("GOT:" + dataString);
				
				String[] dataArray = dataString.split(":");
				dataArray[4] = dataArray[4].trim();
				// System.out.println("len:" + dataArray[4].length());
				// System.out.println(java.util.Arrays.toString(dataArray[4].toCharArray()));
				//Check its the same game we are looking for
				
				System.out.println(String.join(", ", dataArray));
			}
		} catch (UnknownHostException e) {
			e.printStackTrace();
		} catch (SocketException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		
	}
}
