package GameContext.TrumpCard;

import GameContext.Card.CardPOJO;

import javax.swing.*;
import java.awt.*;

public class TrumpCardDisplay {

    private JLabel tCardLabel;
    public JLabel showTrumpCard(TrumpCardPOJO tCard) {
        Image image = tCard.getImage().getImage();//It's ImageIcon icon = randomCard.getImage(); and Image = icon.getImage(); combine together :)
        Image scaledImage = image.getScaledInstance(50, 50, Image.SCALE_SMOOTH);
        ImageIcon scaledIcon = new ImageIcon(scaledImage);
        tCardLabel = new JLabel(scaledIcon);
        return tCardLabel;
    }

    public JLabel getTrumpCard() {
        return tCardLabel;
    }

    public void setTrumpCard(JLabel cardLabel) {
        this.tCardLabel = cardLabel;
    }
}
