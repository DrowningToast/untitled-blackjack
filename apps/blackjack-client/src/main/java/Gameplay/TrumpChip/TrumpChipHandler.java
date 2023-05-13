package Gameplay.TrumpChip;
import java.util.HashMap;
import javax.swing.ImageIcon;
public class TrumpChipHandler {

    private HashMap<String, TrumpChip> chips,iconStatus;
    private ClassLoader classLoader = getClass().getClassLoader();

    public TrumpChipHandler() {
//        The chip that Hit a card
        chips.put("Hit A", new TrumpChip("Hit A", new ImageIcon("resources/HitA.PNG")));
        chips.put("Hit 3", new TrumpChip("Hit 3", new ImageIcon("resources/Hit3.PNG")));
        chips.put("Hit 5", new TrumpChip("Hit 5", new ImageIcon("resources/Hit5.PNG")));
        chips.put("Hit 7", new TrumpChip("Hit 7", new ImageIcon("resources/Hit7.PNG")));
        chips.put("Hit 10", new TrumpChip("Hit 10", new ImageIcon("resources/Hit10.PNG")));
//        The attack chip
        chips.put("Remove Last Card", new TrumpChip("Remove enemy's last card", new ImageIcon("resources/RemoveLastCard.PNG")));
        chips.put("Blind Draw", new TrumpChip("Enemy can't see their next hit card", new ImageIcon("resources/BlindDraw.PNG")));
        chips.put("Deny Hit", new TrumpChip("Can't hit anymore card in that round", new ImageIcon("resources/DenyHit.PNG")));
        chips.put("Deny Use Trump Chip", new TrumpChip("Enemy can't use trumpchip", new ImageIcon("resources/DenyUseTrumpChip.PNG")));
        chips.put("Max Card Opponent", new TrumpChip("Give the most value card in deck to enemy", new ImageIcon("resources/MaxCardOpponent.PNG")));
//        The utility chip
        chips.put("Change Point Limit 25", new TrumpChip("Change limit to 25", new ImageIcon("resources/ChangePointLimit25.PNG")));
        chips.put("Undo hit", new TrumpChip("Remove my last card", new ImageIcon("resources/UndoHit.PNG")));
        chips.put("Invincibility", new TrumpChip("Protect chip", new ImageIcon("resources/Invincibility.PNG")));
        chips.put("See Next Hit", new TrumpChip("Player will be notified what the next 2 cards in the deck are", new ImageIcon("resources/SeeNextHit.PNG")));
    }
    
    public void iconStatusImage(){
//      Invincible
        iconStatus.put("Invincible", new TrumpChip("Invincible", new ImageIcon("resources/Invincible_Status.PNG")));
//      Blind
        iconStatus.put("Blind", new TrumpChip("Make the opponent blind", new ImageIcon("resources/Blind_Status.PNG")));
//      Deny hit
        iconStatus.put("Deny hit", new TrumpChip("The opponent can't hit card", new ImageIcon("resources/Deny_hit_Status.PNG")));
//      Deny trump use
        iconStatus.put("Deny trump use", new TrumpChip("The opponent can't use trump chip", new ImageIcon("resources/Deny_Trump_Use_Status.PNG")));
}

    public HashMap<String, TrumpChip> getHashMapChip() {
        return chips;
    }

    public HashMap<String, TrumpChip> getIconStatus() {
        return iconStatus;
    }
}
