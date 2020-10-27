package Network.GameInitiation;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.stream.JsonReader;
import Network.PlayerClient;

import java.io.IOException;
import java.io.InputStreamReader;
import java.util.concurrent.BlockingQueue;

/**
 * Keeps track of a players connection and reads all events into a blocking queue.
 */
public class PlayerConnectionThread implements Runnable {

  public BlockingQueue<JsonEvent> events;
  public PlayerClient player;

  public PlayerConnectionThread(BlockingQueue<JsonEvent> events, PlayerClient player) {
	this.events = events;
	this.player = player;
  }

  @Override
  public void run() {

    while (!player.conn.isClosed()) {
      try {
        //Read a json object
		JsonObject obj = new Gson().fromJson(new JsonReader(new InputStreamReader(player.conn.getInputStream())), JsonObject.class);

		//Create event
		JsonEvent event = new JsonEvent(obj, player);

		events.put(event);

	  } catch (IOException | InterruptedException e) {
        //Do nothing
	  }
	}
  }
}
