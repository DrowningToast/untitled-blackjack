package UI.Controller;

import javax.swing.*;

public class UIController {
    // Attribute ACTIVE WINDOW
    JFrame activeFrame;

    // Methods for switching active windows
    public void switchActiveWindow(JFrame frame) {
        activeFrame.dispose();
        frame.pack();
        frame.setVisible(true);
        frame.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
        activeFrame = frame;
    }

    public UIController(JFrame firstFrame) {
        firstFrame.pack();
        firstFrame.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
        firstFrame.setVisible(true);
        activeFrame = firstFrame;
    }

}
