package Network.Discovery;

import java.io.IOException;
import java.net.DatagramPacket;
import java.net.InetAddress;
import java.net.MulticastSocket;

public class DiscoveryHost implements Runnable {
	private String gameName;
	private int maxPlayers;
	private int localPort;
	private int currentPlayers = 0;
	
	private MulticastSocket socket;
	private int multicastPort;
	private InetAddress group;
	
	public volatile boolean stop = false;
	
	public DiscoveryHost(String gameLabel, int maxPlayers, int localPort) {
		this.gameName = gameLabel;
		this.maxPlayers = maxPlayers;
		this.localPort = localPort;
		this.currentPlayers = 0;
		
		//Join multicast group
		try {
			this.group = InetAddress.getByName("239.40.40.6"); // From spec
			this.multicastPort = 1903; // From spec
			
			socket = new MulticastSocket(this.multicastPort);
			// socket.setLoopbackMode(true);
			// socket.setReuseAddress(true);
			// socket.joinGroup(group);
			
		} catch (Exception e) {
			e.printStackTrace();
			System.exit(0);
		}
	}
	
	/**
	 * Broadcasts a beacon every 1000 milliseconds.
	 */
	public void broadcast() {
		while (!this.stop) {
			try {
				this.sendOutBeacon();
				Thread.sleep(1000);
			} catch (InterruptedException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		socket.close();
	}
	
	/**
	 * Send out a beacon to play game.
	 * Clients respond to this beacon by contacting through TCP connection.
	 */
	private void sendOutBeacon() throws IOException {
		DiscoveryDataMessage msg = new DiscoveryDataMessage(
				this.gameName,
				this.currentPlayers,
				this.maxPlayers,
				InetAddress.getByName(InetAddress.getLocalHost().getHostAddress()),
				String.valueOf(this.localPort));
		
		byte[] msgData = msg.toBytesPayload();

		
		DatagramPacket message = new DatagramPacket(msgData, msgData.length,
				this.group, this.multicastPort);
		
		socket.send(message);
	}
	
	@Override
	public void run() {
		this.broadcast();
	}
}
