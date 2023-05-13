package UI.Demo.Model;

public class IGame {
    private String gameId, gameState;
    private int roundCounter, cardPointTarget;
    private IUser players;

    public IUser getPlayers() {
        return players;
    }

    public void setPlayers(IUser players) {
        this.players = players;
    }

    public String getGameId() {
        return gameId;
    }

    public void setGameId(String gameId) {
        this.gameId = gameId;
    }

    public String getGameState() {
        return gameState;
    }

    public void setGameState(String gameState) {
        this.gameState = gameState;
    }

    public int getRoundCounter() {
        return roundCounter;
    }

    public void setRoundCounter(int roundCounter) {
        this.roundCounter = roundCounter;
    }

    public int getCardPointTarget() {
        return cardPointTarget;
    }

    public void setCardPointTarget(int cardPointTarget) {
        this.cardPointTarget = cardPointTarget;
    }

}
