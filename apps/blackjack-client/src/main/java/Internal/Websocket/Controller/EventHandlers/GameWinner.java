package Internal.Websocket.Controller.EventHandlers;

import GameContext.GameContext;
import Internal.UserInterface.UIController;
import org.json.simple.JSONObject;

public class GameWinner implements WebsocketEventHandler{
    private UIController uiController;

    public GameWinner(UIController uiController) {
        this.uiController = uiController;
    }

    @Override
    public void handler(GameContext ctx, JSONObject body) {
        // send winner and IGame
        JSONObject content = (JSONObject) body.get("content");
        JSONObject winner = (JSONObject) content.get("winner");
        if (winner != null) {
            String username = (String) winner.get("username");
            ctx.getLogController().addLog(username + " has won the game !");
        }else{
            String myName = ctx.getPlayers()[0].getPOJO().getUsername();
            String opponentName = ctx.getPlayers()[1].getPOJO().getUsername();
            ctx.getLogController().addLog(myName + " and " + opponentName + "both won the game !");
        }
        uiController.update();
        //Guss won in round 1 with 19 points over 16. Earning 1 point(s).
    }
}
