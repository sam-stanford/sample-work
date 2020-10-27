package Network.GameInitiation;

import com.google.gson.JsonObject;
import Network.PlayerClient;

public class JsonEvent {
  public JsonObject obj;
  public PlayerClient orignPlayer;

  public JsonEvent(JsonObject obj, PlayerClient orignPlayer) {
	this.obj = obj;
	this.orignPlayer = orignPlayer;
  }

  public JsonEvent() { }
}
