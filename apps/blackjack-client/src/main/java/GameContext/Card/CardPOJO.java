package GameContext.Card;

import lombok.Getter;
import lombok.Setter;

import javax.swing.ImageIcon;



public class CardPOJO {
    @Getter
    @Setter
    private String displayName; // name card
    @Getter
    @Setter
    private int value;
    @Getter
    @Setter
    private ImageIcon image; // image

    public CardPOJO(String displayName, int value, ImageIcon image) {
        this.displayName = displayName;
        this.value = value;
        this.image = image;
    }

    public CardPOJO() {
        this("", 0, null);
    }
}

