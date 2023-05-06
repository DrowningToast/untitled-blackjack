import ClientEndPoint.Controller.EventHandlers.ConnectionAuthorized;
import ClientEndPoint.Controller.WebsocketController;
import ClientEndPoint.Controller.EventHandlers.WebsocketEventHandler;
import Game.GameModel;
import UI.Controller.UIController;
import UI.LobbyScene.LobbyDisplayGUI;
import UI.Demo.Display.LoginDisplayGUI;
import Player.PlayerModel;

import java.util.HashMap;

public class InitGame {

    static LoginDisplayGUI loginUI;
    static LobbyDisplayGUI lobbyUI;
    static PlayerModel playerModel;
    static GameModel gameModel;

    public static void main(String[] args) throws Exception {
        java.awt.EventQueue.invokeLater(new Runnable() {
            public void run() {
                try {
                    // Init ws event handlers
                    HashMap<String, WebsocketEventHandler> eventHandlers = new HashMap();

                    // init ws controller
                    WebsocketController wsController = new WebsocketController(eventHandlers);
                    eventHandlers.put("CONNECTION_SUCCESS", new ConnectionAuthorized(wsController));

                    // create player
                    playerModel = new PlayerModel();
                    loginUI = new LoginDisplayGUI(wsController);

                    UIController uiController = new UIController(loginUI);
                    eventHandlers.put("CONNECTION_AUTHORIZED", e -> uiController.switchActiveWindow(lobbyUI));

                    lobbyUI = new LobbyDisplayGUI(wsController, uiController);

                } catch (Exception e) {
                    System.out.println(e.toString());
                }
            }
        });
    }
}
