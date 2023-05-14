package UI.PH_Gameplay.Display;


import Internal.Websocket.Controller.WebsocketController;
import UI.Controller.UIController;
import jakarta.websocket.DeploymentException;
import lombok.Getter;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.HashMap;


public class GamePlayController {
    private WebsocketController wsController;
    private UIController uiController;
    @Getter
    private GamePlayDisplayGUI ui;

    public GamePlayController(UIController uiController, WebsocketController wsController) {
        this.wsController = wsController;
        this.uiController = uiController;
        ui = new GamePlayDisplayGUI(this, wsController);
//        this.client = wsController;

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
