import GameLogic.Core.Bid;
import GameLogic.DeckAndCards.Suit;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import org.junit.*;

public class BidTests {
    // beep beep

    // what is this feeling so sudden and new
    // i felt it the moment i laid eyes on you

    // base on card tests
    Bid b1; // normal
    Bid b2; // null
    Bid b3; // partial null vals 1
    Bid b4; // partial null vals 2

    @Before
    public void setUp() {
        b1 = new Bid(3, Suit.CLUBS, true);
        b3 = new Bid(11, null, false);
        b4 = new Bid(0, Suit.DIAMONDS, true);
    }

    // check constructors
    @Test
    public void testBidConstuction() {
        //check normal
        Assert.assertNotNull(b1);

        // check null
        Assert.assertNull(b2);

        //check null values
        Assert.assertNotNull(b3);

        //check partial null values
        Assert.assertNotNull(b4);
    }

    // getters and setters
    // (int value, suit, bool isBlind)

    @Test
    public void testIsDoubled() {
        //tests getters and setters
        b1.setIsDoubled(true);
        Assert.assertTrue(b1.isIsDoubled());

        b1.setIsDoubled(false);
        Assert.assertFalse(b1.isIsDoubled());
    }

    @Test
    public void testIsReDoubled() {
        //tests getters and setters
        b1.setIsRedoubled(true);
        Assert.assertTrue(b1.isIsRedoubled());

        b1.setIsRedoubled(false);
        Assert.assertFalse(b1.isIsRedoubled());

    }

    @Test
    public void testGetValue() {
        // first get then set
        //check for 3, 0, J
        Assert.assertEquals(b1.getValue(), 3);

        // check isEmpty
        Assert.assertEquals(b4.getValue(), 0);
        // check J
        Assert.assertEquals(b3.getValue(), 11);
    }

    @Test
    public void testSetValue() {
        //check for 3, 0, J

        b1.setValue(0);
        Assert.assertEquals(b1.getValue(), 0);

        b1.setValue(11);
        Assert.assertEquals(b1.getValue(), 11);

        b1.setValue(3);
        Assert.assertEquals(b1.getValue(), 3);
    }

    @Test
    public void testGetSuit() {
        // first get then set
        //check for spade, dia, null
        Assert.assertEquals(b1.getSuit(), Suit.CLUBS);
        Assert.assertEquals(b4.getSuit(), Suit.DIAMONDS);
        Assert.assertNull(b3.getSuit());
    }

    @Test
    public void testSetSuit() {
        //check for 3, 0, J

        b1.setSuit(Suit.DIAMONDS);
        Assert.assertEquals(b1.getSuit(), Suit.DIAMONDS);

        b1.setSuit(Suit.CLUBS);
        Assert.assertEquals(b1.getSuit(), Suit.CLUBS);

        b1.setSuit(null);
        Assert.assertNotNull(b1);
    }

    @Test
    public void testIsBlind() {
        Assert.assertTrue(b1.isBlind());
        Assert.assertFalse(b3.isBlind());
    }

    @Test
    public void testSetBlind() {

        b1.setBlind(false);
        Assert.assertFalse(b1.isBlind());

        b1.setBlind(true);
        Assert.assertTrue(b1.isBlind());
    }

    @Test
    public void testBidType() {
        //tests getters and setters
        Assert.assertEquals(b1.getBidType(), Bid.BidType.BID);
        b1.setBidType(null);
        Assert.assertNull(b1.getBidType());

        b1.setBidType(Bid.BidType.DOUBLE);
        Assert.assertEquals(b1.getBidType(), Bid.BidType.DOUBLE);
    }
    
    @Test
    public void testToString() {
        String d = new Gson().toJson(b1);
        System.out.print(d);
        
        JsonArray obj = new JsonArray();
        
        obj.add(new Gson().fromJson(new Gson().toJson(b1), JsonObject.class));
        
        System.out.println(obj);
    }
    
}
