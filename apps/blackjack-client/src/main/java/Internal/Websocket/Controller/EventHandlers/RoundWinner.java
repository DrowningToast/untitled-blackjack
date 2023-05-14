package Internal.Websocket.Controller.EventHandlers;

import Gameplay.Card.CardController;
import Gameplay.Card.CardPOJO;
import Gameplay.Game.GamePOJO;
import Gameplay.GameContext;
import Gameplay.Player.PlayerPOJO;
import UI.Controller.UIController;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

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
        ctx.getPlayer(username).getPlayer().addScore(pointsEarned);

        // IGame set value section
        JSONObject game = (JSONObject) content.get("game");
        String gameState = (String) game.get("gameState");
        JSONObject turnOwnerObj = (JSONObject) game.get("turnOwner");
        String turnOwner = (String) turnOwnerObj.get("username");
        long roundCounter = (long) game.get("roundCounter");
        long cardPointTarget = (long) game.get("cardPointTarget");
        ctx.getGame().getGame().setGameState(gameState);
        ctx.getGame().getGame().setRoundCounter(roundCounter);
        ctx.getGame().getGame().setTurnOwner(turnOwner);
        ctx.getGame().getGame().setCardPointTarget(cardPointTarget);

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
            ctx.getPlayer(hostUsername).getPlayer().getCardController().addCards(card);
        }
        for (Object c : guestCards){
            JSONObject cardObject = (JSONObject) c;
            CardPOJO card = CardController.getCARDS().get(cardObject.get("display"));
            ctx.getPlayer(guestUsername).getPlayer().getCardController().addCards(card);
        }
        uiController.update();
    }
}
