
package GameContext.Card;

import java.awt.Image;
import javax.swing.ImageIcon;
import javax.swing.JLabel;

public class CardDisplay {
    private JLabel cardLabel;

    public CardDisplay(){
    }
    
    public JLabel showCard(CardPOJO card){
        Image image = card.getImage().getImage();//It's ImageIcon icon = randomCard.getImage(); and Image = icon.getImage(); combine together :)
        Image scaledImage = image.getScaledInstance(107, 157, Image.SCALE_SMOOTH);
        ImageIcon scaledIcon = new ImageIcon(scaledImage);

        cardLabel = new JLabel(scaledIcon);
        return cardLabel;
    }

    public JLabel getCard() {
        return cardLabel;
    }

    public void setCard(JLabel cardLabel) {
        this.cardLabel = cardLabel;
    }
}
