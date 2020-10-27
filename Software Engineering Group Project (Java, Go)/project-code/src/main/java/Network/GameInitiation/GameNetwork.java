package Network.GameInitiation;

import com.google.gson.JsonObject;
import com.google.gson.annotations.JsonAdapter;
import Network.PlayerClient;

import java.util.List;
import java.util.concurrent.BlockingQueue;

@JsonAdapter(Network.GameInitiation.GameNetworkAdapter.class)
public class GameNetwork {

  /**
   * Spec of the game.
   */
  public String gameSpec;

  /**
   * All the players
   */
  public List<PlayerClient> players;

  public transient BlockingQueue<Network.GameInitiation.JsonEvent> jsonEvents;

  public int seed;
}
