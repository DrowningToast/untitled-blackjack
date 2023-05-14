package GameContext;

import GameContext.Game.GameModel;
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

    public GameContext(GameModel game, PlayerModel[] players) {
        this.game = game;
        this.players = players;
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
