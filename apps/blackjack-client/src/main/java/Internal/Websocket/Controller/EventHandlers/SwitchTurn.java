package Internal.Websocket.Controller.EventHandlers;

import GameContext.GameContext;
import Internal.UserInterface.UIController;
import org.json.simple.JSONObject;

public class SwitchTurn implements WebsocketEventHandler {
    private UIController uiController;

    public SwitchTurn(UIController uiController) {
        this.uiController = uiController;
    }


    @Override
    public void handler(GameContext ctx, JSONObject body) {
        String username = (String) body.get("content");
        ctx.getGame().getPOJO().setTurnOwner(username);

        uiController.update();
    }
}
