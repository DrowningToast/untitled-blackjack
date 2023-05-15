package Internal.Websocket.Controller.EventHandlers;

import GameContext.GameContext;
import Internal.UserInterface.UIController;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import javax.swing.*;

public class NextHitTrumpCardEffect implements WebsocketEventHandler{
    private UIController uiController;

    public NextHitTrumpCardEffect(UIController uiController) {
        this.uiController = uiController;
    }

    @Override
    public void handler(GameContext ctx, JSONObject body) {
        JSONArray cards = (JSONArray) body.get("content");
        JOptionPane.showMessageDialog(null, "Next 2 cards from deck + \n 1. "+cards.get(0)+"\n 2. " + cards.get(1), "See the Future !", JOptionPane.INFORMATION_MESSAGE);
        ctx.getLogController().addLog(ctx.getPlayers()[0].getPOJO().getUsername() + " is watching the future!?");
    }
}
