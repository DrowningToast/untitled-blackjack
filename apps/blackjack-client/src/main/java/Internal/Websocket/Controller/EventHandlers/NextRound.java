package Internal.Websocket.Controller.EventHandlers;

import Gameplay.GameContext;
import UI.Controller.UIController;
import org.json.simple.JSONObject;

public class NextRound implements WebsocketEventHandler {
    private UIController uiController;

    public NextRound(UIController uiController) {
        this.uiController = uiController;
    }


    @Override
    public void handler(GameContext ctx, JSONObject body) {
        long roundCounter = (long) body.get("content");
        ctx.getGame().getGame().setRoundCounter(roundCounter);
    }
}
