package GameContext.Sounds;

import lombok.Getter;
import lombok.Setter;

import javax.sound.sampled.*;
import java.io.File;
import java.io.IOException;

public class SoundPOJO implements Runnable {
    @Getter
    @Setter
    private String handler;
    @Getter
    @Setter
    private String path;
    @Getter
    @Setter
    private File file;

    @Getter
    @Setter
    private Clip clip;
    @Getter
    @Setter
    private boolean loop;

    @Getter
    @Setter
    private FloatControl gainControl;


    public SoundPOJO(String handler, String filePath) {
        this(handler, new File(filePath), false);
    }

    public SoundPOJO(String handler, String filePath, boolean loop) {
        this(handler, new File(filePath), loop);
    }

    public SoundPOJO(String handler, File file) {
        this(handler, file, false);
    }

    public SoundPOJO(String handler, File file, boolean loop) {
        this.handler = handler;
        this.path = file.getPath();
        this.file = file;
        this.loop = loop;
    }


    @Override
    public void run() {
        try {
            AudioInputStream audioInputStream = AudioSystem.getAudioInputStream(this.getFile().getAbsoluteFile());
            clip = AudioSystem.getClip();


            // play sound
            if (clip != null) {
                clip.setFramePosition(0);
                clip.open(audioInputStream);
                gainControl = (FloatControl) clip.getControl(FloatControl.Type.MASTER_GAIN);
                gainControl.setValue(-15.0f);
                System.out.println(gainControl.toString());

                if (loop) {
                    clip.loop(-1);
                } else {
                    clip.start();

                }
            }
        } catch (Exception e) {
            System.out.println(e.toString());
            e.printStackTrace();
        }

    }
}
