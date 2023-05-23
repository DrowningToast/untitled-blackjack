package UI.Gameplay;

import GameContext.Player.PlayerPOJO;
import GameContext.GameContext;
import javax.swing.*;
import java.awt.*;

public class ScoreBar extends JPanel {
    private PlayerPOJO player;
    public ScoreBar(PlayerPOJO player){
        this.player = player;
        this.setPreferredSize(new Dimension(122, 30));
    }
    @Override
    public void paintComponent(Graphics g) {
        super.paintComponents(g);
        Graphics2D g2 = (Graphics2D) g;
        int x_2 = (int) (player.getCardScore()*4.5);
        if (!player.checkCardLimit()){
            g2.setColor(Color.GREEN);
            if(GameContext.getInstance().getGame().getPOJO().getCardPointTarget() == player.getCardScore()){
                x_2 = 120;
            }
        }
        else {
            g2.setColor(Color.RED);
            x_2 = 150;
        }
        g2.setStroke(new BasicStroke(40));
        g2.drawLine(0, 0, x_2, 0);
    }
}
