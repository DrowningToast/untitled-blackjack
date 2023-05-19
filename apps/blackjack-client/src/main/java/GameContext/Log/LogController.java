package GameContext.Log;

import Main.MainRunner;
import lombok.Getter;


import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;

public class LogController {
    @Getter
    private ArrayList<String> log = new ArrayList<>();

    public void addLog(String message){
        LocalTime time = LocalTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm");
        log.add("[" + formatter.format(time) + "] " + message);
        MainRunner.getGamePlayController().updateChatLog();
    }

    public void clearLog(){
        this.log.clear();
        MainRunner.getGamePlayController().clearLog();
    }

}
