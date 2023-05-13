package Gameplay.Card;
import lombok.Getter;
import lombok.Setter;

import java.awt.Image;
import java.util.ArrayList;
import java.util.HashMap;
import javax.swing.ImageIcon;
public class CardController {


    private static HashMap<String, CardPOJO> CARDS = new HashMap<>();

    private ArrayList<CardPOJO> cards = new ArrayList<>();

    public CardController() {
        CARDS.put("A", new CardPOJO("A", 1, new ImageIcon("resources/A.PNG")));// card A
        CARDS.put("2", new CardPOJO("2", 2, new ImageIcon("resources/02.PNG")));// card 2
        CARDS.put("3", new CardPOJO("3", 3, new ImageIcon("resources/03.PNG")));// card 3
        CARDS.put("4", new CardPOJO("4", 4, new ImageIcon("resources/04.PNG")));// card 4
        CARDS.put("5", new CardPOJO("5", 5, new ImageIcon("resources/05.PNG")));// card 5
        CARDS.put("6", new CardPOJO("6", 6, new ImageIcon("resources/06.PNG")));// card 6
        CARDS.put("7", new CardPOJO("7", 7, new ImageIcon("resources/07.PNG")));// card 7
        CARDS.put("8", new CardPOJO("8", 8, new ImageIcon("resources/08.PNG")));// card 8
        CARDS.put("9", new CardPOJO("9", 9, new ImageIcon("resources/09.PNG")));// card 9
        CARDS.put("10", new CardPOJO("10", 10, new ImageIcon("resources/10.PNG")));// card 10
        CARDS.put("J", new CardPOJO("J", 10, new ImageIcon("resources/J.PNG")));// card J
        CARDS.put("Q", new CardPOJO("Q", 10, new ImageIcon("resources/Q.PNG")));// card Q
        CARDS.put("K", new CardPOJO("K", 10, new ImageIcon("resources/K.PNG")));// card K
        CARDS.put("HIDDEN", new CardPOJO("HIDDEN", 0, new ImageIcon("resources/Back.PNG")));// back of cards
    }

    public void addCards(CardPOJO cards){
       this.cards.add(cards);
        System.out.println("Add cards to player's hand");
    }
    public void addCards(ArrayList<CardPOJO> cards){
        this.cards.addAll(cards);
    }
    public void resetCards(){
        this.cards.clear();
        System.out.println("Clear Player's cards in hand");
    }
    // deprecated
    public HashMap<String, CardPOJO> getHashMap(){
        return CARDS;
    }

    private Image setIconImage(Image createImage) {

        return null;

    }
    public static HashMap<String, CardPOJO> getCARDS(){
        return CARDS;
    }
    public ArrayList<CardPOJO> getCards(){
        return this.cards;
    }
}
