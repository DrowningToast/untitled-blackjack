package UI.Demo.Controller;

import UI.Demo.Model.ImageCard;
import UI.Demo.Display.GamePlayDisplayGUI;
import UI.Demo.Model.Card;
import Player.PlayerModel;

public class GameController {

    public GamePlayDisplayGUI gameGUI;
    public PlayerModel playerModelOne;
    public PlayerModel playerModelTwo;
    public ImageCard randomCard;
    public GameSystem gameSystem;
//    private Session RealFinalClient.getSession();

    public GameController() {
        gameGUI = new GamePlayDisplayGUI();
        playerModelOne = new PlayerModel();
        playerModelTwo = new PlayerModel();
        randomCard = new ImageCard();
        randomCard = new ImageCard();
    }

    public void startGame() {
    }

    public void callGame() {
        gameGUI.init();
        gameGUI.getHitButtonPlayerOne().addActionListener(event -> {
            PlayerModel currentTurn = (PlayerModel) GameSystem.getPlayerTurn();
            Card card = (Card) GameSystem.giveCard(currentTurn);
            showRandomCard(card, "PlayerOne's hit");
            gameSystem.switchTurn();
        });
        gameGUI.getStandButtonPlayerOne().addActionListener(event -> {
            gameGUI.getHitButtonPlayerOne().setVisible(false);
            gameGUI.getStandButtonPlayerOne().setVisible(false);
            playerModelOne.setStatus(false);
        });
        gameGUI.getHitButtonPlayerTwo().addActionListener(event -> {
            PlayerModel currentTurn = (PlayerModel) GameSystem.getPlayerTurn();
            Card card = (Card) GameSystem.giveCard(currentTurn);
            showRandomCard(card, "PlayerTwo's hit");
            gameSystem.switchTurn();
        });
        gameGUI.getStandButtonPlayerTwo().addActionListener(event -> {
            gameGUI.getHitButtonPlayerTwo().setVisible(false);
            gameGUI.getStandButtonPlayerTwo().setVisible(false);
            playerModelOne.setStatus(false);
        });
    }

    public void showRandomCard(Card card, String hit) {
        randomCard.setShowCard(randomCard.randomCard(card));
        if (hit.equals("PlayerOne's hit")) {
            gameGUI.getPlayerOneTable().add(randomCard.getShowCard());
            playerModelOne.setScore(playerModelOne.getScore() + card.getValue());
            if (playerModelOne.getScore() >= 21) {
                gameGUI.getHitButtonPlayerOne().setVisible(false);
                gameGUI.getStandButtonPlayerOne().setVisible(false);
                playerModelOne.setStatus(false);
            }
            gameGUI.getScoreCardOneLabel().setText("Score: " + playerModelOne.getScore());
        } else if (hit.equals("PlayerTwo's hit")) {
            gameGUI.getPlayerTwoTable().add(randomCard.getShowCard());
            playerModelTwo.setScore(playerModelTwo.getScore() + card.getValue());
            if (playerModelTwo.getScore() >= 21) {
                gameGUI.getHitButtonPlayerTwo().setVisible(false);
                gameGUI.getStandButtonPlayerTwo().setVisible(false);
                playerModelOne.setStatus(false);
            }
            gameGUI.getScoreCardTwoLabel().setText("Score: " + playerModelTwo.getScore());
        }
    }
}
