package UI.PH_Gameplay.Display;

import UI.Controller.UIController;
import lombok.Getter;

public class GamePlayController {
    private UIController uiController;
    @Getter
    private GamePlayDisplayGUI ui;

    public GamePlayController(UIController uiController){
        this.uiController = uiController;

    }
}
