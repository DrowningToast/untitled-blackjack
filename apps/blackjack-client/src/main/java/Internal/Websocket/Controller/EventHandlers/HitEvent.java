package Internal.Websocket.Controller.EventHandlers;

import Gameplay.Card.CardController;
import Gameplay.Card.CardPOJO;
import Gameplay.GameContext;
import UI.Controller.UIController;
import org.json.simple.JSONObject;

public class HitEvent implements WebsocketEventHandler {

    private UIController uiController;

    public HitEvent(UIController uiController) {
        this.uiController = uiController;
    }

    @Override
    public void handler(GameContext ctx, JSONObject body) {
        JSONObject content = (JSONObject) body.get("content");
        String username = (String) content.get("username");
        JSONObject c = (JSONObject) content.get("card");
        if(c == null){
            System.out.println("Deck is empty");
            return ;
        }
        CardPOJO card = CardController.getCARDS().get(c.get("display"));
        ctx.getPlayer(username).getPlayer().getCardController().addCards(card);
        uiController.update();
    }
}
