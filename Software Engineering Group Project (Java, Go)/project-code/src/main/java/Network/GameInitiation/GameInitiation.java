package Network.GameInitiation;

import Network.Discovery.DiscoveryHost;
import Network.Events.ReadyEvent;
import Network.PlayerClient;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonSyntaxException;
import com.google.gson.stream.JsonReader;

import java.io.*;
import java.net.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;

public class GameInitiation {
    
    
    /**
     * Gets the details and ip address of all players wanting to join the game.
     */
    public GameNetwork hostGame(int portNumber, JsonObject gameSpec, int maxPlayers, int randomSeed, String gameLabel) throws NetworkCreationException {
        try {

            //Array to store all the players
            ArrayList<PlayerClient> players = new ArrayList<>();

            // Google's json worker
            Gson gson = new Gson();

            //Create a blocking queue to store events from all players.
            BlockingQueue<JsonEvent> eventQueue = new LinkedBlockingQueue<>();

            //Add self to players as index 0
            PlayerClient host = new PlayerClient();
            host.ip = InetAddress.getLocalHost().getHostAddress();
            host.port = portNumber;
            players.add(host);

            //Start listening
            ServerSocket serverSocket = new ServerSocket(portNumber);

            //Start broadcasting that we are hosting a game
            DiscoveryHost discoveryHost = new DiscoveryHost(gameLabel, maxPlayers, portNumber);
            Thread discoveryThread = new Thread(discoveryHost);
            discoveryThread.start();
            
            while (players.size() < maxPlayers) {
                //Wait on a connection.
                Socket connection = serverSocket.accept();

                //Create the player from the json sent by the player
                InputStreamReader hostReader = new InputStreamReader(connection.getInputStream());
                PlayerClient player = gson.fromJson(new JsonReader(hostReader), PlayerClient.class);

                //Store their connection
                player.conn = connection;

                //Make a thread that adds json events to event queue
                Thread t = new Thread(new PlayerConnectionThread(eventQueue, player));
                t.start();

                // System.out.println("Connected to: " + player.conn.getInetAddress().getCanonicalHostName());

                //Add their details.
                players.add(player);
            }
            
            //Stop broadcasting that we are hosting.
            discoveryHost.stop = true;
            discoveryThread.join();
            
            //Create GameNetwork
            GameNetwork network = new GameNetwork();
            network.gameSpec = gameSpec.toString();
            network.players = players;
            network.seed = randomSeed;
            network.jsonEvents = eventQueue;

            //Send all players the game spec.
            for (PlayerClient p : players) {
                if (p != host) {
                    //Send the game spec message to this player
                    PrintWriter writer = new PrintWriter(p.conn.getOutputStream(), true);
                    String testString = gson.toJson(network);
                    testString = testString.replace("\"REPLACEME\"", network.gameSpec);
                    writer.write(testString);
                    writer.flush();

                    //Wait before sending ready event
                    Thread.sleep(100);

                    //Send ready event.
                    JsonObject ready = new JsonObject();
                    ready.addProperty("ready", true);
                    ready.addProperty("playerIndex", 0);
                    writer.write(ready.toString());
                    writer.flush();
                }
            }

            //Now wait for ready message from every connected player:
            int counter = 0;
            while (counter != network.players.size() - 1) {
                JsonEvent e = eventQueue.take();
                ReadyEvent ready = new Gson().fromJson(e.obj, ReadyEvent.class);
                try {
                    //System.out.println(e.obj.toString());
                } catch (NullPointerException exc) {
                }

                if (ready.ready && !network.players.get(ready.playerIndex).isReady) {
                    network.players.get(ready.playerIndex).isReady = true;
                    counter++;
                }

            }

            return network;

        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }

        throw new NetworkCreationException();

    }
    
    public GameNetwork discoverGame(String gameName, int localPortNumber) {
        try {
			//Join the multicast group.
			InetAddress group = InetAddress.getByName("239.40.40.6"); // From spec
			int port = 1903; // From spec
	
			//Create and configure multicast socket to receive messages over.
			MulticastSocket socket = new MulticastSocket(port);
			socket.setLoopbackMode(true);
			socket.setReuseAddress(true);
			socket.joinGroup(group);
            //System.out.println("Listening on multicast...");
            //Listen for messages until one describes a game we want to join.
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
				if (gameName.equals(dataArray[0])) {
					//Prepare connection details
					InetAddress hostIp = InetAddress.getByName(dataArray[3]);
					int hostPort = Integer.parseInt(dataArray[4]);
			
					//Now should join this game and return the GameNetwork object
					return joinGame(hostIp, hostPort, localPortNumber);
				}
			}
        } catch (Exception e) {
            System.out.println("Could not discover and join game.");
            e.printStackTrace();
            System.exit(0);
        }
        return null;
    }

    /**
     * Gets the details and ip address of all players wanting to join the game.
     */
    private GameNetwork joinGame(InetAddress hostAddr, int hostPortNumber, int localPortNumber) throws NetworkCreationException {
        try {

            //Connect to host
            Socket hostConn = new Socket(hostAddr, hostPortNumber);

            //Create a blocking queue to store events from all players.
            BlockingQueue<JsonEvent> eventQueue = new LinkedBlockingQueue<JsonEvent>();


            //Send GameLogic.Core.Player describing self
            PlayerClient playerSelf = new PlayerClient();
            playerSelf.ip = InetAddress.getLocalHost().getHostAddress();
            playerSelf.port = localPortNumber;

            PrintWriter hostWriter = new PrintWriter(hostConn.getOutputStream(), true);
            hostWriter.write(new Gson().toJson(playerSelf));
            hostWriter.flush();

            //Wait on game network json
            //Not in event queue as this has to be read before we know who we can listen too.
            StringBuilder msgSoFar = new StringBuilder();
			InputStreamReader reader = new InputStreamReader(hostConn.getInputStream());
			boolean done = false;
			JsonObject gameNetworkJson = null;
			while (!done) {
				msgSoFar.append((char)reader.read());
				
				//Check if we have a complete json
				try {
					gameNetworkJson = new Gson().fromJson(msgSoFar.toString(), JsonObject.class);
					
					//If could parse then we are done.
					done = true;
				} catch (JsonSyntaxException e) {}
				
			}
			GameNetwork network = new GameNetwork();
			network.seed = gameNetworkJson.get("seed").getAsInt();
			
			network.players = new ArrayList<>();
			JsonArray playersArray = gameNetworkJson.get("players").getAsJsonArray();
			for (int i = 0; i < playersArray.size(); i++) {
				PlayerClient playerClient = new PlayerClient();
				JsonObject playerObj = playersArray.get(i).getAsJsonObject();
				
				playerClient.ip = playerObj.get("ip").getAsString();
				playerClient.port = playerObj.get("port").getAsInt();
				
				network.players.add(playerClient);
			}
			
			network.gameSpec = gameNetworkJson.get("spec").getAsJsonObject().toString();
			
            //GameNetwork network = new Gson().fromJson(new JsonReader(new InputStreamReader(hostConn.getInputStream())), GameNetwork.class);
            network.jsonEvents = eventQueue;

            //Make a thread that adds json events to event queue
            PlayerClient hostPlayer = new PlayerClient();
            hostPlayer.conn = hostConn;
            hostPlayer.port = hostPortNumber;
            hostPlayer.ip = hostAddr.toString();
            Thread tHost = new Thread(new PlayerConnectionThread(network.jsonEvents, hostPlayer));
            tHost.start();


            int selfPlayerIndex = network.players.indexOf(playerSelf);

            //Get connections of lower indexes.
            for (int i = 0; i < selfPlayerIndex - 1; i++) {
                //Wait for incoming connection.
                ServerSocket serverSocket = new ServerSocket(localPortNumber);
                Socket lowerIndexConn = serverSocket.accept();

                //Create the player from the json sent by the player
                //PlayerClient player = new Gson().fromJson(new JsonReader(new InputStreamReader(lowerIndexConn.getInputStream())), PlayerClient.class);

                //Store their connection
                PlayerClient player = network.players.get(i);

                player.conn = lowerIndexConn;
                System.out.println("Connected to lower indexed computer: " + lowerIndexConn.getInetAddress().getCanonicalHostName());
                System.out.flush();

                //Make a thread that adds json events to event queue
                Thread t = new Thread(new PlayerConnectionThread(network.jsonEvents, player));
                t.start();


            }

            //Continute to use existing connection to host.
            network.players.get(0).conn = hostConn;

            //Establish a connection to all players with index greater than self.
            for (int i = selfPlayerIndex + 1; i < network.players.size(); i++) {
                PlayerClient p = network.players.get(i);


                Socket playerConn = new Socket(InetAddress.getByName(p.ip), p.port);
                p.conn = playerConn;

                //Make a thread that adds json events to event queue
                Thread t = new Thread(new PlayerConnectionThread(eventQueue, p));
                t.start();

                System.out.println("Connected to higher indexed computer: " + playerConn.getInetAddress().getCanonicalHostName());

            }

            //Wait until we have connection to all lower index players
//	  lowerIndexConnectionsThread.join();
//
//	  //Add the connections to network
//	  for (int i = 1; i < selfPlayerIndex; i++) {
//	    PlayerClient pExpected = network.players.get(i);
//
//	    //Check we are expecting this player.
//	    int incomingIndex = playersIncoming.indexOf(pExpected);
//	    if (incomingIndex != -1) {
//	      //Add the connection to network.
//	      network.players.set(i, playersIncoming.get(incomingIndex));
//
//	      //Remove player from incoming as they have been dealt with
//		  playersIncoming.remove(incomingIndex);
//		}
//	  }
//
//	  //Close all connections to players that we were not expecting.
//	  for (PlayerClient p : playersIncoming) {
//		p.conn.close();
//	  }

            for (PlayerClient p : network.players) {
                if (p.conn != null) {
                    //Send ready event.
                    PrintWriter writer1 = new PrintWriter(p.conn.getOutputStream());
                    JsonObject ready = new JsonObject();
                    ready.addProperty("ready", true);
                    ready.addProperty("playerIndex", selfPlayerIndex);
                    writer1.write(ready.toString());
                    writer1.flush();
                }
            }

            //Now wait for ready message from every connected player:
            int counter = 0;
            while (counter != network.players.size() - 1) {
                JsonEvent e = eventQueue.take();
                ReadyEvent ready = new Gson().fromJson(e.obj, ReadyEvent.class);
                //System.out.println(e.obj.toString());

                if (ready.ready && !network.players.get(ready.playerIndex).isReady) {
                    network.players.get(ready.playerIndex).isReady = true;
                    counter++;
                }

            }

            return network;

        } catch (IOException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        throw new NetworkCreationException();

    }

}

