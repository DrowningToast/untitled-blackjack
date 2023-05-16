package Internal.Websocket.Controller.EventHandlers;

import GameContext.Card.CardController;
import GameContext.GameContext;
import GameContext.Log.LogController;
import GameContext.TrumpCard.TrumpCardController;
import GameContext.TrumpCard.TrumpCardPOJO;
import Internal.UserInterface.UIController;
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
        ctx.getPlayers()[0].getPOJO().getTrumpCardController().setPOJOS(trumpCards);
        ctx.getLogController().addLog(ctx.getPlayers()[0].getPOJO().getUsername()+"'s trumpCards has been updated.");
        uiController.update();
    }
}
