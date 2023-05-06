package UI.Demo.Controller;
import UI.Demo.Model.Card;
import UI.Demo.Model.CardHandler;
import UI.Demo.Model.TrumpChip;
import Player.PlayerModel;
import UI.Demo.Display.*;
import java.util.*;

public class GameSystem {   
    private static final CardHandler CARDS = new CardHandler();
    private static HashMap<String, Card> deckCard = CARDS.getHashMap(); //deckCard have hashmap of handler
    private static ArrayList<TrumpChip> deckChip;
    // Players in the game
    private static ArrayList<PlayerModel> playerModels = new ArrayList<PlayerModel>();
    private static PlayerModel currentTurnPlayerModel = new PlayerModel();
    private static Random random = new Random();
    private static boolean isEndGame = false;
    private static GamePlayDisplayGUI gameGUI = new GamePlayDisplayGUI();
    
    public static Card giveCard(PlayerModel p) {
        Object[] values = deckCard.values().toArray();
        Card randomCard = (Card) values[random.nextInt(values.length)];

        if (isEndGame == true) {
            deckCard = CARDS.getHashMap();
            return null;
        } else if (deckCard.isEmpty() == true) {
            return null;
        } else {
            Card removeCard = deckCard.remove(randomCard.getDisplayName());
            p.addMyCard(removeCard);
            return removeCard;
        }
    }

    // player join the game
    public static void join(PlayerModel playerModel) {
        if (playerModels.size() <= 2) {
            playerModels.add(playerModel);
        } else {
            System.out.println("Error");
        }
    }

    public static void setCurrentPlayer(PlayerModel currentTurnPlayerModel) {
        GameSystem.currentTurnPlayerModel = currentTurnPlayerModel;
    }

    // getter which turn th game current is
    public static PlayerModel getPlayerTurn() {
        return currentTurnPlayerModel;
    }
    
    // Switch play turn
    public static void switchTurn() {
        if (currentTurnPlayerModel.equals(playerModels.get(0))) {
            currentTurnPlayerModel = playerModels.get(1);
        } else {
            currentTurnPlayerModel = playerModels.get(0);
        }
    }
    public void currentTurnPlayer(){
        if(currentTurnPlayerModel == playerModels.get(0)){
            gameGUI.getHitButtonPlayerOne().setEnabled(true);
            gameGUI.getStandButtonPlayerOne().setEnabled(true);
            System.out.println("1232131232");
            
    }else{
            gameGUI.getHitButtonPlayerTwo().setEnabled(false);
            gameGUI.getStandButtonPlayerTwo().setEnabled(false);
            System.out.println("asdasd");
        }
}

//    public static void endGame() {
//
//    }
//    return all Player
    public static ArrayList<PlayerModel> getAllPlayers() {
        return playerModels;
    }
    
    public void stand(PlayerModel playerModelOne, PlayerModel playerModelTwo){
        if(((playerModelOne.isStatus() == false) & (playerModelTwo.isStatus() == true))|((playerModelOne.isStatus() == true) & (playerModelTwo.isStatus() == false))){
            switchTurn();
        }
        else{
            CalculateScore(playerModelOne.getScore(), playerModelTwo.getScore());
        }
    }
    
    public static String CalculateScore(int scoreA, int scoreB){
        if ((scoreA > scoreB) & (scoreA <= 21)){
            return ("Player1 is Won");
        }
        else if((scoreB > scoreA) & (scoreB <= 21)){
            return ("Player2 is Won");
        }
        else if(((scoreA > scoreB) & (scoreA > 21)) & (scoreB <= 21)){
            return ("Player2 is Won");
        }
        else if(((scoreA < scoreB) & (scoreB > 21)) & (scoreA <= 21)){
            return ("Player1 is Won");
        }
        else if((scoreA == scoreB)){
            return ("DRAW");
        }
        else if((scoreB > 21) & (scoreA > 21)){
            return ("DRAW");
        }
        return null;
    }
}
