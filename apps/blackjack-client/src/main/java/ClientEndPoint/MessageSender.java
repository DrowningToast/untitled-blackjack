package ClientEndPoint;

import jakarta.websocket.Session;

public class MessageSender {

    private String message;
    private Session session;

    public MessageSender(Session session, String message) throws Exception {
        session.getBasicRemote().sendText(message); // send message to server
    }

    public MessageSender() {
        this.session = null;
        this.message = "";
    }
    
    public static void sendMessage(Session session, String message) throws Exception {
        session.getBasicRemote().sendText(message); // send message to server
    }
 
}
