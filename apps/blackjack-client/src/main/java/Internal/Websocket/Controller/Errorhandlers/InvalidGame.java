package Internal.Websocket.Controller.Errorhandlers;

import org.json.simple.JSONObject;

public class InvalidGame implements WebsocketErrorHandler {
    @Override
    public void handler(JSONObject des) {
        System.out.println("in game");
        String error = (String) des.get("description");
        new ErrorPane(error,des);
    }
}
