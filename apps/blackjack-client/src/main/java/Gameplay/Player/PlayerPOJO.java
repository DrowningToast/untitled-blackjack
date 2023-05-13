package Gameplay.Player;


import Gameplay.Card.CardController;
import Gameplay.Card.CardPOJO;
import Gameplay.TrumpChip.TrumpChip;
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
    @Getter
    @Setter
    private CardController cardController = new CardController();

    //player's card
    private ArrayList<CardPOJO> myCardPOJO = new ArrayList<CardPOJO>();
    //player's chip
    private ArrayList<TrumpChip> myTrumpChip = new ArrayList<TrumpChip>();

    public void addMyCard(CardPOJO myCardPOJO) {
        this.myCardPOJO.add(myCardPOJO);
    }

    public ArrayList<CardPOJO> getMyCardPOJO() {
        return myCardPOJO;
    }

    public void addMyTrumpChip(TrumpChip myChip) {
        this.myTrumpChip.add(myChip);
    }

    public ArrayList<TrumpChip> getMyTrumpChip() {
        return myTrumpChip;
    }

    public int getCardsCount() {
        return myCardPOJO.size();
    }

    public int getTrumpCount() {
        return myTrumpChip.size();
    }

}
