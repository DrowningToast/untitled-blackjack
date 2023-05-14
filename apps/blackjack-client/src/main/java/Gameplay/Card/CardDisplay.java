
package Gameplay.Card;

import Gameplay.Player.PlayerPOJO;

import java.awt.Image;
import javax.swing.ImageIcon;
import javax.swing.JLabel;

public class CardDisplay {
    private JLabel card;
//    private CardPOJO cards;

    public CardDisplay(){
    }
    
    public JLabel showCard(CardPOJO cards){
        Image image = cards.getImage().getImage();//It's ImageIcon icon = randomCard.getImage(); and Image = icon.getImage(); combine together :)
        Image scaledImage = image.getScaledInstance(107, 157, Image.SCALE_SMOOTH);
        ImageIcon scaledIcon = new ImageIcon(scaledImage);

        card = new JLabel(scaledIcon);
        return card;
    }

    public JLabel getCard() {
        return card;
    }

    public void setCard(JLabel card) {
        this.card = card;
    }
}
