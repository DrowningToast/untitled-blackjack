package GameContext.TrumpCard;

import javax.swing.*;
import java.awt.*;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import Internal.Websocket.Controller.WebsocketController;
import Main.MainRunner;

public class TrumpCardDisplay {

    private JLabel tCardLabel;
    private  WebsocketController wsController;

    public TrumpCardDisplay(WebsocketController wsController) {
        this.wsController = wsController;
    }

    public JLabel showTrumpCard(TrumpCardPOJO tCard) {
        Image image = tCard.getImage().getImage();//It's ImageIcon icon = randomCard.getImage(); and Image = icon.getImage(); combine together :)
        Image scaledImage = image.getScaledInstance(50, 50, Image.SCALE_SMOOTH);
        ImageIcon scaledIcon = new ImageIcon(scaledImage);
        tCardLabel = new JLabel(scaledIcon);
        tCardLabel.setToolTipText(tCard.getDescription());
        tCardLabel.addMouseListener(new MouseAdapter() {
            @Override
            public void mouseClicked(MouseEvent e) {
                super.mouseClicked(e);
                wsController.useTrump(tCard.getHandler());
            }
        });
        return tCardLabel;
    }

    public JLabel getTrumpCard() {
        return tCardLabel;
    }

    public void setTrumpCard(JLabel cardLabel) {
        this.tCardLabel = cardLabel;
    }
}
