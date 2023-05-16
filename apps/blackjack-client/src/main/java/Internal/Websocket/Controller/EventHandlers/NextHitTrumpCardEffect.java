package Internal.Websocket.Controller.EventHandlers;

import GameContext.GameContext;
import Internal.UserInterface.UIController;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import javax.swing.*;

public class NextHitTrumpCardEffect implements WebsocketEventHandler {
    private UIController uiController;

    public NextHitTrumpCardEffect(UIController uiController) {
        this.uiController = uiController;
    }

    @Override
    public void handler(GameContext ctx, JSONObject body) {
        JSONArray cards = (JSONArray) body.get("content");
        JSONObject card1 = (JSONObject) cards.get(0);
        JSONObject card2 = (JSONObject) cards.get(1);
        String cardShow1 = (String) card1.get("display");
        String cardShow2 = (String) card2.get("display");
        JOptionPane.showMessageDialog(null, "Next 2 cards from deck is \n 1. Card " + cardShow1 + "\n 2. Card " + cardShow2, "See the Future !", JOptionPane.INFORMATION_MESSAGE);
        ctx.getLogController().addLog(ctx.getPlayers()[0].getPOJO().getUsername() + " is watching the future!?");
    }
}
