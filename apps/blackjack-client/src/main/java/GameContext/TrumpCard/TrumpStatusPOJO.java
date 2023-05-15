package GameContext.TrumpCard;

import lombok.Getter;
import lombok.Setter;

import javax.swing.*;

public class TrumpStatusPOJO {
    @Getter
    @Setter
    private String displayName, description, handler;
    @Getter
    @Setter
    private ImageIcon image;

    public TrumpStatusPOJO(String displayName, String description, String handler, ImageIcon image){
        this.displayName = displayName;
        this.description = description;
        this.handler = handler;
        this.image = image;
    }
}
