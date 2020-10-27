package Network.Discovery;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.Scanner;

/**
 * Sent out in the multicast beacon
 */
public class DiscoveryDataMessage {


    private String gameLabel; // The game we want to play
    private int currentPlayers; // The current number of players joined
    private int wantedPlayers; // The number of players wanted
    private InetAddress hostIp; // IP of organiser (host)
    private String port; // Port for connection


    /**
     * Use given values.
     *
     * @param gameLabel Identifies the type of game we want to play
     * @param hostIp    Identifies the organiser of the game. Not important during actual play only for setup.
     */
    DiscoveryDataMessage(String gameLabel, int currentPlayers, int wantedPlayers, InetAddress hostIp, String port) {
        this.gameLabel = gameLabel;
        this.currentPlayers = currentPlayers;
        this.wantedPlayers = wantedPlayers;
        this.hostIp = hostIp;
        this.port = port;
    }

    public DiscoveryDataMessage(byte[] b) throws UnknownHostException {
        Scanner scanner = new Scanner(new String(b));
        scanner.useDelimiter("\\s+"); //White space
        this.gameLabel = scanner.next();
        String da = scanner.next().trim();
        this.hostIp = InetAddress.getByName(da);
    }

    /**
     * @return Bytes to transmit in a udp datagram as per specification
     */
    byte[] toBytesPayload() {
	try {
	    String data = gameLabel +
                ":" + currentPlayers +
                ":" + wantedPlayers +
                ":" + hostIp.toString().substring(1) +
                ":" + port;
	    return data.getBytes("UTF8");
	} catch (Exception e) {
	    e.printStackTrace();
	}
	return null;
    }

    public String getGameLabel() {
        return gameLabel;
    }

    public InetAddress getHostIp() {
        return hostIp;
    }
}
