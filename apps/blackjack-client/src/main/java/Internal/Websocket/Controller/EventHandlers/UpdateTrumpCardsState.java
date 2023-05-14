package Internal.Websocket.Controller.EventHandlers;

import Gameplay.GameContext;
import Gameplay.TrumpCard.TrumpCardController;
import Gameplay.TrumpCard.TrumpCardPOJO;
import UI.Controller.UIController;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

public class UpdateTrumpCardsState implements WebsocketEventHandler {
    private UIController uiController;

    public UpdateTrumpCardsState(UIController uiController) {
        this.uiController = uiController;
    }


    @Override
    public void handler(GameContext ctx, JSONObject body) {
        JSONArray content = (JSONArray) body.get("content");

        JSONObject firstTrump = (JSONObject) content.get(0);
        JSONObject secondTrump = (JSONObject) content.get(1);
        TrumpCardPOJO firstCard = TrumpCardController.getCARDS().get(firstTrump.get("handler"));
        TrumpCardPOJO secondCard = TrumpCardController.getCARDS().get(secondTrump.get("handler"));
        ctx.getPlayers()[0].getPlayer().getTrumpCardController().addCards(firstCard);
        ctx.getPlayers()[0].getPlayer().getTrumpCardController().addCards(secondCard);
        System.out.println(ctx.getPlayers()[0].getPlayer().getCardController().getCards());

//        uiController.update();
    }
}
