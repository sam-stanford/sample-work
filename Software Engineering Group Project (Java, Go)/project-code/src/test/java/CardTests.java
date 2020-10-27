
import GameLogic.DeckAndCards.Card;
import GameLogic.DeckAndCards.Suit;

import org.junit.*;

import java.util.ArrayList;


public class CardTests {
    Card c1;
    Card c2;
    Card c3;
    Card c4;
    Card c5;
    ArrayList<String> rankOrder = new ArrayList<>();

    @Before
    public void setup() {
        c1 = new Card(2, Suit.DIAMONDS, 4);
        c3 = new Card(0, null, 0);
        c4 = new Card(11, null, 2);
        c5 = new Card(0, Suit.SPADES, 0);
        rankOrder.add("ACE");
        rankOrder.add("KING");
        rankOrder.add("QUEEN");
        rankOrder.add("JACK");
        rankOrder.add("10");
        rankOrder.add("9");
        rankOrder.add("8");
        rankOrder.add("7");
        rankOrder.add("6");
        rankOrder.add("5");
        rankOrder.add("4");
        rankOrder.add("3");
        rankOrder.add("2");
    }



    @Test
    public void testCardConstuction() {
        //check normal
        Assert.assertNotNull(c1);

        // check null
        Assert.assertNull(c2);

        //check null values
        Assert.assertNotNull(c3);

        //check partial null values
        Assert.assertNotNull(c4);
        Assert.assertNotNull(c5);
    }

    @Test
    public void testGetValue() {

        // check 2
        Assert.assertEquals(c1.getValue(), 2);

        // check isEmpty
        Assert.assertEquals(c5.getValue(), 0);
        // check J
        Assert.assertEquals(c4.getValue(), 11);

    }
    @Test
    public void testGetSuit() {

        // check normal
        Assert.assertEquals(c1.getSuit(), Suit.DIAMONDS);

        // check null
        Assert.assertNull(c3.getSuit());

    }

    @Test
    public void testGetPointValue() {

        // check 4
        Assert.assertEquals(c1.getPointValue(), 4);

        // check isEmpty
        Assert.assertEquals(c5.getPointValue(), 0);

    }



    @Test
    public void testGetSuitEnum() {
        // (suit, enum, pVal)
        // check suit enum
        Assert.assertEquals(c1.getSuit(), Suit.DIAMONDS);
        Assert.assertEquals(c5.getSuit(), Suit.SPADES);
        Assert.assertNull(c4.getSuit());

        Assert.assertEquals(c1.getPointValue(), 4);
        Assert.assertEquals(c4.getPointValue(), 2);
        Assert.assertEquals(c5.getPointValue(), 0);
    }

    @Test
    public void testEqualCards() {
        Card c = new Card(2, Suit.DIAMONDS, 4);
        Card d = new Card(5, Suit.DIAMONDS, 4);

        // check null
        Assert.assertFalse(c1.equals(null));


        // check equal
        Assert.assertTrue(c1.equals(c));

        // check same obj
        Assert.assertTrue(c1.equals(c1));
        // check not equal
        Assert.assertFalse(c1.equals(d));


    }

    @Test
    public void testConvertSuitCode() {

        // check Diamonds (c1)
        Assert.assertEquals(Card.suitToCharCode(c1.getSuit()), 'D');
    }


    @Test
    public void testPrintCard() {
        // because no return values, just make sure it doent crash
        Assert.assertEquals(c1.printCardString(rankOrder), "2D");
    }

    @Test
    public void testPrintCardString() {
        //test normal card
        Assert.assertEquals(c1.printCardString(rankOrder), "2D");

        // test null suit
        Assert.assertEquals(c1.printCardString(null), "D");

        // test
    }

    @Test
    public void testSuitEnumToString() {
        // test normal enum
        Assert.assertEquals(Card.suitEnumToString(Suit.DIAMONDS), "DIAMONDS");

        //test null enum
        Assert.assertNull(Card.suitEnumToString(null));
    }

    @Test
    public void testSuitStringToEnum() {
        // test normal string
        Assert.assertEquals(Card.suitStringToEnum("DIAMONDS"), Suit.DIAMONDS);

        // test null string
        Assert.assertNull(Card.suitStringToEnum(null));

        // test empty string
        Assert.assertNull(Card.suitStringToEnum(""));

        // test not suit string
        Assert.assertNull(Card.suitStringToEnum("not suit"));
    }

    @Test
    public void testRankIntToString() {
        //test normal value
        Assert.assertEquals(Card.rankIntToString( 10, rankOrder), "6");

        // test 0
        Assert.assertEquals(Card.rankIntToString( 0, rankOrder), "ACE");

        // test 13
        Assert.assertEquals(Card.rankIntToString( 13, rankOrder), "2");

        // test -1 (out of bounds)
        Assert.assertNull(Card.rankIntToString( -1, rankOrder));

        // test 14 (out of bounds)
        Assert.assertNull(Card.rankIntToString( 14, rankOrder));
    }

    @Test
    public void testRankStringToInt() {
        // test normal
        Assert.assertEquals(Card.rankStringToInt("QUEEN", rankOrder), 3);

        // test not in list
        Assert.assertEquals(Card.rankStringToInt("king", rankOrder), -1);

        // test empty string
        Assert.assertEquals(Card.rankStringToInt("", rankOrder), -1);

        // test null
        Assert.assertEquals(Card.rankStringToInt(null, rankOrder), -1);
    }

}
