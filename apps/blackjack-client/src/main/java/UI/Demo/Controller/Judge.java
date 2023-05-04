package UI.Demo.Controller;
import Development.Card;
import Development.CardHandler;
import Development.Player;
import Development.TrumpChip;
import UI.Demo.Display.*;

import java.util.*;

public class Judge {

    private static final CardHandler CARDS = new CardHandler();
    private static HashMap<String, Card> deckCard = CARDS.getHashMap(); //deckCard have hashmap of handler
    private static ArrayList<TrumpChip> deckChip;
    // Players in the game
    private static ArrayList<Player> players = new ArrayList<Player>();
    private static Player currentPlayer;
    private static Random random = new Random();
    private static boolean isEndGame = false;
    private static GamePlayDisplayGUI gameGUI = new GamePlayDisplayGUI();
    private static Player playerOne = new Player();
    private static Player playerTwo = new Player();
    

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
    public static void join(Player p) {
        if (players.size() <= 2) {
            players.add(p);
        } else {
            System.out.println("Error");
        }
    }

    public static void setCurrentPlayer(Player currentPlayer) {
        Judge.currentPlayer = currentPlayer;
    }
    
    

    // getter which turn th game current is
    public static Player getPlayerTurn() {
        return currentPlayer;
    }
//    

    // Switch play turn
    public static void switchTurn() {
        if (currentPlayer.equals(players.get(0))) {
            currentPlayer = players.get(1);
        } else {
            currentPlayer = players.get(0);
        }
    }
    public void currentTurnPlayer(){
        if(currentPlayer == players.get(0)){
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
    
    public void stand(){
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
