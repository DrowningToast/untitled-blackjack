package UI.Gameplay;

import GameContext.Card.CardPOJO;
import GameContext.Card.CardDisplay;
import GameContext.GameContext;
import GameContext.Player.PlayerPOJO;

import Internal.Websocket.Controller.WebsocketController;
import Internal.UserInterface.UIController;

import Main.MainRunner;

import lombok.Getter;



import javax.swing.*;

public class GameplayController {
    private WebsocketController wsController;
    private UIController uiController;
    @Getter
    private GameplayDisplayGUI ui;
    public CardDisplay cardPlayer;
    private GameContext ctx;

    public GameplayController(UIController uiController, WebsocketController wsController) {
        cardPlayer = new CardDisplay();
        this.wsController = wsController;
        this.uiController = uiController;
        this.ctx = MainRunner.getGameContext();
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

    public void showCard(JPanel playerTable, JLabel playerCardScore, PlayerPOJO player) {
        playerTable.removeAll();
        playerTable.revalidate();
        playerTable.repaint();
        for (CardPOJO i : player.getCardController().getPOJOS()) {
            cardPlayer.showCard(i);
            playerTable.add(cardPlayer.getCard());
            playerCardScore.setText("Score : " + player.getCardScore());
        }
    }

    public void updateChatLog() {
        ui.getGameplayTextArea().setText( ui.getGameplayTextArea().getText()+"\n"+ctx.getLogController().getLog().get(ctx.getLogController().getLog().size()-1));
        System.out.println(ctx.getLogController().getLog().size()-1);
    }
}



