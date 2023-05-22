package Internal.Websocket.Controller.EventHandlers;

import GameContext.GameContext;
import Internal.UserInterface.UIController;
import org.json.simple.JSONObject;

public class NewGame implements WebsocketEventHandler{

    private UIController uiController;

    public NewGame(UIController uiController){
        this.uiController = uiController;
    }

    @Override
    public void handler(GameContext ctx, JSONObject body) {
        String content = (String) body.get("content");
        ctx.getGame().getPOJO().setGameId(content);
        uiController.switchActiveWindow("gameplayUI");
    }
}
