package Development;


import java.awt.Image;
import javax.swing.ImageIcon;
public class Card {
 
    private String displayName; // name card
    private int value;
    private ImageIcon image; // image

    public Card(String displayName, int value, ImageIcon image) {
        this.displayName = displayName;
        this.value = value;
        this.image = image;
    }

    public Card() {
        
    }
    // get and set name
    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }
    
    // get Image
    public ImageIcon getImage() {
        return this.image;
    }
//    
//    public void setPathIcon(String image) {
//        this.image = image;
//    }
//    
//     get and set value
    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }
}

