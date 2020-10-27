package GameLogic.DeckAndCards;

import GameLogic.Core.Player;

import java.util.ArrayList;

public class Table {

    private ArrayList<Card> cards;

    // Constructor
    public Table(ArrayList initCards){
        this.cards = new ArrayList<>(initCards);
    }

    public void addCard(Card card){
        cards.add(card);
    }

    public ArrayList<Card> getCards(){
        return  cards;
    }

    public void clearTableCards() {
        this.cards = new ArrayList<>();
    }

    public void printTableCards(){
        for (int i = 0; i < cards.size(); i++) {

            System.out.print(cards.get(i).getValue() +"" + cards.get(i).getSuit());

        }
    }

}
