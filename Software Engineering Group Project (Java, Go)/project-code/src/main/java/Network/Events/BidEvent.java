package Network.Events;


public class BidEvent {
    public String type;
    public boolean doubling; // True means double
    public String suit;
    public int value; // Negative value means pass
    public boolean blindBid;
}
