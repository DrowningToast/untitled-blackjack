package Internal.Websocket.Base;

import Internal.Websocket.Controller.WebsocketController;
import jakarta.websocket.*;

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
        session = container.connectToServer(client, new URI("wss://mcwv0fzml9.execute-api.ap-southeast-1.amazonaws.com/dev"));
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
        System.out.println(message);
        controller.handleMessage(message);
    }

    @OnError
    public  void onError(String message) throws Exception{
        controller.handleError(message);
    }

}
