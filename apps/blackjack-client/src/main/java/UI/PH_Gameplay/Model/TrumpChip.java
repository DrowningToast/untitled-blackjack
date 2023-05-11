package UI.PH_Gameplay.Model;

import javax.swing.ImageIcon;


public class TrumpChip {
    private String name;
    private ImageIcon image;
    
    public TrumpChip(String name, ImageIcon image){
        this.name = name;
        this.image = image;
    }

    public String getname() {
        return name;
    }

    public void setname(String name) {
        this.name = name;
    }

    public ImageIcon getImage() {
        return image;
    }

    public void setImage(ImageIcon image) {
        this.image = image;
    }
    
}
