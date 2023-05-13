package UI.PH_Gameplay.Controller;

import UI.PH_Gameplay.Model.ImageCard;
import UI.PH_Gameplay.Display.GamePlayDisplayGUI;
import UI.PH_Gameplay.Model.Card;
import Gameplay.Player.PlayerPOJO;

public class GameController {

    public GamePlayDisplayGUI gameGUI;
    public PlayerPOJO playerPOJOOne;
    public PlayerPOJO playerPOJOTwo;
    public ImageCard randomCard;
    public GameSystem gameSystem;
//    private Session RealFinalClient.getSession();

    public GameController() {
        gameGUI = new GamePlayDisplayGUI();
        playerPOJOOne = new PlayerPOJO();
        playerPOJOTwo = new PlayerPOJO();
        randomCard = new ImageCard();
        randomCard = new ImageCard();
    }

    public void startGame() {
    }

    public void callGame() {
        gameGUI.init();
        gameGUI.getHitButtonPlayerOne().addActionListener(event -> {
            PlayerPOJO currentTurn = (PlayerPOJO) GameSystem.getPlayerTurn();
            Card card = (Card) GameSystem.giveCard(currentTurn);
            showRandomCard(card, "PlayerOne's hit");
            gameSystem.switchTurn();
        });
        gameGUI.getStandButtonPlayerOne().addActionListener(event -> {
            gameGUI.getHitButtonPlayerOne().setVisible(false);
            gameGUI.getStandButtonPlayerOne().setVisible(false);
            playerPOJOOne.setStand(false);
        });
//        gameGUI.getHitButtonPlayerTwo().addActionListener(event -> {
//            PlayerPOJO currentTurn = (PlayerPOJO) GameSystem.getPlayerTurn();
//            Card card = (Card) GameSystem.giveCard(currentTurn);
//            showRandomCard(card, "PlayerTwo's hit");
//            gameSystem.switchTurn();
//        });
//        gameGUI.getStandButtonPlayerTwo().addActionListener(event -> {
//            gameGUI.getHitButtonPlayerTwo().setVisible(false);
//            gameGUI.getStandButtonPlayerTwo().setVisible(false);
//            playerPOJOOne.setStand(false);
//        });
    }

    public void showRandomCard(Card card, String hit) {
        randomCard.setShowCard(randomCard.randomCard(card));
        if (hit.equals("PlayerOne's hit")) {
            gameGUI.getPlayerOneTable().add(randomCard.getShowCard());
            playerPOJOOne.setScore(playerPOJOOne.getScore() + card.getValue());
            if (playerPOJOOne.getScore() >= 21) {
                gameGUI.getHitButtonPlayerOne().setVisible(false);
                gameGUI.getStandButtonPlayerOne().setVisible(false);
                playerPOJOOne.setStand(false);
            }
            gameGUI.getScoreCardOneLabel().setText("Score: " + playerPOJOOne.getScore());
//        } else if (hit.equals("PlayerTwo's hit")) {
//            gameGUI.getPlayerTwoTable().add(randomCard.getShowCard());
//            playerPOJOTwo.setScore(playerPOJOTwo.getScore() + card.getValue());
//            if (playerPOJOTwo.getScore() >= 21) {
//                gameGUI.getHitButtonPlayerTwo().setVisible(false);
//                gameGUI.getStandButtonPlayerTwo().setVisible(false);
//                playerPOJOOne.setStand(false);
//            }
//            gameGUI.getScoreCardTwoLabel().setText("Score: " + playerPOJOTwo.getScore());
//        }
    }
}}
