package Development;

import java.util.HashMap;
import javax.swing.ImageIcon;

public class TrumpChipHandler {

    private HashMap<String, TrumpChip> chips;
    private ClassLoader classLoader = getClass().getClassLoader();

    public TrumpChipHandler() {
//        The chip that Hit a card
        chips.put("Hit A", new TrumpChip("Hit A", new ImageIcon()));
        chips.put("Hit 3", new TrumpChip("Hit 3", new ImageIcon()));
        chips.put("Hit 5", new TrumpChip("Hit 5", new ImageIcon()));
        chips.put("Hit 7", new TrumpChip("Hit 7", new ImageIcon()));
        chips.put("Hit 10", new TrumpChip("Hit 10", new ImageIcon()));
//        The attack chip
        chips.put("Remove enemy's last card", new TrumpChip("Remove enemy's last card", new ImageIcon()));
        chips.put("Enemy can't see their next hit card", new TrumpChip("Enemy can't see their next hit card", new ImageIcon()));
        chips.put("Can't hit anymore card in that round", new TrumpChip("Can't hit anymore card in that round", new ImageIcon()));
        chips.put("Enemy can't use trumpchip", new TrumpChip("Enemy can't use trumpchip", new ImageIcon()));
        chips.put("Give the max value card in deck to enemy", new TrumpChip("Give the max value card in deck to enemy", new ImageIcon()));
        chips.put("Know upside down card", new TrumpChip("Know upside down card", new ImageIcon()));
//        The utility chip
        chips.put("Change limite to 25", new TrumpChip("Change limite to 25", new ImageIcon()));
        chips.put("Remove last card", new TrumpChip("Remove last card", new ImageIcon()));
        chips.put("Protect chip", new TrumpChip("Protect chip", new ImageIcon()));
        chips.put("Enemy can't see your card", new TrumpChip("Enemy can't see your card", new ImageIcon()));
    }

    public HashMap<String, TrumpChip> getHashMapChip() {
        return chips;
    }
}
