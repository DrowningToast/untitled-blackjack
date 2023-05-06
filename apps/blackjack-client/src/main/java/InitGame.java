import ClientEndPoint.Controller.WebsocketController;
import ClientEndPoint.Controller.WebsocketEventHandler;
import UI.Controller.UIController;
import UI.Demo.Display.LobbyDisplayGUI;
import UI.Demo.Display.LoginDisplayGUI;
import UI.Demo.Model.Player;

import java.util.HashMap;

public class InitGame {

    static LoginDisplayGUI loginUI;
    static LobbyDisplayGUI lobbyUI;
    static Player player;

    public static void main(String[] args) throws Exception {
        java.awt.EventQueue.invokeLater(new Runnable() {
            public void run() {
                try {
                    // Init ws event handlers
                    HashMap<String, WebsocketEventHandler> eventHandlers = new HashMap();
                    eventHandlers.put("CONNECTION_SUCCESS", e -> System.out.println("CONNECTION ESTABLISHED"));

                    // init ws controller
                    WebsocketController wsController = new WebsocketController(eventHandlers);

                    // create player
                    player = new Player();
                    loginUI = new LoginDisplayGUI(wsController);
                    lobbyUI = new LobbyDisplayGUI();

                    UIController uiController = new UIController(loginUI);
                    eventHandlers.put("CONNECTION_AUTHROIZED", e -> uiController.switchActiveWindow(lobbyUI));

//                    wsController.sendAuth("gus");
                } catch (Exception e) {
                    System.out.println(e.toString());
                }

//                Player player1 = new Player();
//                Player player2 = new Player();
//                GameSystem.join(player1);
//                GameSystem.join(player2);
//                GameSystem.setCurrentPlayer(player2);
//                MainController control = new MainController();
//                control.startGame();


//                control.callGame();
//                LoginDisplayGUI loginGui = new LoginDisplayGUI();
//                loginGui.init();
//                    LobbyDisplayGUI lobbyGUI = new LobbyDisplayGUI();
//                    lobbyGUI.init();
//                 GamePlayDisplayGUI gameGui = new GamePlayDisplayGUI();
//                 gameGui.init();
            }
        });
    }
}
