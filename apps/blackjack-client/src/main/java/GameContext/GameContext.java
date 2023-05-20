package GameContext;

import GameContext.Game.GameModel;
import GameContext.Log.LogController;
import GameContext.Player.PlayerModel;
import GameContext.Sounds.SoundController;
import lombok.Getter;
import lombok.Setter;

public class GameContext {
    @Getter
    @Setter
    private GameModel game;

    @Getter
    @Setter
    private PlayerModel[] players;
    @Getter
    @Setter
    private SoundController soundController;

    @Getter
    private LogController logController;

    private static GameContext instance;

    private GameContext(GameModel game, PlayerModel[] players, LogController logController, SoundController soundController) {
        this.game = game;
        this.players = players;
        this.logController = logController;
        this.soundController = soundController;
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
