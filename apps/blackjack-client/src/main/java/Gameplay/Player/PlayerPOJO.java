package Gameplay.Player;


import Gameplay.Card.CardController;
import Gameplay.Card.CardPOJO;
import Gameplay.TrumpCard.TrumpCardController;
import Gameplay.TrumpCard.TrumpCardPOJO;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

public class PlayerPOJO {
    @Getter
    @Setter
    private String username, connectionId;
    @Getter
    @Setter
    private boolean stand = true, ready;
    @Getter
    @Setter
    private long score;
    @Getter
    @Setter
    private CardController cardController = new CardController();
    @Getter
    @Setter
    private TrumpCardController trumpCardController = new TrumpCardController();

    public void addScore(long score){
        this.score += score;
    }
}
