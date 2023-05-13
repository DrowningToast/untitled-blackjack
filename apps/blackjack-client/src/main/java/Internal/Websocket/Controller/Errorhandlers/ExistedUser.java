package Internal.Websocket.Controller.Errorhandlers;

import org.json.simple.JSONObject;

public class ExistedUser implements WebsocketErrorHandler {

    @Override
    public void handler(JSONObject error) {
        System.out.println("ex user");
        String des = (String) error.get("description");
        new ErrorPane(des,error);
    }
}
