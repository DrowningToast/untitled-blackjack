package Internal.Websocket.Controller.EventHandlers;

import GameContext.GameContext;
import GameContext.TrumpCard.TrumpCardController;
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

        JSONArray hostStatus = (JSONArray) host.get("statuses");
        JSONArray guestStatus = (JSONArray) guest.get("statuses");
        ctx.getPlayer(hostUsername).getPOJO().getTrumpCardController().resetStatus();
        ArrayList<TrumpStatusPOJO> hStatus = new ArrayList<>();
        ArrayList<TrumpStatusPOJO> gStatus = new ArrayList<>();
        for (Object s : hostStatus){
            String playerStatus = (String) s;
            if(playerStatus != null){ctx.getLogController().addLog(hostUsername + " has " + playerStatus + " status");}
            TrumpStatusPOJO status = TrumpCardController.getSTATUSES().get(playerStatus);
            hStatus.add(status);
        }
        for (Object s : guestStatus){
            String playerStatus = (String) s;
            if(playerStatus != null){ctx.getLogController().addLog(guestUsername + " has " + playerStatus + " status");}
            TrumpStatusPOJO status = TrumpCardController.getSTATUSES().get(playerStatus);
            gStatus.add(status);
        }

        ctx.getPlayer(hostUsername).getPOJO().getTrumpCardController().setStatus(hStatus);
        ctx.getPlayer(guestUsername).getPOJO().getTrumpCardController().setStatus(gStatus);
        uiController.update();
    }
}
