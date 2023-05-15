package Internal.Websocket.Base;

import Internal.Websocket.Controller.WebsocketController;
import jakarta.websocket.*;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import javax.swing.*;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;

@ClientEndpoint
public class WebsocketClientEndpoint {

    protected static Session session;
    protected static String username;

    private WebsocketController controller;

    public WebsocketClientEndpoint(WebsocketController controller) {
        this.controller = controller;
    }

    public void connect() throws DeploymentException, IOException, URISyntaxException {
        WebSocketContainer container = ContainerProvider.getWebSocketContainer();
        WebsocketClientEndpoint client = new WebsocketClientEndpoint(controller);
        session = container.connectToServer(client,
                new URI("wss://mcwv0fzml9.execute-api.ap-southeast-1.amazonaws.com/dev"));
    }

    public Session getSession() {
        return session;
    }

    public void setSession(Session session) {
        this.session = session;
    }

    public static String getUsername() {
        return username;
    }

    @OnOpen
    public void onOpen(Session session) throws Exception {
        System.out.println("Connection opened");
    }

    @OnMessage
    public void onMessage(String message) throws Exception {
        JSONObject jsonMsg = (JSONObject) new JSONParser().parse(message);
        System.out.println(message);
        if (jsonMsg.containsKey("handler")) {
            controller.handleMessage(message);
        } else if (jsonMsg.containsKey("error")) {
            controller.handleError(message);
        }
    }

    @OnClose
    public void onClose(){
        controller.handleDisconnect();
    }

}
