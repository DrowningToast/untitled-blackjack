package Internal.Websocket.Controller.Errorhandlers;

import org.json.simple.JSONObject;

public class ExistedUser implements WebsocketErrorHandler {
    @Override
    public void handler(JSONObject error) {
        JSONObject newObj = (JSONObject) error.get("error");
        String description = (String) newObj.get("description");
        new ErrorPane(description,error);
    }
}
