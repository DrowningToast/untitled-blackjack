package ClientEndPoint.Base;

import ClientEndPoint.Controller.WebsocketController;
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


//    public static void main(String[] args) throws Exception {
//        connect();
//
//// long\
//        System.out.println("before GUI");
//        Player player1 = new Player();
//        Player player2 = new Player();
//        GameSystem.join(player1);
//        GameSystem.join(player2);
//        GameSystem.setCurrentPlayer(player2);
//        MainController control = new MainController();
//        control.startGame();
//
////        System.out.println("Connected(?)");
////        Scanner sc = new Scanner(System.in);
////        RealFinalClient.username = sc.nextLine();
////        System.out.println("debug time!!");
////        while (true) {
////            String hi = sc.nextLine();
////            if (hi.equals("hit")){
////                MessageSender.sendMessage(session, "{\"handler\":\"hit\"}");
////            }
////            else if (hi.equals("debug")) {
////                MessageSender.sendMessage(session, "{\"handler\":\"debug\"}");
////            }
////            else if (hi.equals("ready")) {
////                MessageSender.sendMessage(session, "{\"handler\":\"ready\"}");
////            }
////            else if (hi.equals("stand")) {
////                MessageSender.sendMessage(session, "{\"handler\":\"stand\"}");
////            }
////            else{
////                break;
////            }
////            System.out.println();
////        }
//    }

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
        System.out.println("Connection success");


    }

    @OnMessage
    public void onMessage(String message) throws Exception {
        controller.handleMessage(message);
    }

}
