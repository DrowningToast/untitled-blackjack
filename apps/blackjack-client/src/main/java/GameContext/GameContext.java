package GameContext;

import GameContext.Game.GameModel;
import GameContext.Log.LogController;
import GameContext.Player.PlayerModel;
import GameContext.Sounds.SoundController;
import Internal.UserInterface.UIController;
import Internal.Websocket.Controller.Errorhandlers.ExistedUser;
import Internal.Websocket.Controller.Errorhandlers.WebsocketErrorHandler;
import Internal.Websocket.Controller.EventHandlers.*;
import Internal.Websocket.Controller.WebsocketController;
import UI.Gameplay.GameplayController;
import UI.Lobby.LobbyController;
import UI.Waiting.WaitingRoomController;
import jakarta.websocket.DeploymentException;
import lombok.Getter;
import lombok.Setter;

import javax.swing.*;
import java.util.HashMap;

public class GameContext {
    @Getter
    @Setter
    private GameModel game;

    @Getter
    @Setter
    private PlayerModel[] players;

    // Player's System related controllers
    @Getter
    @Setter
    private SoundController soundController;
    @Getter
    private LogController logController;

    // System Controllers
    @Getter
    private WebsocketController wsController;
    @Getter
    private LobbyController lobbyController;
    @Getter
    private WaitingRoomController waitingRoomController;
    @Getter
    private GameplayController gamePlayController;
    @Getter
    private UIController uiController;

    private static GameContext instance;

    private GameContext(GameModel game, PlayerModel[] players, LogController logController, SoundController soundController) {
        this.game = game;
        this.players = players;
        this.logController = logController;
        this.soundController = soundController;
        initControllers();
    }

    private void initControllers() {

        GameContext ctx = this;

        // Init controllers on a seperate thread
        java.awt.EventQueue.invokeLater(new Runnable() {
            @Override
            public void run() {
                try {
                    // Init ws event handlers and error handlers
                    HashMap<String, WebsocketEventHandler> eventHandlers = new HashMap();
                    HashMap<String, WebsocketErrorHandler> errorHandlers = new HashMap();

                    // init ws controller
                    wsController = new WebsocketController(ctx, eventHandlers, errorHandlers);

                    // INIT UI CONTROLLER
                    uiController = new UIController(wsController);

                    // INIT LOBBY CONTROLLER
                    lobbyController = new LobbyController(wsController, uiController);
                    waitingRoomController = new WaitingRoomController(wsController, uiController);
                    gamePlayController = new GameplayController(uiController, wsController);

                    // ADD SCENES
                    uiController.add("lobbyUI", lobbyController.getUI());
                    uiController.add("waitingUI", waitingRoomController.getUi());
                    uiController.add("gameplayUI", gamePlayController.getUi());

                    // ADD ALL WEBSOCKET RESPONSES
                    eventHandlers.put("CONNECTION_SUCCESS", new ConnectionSuccess(wsController));
                    eventHandlers.put("CONNECTION_AUTHORIZED", new ConnectionAuthorized(uiController));
                    eventHandlers.put("READY_STATE", new ReadyState(uiController));
                    eventHandlers.put("NEW_GAME", new NewGame(uiController));
                    eventHandlers.put("INIT_ROUND", new InitRound(uiController));
                    eventHandlers.put("UPDATE_CARDS", new UpdateCard(uiController));
                    eventHandlers.put("UPDATE_TRUMP_CARDS_STATE", new UpdateTrumpCardsState(uiController));
                    eventHandlers.put("UPDATE_TRUMP_STATUS", new UpdateTrumpStatus(uiController));
                    eventHandlers.put("HIT_EVENT", new HitEvent(uiController));
                    eventHandlers.put("STAND_EVENT", new StandEvent());
                    eventHandlers.put("USE_TRUMP", new UseTrump(uiController));
                    eventHandlers.put("SWITCH_TURN", new SwitchTurn(uiController));
                    eventHandlers.put("ROUND_WINNER", new RoundWinner(uiController));
                    eventHandlers.put("NEXT_ROUND", new NextRound(uiController));
                    eventHandlers.put("GAME_WINNER", new GameWinner(uiController));
                    eventHandlers.put("GAME_END", new GameEnd(uiController));
                    eventHandlers.put("UPDATE_POINT_TARGET", new UpdatePointTarget(uiController));
                    eventHandlers.put("NEXT_HIT_CARD_TRUMP_EFFECT", new NextHitTrumpCardEffect(uiController));
                    eventHandlers.put("GAME_STOP_DUE_QUITTING", new GameStopDueQuitting(uiController));

                    errorHandlers.put("existed-user", new ExistedUser());
                    errorHandlers.put("trump-use-denied", new ExistedUser());
                    errorHandlers.put("opponent-invincibility", new ExistedUser());

                } catch (DeploymentException e) {
                    if (e.getMessage().contains("Handshake error")) {
                        System.out.println("Handshake error occurred: " + e.getMessage());
                        JOptionPane.showMessageDialog(null, "Program closed due to \"HandShake error\". Please rerun the program.", "HandShake err.", JOptionPane.INFORMATION_MESSAGE);
                        System.exit(0);
                    } else {
                        e.printStackTrace();
                    }
                } catch (Exception e) {
                    System.out.println(e.toString());
                }
            }
        });
    }

    public static GameContext getInstance() {
        if (instance == null) {
            PlayerModel[] players = {new PlayerModel(), new PlayerModel()};
            GameModel game = new GameModel();
            LogController log = new LogController();
            SoundController soundController = new SoundController();
            instance = new GameContext(game, players, log, soundController);
        }
        return instance;
    }

    public PlayerModel getPlayer(String username) {
        if (username.equals(players[0].getPOJO().getUsername())) {
            return players[0];
        } else if (username.equals(players[1].getPOJO().getUsername())) {
            return players[1];
        } else {
            return null;
        }
    }

    public PlayerModel getAnotherPlayer(String username) {
        if (username.equals(players[0].getPOJO().getUsername())) {
            return players[1];
        } else if (username.equals(players[1].getPOJO().getUsername())) {
            return players[0];
        } else {
            return null;
        }
    }
}
