package GameContext.TrumpCard;

import javax.swing.*;
import java.awt.*;

public class TrumpStatusDisplay {
    private JLabel trumpStatusLabel;
    public JLabel showTrumpStatus(TrumpStatusPOJO trumpStatusPOJO){
        Image image = trumpStatusPOJO.getImage().getImage();//It's ImageIcon icon = randomCard.getImage(); and Image = icon.getImage(); combine together :)
        Image scaledImage = image.getScaledInstance(50, 50, Image.SCALE_SMOOTH);
        ImageIcon scaledIcon = new ImageIcon(scaledImage);

        trumpStatusLabel = new JLabel(scaledIcon);
        return trumpStatusLabel;
    }

    public JLabel getTrumpStatus() {
        return trumpStatusLabel;
    }

    public void setTrumpStatus(JLabel trumpStatusLabel) {
        this.trumpStatusLabel = trumpStatusLabel;
    }
}
