
import GameLogic.DeckAndCards.Card;
import GameLogic.DeckAndCards.Deck;
import GameLogic.DeckAndCards.Suit;
import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import java.io.*;
import java.util.EmptyStackException;


public class DeckTests {
    Deck d;
    Card c1;
    Card c2;


    @Before
    public void setUp() {
        d = new Deck();
        c1 = new Card(2, Suit.DIAMONDS, 4);
        c2 = new Card(5, Suit.SPADES, 7);
    }

    @Test
    public void testPush() {
        //check null
        Assert.assertNull(d.push(null));
        //check normal
        Assert.assertEquals(c1, d.push(c1));
    }

    @Test
    public void testEmpty() {
        //check true
        Assert.assertTrue(d.isEmpty());
        //check false
        d.push(c1);
        Assert.assertFalse(d.isEmpty());

    }

    @Test(expected = EmptyStackException.class)
    public void testPop() {
        //check full 1
        d.push(c1);
        Assert.assertEquals(c1, d.pop());
        Assert.assertEquals(0, d.size());
        //check full >1
        d.push(c1);
        d.push(c2);
        Assert.assertEquals(c2, d.pop());
        Assert.assertEquals(1, d.size());
        //check isEmpty
        d.pop();
        d.pop();
        d.pop();
    }

    @Test (expected = EmptyStackException.class)
    public void testPeek() {
        //check full
        d.push(c1);
        Assert.assertEquals(c1, d.peek());

        //check isEmpty
        d.pop();
        d.peek();
    }

    @Test
    public void testSize() {
        //check isEmpty
        Assert.assertEquals(0, d.size());
        //check full 1
        d.push(c1);
        Assert.assertEquals(1, d.size());
        //check full >1
        d.push(c2);
        Assert.assertEquals(2, d.size());
    }

    @Test (expected = EmptyStackException.class)
    public void testSearch() {

        //check in deck
        d.push(c1);
        Assert.assertEquals(0, d.search(c1));
        //check not in deck
        Assert.assertEquals(-1, d.search(c2));
        //check null
        Assert.assertEquals(-1, d.search(null));

        //check isEmpty
        d.pop();
        d.search(c1);
    }

    @Test (expected = EmptyStackException.class)
    public void testBurn() {

        //check full 1
        d.push(c1);
        d.burn();
        Assert.assertEquals(0, d.size());
        //check full >1
        d.push(c1);
        d.push(c2);
        d.burn();
        Assert.assertEquals(1, d.size());

        //check isEmpty
        d.pop();
        d.pop();
        d.burn();
    }
}
