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
        boolean ready = (boolean)content.get("ready");
        boolean playerOneState = MainRunner.getGameContext().getPlayers()[0].getPlayer().getUsername().equals(username);
        boolean playerTwoState = MainRunner.getGameContext().getPlayers()[1].getPlayer().getUsername().equals(username);
        if (playerOneState) {
            //for guest
            ctx.getPlayers()[0].getPlayer().setReady(ready);
            uiController.update();
            return;
        }else if(playerTwoState){
            //for host
            ctx.getPlayers()[1].getPlayer().setUsername(username);
            ctx.getPlayers()[1].getPlayer().setReady(ready);
            uiController.update();
        }


    }
}
