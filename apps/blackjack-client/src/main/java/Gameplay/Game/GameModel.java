package Gameplay.Game;

import com.google.gson.Gson;
import lombok.Getter;
import lombok.Setter;

import java.util.HashMap;

public class GameModel {
    @Getter
    @Setter
    private GamePOJO game = new GamePOJO();

    // First set of data from the backend
    public void parseGameData(HashMap data) {
        Gson gson = new Gson();
        setGame(gson.fromJson(gson.toJson(data), GamePOJO.class));
    }

}
