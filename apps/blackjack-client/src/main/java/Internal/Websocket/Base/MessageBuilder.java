package Internal.Websocket.Base;

import Internal.JSON.JSON;
import jakarta.websocket.Session;

import java.io.IOException;
import java.util.HashMap;

public class MessageBuilder {
    private Session session;
    private WebsocketClientEndpoint client;

    private String handler;
    private HashMap content = new HashMap();


    public MessageBuilder(WebsocketClientEndpoint client) {
        this.client = client;
        this.session = client.getSession();
    }

    // set handler method, returns this
    public MessageBuilder setHandler(String handler) {
        this.handler = handler;
        return this;
    }

    // send content, accepts hashmap, returns this
    public MessageBuilder setContent(HashMap map) {
        this.content = map;
        return this;
    }

    // send the message method, returns void
    public void send() throws IOException {
        // convert them to json
        content.put("handler", handler);
        String rawMessage = JSON.parseHashMaptoString(content);
        session.getBasicRemote().sendText(rawMessage);
    }
}
