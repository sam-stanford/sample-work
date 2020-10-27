package GameLogic;

import GameLogic.Core.*;
// import GameLogic.DeckAndCards.DeckHandler;
import Network.GamePlay.NetworkGame;
import Network.PlayerClient;

public class GameFileLoader {
	// Method to setup game
	public Game.GameState loadGameFromFile(String gameDescFilePath, NetworkGame networkNetworkGame, boolean isAiGame) {
		//Instantiates GameState for new game
		Game.GameState gameState = new Game.GameState();
		
		//Adds network game play to gameState if network game
		if (networkNetworkGame == null) {
			gameState.networkNetworkGame = null;
			gameState.isNetworked = false;
		} else {
			gameState.networkNetworkGame = networkNetworkGame;
			gameState.isNetworked = true;
		}
		
		
		//Worker for functions
		// DeckHandler deckHandler = new DeckHandler();
		gameState.gameFilePath = gameDescFilePath;
		
		//Create parser to parse game rules
		gameState.gameSpec = null;
		try {
			gameState.gameSpec = new GameParser(gameDescFilePath);
		} catch (java.io.IOException e) {
			System.out.println("Error when parsing provided file");
			System.exit(0);
		}
		
		//Sets hand size
		gameState.currentHandSize = gameState.gameSpec.initialHandSize;
		
		//Creates players
		gameState.players = new Player[gameState.gameSpec.numberOfPlayers];
		if (gameState.isNetworked) {
			for (PlayerClient thisPlayer : networkNetworkGame.players) {
				if (thisPlayer.conn == null) {
					int i = networkNetworkGame.players.indexOf(thisPlayer);
					gameState.players[i] = new PlayerLocalJson(i, AcesSeven.activeProfile, gameState);
				} else {
					int i = networkNetworkGame.players.indexOf(thisPlayer);
					gameState.players[i] = new PlayerNetworked(i, AcesSeven.activeProfile, gameState);
				}
			}
		} else if (isAiGame) {
			
			//Create local player
			gameState.players[0] = new PlayerLocalJson(0, "Player 0", gameState);
			
			//Create ai players
			for (int i = 1; i < gameState.players.length; i++) {
				
				String thisPlayerName = "AI Player " + (i);
				gameState.players[i] = new PlayerAI(i, thisPlayerName, gameState);
				
			}
		} else {
			for (int i = 0; i < gameState.players.length; i++) {
				if (i == 0 && AcesSeven.activeProfile != null) {
					gameState.players[i] = new PlayerLocalJson(i, AcesSeven.activeProfile, gameState);
				} else {
					String thisPlayerName = "GameLogic.Core.Player " + (i); //TODO: Get this player name - Sem 2
					gameState.players[i] = new PlayerLocalJson(i, thisPlayerName, gameState);
				}
			}
		}
		
		
		
		//Initialises prev trick if rules say to use it
		if (gameState.gameSpec.can_view_previous_trick) {
			gameState.prevTrick = null;
		}
		
		
		//Set team flag
		for (int[] thisTeam : gameState.gameSpec.teams) {
			if (thisTeam.length > 1) {
				gameState.isTeamGame = true;
				break;
			}
		}
		//Done
		return gameState;
	}
	
}
