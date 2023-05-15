package GameContext.Log;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

public class LogController {
    @Getter
    private ArrayList<String> log = new ArrayList<>();

    public void addLog(String message){
        log.add(message);
    }

    public void clearLog(){
        this.log.clear();
        System.out.println("Clear log");
    }
}
