package Internal.Websocket.Controller.EventHandlers;

import Gameplay.GameContext;
import UI.Controller.UIController;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

public class UpdateTrumpCardsState implements WebsocketEventHandler {
    private UIController uiController;

    public UpdateTrumpCardsState(UIController uiController) {
        this.uiController = uiController;
    }


    @Override
    public void handler(GameContext ctx, JSONObject body) {
        JSONArray content = (JSONArray) body.get("content");

    }
}
