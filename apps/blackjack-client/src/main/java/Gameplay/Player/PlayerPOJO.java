package Gameplay.Player;


import Gameplay.Card.CardController;
import Gameplay.Card.CardPOJO;
import Gameplay.TrumpCard.TrumpCardPOJO;
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
    private ArrayList<TrumpCardPOJO> myTrumpCardPOJO = new ArrayList<TrumpCardPOJO>();

    public void addMyCard(CardPOJO myCardPOJO) {
        this.myCardPOJO.add(myCardPOJO);
    }

    public ArrayList<CardPOJO> getMyCardPOJO() {
        return myCardPOJO;
    }

    public void addMyTrumpChip(TrumpCardPOJO myChip) {
        this.myTrumpCardPOJO.add(myChip);
    }

    public ArrayList<TrumpCardPOJO> getMyTrumpCardPOJO() {
        return myTrumpCardPOJO;
    }

    public int getCardsCount() {
        return myCardPOJO.size();
    }

    public int getTrumpCount() {
        return myTrumpCardPOJO.size();
    }

}
