package Internal.Websocket.Controller.Errorhandlers;

import org.json.simple.JSONObject;

import javax.swing.*;

public class ErrorPane {
    private JOptionPane pane;;
    public ErrorPane(String description,JSONObject error) {
        System.out.println("create pane");
        System.out.println(description);
        JOptionPane.showMessageDialog(null,description,"Error",JOptionPane.ERROR_MESSAGE);

    }
}
