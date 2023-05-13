package Internal.Websocket.Controller.Errorhandlers;

import org.json.simple.JSONObject;

public class InvalidUser implements WebsocketErrorHandler {
    @Override
    public void handler(JSONObject des) {
        System.out.println("in user");
        String error = (String) des.get("description");
        new ErrorPane(error,des);
    }
}
