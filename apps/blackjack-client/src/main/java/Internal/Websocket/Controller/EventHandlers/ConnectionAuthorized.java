package Internal.Websocket.Controller.EventHandlers;

import GameContext.GameContext;
import Internal.UserInterface.UIController;
import org.json.simple.JSONObject;

public class ConnectionAuthorized implements WebsocketEventHandler {

    UIController uiController;

    public ConnectionAuthorized(UIController uiController) {
        this.uiController = uiController;
    }

    @Override
    public void handler(GameContext ctx, JSONObject body) {
        JSONObject content = (JSONObject) body.get("content");
        String username = (String) content.get("username");
        // SET USERNAME
        ctx.getPlayers()[0].getPOJO().setUsername(username);
        // GO TO LOBBY WINDOW
        uiController.switchActiveWindow("lobbyUI");
    }
}
