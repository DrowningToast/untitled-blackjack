package UI.Demo.Controller;

import java.io.IOException;

public class TestNetworkController {
    public static void main(String[] args) throws IOException {
        GameNetworkController nwctl = new GameNetworkController();
        nwctl.createRoom();
//        nwctl.getPing();
//        nwctl.JoinGame();
//        nwctl.LeaveGame();
    }
}
