package Internal.UserInterface;

import GameContext.Sounds.SoundPOJO;
import Internal.Websocket.Controller.WebsocketController;
import UI.Login.LoginDisplayGUI;

import javax.swing.*;
import java.util.HashMap;

public class UIController {

    // Attribute ACTIVE WINDOW
    CustomFrame activeFrame;
    private WebsocketController wsController;
    private HashMap<String, CustomFrame> scenes = new HashMap<>();

    private SoundPOJO sound;

    // Methods for switching active windows
    public void switchActiveWindow(CustomFrame frame) {
//        sound = new SoundPOJO();
        activeFrame.dispose();
        System.out.println(frame);
        frame.pack();
        frame.setVisible(true);
        frame.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
        activeFrame = frame;
        frame.onSwitch();
//        sound.play();
//        sound.loop();


    }

    public void switchActiveWindow(String frameName) {
        try {
            CustomFrame frame = scenes.get(frameName);
            if (frame == null) {
                throw new Exception();
            }
            switchActiveWindow(frame);
        } catch (Exception e) {
            System.out.println("INVALID FRAME NAME");
            e.printStackTrace();
        }
    }

    public UIController(WebsocketController wsController) {
        this.wsController = wsController;
        CustomFrame firstFrame = toFirstScene();

        activeFrame = firstFrame;
    }

    public CustomFrame toFirstScene() {
        // HARD CODE
        CustomFrame firstFrame = new LoginDisplayGUI(wsController);
        firstFrame.pack();
        firstFrame.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
        firstFrame.setVisible(true);
        return firstFrame;
    }

    public void add(String key, CustomFrame value) {
        scenes.put(key, value);
    }

    public JFrame getFrame(String name) {

        JFrame frame = scenes.get(name);
        if (frame == null) {
            System.out.println("FATAL FAIL");
            return null;
        }
        return frame;
    }

    public void update(){
        activeFrame.onUpdate();
    }

}
