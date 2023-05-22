package Internal.Websocket.Controller.EventHandlers;

import GameContext.GameContext;
import Internal.UserInterface.UIController;
import org.json.simple.JSONObject;

import javax.swing.*;

public class GameStopDueQuitting implements WebsocketEventHandler{
    private UIController uiController;

    public GameStopDueQuitting(UIController uiController) {
        this.uiController = uiController;
    }

    @Override
    public void handler(GameContext ctx, JSONObject body) {
        String username = (String) body.get("content");
        ctx.getLogController().addLog("Player " + username + " has left the game, The game is now safe to leave.");
        JOptionPane.showMessageDialog(null,"Your opponent has quit the game, You win!");
        uiController.update();
        System.exit(0);
    }
}
