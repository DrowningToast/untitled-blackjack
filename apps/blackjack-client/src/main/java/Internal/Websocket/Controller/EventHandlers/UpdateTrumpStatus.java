package Internal.Websocket.Controller.EventHandlers;

import GameContext.GameContext;
import GameContext.TrumpCard.TrumpCardController;
import GameContext.TrumpCard.TrumpCardPOJO;
import GameContext.TrumpCard.TrumpStatusPOJO;
import Internal.UserInterface.UIController;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import java.util.ArrayList;

public class UpdateTrumpStatus implements WebsocketEventHandler {
    private UIController uiController;

    public UpdateTrumpStatus(UIController uiController) {
        this.uiController = uiController;
    }

    @Override
    public void handler(GameContext ctx, JSONObject body) {
        JSONArray content = (JSONArray) body.get("content");
        JSONObject host = (JSONObject) content.get(0);
        JSONObject guest = (JSONObject) content.get(1);
        String hostUsername = (String) host.get("username");
        String guestUsername = (String) guest.get("username");

        JSONObject hostUser = (JSONObject) host.get("statuses");
        JSONObject guestUser = (JSONObject) guest.get("statuses");
        JSONArray hostStatus = (JSONArray) hostUser.get("trumpStatus");
        JSONArray guestStatus = (JSONArray) guestUser.get("trumpStatus");

        ctx.getPlayer(hostUsername).getPOJO().getTrumpCardController().resetStatus();
        ArrayList<TrumpStatusPOJO> hStatus = new ArrayList<>();
        ArrayList<TrumpStatusPOJO> gStatus = new ArrayList<>();
        for (Object s : hostStatus){
            JSONObject playerStatus = (JSONObject) s;
            TrumpStatusPOJO status = TrumpCardController.getSTATUSES().get(playerStatus.get("trumpStatus"));
            hStatus.add(status);
        }
        for (Object s : guestStatus){
            JSONObject playerStatus = (JSONObject) s;
            TrumpStatusPOJO status = TrumpCardController.getSTATUSES().get(playerStatus.get("trumpStatus"));
            gStatus.add((status));
        }
        ctx.getPlayer(hostUsername).getPOJO().getTrumpCardController().setStatus(hStatus);
        ctx.getPlayer(guestUsername).getPOJO().getTrumpCardController().setStatus(gStatus);

        System.out.println(ctx.getPlayers()[0].getPOJO().getTrumpCardController().getSTATUS());
        System.out.println(ctx.getPlayers()[1].getPOJO().getTrumpCardController().getSTATUS());
        uiController.update();
    }
}
