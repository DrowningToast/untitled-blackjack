package UI.Waiting;

import Internal.Websocket.Controller.WebsocketController;
import Internal.UserInterface.UIController;
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

    public void startGame() {
        // START THE GAME WITH WEBSOCKET CONTROLLER .setReady(true) method
        wsController.setReady(true);
    }
}
