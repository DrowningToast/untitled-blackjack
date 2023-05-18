package UI.Gameplay;

import javax.swing.*;
import java.awt.*;
import java.awt.geom.Line2D;

public class ScoreBarPanel extends JPanel {
    @Override
    public void paintComponents(Graphics g) {
        super.paintComponent(g);
        this.setPreferredSize(new Dimension(200, 200));
        System.out.println("Create Line");
        Graphics2D g2 = (Graphics2D) g;
        g2.setStroke(new BasicStroke(15));
        g2.draw(new Line2D.Float(30, 90, 10, 90));
        System.out.println("Create Line1234");
    }
}
