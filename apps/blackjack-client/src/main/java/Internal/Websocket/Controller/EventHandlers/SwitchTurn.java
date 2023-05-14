package Internal.Websocket.Controller.EventHandlers;

import Gameplay.GameContext;
import UI.Controller.UIController;
import org.json.simple.JSONObject;

public class SwitchTurn implements WebsocketEventHandler {
    private UIController uiController;

    public SwitchTurn(UIController uiController) {
        this.uiController = uiController;
    }


    @Override
    public void handler(GameContext ctx, JSONObject body) {
        String username = (String) body.get("content");
        ctx.getGame().getGame().setTurnOwner(username);

        uiController.update();
    }
}
