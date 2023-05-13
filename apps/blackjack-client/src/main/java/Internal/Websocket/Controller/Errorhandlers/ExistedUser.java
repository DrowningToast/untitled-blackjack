package Internal.Websocket.Controller.Errorhandlers;

import org.json.simple.JSONObject;

public class ExistedUser implements WebsocketErrorHandler {

    @Override
    public void handler(JSONObject des) {
        System.out.println("ex user");
        JSONObject newObj = (JSONObject) des.get("error");
        String error = (String) newObj.get("description");
        System.out.println(error);
        new ErrorPane(error,des);
    }
}
