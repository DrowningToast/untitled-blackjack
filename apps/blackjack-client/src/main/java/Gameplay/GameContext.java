package Gameplay;

import Gameplay.Game.GameModel;
import Gameplay.Player.PlayerModel;
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
}
