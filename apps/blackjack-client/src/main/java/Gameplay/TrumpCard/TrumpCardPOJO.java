package Gameplay.TrumpCard;

import lombok.Getter;
import lombok.Setter;

import javax.swing.ImageIcon;


public class TrumpCardPOJO {
    @Getter
    @Setter
    private String name;
    @Getter
    @Setter
    private ImageIcon image;
    
    public TrumpCardPOJO(String name, ImageIcon image){
        this.name = name;
        this.image = image;
    }
}
