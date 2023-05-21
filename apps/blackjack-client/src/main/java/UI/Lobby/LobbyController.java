package UI.Lobby;

import GameContext.GameContext;
import Internal.Websocket.Controller.WebsocketController;
import Internal.HTTP.Base.HttpRequestEventHandler;
import Internal.HTTP.Base.HttpResponse;
import Internal.HTTP.HttpClientClient;
import Internal.UserInterface.UIController;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import javax.swing.*;
import java.io.IOException;
import java.net.URL;
import java.util.HashMap;


public class LobbyController {
    private final HttpClientClient client = new HttpClientClient("https://tnjylm3on5.execute-api.ap-southeast-1.amazonaws.com");
    private LobbyDisplayGUI ui = new LobbyDisplayGUI(this);
    private WebsocketController wsController;
    private UIController uiController;

    public LobbyController(WebsocketController wsController, UIController uiController) {
        this.wsController = wsController;
        this.uiController = uiController;
    }


    // PLACEHOLDER
    public void changeToWaiting() {
        try {
            uiController.switchActiveWindow("waitingUI");
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("FATAL ERROR");
        }
    }

    // Handle room created
    public void handleRoomCreated(String passcode) {
        // Send create lobby request
        client.asyncProcess(new HttpRequestEventHandler() {
            @Override
            public HttpResponse executeRequest(URL baseURL) throws IOException {
                HashMap<String, String> body = new HashMap();
                body.put("connectionId", GameContext.getInstance().getPlayers()[0].getPOJO().getConnectionId());
                body.put("passcode", passcode);
                return client.post("/game/create", body);
            }

            @Override
            public void onSuccess(HttpResponse response) {
                GameContext.getInstance().getGame().getPOJO().setPasscode(passcode);
                GameContext.getInstance().getGame().getPOJO().setGameId((String) response.getMap().get("gameId"));
                changeToWaiting();
            }

            @Override
            public void onFail(HttpResponse response, Exception e) {
                JOptionPane.showMessageDialog(null, "a room this the same passcode had already been created.", "Error", JOptionPane.ERROR_MESSAGE);
            }
        });
    }

    // Hander joinning a room
    public void handleJoinRoom(String passcode) {
        client.asyncProcess(new HttpRequestEventHandler() {
            @Override
            public HttpResponse executeRequest(URL baseURL) throws IOException {
                HashMap<String, String> body = new HashMap<>();
                body.put("connectionId", GameContext.getInstance().getPlayers()[0].getPOJO().getConnectionId());
                body.put("passcode", passcode);
                return client.post("/game/join", body);
            }

            @Override
            public void onSuccess(HttpResponse response) {
                JSONParser parser = new JSONParser();
                try {
                    JSONObject responseBody = (JSONObject) parser.parse(response.getRawBody());
                    JSONArray rawPlayers = (JSONArray) responseBody.get("players");
                    // GET WHO IS IN THE ROOM FIRST, PROBABLY NOT ME
                    JSONObject host = (JSONObject) rawPlayers.get(0);
                    String hostUsername = (String) host.get("username");
                    GameContext.getInstance().getPlayers()[1].getPOJO().setUsername(hostUsername);
                    // SEND READY MESSAGE
                    GameContext.getInstance().getGame().getPOJO().setPasscode(passcode);
                    GameContext.getInstance().getGame().getPOJO().setGameId((String) response.getMap().get("gameId"));
                    wsController.setReady(true);
                    changeToWaiting();
                    uiController.update();

                } catch (ParseException e) {
                    System.out.println(e.toString());
                    e.printStackTrace();
                }
            }

            @Override
            public void onFail(HttpResponse response, Exception e) {
                System.out.println(e.toString());
                e.printStackTrace();
                JOptionPane.showMessageDialog(null, "Room not found.","Error", JOptionPane.ERROR_MESSAGE);
            }
        });
    }

    public LobbyDisplayGUI getUI() {
        return ui;
    }
}
