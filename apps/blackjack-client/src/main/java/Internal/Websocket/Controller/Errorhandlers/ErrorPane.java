package Internal.Websocket.Controller.Errorhandlers;

import org.json.simple.JSONObject;

import javax.swing.*;

public class ErrorPane {
    private JOptionPane pane;;
    public ErrorPane(String error,JSONObject description) {
        System.out.println("create pane");
        System.out.println(error);
        JOptionPane.showMessageDialog(null,error,"Error",JOptionPane.ERROR_MESSAGE);

    }
}
