
package UI.Demo.Model;
import UI.Demo.Display.LoginDisplayGUI;

public class LoginModel {
    private String playerName;
    private LoginDisplayGUI loginGUI = new LoginDisplayGUI();
    
    public LoginModel(){
        playerName = loginGUI.getInputName().getText();
    }

    public String getPlayerName() {
        return playerName;
    }

    public void setPlayerName(String playerName) {
        this.playerName = playerName;
    }
    
}
