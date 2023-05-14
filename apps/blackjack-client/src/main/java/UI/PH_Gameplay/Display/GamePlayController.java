package UI.PH_Gameplay.Display;

import Internal.Websocket.Controller.WebsocketController;
import Main.MainRunner;
import UI.Controller.UIController;
import lombok.Getter;


public class GamePlayController {
    private WebsocketController wsController;
    private UIController uiController;
    @Getter
    private GamePlayDisplayGUI ui = new GamePlayDisplayGUI(this, wsController);

    public GamePlayController(UIController uiController, WebsocketController wsController) {
        this.wsController = wsController;
        this.uiController = uiController;
    }
    //    update status Button
    public void updateStatusButton(){

        if (MainRunner.getGameContext().getPlayers()[1].getPlayer().getUsername().equals(MainRunner.getGameContext().getGame().getGame().getTurnOwner())) {
            ui.getHitButtonPlayerOne().setEnabled(false);
            ui.getStandButtonPlayerOne().setEnabled(false);
        } else if (MainRunner.getGameContext().getPlayers()[0].getPlayer().getUsername().equals(MainRunner.getGameContext().getGame().getGame().getTurnOwner())){
            ui.getHitButtonPlayerOne().setEnabled(true);
            ui.getStandButtonPlayerOne().setEnabled(true);
        }

    }

//    public void actionHit() throws IOException {
//        MessageBuilder message = new MessageBuilder(client);
//        HashMap content = new HashMap();
//        content.put("handler", "hit");
//        message.setContent(content).send();
//        System.out.println(content);
//    }
//
//    public void actionStand() throws IOException {
//        MessageBuilder message = new MessageBuilder(client);
//        HashMap content = new HashMap();
//        content.put("handler", "stand");
//        message.setContent(content).send();
//        System.out.println(content);
//    }
}
