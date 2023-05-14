package UI.PH_Gameplay.Controller;

import Gameplay.Card.CardPOJO;
import Gameplay.Card.ImageCard;
import Gameplay.Player.PlayerPOJO;
import Internal.Websocket.Base.MessageBuilder;
import UI.PH_Gameplay.Display.GamePlayDisplayGUI;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.IOException;
import java.util.HashMap;
import javax.swing.*;

public class GameController implements ActionListener {

    public GamePlayDisplayGUI gameGUI;
    public PlayerPOJO playerPOJOOne;
    public PlayerPOJO playerPOJOTwo;
    public ImageCard randomCard;
    public MessageBuilder message;

    public JButton b_hit, b_stand;
    //    private Session RealFinalClient.getSession();

    public GameController() {
//        gameGUI = new GamePlayDisplayGUI(this);
        playerPOJOOne = new PlayerPOJO();
        playerPOJOTwo = new PlayerPOJO();
        randomCard = new ImageCard();
        randomCard = new ImageCard();


    }

    public void startGame() {
    }

    public void callGame() throws IOException {
        System.out.println("game init");
        gameGUI.init();
//        gameGUI.getHitButtonPlayerOne().addActionListener(event -> {
//            System.out.println("into hit button");
//            PlayerPOJO currentTurn = (PlayerPOJO) GameSystem.getPlayerTurn();
//            CardPOJO cardPOJO = (CardPOJO) GameSystem.giveCard(currentTurn);
//            showRandomCard(cardPOJO, "PlayerOne's hit");
//            gameSystem.switchTurn();
//            try {
//                System.out.println("into hit action");
//                actionHit();
//            } catch (IOException e) {
//                throw new RuntimeException(e);
//            }
//        });
//        gameGUI.getStandButtonPlayerOne().addActionListener(event -> {
//            System.out.println("into stand button");
//            gameGUI.getHitButtonPlayerOne().setVisible(false);
//            gameGUI.getStandButtonPlayerOne().setVisible(false);
//            playerPOJOOne.setStand(false);
//            try {
//                System.out.println("into stand action");
//                actionStand();
//            } catch (IOException e) {
//                throw new RuntimeException(e);
//            }
//        });

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

    public void showRandomCard(CardPOJO cardPOJO, String hit) {
        randomCard.setShowCard(randomCard.randomCard(cardPOJO));
        if (hit.equals("PlayerOne's hit")) {
            gameGUI.getPlayerOneTable().add(randomCard.getShowCard());
            playerPOJOOne.setScore(playerPOJOOne.getScore() + cardPOJO.getValue());
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
    }

    public void actionHit() throws IOException {
        HashMap content = new HashMap();
        content.put("handler", "hit");
        message.setContent(content).send();
        System.out.println(content);
    }

    public void actionStand() throws IOException {
        HashMap content = new HashMap();
        content.put("handler", "stand");
        message.setContent(content).send();
        System.out.println(content);
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        if (e.getSource().equals(gameGUI.getHitButtonPlayerOne())) {
            System.out.println("into hit button");
//            PlayerPOJO currentTurn = (PlayerPOJO) GameSystem.getPlayerTurn();
//            CardPOJO cardPOJO = (CardPOJO) GameSystem.giveCard(currentTurn);
//            showRandomCard(cardPOJO, "PlayerOne's hit");
//            gameSystem.switchTurn();
            try {
                System.out.println("into hit action");
                actionHit();
            } catch (IOException ex) {
                throw new RuntimeException(ex);
            }
        }
        else if (e.getSource().equals(gameGUI.getStandButtonPlayerOne())) {
            System.out.println("into stand button");
            gameGUI.getHitButtonPlayerOne().setVisible(false);
            gameGUI.getStandButtonPlayerOne().setVisible(false);
            playerPOJOOne.setStand(false);
            try {
                System.out.println("into stand action");
                actionStand();
            } catch (IOException ex) {
                throw new RuntimeException(ex);
            }
        }
    }


}
