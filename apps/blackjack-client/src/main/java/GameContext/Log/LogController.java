package GameContext.Log;

import Main.MainRunner;
import lombok.Getter;


import java.util.ArrayList;

public class LogController {
    @Getter
    private ArrayList<String> log = new ArrayList<>();

    public void addLog(String message){
        log.add(message);
        MainRunner.getGamePlayController().updateChatLog();
    }

    public void clearLog(){
        this.log.clear();
        MainRunner.getGamePlayController().clearLog();
    }
}
