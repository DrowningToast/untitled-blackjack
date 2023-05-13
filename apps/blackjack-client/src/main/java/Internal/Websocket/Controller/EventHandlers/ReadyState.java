package Internal.Websocket.Controller.EventHandlers;

import Gameplay.GameContext;
import Main.MainRunner;
import UI.Controller.UIController;
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
        boolean myMsg = MainRunner.getGameContext().getPlayers()[0].getPlayer().getUsername().equals(username);
        if (myMsg) {
            //for guest
            ctx.getPlayers()[0].getPlayer().setReady(ready);
            uiController.update();
            return;
        } else {
            //for host
            ctx.getPlayers()[1].getPlayer().setUsername(username);
            ctx.getPlayers()[1].getPlayer().setReady(ready);
            uiController.update();
        }


    }
}
