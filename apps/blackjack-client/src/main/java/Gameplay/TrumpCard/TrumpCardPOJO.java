package Gameplay.TrumpCard;

import lombok.Getter;
import lombok.Setter;

import javax.swing.ImageIcon;


public class TrumpCardPOJO {
    @Getter
    @Setter
    private String displayName, description, handler, type;
    @Getter
    @Setter
    private ImageIcon image;

    public TrumpCardPOJO(String displayName, String description, String handler, String type, ImageIcon image) {
        this.displayName = displayName;
        this.image = image;
    }
}
