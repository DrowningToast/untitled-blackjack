package UI.PH_Gameplay.Controller;

import UI.PH_Gameplay.Display.DemoDisplay;

public class DemoDisplayController {

    DemoDisplay displayInstance;
    String name;

    public DemoDisplayController () {
        this.displayInstance = new DemoDisplay();
        this.displayInstance.initUI();
    }

    public DemoDisplayController (DemoDisplay demoDisplay) {
        this.displayInstance = demoDisplay;
        displayInstance.initUI();
    }

    private void updateUI () {
        displayInstance.getTestLabel().setText(name);
    }

    public void setDisplayName (String name) {
        this.name = name;
        updateUI();
    }

    public String getDisplayName () {
        return this.name;
    }

}
