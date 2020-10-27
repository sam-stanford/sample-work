package Network.GamePlay;

import Network.Events.NetworkEvent;
import Network.Events.PlayCardEvent;
import Network.GameInitiation.GameNetwork;
import Network.GameInitiation.JsonEvent;
import Network.PlayerClient;
import com.google.gson.Gson;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.concurrent.BlockingQueue;

public class NetworkGame {

    private BlockingQueue<JsonEvent> eventsQueue;
    public List<PlayerClient> players;
    public int seed;

    public NetworkGame(GameNetwork network) {
        eventsQueue = network.jsonEvents;
        players = network.players;
        seed = network.seed;
    }

    public NetworkEvent receiveEvent(int i) {
        
        PlayCardEvent playCardEvent = null;
        while (playCardEvent == null) {
            try {
                //Should be most recent event
                JsonEvent ev = eventsQueue.take();
        
                playCardEvent = new Gson().fromJson(ev.obj, PlayCardEvent.class);
                
            } catch (InterruptedException e) {
                System.out.println("Got null event:(");
            }
        }
        
        return playCardEvent;
    }


    public <Event> void sendEvent(Event e) {

        for (PlayerClient p : players) {
            if (p.conn != null && !p.conn.isClosed()) {
                try {
                    PrintWriter writer = new PrintWriter(p.conn.getOutputStream(), true);
                    String j = new Gson().toJson(e, PlayCardEvent.class);
                    writer.write(j);
                    writer.flush();

                } catch (IOException ex) {
                    System.out.println("Failed to play move!");
                    ex.printStackTrace();
                }

            }
        }

    }

}
