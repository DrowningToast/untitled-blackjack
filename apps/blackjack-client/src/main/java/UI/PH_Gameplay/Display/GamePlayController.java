package UI.PH_Gameplay.Display;

import Gameplay.Card.CardController;
import Gameplay.Card.CardPOJO;
import Gameplay.Card.CardDisplay;
import Gameplay.GameContext;
import Gameplay.Player.PlayerPOJO;
import Main.MainRunner;
import UI.Controller.UIController;
import lombok.Getter;

import java.util.ArrayList;

public class GamePlayController {
    private UIController uiController;
    private CardController card;
    @Getter
    private GamePlayDisplayGUI ui = new GamePlayDisplayGUI(this);
    public PlayerPOJO playerPOJOOne;
    public PlayerPOJO playerPOJOTwo;
    public CardDisplay cardPlayerOne, cardPlayerTwo;
    private GameContext ctx;

    public GamePlayController(UIController uiController, GameContext ctx) {
        playerPOJOOne = MainRunner.getGameContext().getPlayers()[0].getPlayer();
        playerPOJOTwo = MainRunner.getGameContext().getPlayers()[1].getPlayer();
        cardPlayerOne = new CardDisplay();
        cardPlayerTwo = new CardDisplay();
        this.uiController = uiController;
        this.ctx = ctx;

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


