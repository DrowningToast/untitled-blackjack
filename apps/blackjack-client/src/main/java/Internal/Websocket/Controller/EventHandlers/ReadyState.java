package Internal.Websocket.Controller.EventHandlers;

import GameContext.GameContext;
import Main.MainRunner;
import Internal.UserInterface.UIController;
import org.json.simple.JSONObject;

public class ReadyState implements WebsocketEventHandler {

    private UIController uiController;

    public ReadyState(UIController uiController) {
        this.uiController = uiController;
    }

    @Override
    public void handler(GameContext ctx, JSONObject body) {
        JSONObject content = (JSONObject) body.get("content");
        String username = (String) content.get("username");
        boolean ready = (boolean) content.get("ready");
        boolean myMsg = MainRunner.getGameContext().getPlayers()[0].getPOJO().getUsername().equals(username);
        if (myMsg) {
            //for guest
            ctx.getPlayers()[0].getPOJO().setReady(ready);
            uiController.update();
        } else {
            //for host
            ctx.getPlayers()[1].getPOJO().setUsername(username);
            ctx.getPlayers()[1].getPOJO().setReady(ready);
            uiController.update();
        }


    }
}
