package UI.PH_Gameplay.Display;

import lombok.Getter;
import lombok.Setter;

import javax.swing.*;
import java.awt.*;

public class DemoDisplay extends JFrame {

    private JPanel mainPanel;


    @Getter
    @Setter
    private JLabel testLabel;

    public void initUI() {
        initUI("Placeholder Text");
    }

    public void initUI(String text) {

        testLabel.setText(text);
        mainPanel.setLayout(new BorderLayout());
        mainPanel.add(testLabel);

        this.add(mainPanel);
        this.setDefaultCloseOperation(EXIT_ON_CLOSE);
        this.pack();
        this.setVisible(true);
    }
}
