package GameContext;

import GameContext.Game.GameModel;
import GameContext.Log.LogController;
import GameContext.Player.PlayerModel;
import lombok.Getter;
import lombok.Setter;

public class GameContext {
    @Getter
    @Setter
    GameModel game;

    @Getter
    @Setter
    PlayerModel[] players;

    @Getter
    LogController logController;
    public GameContext(GameModel game, PlayerModel[] players, LogController logController) {
        this.game = game;
        this.players = players;
        this.logController = logController;
    }
    public PlayerModel getPlayer(String username){
        if (username.equals(players[0].getPOJO().getUsername())){
            return players[0];
        }else if(username.equals(players[1].getPOJO().getUsername())){
            return players[1];
        }else{
            return null;
        }

    }
}
