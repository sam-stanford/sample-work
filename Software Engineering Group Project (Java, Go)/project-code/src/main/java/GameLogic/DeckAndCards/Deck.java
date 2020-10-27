package GameLogic.DeckAndCards;

import java.util.ArrayList;
import java.util.EmptyStackException;


/*
 * Class to represent the cards of cards. Implemented as a stack.
 */
public class Deck {

    // Underlying data structure of an array list. Accessed as a stack
    private ArrayList<Card> cards = new ArrayList<>();

    // ArrayList set()
    public void set(int index, Card card) {
        cards.set(index, card);
    }

    // ArrayList get()
    public Card get(int index){
       return cards.get(index);
    }

    // Push card onto the stack
    public Card push(Card card) {
        cards.add(card);
        return card;
    }

    // Check if stack is empty
    public Boolean isEmpty() {
        return (cards.size() == 0);
    }

    // Return the size of the list
    public int size() {
        return this.cards.size();
    }

    // Pop top card of the stack
    public Card pop() {
        if (cards.isEmpty()) {
            throw new EmptyStackException();
        } else {
            return cards.remove(cards.size() - 1);
        }
    }

    // Returns the top card of the deck without removing it from the stack
    public Card peek() {
        if (cards.isEmpty()) {
            throw new EmptyStackException();
        } else {
            return cards.get(cards.size() - 1);
        }
    }

    // Searches the cards for a card specified by the user
    public int search(Card card) {
        if (cards.isEmpty()) {
            throw new EmptyStackException();
        } else if (cards.contains(card)) {
            return (cards.indexOf(card));
        } else {
            System.out.print("No card!");
            return -1;
        }
    }

    // Removes card from deck without dealing to any player
    public void burn() {
        if (cards.isEmpty()) {
            throw new EmptyStackException();
        }
        cards.remove(cards.size() - 1);
    }

}
