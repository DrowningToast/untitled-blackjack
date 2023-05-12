package Gameplay.Player;


import UI.PH_Gameplay.Model.Card;
import UI.PH_Gameplay.Model.TrumpChip;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

public class PlayerPOJO {
    @Getter
    @Setter
    private String username, connectionId;
    @Getter
    @Setter
    private boolean stand = true, ready;
    @Getter
    @Setter
    private int score;

    //player's card
    private ArrayList<Card> myCard = new ArrayList<Card>();
    //player's chip
    private ArrayList<TrumpChip> myTrumpChip = new ArrayList<TrumpChip>();

    public void addMyCard(Card myCard) {
        this.myCard.add(myCard);
    }

    public ArrayList<Card> getMyCard() {
        return myCard;
    }

    public void addMyTrumpChip(TrumpChip myChip) {
        this.myTrumpChip.add(myChip);
    }

    public ArrayList<TrumpChip> getMyTrumpChip() {
        return myTrumpChip;
    }

    public int getCardsCount() {
        return myCard.size();
    }

    public int getTrumpCount() {
        return myTrumpChip.size();
    }

}
