package UI.Demo.Controller;
import UI.Demo.Model.Card;
import UI.Demo.Model.CardHandler;
import UI.Demo.Model.TrumpChip;
import UI.Demo.Model.Player;
import UI.Demo.Display.*;
import java.util.*;

public class GameSystem {   
    private static final CardHandler CARDS = new CardHandler();
    private static HashMap<String, Card> deckCard = CARDS.getHashMap(); //deckCard have hashmap of handler
    private static ArrayList<TrumpChip> deckChip;
    // Players in the game
    private static ArrayList<Player> players = new ArrayList<Player>();
    private static Player currentTurnPlayer = new Player();
    private static Random random = new Random();
    private static boolean isEndGame = false;
    private static GamePlayDisplayGUI gameGUI = new GamePlayDisplayGUI();
    
    public static Card giveCard(Player p) {
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
    public static void join(Player player) {
        if (players.size() <= 2) {
            players.add(player);
        } else {
            System.out.println("Error");
        }
    }

    public static void setCurrentPlayer(Player currentTurnPlayer) {
        GameSystem.currentTurnPlayer = currentTurnPlayer;
    }

    // getter which turn th game current is
    public static Player getPlayerTurn() {
        return currentTurnPlayer;
    }
    
    // Switch play turn
    public static void switchTurn() {
        if (currentTurnPlayer.equals(players.get(0))) {
            currentTurnPlayer = players.get(1);
        } else {
            currentTurnPlayer = players.get(0);
        }
    }
    public void currentTurnPlayer(){
        if(currentTurnPlayer == players.get(0)){
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
    public static ArrayList<Player> getAllPlayers() {
        return players;
    }
    
    public void stand(Player playerOne, Player playerTwo){
        if(((playerOne.isStatus() == false) & (playerTwo.isStatus() == true))|((playerOne.isStatus() == true) & (playerTwo.isStatus() == false))){
            switchTurn();
        }
        else{
            CalculateScore(playerOne.getScore(), playerTwo.getScore());
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
