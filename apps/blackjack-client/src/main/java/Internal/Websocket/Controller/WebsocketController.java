package Internal.Websocket.Controller;

import GameContext.GameContext;
import Internal.Websocket.Controller.Errorhandlers.WebsocketErrorHandler;
import Internal.Websocket.Controller.EventHandlers.WebsocketEventHandler;
import Internal.Websocket.Base.MessageBuilder;
import Internal.Websocket.Base.WebsocketClientEndpoint;
import jakarta.websocket.DeploymentException;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import javax.swing.*;
import java.io.IOException;
import java.net.URISyntaxException;
import java.util.HashMap;

public class WebsocketController {
    private WebsocketClientEndpoint client;
    private HashMap<String, WebsocketEventHandler> eventHandlers;
    private HashMap<String, WebsocketErrorHandler> errorHandlers;

    private GameContext ctx;

    public WebsocketController(GameContext ctx, HashMap<String, WebsocketEventHandler> eventHandlers, HashMap<String, WebsocketErrorHandler> errorHandlers)
            throws IOException, DeploymentException, URISyntaxException {
        this.client = new WebsocketClientEndpoint(this);
        this.ctx = ctx;
        client.connect();
        this.eventHandlers = eventHandlers;
        this.errorHandlers = errorHandlers;
    }

    public void sendAuth(String username) {
        try {
            HashMap body = new HashMap();
            body.put("username", username);


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
            String gameId = GameContext.getInstance().getGame().getPOJO().getGameId();

            content.put("gameId", gameId);

            message.setContent(content).send();

        } catch (Exception e) {

        }
    }

    public void sendHit() {
        try {
            MessageBuilder message = new MessageBuilder(client);
            message.setHandler("hit").send();
        } catch (IOException e) {
            System.out.println(e.toString());
            e.printStackTrace();
        }
    }

    public void sendStand() {
        try {
            MessageBuilder message = new MessageBuilder(client);
            message.setHandler("stand").send();
        } catch (IOException e) {
            System.out.println(e);
            e.printStackTrace();
        }

    }

    public void useTrump(String tHandler) {
        try {
            MessageBuilder message = new MessageBuilder(client);
            HashMap content = new HashMap();
            content.put("trumpCard", tHandler);

            message.setHandler("useTrump").setContent(content).send();
        } catch (Exception e) {
            System.out.println("trump catch");
        }
    }

    public void dev_trumpCheat() {
        try {
            MessageBuilder message = new MessageBuilder(client);
            message.setHandler("dev_cheatTrump").send();
        } catch (Exception e) {
            System.out.println(e);
        }
    }

    public void handleMessage(String raw) {
        JSONParser parser = new JSONParser();

        try {
            // Convert json string to hashmap
            JSONObject body = (JSONObject) parser.parse(raw);
            // find out what handler it is
            String handler = (String) body.get("handler");

            WebsocketEventHandler eventHandler = eventHandlers.get(handler);
            if (eventHandler == null)
                return;

            eventHandler.handler(ctx, body);
        } catch (ParseException e) {
            System.out.println(e.toString());
            e.printStackTrace();
        }
    }

    public void handleError(String raw) {
        JSONParser parser = new JSONParser();

        try {
            // Convert json string to hashmap
            JSONObject body = (JSONObject) parser.parse(raw);
            // convert Error json to hashmaps
            JSONObject errJson = (JSONObject) body.get("error");
            JSONObject err_body = (JSONObject) parser.parse(String.valueOf(errJson));
            // find out what error it is
            String err = (String) err_body.get("error");

            System.out.println(err);

            WebsocketErrorHandler errHandler = (WebsocketErrorHandler) errorHandlers.get(err);
            if (errHandler == null) {
                System.out.println("Unhandled error has occurred");
                return;
            } else {
                errHandler.handler(body);
            }
        } catch (ParseException e) {
            System.out.println(e.toString());
            e.printStackTrace();
        }
    }

    public void handleDisconnect() {
        int input = JOptionPane.showOptionDialog(null, "You're being idle for too long.", "Timed out", JOptionPane.PLAIN_MESSAGE, JOptionPane.INFORMATION_MESSAGE, null, null, null);
        if (input == JOptionPane.OK_OPTION) {
            System.exit(0);
        }
    }

    public WebsocketClientEndpoint getClient() {
        return client;
    }
}
