package Main;

import GameContext.Game.GameModel;
import GameContext.GameContext;
import GameContext.Log.LogController;
import GameContext.Player.PlayerModel;
import GameContext.Sounds.SoundController;
import GameContext.Sounds.SoundPOJO;
import Internal.Websocket.Controller.Errorhandlers.*;
import Internal.Websocket.Controller.EventHandlers.*;
import Internal.Websocket.Controller.WebsocketController;
import GameContext.Game.GamePOJO;
import Internal.UserInterface.UIController;
import UI.Lobby.LobbyController;
import UI.Login.LoginDisplayGUI;
import GameContext.Player.PlayerPOJO;
import UI.Gameplay.GameplayController;
import UI.Waiting.WaitingRoomController;
import lombok.Getter;

import java.util.HashMap;

public class MainRunner {

    static WebsocketController wsController;
    static LobbyController lobbyController;
    static WaitingRoomController waitingRoomController;
    @Getter
    static GameplayController gamePlayController;
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
                    System.out.println(gameContext.getPlayers()[0].getPOJO());

                    // Init ws event handlers and error handlers
                    HashMap<String, WebsocketEventHandler> eventHandlers = new HashMap();
                    HashMap<String, WebsocketErrorHandler> errorHandlers = new HashMap();

                    // init ws controller
                    wsController = new WebsocketController(gameContext, eventHandlers, errorHandlers);

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

                    gameContext.getSoundController().playSound("backgroundCasinoSound");


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
        LogController log = new LogController();
        SoundController soundController = new SoundController();

        gameContext = new GameContext(game, players, log, soundController);
    }
}
