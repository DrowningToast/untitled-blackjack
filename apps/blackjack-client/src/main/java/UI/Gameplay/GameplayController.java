package UI.Gameplay;

import GameContext.Card.CardDisplay;
import GameContext.Card.CardPOJO;
import GameContext.GameContext;
import GameContext.Player.PlayerPOJO;
import GameContext.Sounds.SoundPOJO;
import GameContext.TrumpCard.TrumpCardDisplay;
import GameContext.TrumpCard.TrumpCardPOJO;
import GameContext.TrumpCard.TrumpStatusDisplay;
import GameContext.TrumpCard.TrumpStatusPOJO;
import Internal.UserInterface.UIController;
import Internal.Websocket.Controller.WebsocketController;
import Main.MainRunner;

import javax.swing.*;
import java.awt.*;
import java.awt.geom.Line2D;

public class GameplayController {

    private WebsocketController wsController;
    private UIController uiController;
    private GameplayDisplayGUI ui;
    private TrumpCardDisplay trumpCard;
    private TrumpStatusDisplay trumpStatus;
    public CardDisplay cardPlayer;
    private GameContext ctx;

    public GameplayController(UIController uiController, WebsocketController wsController) {
        cardPlayer = new CardDisplay();
        trumpCard = new TrumpCardDisplay(wsController);
        trumpStatus = new TrumpStatusDisplay();
        this.wsController = wsController;
        this.uiController = uiController;
        this.ctx = GameContext.getInstance();
        ui = new GameplayDisplayGUI(this, wsController);
    }

    // update status Button
    public void updateStatusButton() {
        String myUsername = GameContext.getInstance().getPlayers()[0].getPOJO().getUsername();
        String opponentUsername = GameContext.getInstance().getPlayers()[1].getPOJO().getUsername();
        String checker = GameContext.getInstance().getGame().getPOJO().getTurnOwner();
        if (myUsername.equals(checker)) {
            // MY TURN
            // check player's card value if it's more than 21 or not
            ui.getHitButtonPlayerOne().setEnabled(true);
            ui.getStandButtonPlayerOne().setEnabled(true);
            if (GameContext.getInstance().getPlayers()[0].getPOJO().checkCardLimit()) {
                disableHit();
            }
            if (ctx.getPlayers()[0].getPOJO().getTrumpCardController().checkStatus()) {
                disableHit();
            }
        } else if (opponentUsername.equals(GameContext.getInstance().getGame().getPOJO().getTurnOwner())) {
            // THEIR TURN
            ui.getHitButtonPlayerOne().setEnabled(false);
            ui.getStandButtonPlayerOne().setEnabled(false);
        } else {
            System.out.println("TurnOwner's username doesn't match players.");
        }
    }

    public void showTurn(JLabel showPlayerTurn, JPanel showTurn) {
        String checker = GameContext.getInstance().getGame().getPOJO().getTurnOwner();
        String myTurn = GameContext.getInstance().getPlayers()[0].getPOJO().getUsername();
        if (checker.equals(myTurn)) {
            showPlayerTurn.setText("Your turn");
            showPlayerTurn.setForeground(Color.black);
            showTurn.setBackground(new Color(106, 190, 48));
        } else {
            showPlayerTurn.setText("Waiting...");
            showPlayerTurn.setForeground(Color.RED);
            showTurn.setBackground(Color.black);
        }
    }

    public void showCard(JPanel playerTable, JLabel playerCardScore, PlayerPOJO player) {
        long cardPointTarget = GameContext.getInstance().getGame().getPOJO().getCardPointTarget();
        playerTable.removeAll();
        playerTable.revalidate();
        playerTable.repaint();
        for (CardPOJO i : player.getCardController().getPOJOS()) {
            cardPlayer.showCard(i);
            playerTable.add(cardPlayer.getCard());
            playerCardScore.setText(player.getCardScore() + " / " + cardPointTarget);
        }
    }

    public void showStatus(JPanel statusPlace, PlayerPOJO player) {
        statusPlace.removeAll();
        statusPlace.revalidate();
        statusPlace.repaint();
        for (TrumpStatusPOJO i : player.getTrumpCardController().getSTATUS()) {
            trumpStatus.showTrumpStatus(i);
            statusPlace.add(trumpStatus.getTrumpStatus());
        }
    }


    public void updateChatLog() {
        String oldText = ui.getGameplayTextArea().getText();
        String newText = ctx.getLogController().getLog().get(ctx.getLogController().getLog().size() - 1);
        ui.getGameplayTextArea().setText(newText + "\n" + oldText);
    }

    public void clearLog() {
        ui.getGameplayTextArea().setText("");
    }

    public void showTrumpCard(JPanel trumpPlace, PlayerPOJO player) {
        trumpPlace.removeAll();
        for (TrumpCardPOJO i : player.getTrumpCardController().getPOJOS()) {
            trumpCard.showTrumpCard(i);
            trumpPlace.add(trumpCard.getTrumpCard());
        }
        trumpPlace.revalidate();
        trumpPlace.repaint();
    }

    public void updatePlayerScore() {
        ui.getScoreGamePlayerOneLabel().setText(ctx.getPlayers()[0].getPOJO().getGameScore() + "");
        ui.getScoreGamePlayerTwoLabel().setText(ctx.getPlayers()[1].getPOJO().getGameScore() + "");
    }

    public void updateTitleGamePlay() {
        String playerNameOne = ctx.getPlayers()[0].getPOJO().getUsername();
        String playerNameTwo = ctx.getPlayers()[1].getPOJO().getUsername();
        long playerScoreGameOne = ctx.getPlayers()[0].getPOJO().getGameScore();
        long playerScoreGameTwo = ctx.getPlayers()[1].getPOJO().getGameScore();
        ui.setTitle("Untitled-BlackJack [" + playerNameOne + "] " + playerScoreGameOne + " VS " + playerScoreGameTwo
                + " [" + playerNameTwo + "]");
    }

    public void updateCardScoreColor(JLabel playerCardScore, PlayerPOJO player) {
        if (player.checkCardLimit()) {
            playerCardScore.setForeground(Color.RED);
        } else if (player.getCardScore() == GameContext.getInstance().getGame().getPOJO().getCardPointTarget()) {
            playerCardScore.setForeground(Color.GREEN);
        } else {
            playerCardScore.setForeground(Color.WHITE);
        }
    }

    public void showSoundSettings() {
        GameContext.getInstance().getSoundController().soundControl();
    }

    public GameplayDisplayGUI getUi() {
        return this.ui;
    }

    public void disableHit() {
        ui.getHitButtonPlayerOne().setEnabled(false);
    }
}
