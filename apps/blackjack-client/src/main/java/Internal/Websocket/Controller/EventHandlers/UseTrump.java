package Internal.Websocket.Controller.EventHandlers;

import GameContext.GameContext;
import GameContext.TrumpCard.TrumpCardController;
import GameContext.TrumpCard.TrumpCardPOJO;
import Internal.UserInterface.UIController;
import org.json.simple.JSONObject;

public class UseTrump implements WebsocketEventHandler{
    private UIController uiController;

    public UseTrump(UIController uiController) {
        this.uiController = uiController;
    }

    @Override
    public void handler(GameContext ctx, JSONObject body) {
        JSONObject content = (JSONObject) body.get("content");
        String username = (String) content.get("username");
        JSONObject card = (JSONObject) content.get("trumpCard");
        String handler = (String) card.get("handler");
        TrumpCardPOJO trumpCard = TrumpCardController.getCARDS().get(handler);
        ctx.getLogController().addLog(username +  trumpCard.getDisplayName() + "!");
        uiController.update();
    }
}
