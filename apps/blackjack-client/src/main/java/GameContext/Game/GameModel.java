package GameContext.Game;

import com.google.gson.Gson;
import lombok.Getter;
import lombok.Setter;

import java.util.HashMap;

public class GameModel {
    @Getter
    @Setter
    private GamePOJO POJO = new GamePOJO();

    // First set of data from the backend
    public void parseGameData(HashMap data) {
        Gson gson = new Gson();
        setPOJO(gson.fromJson(gson.toJson(data), GamePOJO.class));
    }

}
