package Gameplay.Player;

import lombok.Getter;
import lombok.Setter;

public class PlayerModel {
    @Getter @Setter
    private PlayerPOJO player = new PlayerPOJO();
    public void initData () {
//        setPlayer();
    }
}
