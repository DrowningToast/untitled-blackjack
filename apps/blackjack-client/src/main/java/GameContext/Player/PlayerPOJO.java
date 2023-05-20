package GameContext.Player;


import GameContext.Card.CardController;
import GameContext.Card.CardPOJO;
import GameContext.GameContext;
import GameContext.TrumpCard.TrumpCardController;
import Main.MainRunner;
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

    private long cardScore = 0;
    @Getter
    @Setter
    private CardController cardController = new CardController();
    @Getter
    @Setter
    private TrumpCardController trumpCardController = new TrumpCardController();


    public long getCardScore() {
        long total = 0;
        for (CardPOJO card : cardController.getPOJOS()) {
            total += card.getValue()[card.getValue().length - 1];
        }
        if (total > GameContext.getInstance().getGame().getPOJO().getCardPointTarget()) {
            total = 0;
            for (CardPOJO card : cardController.getPOJOS()) {
                total += card.getValue()[0];
            }
        }
        this.cardScore = total;
        return cardScore;
    }

    public boolean checkCardLimit() {
        return (this.cardScore > GameContext.getInstance().getGame().getPOJO().getCardPointTarget());
    }

    public String getCardsFormattedString() {
        String displayName = "";
        for (CardPOJO card : cardController.getPOJOS()) {
            displayName += card.getDisplayName();
            try {
                displayName += ", ";
            } catch (IndexOutOfBoundsException e) {
                displayName += ".";
            }
        }
        return displayName;
    }

    public void addGameScore(long score) {
        this.gameScore += score;
    }

}
