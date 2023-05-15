package UI.Gameplay;

import GameContext.Card.CardController;
import GameContext.Card.CardPOJO;
import GameContext.Card.CardDisplay;
import GameContext.Player.PlayerPOJO;
import Internal.Websocket.Controller.WebsocketController;
import Main.MainRunner;
import Internal.UserInterface.UIController;
import lombok.Getter;

import javax.swing.*;
import java.util.ArrayList;

public class GameplayController {
    private WebsocketController wsController;
    private UIController uiController;
    private CardController card;
    @Getter
    private GameplayDisplayGUI ui;
//    public PlayerPOJO playerPOJOOne;
//    public PlayerPOJO playerPOJOTwo;
    public CardDisplay cardPlayer;

    public GameplayController(UIController uiController, WebsocketController wsController) {
//        playerPOJOOne = MainRunner.getGameContext().getPlayers()[0].getPOJO();
//        playerPOJOTwo = MainRunner.getGameContext().getPlayers()[1].getPOJO();
        cardPlayer = new CardDisplay();
//        cardPlayerTwo = new CardDisplay();
        this.wsController = wsController;
        this.uiController = uiController;
        ui = new GameplayDisplayGUI(this, wsController);
    }

    //    update status Button
    public void updateStatusButton() {

        if (MainRunner.getGameContext().getPlayers()[1].getPOJO().getUsername().equals(MainRunner.getGameContext().getGame().getPOJO().getTurnOwner())) {
            ui.getHitButtonPlayerOne().setEnabled(false);
            ui.getStandButtonPlayerOne().setEnabled(false);
        } else if (MainRunner.getGameContext().getPlayers()[0].getPOJO().getUsername().equals(MainRunner.getGameContext().getGame().getPOJO().getTurnOwner())) {
            ui.getHitButtonPlayerOne().setEnabled(true);
            ui.getStandButtonPlayerOne().setEnabled(true);
        }
    }

    public void showCard(JPanel playerTable,JLabel playerCardScore, PlayerPOJO player) {
//        if (player.getUsername() == playerPOJOOne.getUsername()) {
            playerTable.removeAll();
            playerTable.revalidate();
            playerTable.repaint();
            for (CardPOJO i : player.getCardController().getPOJOS()) {
                cardPlayer.showCard(i);
                playerTable.add(cardPlayer.getCard());
                playerCardScore.setText("Score : " + player.getCardScore());
            }
//        } else if (player.getUsername() == playerPOJOTwo.getUsername()) {
//            playerTable.removeAll();
//            playerTable.revalidate();
//            playerTable.repaint();
//            for (CardPOJO i : playerPOJOTwo.getCardController().getPOJOS()) {
//                cardPlayerTwo.showCard(i);
//                playerTable.add(cardPlayerTwo.getCard());
//                ui.getScoreCardTwoLabel().setText("Score : " + player.getCardScore());
//            }
        }
    }
//}


