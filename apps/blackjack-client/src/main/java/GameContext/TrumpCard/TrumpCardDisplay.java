package GameContext.TrumpCard;

import GameContext.Card.CardPOJO;

import javax.swing.*;
import java.awt.*;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import GameContext.GameContext;
import GameContext.Sounds.SoundController;
import Internal.Websocket.Controller.WebsocketController;

public class TrumpCardDisplay {

    private JLabel tCardLabel;
    private  WebsocketController webController;

    private SoundController soundController = new SoundController();

    public TrumpCardDisplay(WebsocketController webController) {
        this.webController = webController;
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

                System.out.println("trump clicked");
                super.mouseClicked(e);
                soundController.playSound("drawTrumpCard");
                webController.trumpUse(tCard.getHandler());
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
