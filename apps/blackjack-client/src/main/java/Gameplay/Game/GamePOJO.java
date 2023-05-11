package Gameplay.Game;

import Gameplay.Player.PlayerPOJO;
import lombok.Getter;
import lombok.Setter;

public class GamePOJO {
    @Getter
    @Setter
    private String gameId, gameState, passcode;

    @Getter
    @Setter
    private int roundCounter, cardPointTarget;

    @Getter
    @Setter
    private PlayerPOJO[] players = {null, null};
}
