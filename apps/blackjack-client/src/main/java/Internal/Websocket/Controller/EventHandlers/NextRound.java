package Internal.Websocket.Controller.EventHandlers;

import GameContext.GameContext;
import Internal.UserInterface.UIController;
import org.json.simple.JSONObject;

public class NextRound implements WebsocketEventHandler {
    private UIController uiController;

    public NextRound(UIController uiController) {
        this.uiController = uiController;
    }


    @Override
    public void handler(GameContext ctx, JSONObject body) {
        long roundCounter = (long) body.get("content");
        ctx.getGame().getPOJO().setRoundCounter(roundCounter);

        uiController.update();
    }
}
