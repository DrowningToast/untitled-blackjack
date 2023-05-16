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
        String username = (String) content.get("content");
        TrumpCardPOJO trumpCard = TrumpCardController.getCARDS().get(content.get("trumpCard"));
//        ctx.getLogController().addLog(username + " used " + trumpCard.getDisplayName() + "!");
        uiController.update();
    }
}
