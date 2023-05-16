package GameContext.Sounds;

import lombok.Getter;
import lombok.Setter;

import javax.sound.sampled.*;
import java.io.File;

public class SoundPOJO {
    @Getter
    @Setter
    private String handler;
    @Getter
    @Setter
    private String path;
    @Getter
    @Setter
    private File file;
    private Clip clip;
    public SoundPOJO(String handler, String filePath) {
        this(handler, new File(filePath));
    }

    public SoundPOJO(String handler, File file) {
        this.handler = handler;
        this.path = file.getPath();
        this.file = file;
    }


    public void play() {

        if (clip != null) {
            clip.setFramePosition(0);
            clip.start();
            System.out.println("Sound on!");
        }
    }

    public void loop() {
        if (clip != null) {
            clip.loop(Clip.LOOP_CONTINUOUSLY);
        }
    }

    public void stop() {
        if (clip != null) {
            clip.stop();
        }
    }
}
