package GameContext.Player;

import lombok.Getter;
import lombok.Setter;

public class PlayerModel {
    @Getter @Setter
    private PlayerPOJO POJO = new PlayerPOJO();
    public void initData () {
//        setPlayer();
    }
}
