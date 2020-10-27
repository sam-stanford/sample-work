import GameLogic.Core.Game;
import GameLogic.DeckAndCards.DeckHandler;
import GameLogic.DeckAndCards.Card;
import GameLogic.DeckAndCards.Deck;
import GameLogic.DeckAndCards.Suit;
import  GameLogic.Core.Player;
import org.junit.Assert;
import org.junit.Before;
import org.junit.*;

import java.util.ArrayList;

public class DeckHandlerTests {


    /*
     * getLastDealt()
     * createPack
     * createDeck
     * deal1Card
     * dealStart
     * setPack
     * shuffle
     * randomize
     * deckToArrayList
     * arrayToDeckStack
     *
     */

    DeckHandler d1;
    DeckHandler d2;
    DeckHandler d3;
    DeckHandler d4;
    DeckHandler d5;

    Deck d = new Deck();
    ArrayList<Card> list = new ArrayList<>();



    @Before
    public void setUp() {

        Card c1 = new Card(2, Suit.DIAMONDS, 4);
        Card c2 = new Card(5, Suit.SPADES, 7);
        Card c3 = new Card(12, Suit.SPADES, 7);
        list.add(c1);
        list.add(c2);
        list.add(c3);
        d1 = new DeckHandler(list, 4);
        d4 = new DeckHandler(new ArrayList<Card>(), 8);

    }


    @Test (expected = NullPointerException.class)
    public void testConstruction() {
        // check normal
        Assert.assertNotNull(d1);

        // check null
        Assert.assertNull(d5);


        // check null values
        Assert.assertNotNull(d4);
        d2 = new DeckHandler(null, 9);
    }

    @Test (expected = NullPointerException.class)
    public void testConstructionPrt2() {
        d3 = new DeckHandler(null, 0);
    }




    @Test
    public void testShuffleDeck() {
        // because no return values, just make sure it doent crash
        d1.createDeck(list);
        d1.shuffleDeck();

    }



    @Test
    public void testCreateDeck() {
        // because no return values, just make sure it doent crash
        d1.createDeck(list);

        //deck will be empty
        d1.createDeck(new ArrayList<Card>());
    }

    @Test
    public void testLastDealt() {
        Assert.assertNull(d1.getLastDealt());
        d1.setLastDealt(null);
        Assert.assertNull(d1.getLastDealt());

        Card c = new Card(2, Suit.HEARTS, 1);
        d1.setLastDealt(c);
        Assert.assertEquals(d1.getLastDealt(), c);
    }



    @Test
    public void testDealHand() {
        //testing that it doesnt crash
        Player[] arr = new Player[1];
        arr[0] = new Player(0, "dude", new Game.GameState());
        d1.dealHand(arr, 0, true, 3);
    }
}
