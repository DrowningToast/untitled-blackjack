package Gameplay.Game;

import lombok.Getter;
import lombok.Setter;

public class GamePOJO {
    @Getter
    @Setter
    private String gameId, gameState, passcode, turnOwner;

    @Getter
    @Setter
    private long roundCounter, cardPointTarget;
}
