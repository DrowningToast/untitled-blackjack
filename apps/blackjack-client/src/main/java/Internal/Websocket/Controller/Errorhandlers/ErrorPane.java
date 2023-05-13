package Internal.Websocket.Controller.Errorhandlers;

import org.json.simple.JSONObject;

import javax.swing.*;

public class ErrorPane {
    private JOptionPane pane;;
    private JFrame fr;
    public ErrorPane(String error,JSONObject description) {
        System.out.println("create pane");
        fr = new JFrame(error);
        System.out.println(error);
        JOptionPane.showMessageDialog(fr,error);

    }
}
