package UI.PH_Gameplay.Display;

import Gameplay.Card.CardController;
import Gameplay.Card.CardPOJO;
import Gameplay.Card.CardDisplay;
import Gameplay.GameContext;
import Gameplay.Player.PlayerPOJO;
import Internal.Websocket.Controller.WebsocketController;
import Main.MainRunner;
import UI.Controller.UIController;
import lombok.Getter;

import java.util.ArrayList;

public class GamePlayController {
    private WebsocketController wsController;
    private UIController uiController;
    private CardController card;
    @Getter
    private GamePlayDisplayGUI ui;
    public PlayerPOJO playerPOJOOne;
    public PlayerPOJO playerPOJOTwo;
    public CardDisplay cardPlayerOne, cardPlayerTwo;

    public GamePlayController(UIController uiController, WebsocketController wsController) {
        playerPOJOOne = MainRunner.getGameContext().getPlayers()[0].getPlayer();
        playerPOJOTwo = MainRunner.getGameContext().getPlayers()[1].getPlayer();
        cardPlayerOne = new CardDisplay();
        cardPlayerTwo = new CardDisplay();
        this.wsController = wsController;
        this.uiController = uiController;
        ui = new GamePlayDisplayGUI(this, wsController);
    }
    //    update status Button
    public void updateStatusButton(){

        if (MainRunner.getGameContext().getPlayers()[1].getPlayer().getUsername().equals(MainRunner.getGameContext().getGame().getGame().getTurnOwner())) {
            ui.getHitButtonPlayerOne().setEnabled(false);
            ui.getStandButtonPlayerOne().setEnabled(false);
        } else if (MainRunner.getGameContext().getPlayers()[0].getPlayer().getUsername().equals(MainRunner.getGameContext().getGame().getGame().getTurnOwner())){
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


