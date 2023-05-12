package ClientEndPoint.Controller.EventHandlers;

import java.util.HashMap;

@FunctionalInterface
public interface WebsocketEventHandler {
    void handler(HashMap<String, String> content);
}
