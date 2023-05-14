package Gameplay.TrumpCard;
import java.util.HashMap;
import javax.swing.ImageIcon;
public class TrumpCardHandler {

    private HashMap<String, TrumpCardPOJO> chips,iconStatus;
    private ClassLoader classLoader = getClass().getClassLoader();

    public TrumpCardHandler() {
//        The chip that Hit a card
        chips.put("Hit A", new TrumpCardPOJO("Hit A", new ImageIcon("resources/HitA.PNG")));
        chips.put("Hit 3", new TrumpCardPOJO("Hit 3", new ImageIcon("resources/Hit3.PNG")));
        chips.put("Hit 5", new TrumpCardPOJO("Hit 5", new ImageIcon("resources/Hit5.PNG")));
        chips.put("Hit 7", new TrumpCardPOJO("Hit 7", new ImageIcon("resources/Hit7.PNG")));
        chips.put("Hit 10", new TrumpCardPOJO("Hit 10", new ImageIcon("resources/Hit10.PNG")));
//        The attack chip
        chips.put("Remove Last Card", new TrumpCardPOJO("Remove enemy's last card", new ImageIcon("resources/RemoveLastCard.PNG")));
        chips.put("Blind Draw", new TrumpCardPOJO("Enemy can't see their next hit card", new ImageIcon("resources/BlindDraw.PNG")));
        chips.put("Deny Hit", new TrumpCardPOJO("Can't hit anymore card in that round", new ImageIcon("resources/DenyHit.PNG")));
        chips.put("Deny Use Trump Chip", new TrumpCardPOJO("Enemy can't use trumpchip", new ImageIcon("resources/DenyUseTrumpChip.PNG")));
        chips.put("Max Card Opponent", new TrumpCardPOJO("Give the most value card in deck to enemy", new ImageIcon("resources/MaxCardOpponent.PNG")));
//        The utility chip
        chips.put("Change Point Limit 25", new TrumpCardPOJO("Change limit to 25", new ImageIcon("resources/ChangePointLimit25.PNG")));
        chips.put("Undo hit", new TrumpCardPOJO("Remove my last card", new ImageIcon("resources/UndoHit.PNG")));
        chips.put("Invincibility", new TrumpCardPOJO("Protect chip", new ImageIcon("resources/Invincibility.PNG")));
        chips.put("See Next Hit", new TrumpCardPOJO("Player will be notified what the next 2 cards in the deck are", new ImageIcon("resources/SeeNextHit.PNG")));
    }
    
    public void iconStatusImage(){
//      Invincible
        iconStatus.put("Invincible", new TrumpCardPOJO("Invincible", new ImageIcon("resources/Invincible_Status.PNG")));
//      Blind
        iconStatus.put("Blind", new TrumpCardPOJO("Make the opponent blind", new ImageIcon("resources/Blind_Status.PNG")));
//      Deny hit
        iconStatus.put("Deny hit", new TrumpCardPOJO("The opponent can't hit card", new ImageIcon("resources/Deny_hit_Status.PNG")));
//      Deny trump use
        iconStatus.put("Deny trump use", new TrumpCardPOJO("The opponent can't use trump chip", new ImageIcon("resources/Deny_Trump_Use_Status.PNG")));
}

    public HashMap<String, TrumpCardPOJO> getHashMapChip() {
        return chips;
    }

    public HashMap<String, TrumpCardPOJO> getIconStatus() {
        return iconStatus;
    }
}
