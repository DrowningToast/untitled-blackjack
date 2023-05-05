
package UI.Demo.Model;

import UI.Demo.Model.Card;
import java.awt.Image;
import javax.swing.ImageIcon;
import javax.swing.JLabel;

public class ImageCard {
    private JLabel showCard;
    
    public JLabel randomCard(Card randomCard){
        Image image = randomCard.getImage().getImage();//It's ImageIcon icon = randomCard.getImage(); and Image = icon.getImage(); combine together :)
        Image scaledImage = image.getScaledInstance(107, 157, Image.SCALE_SMOOTH);
        ImageIcon scaledIcon = new ImageIcon(scaledImage);

        showCard = new JLabel(scaledIcon);
        return showCard;
    }

    public JLabel getShowCard() {
        return showCard;
    }

    public void setShowCard(JLabel showCard) {
        this.showCard = showCard;
    }
}
