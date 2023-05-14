package UI.PH_Gameplay.Display;

import Gameplay.Card.CardController;
import Gameplay.Card.ImageCard;
import Gameplay.GameContext;
import Gameplay.Player.PlayerPOJO;
import Main.MainRunner;
import UI.Controller.UIController;
import lombok.Getter;

public class GamePlayController {
    private UIController uiController;
    private CardController card;
    @Getter
    private GamePlayDisplayGUI ui = new GamePlayDisplayGUI(this, card);
    public PlayerPOJO playerPOJOOne;
    public PlayerPOJO playerPOJOTwo;
    public ImageCard cardPlayerOne, cardPlayerTwo;
    private GameContext ctx;

    public GamePlayController(UIController uiController, GameContext ctx) {
        playerPOJOOne = MainRunner.getGameContext().getPlayers()[0].getPlayer();
        playerPOJOTwo = MainRunner.getGameContext().getPlayers()[1].getPlayer();
        cardPlayerOne = new ImageCard();
        cardPlayerTwo = new ImageCard();
        this.uiController = uiController;
        this.ctx = ctx;

    }

    public void showCard(CardController cards) {
        if ((ctx.getPlayers()[0].getPlayer().getCardController().getCards().size() == 2) && (ctx.getPlayers()[1].getPlayer().getCardController().getCards().size() == 2)) {
            cardPlayerOne.showCard(ctx.getPlayers()[0].getPlayer().getCardController().getCards().get(0));
            ui.getPlayerOneTable().add(cardPlayerOne.getCard());
            cardPlayerOne.showCard(ctx.getPlayers()[0].getPlayer().getCardController().getCards().get(1));
            ui.getPlayerOneTable().add(cardPlayerOne.getCard());
            cardPlayerTwo.showCard(ctx.getPlayers()[1].getPlayer().getCardController().getCards().get(0));
            ui.getPlayerTwoTable().add(cardPlayerTwo.getCard());
            cardPlayerTwo.showCard(ctx.getPlayers()[1].getPlayer().getCardController().getCards().get(1));
            ui.getPlayerTwoTable().add(cardPlayerTwo.getCard());
            playerPOJOOne.setScore(playerPOJOOne.getScore() + ctx.getPlayers()[0].getPlayer().getCardController().getCards().get(0).getValue());
            playerPOJOOne.setScore(playerPOJOOne.getScore() + ctx.getPlayers()[0].getPlayer().getCardController().getCards().get(1).getValue());
            playerPOJOTwo.setScore(playerPOJOTwo.getScore() + ctx.getPlayers()[1].getPlayer().getCardController().getCards().get(0).getValue());
            playerPOJOTwo.setScore(playerPOJOTwo.getScore() + ctx.getPlayers()[1].getPlayer().getCardController().getCards().get(1).getValue());
        }
        else {
//        if (hit.equals("PlayerOne's hit")) {
            cardPlayerOne.showCard(ctx.getPlayers()[0].getPlayer().getCardController().getCards().get(ctx.getPlayers()[0].getPlayer().getCardController().getCards().size()-1));
            ui.getPlayerOneTable().add(cardPlayerOne.getCard());
            playerPOJOOne.setScore(playerPOJOOne.getScore() + ctx.getPlayers()[0].getPlayer().getCardController().getCards().get(ctx.getPlayers()[0].getPlayer().getCardController().getCards().size()-1).getValue());
//            if (playerPOJOOne.getScore() >= 21) {
//                gameGUI.getHitButtonPlayerOne().setVisible(false);
//                gameGUI.getStandButtonPlayerOne().setVisible(false);
//                playerPOJOOne.setStand(false);
//            }
            ui.getScoreCardOneLabel().setText("Score: " + playerPOJOOne.getScore());
//        } else if (hit.equals("PlayerTwo's hit")) {
            cardPlayerTwo.showCard(ctx.getPlayers()[1].getPlayer().getCardController().getCards().get(ctx.getPlayers()[1].getPlayer().getCardController().getCards().size()-1));
            ui.getPlayerTwoTable().add(cardPlayerTwo.getCard());
            playerPOJOTwo.setScore(playerPOJOTwo.getScore() + ctx.getPlayers()[1].getPlayer().getCardController().getCards().get(ctx.getPlayers()[1].getPlayer().getCardController().getCards().size()-1).getValue());
//            if (playerPOJOTwo.getScore() >= 21) {
//                gameGUI.getHitButtonPlayerTwo().setVisible(false);
//                gameGUI.getStandButtonPlayerTwo().setVisible(false);
//                playerPOJOOne.setStand(false);
//            }
            ui.getScoreCardTwoLabel().setText("Score: " + playerPOJOTwo.getScore());
        }
    }

}

//}
