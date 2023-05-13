package Internal.Websocket.Controller.Errorhandlers;

import org.json.simple.JSONObject;

public interface WebsocketErrorHandler {
    void handler(JSONObject error);
}
