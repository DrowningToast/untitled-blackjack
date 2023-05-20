package UI.Gameplay;

import javax.swing.*;
import java.awt.*;

public class ScoreBar extends JPanel {
    public ScoreBar(){
        this.setPreferredSize(new Dimension(122, 30));
    }
    @Override
    public void paintComponent(Graphics g) {
        super.paintComponents(g);
        System.out.println("Create Line");
        Graphics2D g2 = (Graphics2D) g;
        g2.setColor(Color.GREEN);
        g2.setStroke(new BasicStroke(30));
        g2.drawLine(0, 0, 100, 0);
        System.out.println("Create Line1234");
    }
}
