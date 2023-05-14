package GameContext.Player;


import GameContext.Card.CardController;
import GameContext.TrumpCard.TrumpCardController;
import lombok.Getter;
import lombok.Setter;

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
