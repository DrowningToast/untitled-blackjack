package ClientEndPoint.Controller;

import ClientEndPoint.Base.MessageBuilder;
import ClientEndPoint.Base.WebsocketClientEndpoint;
import Internal.JSON.JSON;
import jakarta.jms.Message;
import jakarta.websocket.DeploymentException;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.HashMap;

public class WebsocketController {
    private WebsocketClientEndpoint client;
    private HashMap eventHandlers;

    public WebsocketController(HashMap<String, WebsocketEventHandler> eventHandlers) throws IOException, DeploymentException, URISyntaxException {
        this.client = new WebsocketClientEndpoint(this);
        client.connect();
        this.eventHandlers = eventHandlers;
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

    public void handleMessage(String raw) {
        // Convert json string to hashmap
        HashMap<String, String> content = JSON.parseJSONtoHashMap(raw);

        // find out what handler it is
        String handler = content.get("handler");

        System.out.println(handler);

        WebsocketEventHandler eventHandler = (WebsocketEventHandler) eventHandlers.get(handler);
        if (eventHandler == null) return;

        System.out.println("yes " + handler);

        System.out.println("SUPPORTED");
        eventHandler.handler(content);


        // call the method according to the handler

    }

}
