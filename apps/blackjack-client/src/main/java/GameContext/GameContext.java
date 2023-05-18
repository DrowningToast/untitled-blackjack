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
    GameModel game;

    @Getter
    @Setter
    PlayerModel[] players;
    @Getter
    @Setter
    SoundController soundController;

    @Getter
    LogController logController;
    public GameContext(GameModel game, PlayerModel[] players, LogController logController,SoundController soundController) {
        this.game = game;
        this.players = players;
        this.logController = logController;
        this.soundController = soundController;
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

    public PlayerModel getAnotherPlayer(String username){
        if (username.equals(players[0].getPOJO().getUsername())){
            return players[1];
        }else if(username.equals(players[1].getPOJO().getUsername())){
            return players[0];
        }else{
            return null;
        }

    }
}
