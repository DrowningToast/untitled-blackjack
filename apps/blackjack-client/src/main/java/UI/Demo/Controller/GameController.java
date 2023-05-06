package UI.Demo.Controller;

import UI.Demo.Model.ImageCard;
import UI.Demo.Display.GamePlayDisplayGUI;
import UI.Demo.Display.LoginDisplayGUI;
import UI.Demo.Model.Card;
import UI.Demo.Model.Player;

public class GameController {

    public GamePlayDisplayGUI gameGUI;
    public Player playerOne;
    public Player playerTwo;
    public ImageCard randomCard;
    public GameSystem gameSystem;
//    private Session RealFinalClient.getSession();

    public GameController() {
        gameGUI = new GamePlayDisplayGUI();
        playerOne = new Player();
        playerTwo = new Player();
        randomCard = new ImageCard();
        randomCard = new ImageCard();
    }

    public void startGame() {
    }

    public void callGame() {
        gameGUI.init();
        gameGUI.getHitButtonPlayerOne().addActionListener(event -> {
            Player currentTurn = (Player) GameSystem.getPlayerTurn();
            Card card = (Card) GameSystem.giveCard(currentTurn);
            showRandomCard(card, "PlayerOne's hit");
            gameSystem.switchTurn();
        });
        gameGUI.getStandButtonPlayerOne().addActionListener(event -> {
            gameGUI.getHitButtonPlayerOne().setVisible(false);
            gameGUI.getStandButtonPlayerOne().setVisible(false);
            playerOne.setStatus(false);
        });
        gameGUI.getHitButtonPlayerTwo().addActionListener(event -> {
            Player currentTurn = (Player) GameSystem.getPlayerTurn();
            Card card = (Card) GameSystem.giveCard(currentTurn);
            showRandomCard(card, "PlayerTwo's hit");
            gameSystem.switchTurn();
        });
        gameGUI.getStandButtonPlayerTwo().addActionListener(event -> {
            gameGUI.getHitButtonPlayerTwo().setVisible(false);
            gameGUI.getStandButtonPlayerTwo().setVisible(false);
            playerOne.setStatus(false);
        });
    }

    public void showRandomCard(Card card, String hit) {
        randomCard.setShowCard(randomCard.randomCard(card));
        if (hit.equals("PlayerOne's hit")) {
            gameGUI.getPlayerOneTable().add(randomCard.getShowCard());
            playerOne.setScore(playerOne.getScore() + card.getValue());
            if (playerOne.getScore() >= 21) {
                gameGUI.getHitButtonPlayerOne().setVisible(false);
                gameGUI.getStandButtonPlayerOne().setVisible(false);
                playerOne.setStatus(false);
            }
            gameGUI.getScoreCardOneLabel().setText("Score: " + playerOne.getScore());
        } else if (hit.equals("PlayerTwo's hit")) {
            gameGUI.getPlayerTwoTable().add(randomCard.getShowCard());
            playerTwo.setScore(playerTwo.getScore() + card.getValue());
            if (playerTwo.getScore() >= 21) {
                gameGUI.getHitButtonPlayerTwo().setVisible(false);
                gameGUI.getStandButtonPlayerTwo().setVisible(false);
                playerOne.setStatus(false);
            }
            gameGUI.getScoreCardTwoLabel().setText("Score: " + playerTwo.getScore());
        }
    }
}
