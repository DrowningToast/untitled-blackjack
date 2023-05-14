package Internal.Websocket.Controller.EventHandlers;

import GameContext.GameContext;
import org.json.simple.JSONObject;

@FunctionalInterface
public interface WebsocketEventHandler {
    void handler(GameContext ctx, JSONObject body);
}
