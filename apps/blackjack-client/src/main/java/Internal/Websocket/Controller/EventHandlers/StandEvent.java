package Internal.Websocket.Controller.EventHandlers;

import GameContext.GameContext;
import Internal.UserInterface.UIController;
import org.json.simple.JSONObject;

public class StandEvent implements WebsocketEventHandler {

    private UIController uiController;

    public StandEvent(UIController uiController) {
        this.uiController = uiController;
    }

    @Override
    public void handler(GameContext ctx, JSONObject body) {
        String username = (String) body.get("content");
//        for sending text in chat further more
    }
}
