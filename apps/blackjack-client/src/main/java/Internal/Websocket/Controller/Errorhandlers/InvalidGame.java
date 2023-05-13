package Internal.Websocket.Controller.Errorhandlers;

import org.json.simple.JSONObject;

public class InvalidGame implements WebsocketErrorHandler {
    @Override
    public void handler(JSONObject error) {
        System.out.println("in game");
        String des = (String) error.get("description");
        new ErrorPane(des, error);
    }
}
