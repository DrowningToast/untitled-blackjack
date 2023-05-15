package GameContext.Card;

import java.awt.Image;
import java.util.ArrayList;
import java.util.HashMap;
import javax.swing.ImageIcon;
public class CardController {


    private static HashMap<String, CardPOJO> CARDS = new HashMap<>();

    private ArrayList<CardPOJO> POJOS = new ArrayList<>();

    public CardController() {
        CARDS.put("A", new CardPOJO("A", new int[]{1, 11}, new ImageIcon("resources/A.PNG")));// card A
        CARDS.put("2", new CardPOJO("2", new int[]{2}, new ImageIcon("resources/02.PNG")));// card 2
        CARDS.put("3", new CardPOJO("3", new int[]{3}, new ImageIcon("resources/03.PNG")));// card 3
        CARDS.put("4", new CardPOJO("4", new int[]{4}, new ImageIcon("resources/04.PNG")));// card 4
        CARDS.put("5", new CardPOJO("5", new int[]{5}, new ImageIcon("resources/05.PNG")));// card 5
        CARDS.put("6", new CardPOJO("6", new int[]{6}, new ImageIcon("resources/06.PNG")));// card 6
        CARDS.put("7", new CardPOJO("7", new int[]{7}, new ImageIcon("resources/07.PNG")));// card 7
        CARDS.put("8", new CardPOJO("8", new int[]{8}, new ImageIcon("resources/08.PNG")));// card 8
        CARDS.put("9", new CardPOJO("9", new int[]{9}, new ImageIcon("resources/09.PNG")));// card 9
        CARDS.put("10", new CardPOJO("10", new int[]{10}, new ImageIcon("resources/10.PNG")));// card 10
        CARDS.put("J", new CardPOJO("J", new int[]{10}, new ImageIcon("resources/J.PNG")));// card J
        CARDS.put("Q", new CardPOJO("Q", new int[]{10}, new ImageIcon("resources/Q.PNG")));// card Q
        CARDS.put("K", new CardPOJO("K", new int[]{10}, new ImageIcon("resources/K.PNG")));// card K
        CARDS.put("HIDDEN", new CardPOJO("HIDDEN", new int[]{0}, new ImageIcon("resources/Back.PNG")));// back of cards
    }

    public void addCards(CardPOJO cards){
       this.POJOS.add(cards);
    }
    public void addCards(ArrayList<CardPOJO> cards){
        this.POJOS.addAll(cards);
    }
    public void resetCards(){
        this.POJOS.clear();
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
    public ArrayList<CardPOJO> getPOJOS(){
        return this.POJOS;
    }
}
