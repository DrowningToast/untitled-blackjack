package Internal.Websocket.Controller.EventHandlers;

import GameContext.GameContext;
import Internal.UserInterface.UIController;
import Main.MainRunner;
import org.json.simple.JSONObject;

import javax.swing.*;

public class GameEnd implements WebsocketEventHandler {
    private UIController uiController;

    public GameEnd(UIController uiController) {
        this.uiController = uiController;
    }

    @Override
    public void handler(GameContext ctx, JSONObject body) {
        ctx.getLogController().addLog("Game ended !");
        uiController.update();
        int result = JOptionPane.showConfirmDialog(null, "Go back to menu?", "Game End", JOptionPane.YES_NO_OPTION);
        if (result == JOptionPane.YES_OPTION) {
            uiController.switchActiveWindow("lobbyUI");
        } else if (result == JOptionPane.NO_OPTION) {
            System.exit(0);
        }
    }
}

