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

        for (Object c : content){
            JSONObject cardObject = (JSONObject) c;
            TrumpCardPOJO card = TrumpCardController.getCARDS().get(cardObject.get("handler"));
            ctx.getPlayers()[0].getPlayer().getTrumpCardController().setCards(card);
        }
//        System.out.println(ctx.getPlayers()[0].getPlayer().getTrumpCardController().getCards());
        uiController.update();
    }
}
