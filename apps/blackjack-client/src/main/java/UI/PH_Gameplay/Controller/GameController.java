package UI.PH_Gameplay.Controller;

import Gameplay.Card.ImageCard;
import Gameplay.Game.GamePOJO;
import Gameplay.GameContext;
import Main.MainRunner;
import UI.PH_Gameplay.Display.GamePlayDisplayGUI;
import Gameplay.Card.CardPOJO;
import Gameplay.Player.PlayerPOJO;

public class GameController {

    public GamePlayDisplayGUI gameGUI;
    public PlayerPOJO playerPOJOOne;
    public PlayerPOJO playerPOJOTwo;
    public ImageCard cardPlayerOne, cardPlayerTwo;
    private GameContext gameContext;


//    private Session RealFinalClient.getSession();

//    public GameController(GameContext gameContext) {
//        gameGUI = new GamePlayDisplayGUI();
//        playerPOJOOne = MainRunner.getGameContext().getPlayers()[0].getPlayer();
//        playerPOJOTwo = MainRunner.getGameContext().getPlayers()[1].getPlayer();
//        cardPlayerOne = new ImageCard(playerPOJOOne);
//        cardPlayerTwo = new ImageCard(playerPOJOTwo);
//        this.gameContext = gameContext;
////        showCard();
//    }
//
//    public void startGame() {
//    }
//
//    public void callGame() {
//        gameGUI.init();
//        gameGUI.getHitButtonPlayerOne().addActionListener(event -> {
//            PlayerPOJO currentTurn = (PlayerPOJO) GameSystem.getPlayerTurn();
//            CardPOJO cardPOJO = (CardPOJO) GameSystem.giveCard(currentTurn);
//            showCard();
//            gameSystem.switchTurn();
//        });
//        gameGUI.getStandButtonPlayerOne().addActionListener(event -> {
//            gameGUI.getHitButtonPlayerOne().setVisible(false);
//            gameGUI.getStandButtonPlayerOne().setVisible(false);
//            playerPOJOOne.setStand(false);
//        });
////        gameGUI.getHitButtonPlayerTwo().addActionListener(event -> {
////            PlayerPOJO currentTurn = (PlayerPOJO) GameSystem.getPlayerTurn();
////            Card card = (Card) GameSystem.giveCard(currentTurn);
////            showRandomCard(card, "PlayerTwo's hit");
////            gameSystem.switchTurn();
////        });
////        gameGUI.getStandButtonPlayerTwo().addActionListener(event -> {
////            gameGUI.getHitButtonPlayerTwo().setVisible(false);
////            gameGUI.getStandButtonPlayerTwo().setVisible(false);
////            playerPOJOOne.setStand(false);
////        });
//    }
//
//    public void showCard() {
//        if (hit.equals("PlayerOne's hit")) {
//            gameGUI.getPlayerOneTable().add(cardPlayerOne.getCard());
//            playerPOJOOne.setScore(playerPOJOOne.getScore() + playerPOJOOne.getMyCardPOJO().get(-1).getValue());
////            if (playerPOJOOne.getScore() >= 21) {
////                gameGUI.getHitButtonPlayerOne().setVisible(false);
////                gameGUI.getStandButtonPlayerOne().setVisible(false);
////                playerPOJOOne.setStand(false);
////            }
//            gameGUI.getScoreCardOneLabel().setText("Score: " + playerPOJOOne.getScore());
////        } else if (hit.equals("PlayerTwo's hit")) {
//            gameGUI.getPlayerTwoTable().add(cardPlayerTwo.getCard());
//            playerPOJOTwo.setScore(playerPOJOTwo.getScore() + playerPOJOTwo.getMyCardPOJO().get(-1).getValue());
////            if (playerPOJOTwo.getScore() >= 21) {
////                gameGUI.getHitButtonPlayerTwo().setVisible(false);
////                gameGUI.getStandButtonPlayerTwo().setVisible(false);
////                playerPOJOOne.setStand(false);
////            }
//            gameGUI.getScoreCardTwoLabel().setText("Score: " + playerPOJOTwo.getScore());
//        }
//        }
    }
//    update status Button
//    public void updateStatusButton(){
//
//        if (MainRunner.getGameContext().getPlayers()[1].getPlayer().getUsername().equals(gameContext.get)){
//
//        }
//    }
//}
