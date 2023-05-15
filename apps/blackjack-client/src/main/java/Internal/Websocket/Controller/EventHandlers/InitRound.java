package Internal.Websocket.Controller.EventHandlers;

import GameContext.GameContext;
import Internal.UserInterface.UIController;
import org.json.simple.JSONObject;

public class InitRound implements WebsocketEventHandler{
    private UIController uiController;
    public InitRound(UIController uiController){ this.uiController = uiController;}


    @Override
    public void handler(GameContext ctx, JSONObject body) {
        JSONObject content = (JSONObject) body.get("content");

        // create variable
        String gameId = (String) content.get("gameId");
        String gameState = (String) content.get("gameState");
        long roundCounter = (long)  content.get("roundCounter");
        long cardPointTarget = (long) content.get("cardPointTarget");
        JSONObject turnOwner = (JSONObject) content.get("turnOwner");
        String turnOwnerUser = (String) turnOwner.get("username");

        // set value to gameContext
        ctx.getGame().getPOJO().setGameState(gameState);
        ctx.getGame().getPOJO().setRoundCounter(roundCounter);
        ctx.getGame().getPOJO().setCardPointTarget(cardPointTarget);
        ctx.getGame().getPOJO().setTurnOwner(turnOwnerUser);
        // set value to log
        ctx.getLogController().addLog("Game start !");

        uiController.update();
    }
}
