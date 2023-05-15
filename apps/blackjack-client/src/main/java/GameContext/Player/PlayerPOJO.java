package GameContext.Player;


import GameContext.Card.CardController;
import GameContext.Card.CardPOJO;
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
    private long gameScore;
    private long cardScore;
    @Getter
    @Setter
    private CardController cardController = new CardController();
    @Getter
    @Setter
    private TrumpCardController trumpCardController = new TrumpCardController();

    public long getCardScore() {
        long total = 0;
        for (CardPOJO card : cardController.getPOJOS()) {
            total += card.getValue()[card.getValue().length-1];
        }
        if (total > 21) {
            total = 0;
            for (CardPOJO card : cardController.getPOJOS()) {
                total += card.getValue()[0];
            }
            return total;
        }
        return total;
    }

    public String getCardDisplayName(){
        String displayName = "";
        for (CardPOJO card : cardController.getPOJOS()) {
            displayName = displayName + card.getDisplayName() + ", ";
        }
        return  displayName;
    }

    public void addGameScore(long score) {
        this.gameScore += score;
    }

    public void addCardScore(long cardScore) {
        this.cardScore += cardScore;
    }
}
