package Internal.Websocket.Controller;

import Gameplay.GameContext;
import Internal.Websocket.Controller.EventHandlers.WebsocketEventHandler;
import Internal.Websocket.Base.MessageBuilder;
import Internal.Websocket.Base.WebsocketClientEndpoint;
import Gameplay.Game.GamePOJO;
import Internal.JSON.JSON;
import Main.MainRunner;
import jakarta.websocket.DeploymentException;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.HashMap;

public class WebsocketController {
    private WebsocketClientEndpoint client;
    private HashMap eventHandlers;
    private String connectionId;
    private String gameId;
    private GameContext ctx;

    public WebsocketController(GameContext ctx, HashMap<String, WebsocketEventHandler> eventHandlers)
            throws IOException, DeploymentException, URISyntaxException {
        this.client = new WebsocketClientEndpoint(this);
        this.ctx = ctx;
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

    public void setReady(boolean ready) {
        try {
            System.out.println("send ready");
            MessageBuilder message = new MessageBuilder(client);
            message.setHandler("ready");
            HashMap content = new HashMap();
            content.put("ready", true);
            // SET GAME ID TO THE CONTENT
            String gameId = MainRunner.getGameContext().getGame().getGame().getGameId();
            System.out.println(gameId);

            content.put("gameId", gameId);
            System.out.println(content);

            message.setContent(content).send();

        } catch (Exception e) {

        }
    }


    public void handleMessage(String raw) {
        JSONParser parser = new JSONParser();

        try {
            // Convert json string to hashmap
            JSONObject body = (JSONObject) parser.parse(raw);

            // find out what handler it is
            String handler = (String) body.get("handler");

            System.out.println(handler);

            WebsocketEventHandler eventHandler = (WebsocketEventHandler) eventHandlers.get(handler);
            if (eventHandler == null)
                return;

            eventHandler.handler(ctx, body);
        } catch (ParseException e) {
            System.out.println(e.toString());
            e.printStackTrace();
        }


    }

}