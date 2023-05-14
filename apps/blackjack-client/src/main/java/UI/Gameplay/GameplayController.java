package UI.Gameplay;

import GameContext.Card.CardController;
import GameContext.Card.CardPOJO;
import GameContext.Card.CardDisplay;
import GameContext.Player.PlayerPOJO;
import Internal.Websocket.Controller.WebsocketController;
import Main.MainRunner;
import Internal.UserInterface.UIController;
import lombok.Getter;

import java.util.ArrayList;

public class GameplayController {
    private WebsocketController wsController;
    private UIController uiController;
    private CardController card;
    @Getter
    private GameplayDisplayGUI ui;
    public PlayerPOJO playerPOJOOne;
    public PlayerPOJO playerPOJOTwo;
    public CardDisplay cardPlayerOne, cardPlayerTwo;

    public GameplayController(UIController uiController, WebsocketController wsController) {
        playerPOJOOne = MainRunner.getGameContext().getPlayers()[0].getPOJO();
        playerPOJOTwo = MainRunner.getGameContext().getPlayers()[1].getPOJO();
        cardPlayerOne = new CardDisplay();
        cardPlayerTwo = new CardDisplay();
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

    public void showCardTwo(ArrayList<CardPOJO> cards) {
        ui.getPlayerTwoTable().removeAll();
        for (CardPOJO i : cards) {
            cardPlayerTwo.showCard(i);
            ui.getPlayerTwoTable().add(cardPlayerTwo.getCard());
        }
    }

    public void showCardOne(ArrayList<CardPOJO> cards) {
        ui.getPlayerOneTable().removeAll();
        for (CardPOJO i : cards) {
            cardPlayerOne.showCard(i);
            ui.getPlayerOneTable().add(cardPlayerOne.getCard());
        }
    }
}


