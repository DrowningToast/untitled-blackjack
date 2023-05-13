package UI.PH_Gameplay.Model;
import java.awt.Image;
import java.util.HashMap;
import javax.swing.ImageIcon;
public class CardHandler {
    
    private HashMap<String, Card> cards = new HashMap<>();
    private ClassLoader classLoader = getClass().getClassLoader();
//    private final Card card_image = new Card();
    
    public CardHandler() {
        cards.put("A", new Card("A", 1, new ImageIcon("resources/A.PNG")));// card A
        cards.put("2", new Card("2", 2, new ImageIcon("resources/02.PNG")));// card 2
        cards.put("3", new Card("3", 3, new ImageIcon("resources/03.PNG")));// card 3
        cards.put("4", new Card("4", 4, new ImageIcon("resources/04.PNG")));// card 4
        cards.put("5", new Card("5", 5, new ImageIcon("resources/05.PNG")));// card 5
        cards.put("6", new Card("6", 6, new ImageIcon("resources/06.PNG")));// card 6
        cards.put("7", new Card("7", 7, new ImageIcon("resources/07.PNG")));// card 7
        cards.put("8", new Card("8", 8, new ImageIcon("resources/08.PNG")));// card 8
        cards.put("9", new Card("9", 9, new ImageIcon("resources/09.PNG")));// card 9
        cards.put("10", new Card("10", 10, new ImageIcon("resources/10.PNG")));// card 10
        cards.put("J", new Card("J", 10, new ImageIcon("resources/J.PNG")));// card J
        cards.put("Q", new Card("Q", 10, new ImageIcon("resources/Q.PNG")));// card Q
        cards.put("K", new Card("K", 10, new ImageIcon("resources/K.PNG")));// card K
        cards.put("HIDDEN", new Card("HIDDEN", 0, new ImageIcon("resources/Back.PNG")));// back of cards
    }
   
    public HashMap<String, Card> getHashMap(){
        return cards;
    }

    private Image setIconImage(Image createImage) {

        return null;

    }
}
