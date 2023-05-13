import ClientEndPoint.Controller.EventHandlers.ConnectionAuthorized;
import ClientEndPoint.Controller.WebsocketController;
import ClientEndPoint.Controller.EventHandlers.WebsocketEventHandler;
import Game.GameModel;
import UI.Controller.UIController;
import UI.LobbyScene.LobbyDisplayGUI;
import UI.Demo.Display.LoginDisplayGUI;
import Player.PlayerModel;

import java.util.HashMap;

public class InitGame implements Runnable {

    static WebsocketController wsController;
    static LoginDisplayGUI loginUI;
    static LobbyDisplayGUI lobbyUI;
    static PlayerModel playerModel;
    static GameModel gameModel;

    static UIController uiController = new UIController(wsController);

    public static void main(String[] args) throws Exception {
        java.awt.EventQueue.invokeLater(new Runnable() {

            @Override
            public void run() {
                try {
                    // Init ws event handlers
                    HashMap<String, WebsocketEventHandler> eventHandlers = new HashMap();

                    // init ws controller
                    wsController = new WebsocketController(eventHandlers);
                    eventHandlers.put("CONNECTION_SUCCESS", new ConnectionAuthorized(wsController));

                    // ADD SCENES
                    lobbyUI = new LobbyDisplayGUI(wsController, uiController);
                    uiController.add(lobbyUI);

                    // create player
                    playerModel = new PlayerModel();

                    eventHandlers.put("CONNECTION_AUTHORIZED", e -> uiController.switchActiveWindow(lobbyUI));

                } catch (Exception e) {
                    System.out.println(e.toString());
                }
            }
        });
    }

    @Override
    public void run() {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from
        // nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }
}
