package Internal.Websocket.Controller.EventHandlers;

import GameContext.GameContext;
import Internal.UserInterface.UIController;
import org.json.simple.JSONObject;

public class UpdatePointTarget implements WebsocketEventHandler{
    private UIController uiController;

    public UpdatePointTarget(UIController uiController) {
        this.uiController = uiController;
    }

    @Override
    public void handler(GameContext ctx, JSONObject body) {
        long pointTarget = (long) body.get("content");
        ctx.getGame().getPOJO().setCardPointTarget(pointTarget);
        ctx.getLogController().addLog("Card point target has changed from 21 to 25.");
        uiController.update();
    }
}
