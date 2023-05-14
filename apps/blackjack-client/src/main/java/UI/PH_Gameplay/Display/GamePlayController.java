package UI.PH_Gameplay.Display;

import Internal.Websocket.Controller.WebsocketController;
import UI.Controller.UIController;
import lombok.Getter;

public class GamePlayController {
    private WebsocketController wsController;
    private UIController uiController;
    @Getter
    private GamePlayDisplayGUI ui;

    public GamePlayController(UIController uiController, WebsocketController wsController) {
        this.wsController = wsController;
        this.uiController = uiController;
        ui = new GamePlayDisplayGUI(this, wsController);
    }

}
