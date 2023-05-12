package Internal.Websocket.Base;

import Internal.JSON.JSON;
import jakarta.websocket.Session;

import java.io.IOException;
import java.util.HashMap;

public class MessageBuilder {

    private String message;
    private Session session;
    private WebsocketClientEndpoint rfc;

    private String handler;
    private HashMap content;

    // set handler method, returns this
    public MessageBuilder setHandler(String handler) {
        this.handler = handler;
        return this;
    }

    // send the message method, returns void
    public void send() throws IOException {
        // convert them to json
        content.put("handler", handler);
        String rawMessage = JSON.parseHashMaptoString(content);
        session.getBasicRemote().sendText(rawMessage);
    }


    // send content, accepts hashmap, returns this
    public MessageBuilder setContent(HashMap map) {
        this.content = map;
        return this;
    }


    public MessageBuilder(WebsocketClientEndpoint client) {
        this.rfc = client;
        this.session = client.getSession();
    }

    public void checkSendMessageHandler(Session session, String handler) throws Exception {

        switch (handler) {
            case "auth" -> {
                session.getBasicRemote().sendText(message); // send message to server
            }
        }
    }

//    public void sendMessage(String handler) throws Exception {
//        session = rfc.getSession();
//        switch (handler) {
//            case "auth" -> {
//
//                this.message = "{\"handler\":\"auth\",\"username\":\"" + ldg.getUsername() + "\"}";
//                session.getBasicRemote().sendText(message); // send message to server
//                System.out.println("Yay song pai leaw");
//            }
//            default -> {
//                System.out.println("Mai kaw a rai laewo");
//            }
//        }
//    }

}
