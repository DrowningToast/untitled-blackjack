package Internal.Websocket.Controller.EventHandlers;

import Gameplay.GameContext;
import org.json.simple.JSONObject;

import java.util.HashMap;

@FunctionalInterface
public interface WebsocketEventHandler {
    void handler(GameContext ctx, JSONObject body);
}
