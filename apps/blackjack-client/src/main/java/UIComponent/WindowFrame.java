package UIComponent;

import javax.swing.*;

/**
 * This is a main JFrame, do not create other JFrame
 */
public class WindowFrame extends JFrame {

    private JLayeredPane layeredPane = new JLayeredPane();

    public WindowFrame() {

    }

    public void addLayer(JPanel panel, int layer) {
        layeredPane.add(panel, layer);
        updateUI();
    }

    private void updateUI() {
        this.revalidate(); // recalculate the layout of the frame
    }

    public void init() {
        this.setContentPane(layeredPane);
        this.revalidate(); // recalculate the layout of the frame

        this.pack();
        this.setVisible(true);
        this.setDefaultCloseOperation(EXIT_ON_CLOSE);
    }
}
