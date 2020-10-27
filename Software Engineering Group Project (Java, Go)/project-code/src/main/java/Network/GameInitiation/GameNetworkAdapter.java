package Network.GameInitiation;

import Network.PlayerClient;
import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.TypeAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import Network.PlayerClient;

import java.io.IOException;
import java.net.InetAddress;
import java.net.Socket;
import java.util.ArrayList;
import java.util.List;

public class GameNetworkAdapter extends TypeAdapter<GameNetwork> {

  /**
   * Writes game network to jsonwriter.
   * @param jsonWriter
   * @param gameNetwork
   * @throws IOException
   */
  @Override
  public void write(JsonWriter jsonWriter, GameNetwork gameNetwork) throws IOException {
    Gson gson = new Gson();
    
	jsonWriter.beginObject();
	jsonWriter.name("spec");
	//How to use jsonwriter to write jsonObject?
	//Replace this text later.
	jsonWriter.value("REPLACEME");
	jsonWriter.name("players");
	jsonWriter.beginArray();

	for (PlayerClient p : gameNetwork.players) {
	  jsonWriter.beginObject();
	  jsonWriter.name("ip");
	  jsonWriter.value(p.ip);
	  jsonWriter.name("port");
	  jsonWriter.value(p.port);
	  jsonWriter.endObject();
	}

	jsonWriter.endArray();
	jsonWriter.name("seed");
	jsonWriter.value(gameNetwork.seed);
	jsonWriter.endObject();
  }
  
  /**
   * Reads a gamenetwork from a json. NOT COMPLETE.
   * @param jsonReader
   * @return
   * @throws IOException
   */
  @Override
  public GameNetwork read(JsonReader jsonReader) throws IOException {

    GameNetwork network = new GameNetwork();

    jsonReader.beginObject();

    while (jsonReader.hasNext()) {
      String name = jsonReader.nextName();
      if (name.equals("spec")) {
		network.gameSpec = readGameSpec(jsonReader).toString();
		jsonReader.skipValue();
	  } else if (name.equals("seed")) {
        network.seed = jsonReader.nextInt();
	  } else if (name.equals("players")) {
		network.players = readPlayersArray(jsonReader);
	  }
	}
	jsonReader.endObject();
	return network;
  }

  private JsonObject readGameSpec(JsonReader reader) throws IOException {
  	
    return new JsonObject();
  }

  private List<PlayerClient> readPlayersArray(JsonReader reader) throws IOException {
	ArrayList<PlayerClient> players = new ArrayList<>();

	reader.beginArray();
	while (reader.hasNext()) {
	  players.add(readPlayer(reader));
	}
	reader.endArray();
	return players;
  }

  private PlayerClient readPlayer(JsonReader reader) throws IOException {
    reader.beginObject();

    PlayerClient p = new PlayerClient();
    while (reader.hasNext()) {
      String name = reader.nextName();
      if (name.equals("ip")) {
        p.ip = reader.nextString();
	  } else if (name.equals("port")) {
        p.port = reader.nextInt();
	  }
	}
    reader.endObject();
  	return p;
  }
}
