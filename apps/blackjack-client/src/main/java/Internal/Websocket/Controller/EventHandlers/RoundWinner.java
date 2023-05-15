package Internal.Websocket.Controller.EventHandlers;

import GameContext.Card.CardController;
import GameContext.Card.CardPOJO;
import GameContext.GameContext;
import Internal.UserInterface.UIController;
import Main.MainRunner;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import javax.swing.JOptionPane;

public class RoundWinner implements WebsocketEventHandler {
    private UIController uiController;
    public RoundWinner(UIController uiController) {
        this.uiController = uiController;
    }


    @Override
    public void handler(GameContext ctx, JSONObject body) {
        JSONObject content = (JSONObject) body.get("content");
        System.out.println(content.get("cards"));
        // set score section
        JSONObject winner = (JSONObject) content.get("winner");
        String username = (String) winner.get("username");
        long pointsEarned = (long) content.get("pointsEarned");
        ctx.getPlayer(username).getPOJO().addGameScore(pointsEarned);

        // IGame set value section
        JSONObject game = (JSONObject) content.get("game");
        String gameState = (String) game.get("gameState");
        JSONObject turnOwnerObj = (JSONObject) game.get("turnOwner");
        String turnOwner = (String) turnOwnerObj.get("username");
        long roundCounter = (long) game.get("roundCounter");
        long cardPointTarget = (long) game.get("cardPointTarget");
        ctx.getGame().getPOJO().setGameState(gameState);
        ctx.getGame().getPOJO().setRoundCounter(roundCounter);
        ctx.getGame().getPOJO().setTurnOwner(turnOwner);
        ctx.getGame().getPOJO().setCardPointTarget(cardPointTarget);

        // Card section
        JSONArray globalCards = (JSONArray) content.get("cards");
        JSONObject host = (JSONObject) globalCards.get(0);
        JSONObject guest = (JSONObject) globalCards.get(1);
        String hostUsername = (String) host.get("username");
        String guestUsername = (String) guest.get("username");
        JSONArray hostCards = (JSONArray) host.get("cards");
        JSONArray guestCards = (JSONArray) guest.get("cards");

        for (Object c : hostCards){
            JSONObject cardObject = (JSONObject) c;
            CardPOJO card = CardController.getCARDS().get(cardObject.get("display"));
            ctx.getPlayer(hostUsername).getPOJO().getCardController().addCards(card);
        }
        for (Object c : guestCards){
            JSONObject cardObject = (JSONObject) c;
            CardPOJO card = CardController.getCARDS().get(cardObject.get("display"));
            ctx.getPlayer(guestUsername).getPOJO().getCardController().addCards(card);
        }
        // wait for namkhing player's
        ctx.getLogController().addLog(username + " won in round " + roundCounter);
        System.out.println("THIS IS LOG : " + ctx.getLogController().getLog());
        uiController.update();
//        set adttribute point card
        long winnerCardPoint = MainRunner.getGameContext().getPlayer(username).getPOJO().getCardScore();
        long loserCardPoint = MainRunner.getGameContext().getAnotherPlayer(username).getPOJO().getCardScore();
        JOptionPane.showMessageDialog(null, username + " won in round " + roundCounter + " with " + winnerCardPoint + " point over " + loserCardPoint + " , Earning "+ pointsEarned +" point(s).", "The Winner", JOptionPane.INFORMATION_MESSAGE);
    }
}
