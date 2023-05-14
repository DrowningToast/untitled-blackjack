package Internal.Websocket.Controller.EventHandlers;

import Gameplay.GameContext;
import Gameplay.TrumpCard.TrumpCardController;
import Gameplay.TrumpCard.TrumpCardPOJO;
import UI.Controller.UIController;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import java.util.ArrayList;

public class UpdateTrumpCardsState implements WebsocketEventHandler {
    private UIController uiController;

    public UpdateTrumpCardsState(UIController uiController) {
        this.uiController = uiController;
    }


    @Override
    public void handler(GameContext ctx, JSONObject body) {
        JSONArray content = (JSONArray) body.get("content");
        ArrayList<TrumpCardPOJO> trumpCards = new ArrayList<>();
        for (Object c : content){
            JSONObject cardObject = (JSONObject) c;
            TrumpCardPOJO card = TrumpCardController.getCARDS().get(cardObject.get("handler"));
            trumpCards.add(card);
        }
        ctx.getPlayers()[0].getPlayer().getTrumpCardController().setCards(trumpCards);
//        System.out.println(ctx.getPlayers()[0].getPlayer().getTrumpCardController().getCards());
        uiController.update();
    }
}
