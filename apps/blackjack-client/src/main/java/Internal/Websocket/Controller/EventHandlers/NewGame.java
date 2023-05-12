package Internal.Websocket.Controller.EventHandlers;

import Gameplay.GameContext;
import UI.Controller.UIController;
import org.json.simple.JSONObject;

public class NewGame implements WebsocketEventHandler{

    private UIController uiController;

    public NewGame(UIController uiController){
        this.uiController = uiController;
    }

    @Override
    public void handler(GameContext ctx, JSONObject body) {
        JSONObject content = (JSONObject) body.get("content");
        String gameId = (String) content.get("gameId");
        // GO TO LOBBY WINDOW
        // ready message is from the players[0]
        // check getPLayer[1] is ready
        uiController.switchActiveWindow("gameplayUI");
    }
}
