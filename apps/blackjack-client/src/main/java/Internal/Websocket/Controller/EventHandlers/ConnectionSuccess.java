package Internal.Websocket.Controller.EventHandlers;

import Gameplay.GameContext;
import Internal.Websocket.Controller.WebsocketController;
import org.json.simple.JSONObject;

import java.util.HashMap;

public class ConnectionSuccess implements WebsocketEventHandler {

    private WebsocketController controller;

    public ConnectionSuccess(WebsocketController controller) {
        this.controller = controller;
    }

    @Override
    public void handler(GameContext ctx, JSONObject body) {
        System.out.println("Login success");
        ctx.getPlayers()[0].getPlayer().setConnectionId((String) body.get("content"));
    }

}
