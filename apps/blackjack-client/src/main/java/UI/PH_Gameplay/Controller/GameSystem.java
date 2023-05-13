package UI.PH_Gameplay.Controller;
import Gameplay.Card.CardPOJO;
import Gameplay.Card.CardController;
import Gameplay.TrumpChip.TrumpChip;
import Gameplay.Player.PlayerPOJO;
import UI.PH_Gameplay.Display.*;
import java.util.*;

public class GameSystem {   
    private static final CardController CARDS = new CardController();
    private static HashMap<String, CardPOJO> deckCard = CARDS.getHashMap(); //deckCard have hashmap of handler
    private static ArrayList<TrumpChip> deckChip;
    // Players in the game
    private static ArrayList<PlayerPOJO> playerPOJOS = new ArrayList<PlayerPOJO>();
    private static PlayerPOJO currentTurnPlayerPOJO = new PlayerPOJO();
    private static Random random = new Random();
    private static boolean isEndGame = false;
    private static GamePlayDisplayGUI gameGUI = new GamePlayDisplayGUI();
    
    public static CardPOJO giveCard(PlayerPOJO p) {
        Object[] values = deckCard.values().toArray();
        CardPOJO randomCardPOJO = (CardPOJO) values[random.nextInt(values.length)];

        if (isEndGame == true) {
            deckCard = CARDS.getHashMap();
            return null;
        } else if (deckCard.isEmpty() == true) {
            return null;
        } else {
            CardPOJO removeCardPOJO = deckCard.remove(randomCardPOJO.getDisplayName());
            p.addMyCard(removeCardPOJO);
            return removeCardPOJO;
        }
    }

    // player join the game
    public static void join(PlayerPOJO playerPOJO) {
        if (playerPOJOS.size() <= 2) {
            playerPOJOS.add(playerPOJO);
        } else {
            System.out.println("Error");
        }
    }

    public static void setCurrentPlayer(PlayerPOJO currentTurnPlayerPOJO) {
        GameSystem.currentTurnPlayerPOJO = currentTurnPlayerPOJO;
    }

    // getter which turn th game current is
    public static PlayerPOJO getPlayerTurn() {
        return currentTurnPlayerPOJO;
    }
    
    // Switch play turn
    public static void switchTurn() {
        if (currentTurnPlayerPOJO.equals(playerPOJOS.get(0))) {
            currentTurnPlayerPOJO = playerPOJOS.get(1);
        } else {
            currentTurnPlayerPOJO = playerPOJOS.get(0);
        }
    }
    public void currentTurnPlayer(){
        if(currentTurnPlayerPOJO == playerPOJOS.get(0)){
            gameGUI.getHitButtonPlayerOne().setEnabled(true);
            gameGUI.getStandButtonPlayerOne().setEnabled(true);
            System.out.println("1232131232");
            
//    }else{
//            gameGUI.getHitButtonPlayerTwo().setEnabled(false);
//            gameGUI.getStandButtonPlayerTwo().setEnabled(false);
//            System.out.println("asdasd");
        }
}

//    public static void endGame() {
//
//    }
//    return all Player
    public static ArrayList<PlayerPOJO> getAllPlayers() {
        return playerPOJOS;
    }
    
    public void stand(PlayerPOJO playerPOJOOne, PlayerPOJO playerPOJOTwo){
        if(((playerPOJOOne.isStand() == false) & (playerPOJOTwo.isStand() == true))|((playerPOJOOne.isStand() == true) & (playerPOJOTwo.isStand() == false))){
            switchTurn();
        }
        else{
            CalculateScore(playerPOJOOne.getScore(), playerPOJOTwo.getScore());
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
