package Internal.Websocket.Controller.Errorhandlers;

import org.json.simple.JSONObject;

import javax.swing.*;

public class ErrorPane {
    public ErrorPane(String description,JSONObject error) {
        JOptionPane.showMessageDialog(null,description,"Error",JOptionPane.ERROR_MESSAGE);
    }
}
