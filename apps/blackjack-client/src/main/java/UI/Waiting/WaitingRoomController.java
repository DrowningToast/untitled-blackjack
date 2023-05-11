package UI.Waiting;

import Internal.Websocket.Controller.WebsocketController;
import UI.Controller.UIController;
import lombok.Getter;

public class WaitingRoomController {
    private UIController uiController;
    private WebsocketController wsController;
    @Getter
    private WaitingRoomGUI ui;

    public WaitingRoomController(WebsocketController wsController, UIController uiController) {
        this.uiController = uiController;
        this.wsController = wsController;
        this.ui = new WaitingRoomGUI(this);
    }
    public void hostSendStart(){
        wsController.setReady(true);
    }
}
