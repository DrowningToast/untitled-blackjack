package Internal.Websocket.Controller.EventHandlers;

import Gameplay.GameContext;
import Internal.JSON.JSON;
import UI.Controller.UIController;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import java.util.HashMap;

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
        ctx.getPlayers()[0].getPlayer().setUsername(username);
        // GO TO LOBBY WINDOW
        uiController.switchActiveWindow("lobbyUI");
    }
}
