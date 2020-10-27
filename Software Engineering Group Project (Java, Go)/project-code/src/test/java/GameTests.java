import GameLogic.Core.Game;
import GameLogic.Core.Player;
import GameLogic.Core.PlayerAI;
import GameLogic.Core.PlayerLocalJson;
import GameLogic.GameFileLoader;
import org.junit.Before;
import org.junit.Test;

import java.util.Random;

public class GameTests {
	
	Game.GameState gameState;
	Game game;
	
	@Before
	public void setup() {
		this.gameState = null;
		this.game = null;
	}
	
	public void setupGame(String gameFileName) {
		
		//Create GameState from file.
		GameFileLoader loader = new GameFileLoader();
		this.gameState = loader.loadGameFromFile(gameFileName, null, true);
		
		for (int i = 0; i < this.gameState.players.length; i++) {
			this.gameState.players[i] = new PlayerAI(i, "AI Player " + Integer.toString(i), this.gameState);
		}
		
		//Local game.
		this.game = new Game();
		
	}
	
	@Test
	public void testPlayTwoTrickPony() {
		setupGame("games/SG Game Store/two-trick-pony.json");
		this.game.runGame(this.gameState, null, new Random().nextInt(1000));
	}
	@Test
	public void testBridge() {
		//setupGame("games/bridge.json");
		//this.game.runGame(this.gameState, null, new Random().nextInt(1000));
	}
	
	@Test
	public void testSpeedWhist() {
		setupGame("games/speed_whist.json");
		this.game.runGame(this.gameState, null, new Random().nextInt(1000));
	}
	
}
