package Internal.Websocket.Controller.EventHandlers;

import GameContext.GameContext;
import Internal.UserInterface.UIController;
import org.json.simple.JSONObject;

public class StandEvent implements WebsocketEventHandler {


    @Override
    public void handler(GameContext ctx, JSONObject body) {
        String username = (String) body.get("content");
        ctx.getLogController().addLog(ctx.getPlayer(username).getPOJO().getUsername() + " used stand.");
    }
}
