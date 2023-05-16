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


        // IGame set value section
        JSONObject game = (JSONObject) content.get("game");
        String gameState = (String) game.get("gameState");
        JSONObject turnOwnerObj = (JSONObject) game.get("turnOwner");
        String turnOwner = (String) turnOwnerObj.get("username");
        long roundCounter = (long) game.get("roundCounter");
        long cardPointTarget = (long) game.get("cardPointTarget");
        CardPOJO cards = CardController.getCARDS().get(game.get("cards"));
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

        // UPDATE PLAYER'S CARD WITHOUT HIDDEN CARD
        ctx.getPlayers()[0].getPOJO().getCardController().resetCards();
        ctx.getPlayers()[1].getPOJO().getCardController().resetCards();
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

        // Winner and Score section
        JSONObject winner = (JSONObject) content.get("winner");
        long pointsEarned = (long) content.get("pointsEarned");
        if (winner != null){
            String username = (String) winner.get("username");
            ctx.getPlayer(username).getPOJO().addGameScore(pointsEarned);
            ctx.getLogController().addLog(username + " won in round " + roundCounter);
            long winnerCardPoint = ctx.getPlayer(username).getPOJO().getCardScore();
            long loserCardPoint = ctx.getAnotherPlayer(username).getPOJO().getCardScore();
            JOptionPane.showMessageDialog(null, username + " won in round " + roundCounter + " with " + winnerCardPoint + " point over " + loserCardPoint + " , Earning "+ pointsEarned +" point(s).", "The Winner", JOptionPane.INFORMATION_MESSAGE);
            ctx.getLogController().addLog(username + " won in round " + roundCounter + " with " + winnerCardPoint + " point over " + loserCardPoint + " , Earning "+ pointsEarned +" point(s).");
        }else{
            //both win
            ctx.getPlayers()[0].getPOJO().addGameScore(pointsEarned);
            ctx.getPlayers()[1].getPOJO().addGameScore(pointsEarned);
            long cardPoint = ctx.getPlayers()[0].getPOJO().getCardScore();
            JOptionPane.showMessageDialog(null, "Both player won in round" + roundCounter + " with " + cardPoint + " , Earning "+ pointsEarned +" point(s).", "The Winner", JOptionPane.INFORMATION_MESSAGE);
            ctx.getLogController().addLog("Both player won in round" + roundCounter + " with " + cardPoint + " , Earning "+ pointsEarned +" point(s).");
        }



        // set attribute point card
        uiController.update();
    }
}
