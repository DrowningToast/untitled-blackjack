package Player;


import UI.Demo.Model.Card;
import UI.Demo.Model.TrumpChip;

import java.util.ArrayList;

public class PlayerModel {

    private String name;
    private boolean status = true;
    private int score;
    private String connectionId;
     //player's card
    private ArrayList<Card> myCard = new ArrayList<Card>();
     //player's chip
    private ArrayList<TrumpChip> myTrumpChip = new ArrayList<TrumpChip>();
    
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }
    
    public void addMyCard(Card myCard){
        this.myCard.add(myCard);
    }
    
    public ArrayList<Card> getMyCard() {
        return myCard;
    }
    
    public void addMyTrumpChip(TrumpChip myChip){
        this.myTrumpChip.add(myChip);
    }
    
    public ArrayList<TrumpChip> getMyTrumpChip() {
        return myTrumpChip;
    }

    public String getConnectID() {
        return connectionId;
    }

    public void setConnectID(String connectionId) {
        this.connectionId= connectionId;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }
    
    public int getCardsCount(){
        return myCard.size();
    }
    
    public int getTrumpCount(){
        return myTrumpChip.size();
    }
    
}
