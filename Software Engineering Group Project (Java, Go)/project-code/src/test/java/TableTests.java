import org.junit.*;
import GameLogic.DeckAndCards.Table;
import GameLogic.DeckAndCards.Card;
import GameLogic.DeckAndCards.Suit;

import java.util.ArrayList;

public class TableTests {
    Table t1;
    Table t2;
    Table t3;
    Table t4;



    @Before
    public void setUp() {

        Card c1 = new Card(3, Suit.DIAMONDS, 2);
        Card c2 = new Card(11, Suit.DIAMONDS, 2);
        ArrayList<Card> a = new ArrayList<>();
        a.add(c1);
        a.add(c2);

        t1 = new Table(new ArrayList<Card>());
        t3 = new Table(a);
    }

    @Test (expected = NullPointerException.class)
    public void testConstuctor() {
        //normal
        Assert.assertNotNull(t1);
        //null val
        Assert.assertNotNull(t3);
        //null
        Assert.assertNull(t4);

        t2 = new Table(null);
    }

    @Test
    public void testAddCard()  {
        Card c = new Card(7, Suit.CLUBS, 1);

        t1.addCard(c);
        t3.addCard(c);
        // normal
        Assert.assertEquals(t1.getCards().size(), 1);

        // null value
        Assert.assertEquals(t3.getCards().size(), 3);

    }

    @Test
    public void testGetCards() {
        //normal
        Assert.assertEquals(t3.getCards().size(), 2);
        //empty array
        Assert.assertNotNull(t1.getCards());
    }

    @Test
    public void testClearTableCards() {
       t3.clearTableCards();

        //normal
        Assert.assertEquals(t3.getCards().size(), 0);

        //empty array
        ArrayList<Card> demo = t1.getCards();
        t1.clearTableCards();
        Assert.assertEquals(t1.getCards(), demo);

    }

    @Test
    public void testPrintTableCards() {
        // how to test print functions
        // check they dont crash
        t1.printTableCards();
        t3.printTableCards();
    }
}
