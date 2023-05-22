package Internal.Websocket.Controller.EventHandlers;

import GameContext.GameContext;
import Internal.UserInterface.UIController;
import org.json.simple.JSONObject;

public class GameEnd implements WebsocketEventHandler{
    private UIController uiController;

    public GameEnd(UIController uiController) {
        this.uiController = uiController;
    }

    @Override
    public void handler(GameContext ctx, JSONObject body) {
        ctx.getLogController().addLog("Game ended !");
        uiController.update();
        System.exit(0);
    }
}
