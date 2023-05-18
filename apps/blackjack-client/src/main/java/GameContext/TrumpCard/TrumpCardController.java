package GameContext.TrumpCard;

import java.util.ArrayList;
import java.util.HashMap;
import javax.swing.*;

public class TrumpCardController {

    private static HashMap<String, TrumpCardPOJO> CARDS = new HashMap<>();
    private static HashMap<String, TrumpStatusPOJO> STATUSES = new HashMap<>();

    private ArrayList<TrumpCardPOJO> POJOS = new ArrayList<>();
    private ArrayList<TrumpStatusPOJO> status = new ArrayList<>();

    public TrumpCardController() {
//        The chip that Hit a card


        CARDS.put("ace", new TrumpCardPOJO("hit A.", "Draw Ace card from the deck. If this card already on the table, nothing will happen.", "ace", "DRAW", new ImageIcon("resources/HitA.PNG")));
        CARDS.put("three", new TrumpCardPOJO("hit 3.", "Draw Three card from the deck. If this card already on the table, nothing will happen.", "three", "DRAW", new ImageIcon("resources/Hit3.PNG")));
        CARDS.put("five", new TrumpCardPOJO("hit 5.", "Draw Five card from the deck. If this card already on the table, nothing will happen.", "five", "DRAW", new ImageIcon("resources/Hit5.PNG")));
        CARDS.put("seven", new TrumpCardPOJO("hit 7.", "Draw Seven card from the deck. If this card already on the table, nothing will happen.", "seven", "DRAW", new ImageIcon("resources/Hit7.PNG")));
        CARDS.put("tens", new TrumpCardPOJO("hit 10.", "Draw any cards that its value equals to 10 left in the deck. If this card already on the table, nothing will happen.", "tens", "DRAW", new ImageIcon("resources/Hit10.PNG")));
//        The attack chip
        CARDS.put("removeLastCard", new TrumpCardPOJO("removed opponent last card.", "Remove opponent's last card. *Does not effect opponent first 2 cards*", "removeLastCard", "ATTACK", new ImageIcon("resources/RemoveLastCard.PNG")));
        CARDS.put("blind", new TrumpCardPOJO("blinded their opponent.", "Opponent can't see any cards for one round.", "blind", "ATTACK", new ImageIcon("resources/BlindDraw.PNG")));
        CARDS.put("denyHit", new TrumpCardPOJO("prevent opponent from performing hit.", "Opponent cannot hit for one round.", "denyHit", "ATTACK", new ImageIcon("resources/DenyHit.PNG")));
        CARDS.put("denyUseTrumpCard", new TrumpCardPOJO("prevent opponent from performing trump cards.", "Opponent cannot use their trump cards for one round.", "denyUseTrumpCard", "ATTACK", new ImageIcon("resources/DenyUseTrumpChip.PNG")));
        CARDS.put("maxCardOpponent", new TrumpCardPOJO("drew opponent the most value card in the deck.", "Give the most value card left in deck to enemy. *Start in order from Ace to 2*", "maxCardOpponent", "ATTACK", new ImageIcon("resources/MaxCardOpponent.PNG")));
//        The utility chip
        CARDS.put("seeNextHit", new TrumpCardPOJO("saw next 2 cards from the deck.", "Player will be notified what the next 2 cards in being draw next.", "seeNextHit", "UTILITY", new ImageIcon("resources/SeeNextHit.PNG")));
        CARDS.put("changePointsLimit25", new TrumpCardPOJO("change point target to 25.", "Change round win condition to 25 instead of 21.", "changePointsLimit25", "UTILITY", new ImageIcon("resources/ChangePointLimit25.PNG")));
        CARDS.put("undoHit", new TrumpCardPOJO("remove their last card.", "Remove your latest card drawn. *Does not effect your first 2 cards*", "undoHit", "UTILITY", new ImageIcon("resources/UndoHit.PNG")));
        CARDS.put("invincibility", new TrumpCardPOJO("cleanse and protect themself from status and effect.", "Protect you from being attack by opponent's ATTACK trump cards / cleanse all your negative status in this round.", "invincibility", "UTILITY", new ImageIcon("resources/Invincibility.PNG")));

//        TrumpCard's status
        STATUSES.put("INVINCIBLE", new TrumpStatusPOJO("INVINCIBLE", "Protect player from being attack by opponent's ATTACK trump cards in this round.", "INVINCIBILITY",  new ImageIcon("resources/Invincible_Status.PNG")));
        STATUSES.put("BLIND", new TrumpStatusPOJO("BLIND", "The player can't see any cards for one round.", "BLIND",  new ImageIcon("resources/Blind_Status.PNG")));
        STATUSES.put("DENY_HIT", new TrumpStatusPOJO("DENY HIT", "The player cannot hit in this round.", "DENY_HIT",  new ImageIcon("resources/Deny_hit_Status.PNG")));
        STATUSES.put("DENY_TRUMP_USE", new TrumpStatusPOJO("DENY TRUMP USE", "The player cannot use their trump cards.", "DENY_TRUMP_USE",  new ImageIcon("resources/Deny_Trump_Use_Status.PNG")));

    }

    public void setPOJOS(ArrayList<TrumpCardPOJO> POJOS) {
        this.POJOS = POJOS;
    }

    public void setStatus(ArrayList<TrumpStatusPOJO> status) { this.status = status;}

    public static HashMap<String, TrumpCardPOJO> getCARDS() {
        return CARDS;
    }

    public static HashMap<String, TrumpStatusPOJO> getSTATUSES() { return STATUSES;}

    public ArrayList<TrumpCardPOJO> getPOJOS() {
        return this.POJOS;
    }

    public ArrayList<TrumpStatusPOJO> getSTATUS() {
        return this.status;
    }

    public void resetStatus(){
        this.status.clear();
        System.out.println("Reset player's status");
    }
}
