package UI.Demo.Controller;

import UI.Demo.Model.ImageCard;
import UI.Demo.Display.GamePlayDisplayGUI;
import UI.Demo.Model.Card;
import UI.Demo.Model.CardHandler;
import UI.Demo.Model.Player;
import UI.Demo.Controller.Judge;
import java.awt.Image;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import javax.swing.ImageIcon;
import javax.swing.JLabel;
import java.awt.Component;

public class Controller{
    public GamePlayDisplayGUI gameGUI;
    public Player playerOne;
    public Player playerTwo;
    public ImageCard randomCard;
    public Judge judge;
//    private Session RealFinalClient.getSession();
    
    public Controller(){
        gameGUI = new GamePlayDisplayGUI();
        playerOne = new Player();
        playerTwo = new Player();
        randomCard = new ImageCard();
        System.out.println("Controller");
        gameGUI.init();
        gameGUI.getHitButtonPlayerOne().addActionListener(event -> {
            Player currentTurn = (Player) Judge.getPlayerTurn();
            Card card = (Card) Judge.giveCard(currentTurn);
            showRandomCard(card, "PlayerOne's hit");
            judge.switchTurn();
        });
        gameGUI.getStandButtonPlayerOne().addActionListener(event -> {
            gameGUI.getHitButtonPlayerOne().setVisible(false);
            gameGUI.getStandButtonPlayerOne().setVisible(false);
            playerOne.setStatus(false);
        });
        gameGUI.getHitButtonPlayerTwo().addActionListener(event -> {
            Player currentTurn = (Player) Judge.getPlayerTurn();
            Card card = (Card) Judge.giveCard(currentTurn);
            showRandomCard(card, "PlayerTwo's hit");
            judge.switchTurn();
        });
        gameGUI.getStandButtonPlayerTwo().addActionListener(event -> {
            gameGUI.getHitButtonPlayerTwo().setVisible(false);
            gameGUI.getStandButtonPlayerTwo().setVisible(false);
            playerOne.setStatus(false);
        });
        
        randomCard = new ImageCard();
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
        }
        else if (hit.equals("PlayerTwo's hit")) {
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
