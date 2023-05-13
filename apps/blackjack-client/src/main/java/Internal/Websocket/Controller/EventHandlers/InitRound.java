package Internal.Websocket.Controller.EventHandlers;

import Gameplay.GameContext;
import UI.Controller.UIController;
import org.json.simple.JSONObject;

public class InitRound implements WebsocketEventHandler{
    private UIController uiController;
    public InitRound(UIController uiController){ this.uiController = uiController;}


    @Override
    public void handler(GameContext ctx, JSONObject body) {
        JSONObject content = (JSONObject) body.get("content");

        // create variable
        String gameState = (String) content.get("gameState");
        long roundCounter = (long)  content.get("roundCounter");
        long cardPointTarget = (long) content.get("cardPointTarget");

        // set value to game model
        ctx.getGame().getGame().setGameState(gameState);
        ctx.getGame().getGame().setRoundCounter(roundCounter);
        ctx.getGame().getGame().setCardPointTarget(cardPointTarget);
    }
}
