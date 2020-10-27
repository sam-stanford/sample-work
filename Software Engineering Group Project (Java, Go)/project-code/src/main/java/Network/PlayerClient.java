package Network;

import java.net.InetAddress;
import java.net.Socket;

/**
 * Represents a players client.
 */
public class PlayerClient {

	/**
	 * Ip address of this player.
	 */
	public String ip;

	/**
	 * Port to connect to this player.
	 */
	public int port;

	/**
	 * Keep a connection to this GameLogic.Core.Player.
	 * Marked as transient so Gson ignores this
	 * during serialization and deserialization.
	 */
	public transient Socket conn;

	public transient boolean isReady;

	@Override
  	public boolean equals(Object obj) {
	  if (this == obj) {
	    return true;
	  }

	  PlayerClient other = (PlayerClient) obj;

	  return (this.ip.equals(other.ip) && this.port == other.port);
	}
}
