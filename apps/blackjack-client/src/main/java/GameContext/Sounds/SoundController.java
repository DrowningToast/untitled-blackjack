package GameContext.Sounds;

import java.io.File;
import java.util.HashMap;

public class SoundController {
    private static HashMap<String, SoundPOJO> SOUNDS = new HashMap<>();

    public SoundController() {
        SOUNDS.put("win", new SoundPOJO("win", new File("sounds/win.wav")));
        SOUNDS.put("lose", new SoundPOJO("lose", new File("sounds/lose.wav")));
        SOUNDS.put("opponentJoinRoom", new SoundPOJO("opponentJoinRoom", new File("sounds/opponentJoinRoom.wav")));
        SOUNDS.put("drawTrumpCard", new SoundPOJO("drawTrumpCard", new File("sounds/drawTrumpCard.wav")));
        SOUNDS.put("drawTrumpCard_2", new SoundPOJO("drawTrumpCard_2", new File("sounds/drawTrumpCard_2.wav")));
        SOUNDS.put("drawCard", new SoundPOJO("drawCard", new File("sounds/drawCard.wav")));
        SOUNDS.put("stand", new SoundPOJO("stand", new File("sounds/stand.wav")));

        SOUNDS.put("shuffleCard", new SoundPOJO("shuffleCard", new File("sounds/shuffleCard.wav")));
        SOUNDS.put("backgroundCasinoSound", new SoundPOJO("backgroundCasinoSound", new File("sounds/backgroundCasinoSound.wav"),true));
    }

    public static HashMap<String, SoundPOJO> getSOUNDS() {
        return SOUNDS;
    }

    public void playSound(String handler) {
        Thread thread = new Thread(SOUNDS.get(handler));
        thread.start();
    }

}
