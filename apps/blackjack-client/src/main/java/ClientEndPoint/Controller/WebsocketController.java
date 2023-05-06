package ClientEndPoint.Controller;

import ClientEndPoint.Base.MessageBuilder;
import ClientEndPoint.Base.WebsocketClientEndpoint;
import ClientEndPoint.Controller.EventHandlers.WebsocketEventHandler;
import Internal.JSON.JSON;
import jakarta.websocket.DeploymentException;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.HashMap;

public class WebsocketController {
    private WebsocketClientEndpoint client;
    private HashMap eventHandlers;
    private String connectionId;
    private String gameId;

    public WebsocketController(HashMap<String, WebsocketEventHandler> eventHandlers) throws IOException, DeploymentException, URISyntaxException {
        this.client = new WebsocketClientEndpoint(this);
        client.connect();
        this.eventHandlers = eventHandlers;
    }

    public void setConnectionId(String conn) {
        this.connectionId = conn;
    }

    public String getConnectionId() {
        return connectionId;
    }

    public void sendAuth(String username) {
        try {
            HashMap body = new HashMap();
            body.put("username", username);

            System.out.println(username);

            MessageBuilder message = new MessageBuilder(client);
            message.setHandler("auth").setContent(body).send();
        } catch (Exception e) {
            System.out.println(e.toString());
        }
    }

    public void setReady(boolean ready) {
        try {
            MessageBuilder message = new MessageBuilder(client);
            message.setHandler("ready");
            HashMap content = new HashMap();
            content.put("ready", true);


            // SET GAME ID TO THE CONTENT

            message.setContent(content).send();

        } catch (Exception e) {

        }
    }

    public void handleMessage(String raw) {
        // Convert json string to hashmap
        HashMap<String, String> content = JSON.parseJSONtoHashMap(raw);

        // find out what handler it is
        String handler = content.get("handler");

        WebsocketEventHandler eventHandler = (WebsocketEventHandler) eventHandlers.get(handler);
        if (eventHandler == null) return;

        eventHandler.handler(content);
    }

}
