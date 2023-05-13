package Main;

import Gameplay.Game.GameModel;
import Gameplay.GameContext;
import Gameplay.Player.PlayerModel;
import Internal.Websocket.Controller.EventHandlers.*;
import Internal.Websocket.Controller.WebsocketController;
import Gameplay.Game.GamePOJO;
import UI.Controller.UIController;
import UI.Lobby.LobbyController;
import UI.Login.LoginDisplayGUI;
import Gameplay.Player.PlayerPOJO;
import UI.PH_Gameplay.Display.GamePlayController;
import UI.Waiting.WaitingRoomController;
import UI.Waiting.WaitingRoomGUI;
import jakarta.enterprise.inject.New;
import lombok.Getter;

import java.util.HashMap;

public class MainRunner {

    static WebsocketController wsController;
    static LoginDisplayGUI loginUI;
    static LobbyController lobbyController;
    static WaitingRoomController waitingRoomController;
    static GamePlayController gamePlayController;
    static PlayerPOJO playerPOJO;
    static GamePOJO gameModel;

    static UIController uiController;

    /**
     * GAME CONTEXT
     */
    @Getter
    private static GameContext gameContext;

    public static void main(String[] args) throws Exception {
        java.awt.EventQueue.invokeLater(new Runnable() {

            @Override
            public void run() {
                try {
                    // init game context
                    initGameContext();
                    System.out.println(gameContext.getPlayers()[0].getPlayer());

                    // Init ws event handlers
                    HashMap<String, WebsocketEventHandler> eventHandlers = new HashMap();

                    // init ws controller
                    wsController = new WebsocketController(gameContext, eventHandlers);
                    eventHandlers.put("CONNECTION_SUCCESS", new ConnectionSuccess(wsController));

                    // INIT UI CONTROLLER
                    uiController = new UIController(wsController);

                    // INIT LOBBY CONTROLLER
                    lobbyController = new LobbyController(wsController, uiController);
                    waitingRoomController = new WaitingRoomController(wsController, uiController);
                    gamePlayController = new GamePlayController(uiController);

                    // ADD SCENES
                    uiController.add("lobbyUI", lobbyController.getUI());
                    uiController.add("waitingUI", waitingRoomController.getUi());
                    uiController.add("gameplayUI", gamePlayController.getUi());

                    eventHandlers.put("CONNECTION_AUTHORIZED", new ConnectionAuthorized(uiController));
                    eventHandlers.put("READY_STATE", new ReadyState(uiController));
                    eventHandlers.put("NEW_GAME", new NewGame(uiController));
                    eventHandlers.put("INIT_ROUND", new InitRound(uiController));
                    eventHandlers.put("UPDATE_CARDS", new UpdateCard(uiController));
                    eventHandlers.put("UPDATE_TRUMP_CARDS_STATE", new UpdateTrumpCardsState(uiController));

                } catch (Exception e) {
                    System.out.println(e.toString());
                }
            }
        });
    }

    // INIT GAME CONTEXT
    public static void initGameContext() {
        PlayerModel[] players = {new PlayerModel(), new PlayerModel()};
        GameModel game = new GameModel();

        gameContext = new GameContext(game, players);
    }
}
