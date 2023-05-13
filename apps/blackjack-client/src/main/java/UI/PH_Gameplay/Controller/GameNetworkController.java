package UI.Demo.Controller;

import java.net.HttpURLConnection;
import java.net.URL;
import java.io.DataOutputStream;
import java.io.IOException;
import java.util.HashMap;

import Internal.Network.HTTP.Base.HttpRequestEventHandler;
import Internal.Network.HTTP.Base.HttpResponse;
import Internal.Network.HTTP.HttpClient;
import UI.Demo.Model.IGame;
import com.google.gson.Gson;

public class GameNetworkController {
    private final String endpoint = "https://tnjylm3on5.execute-api.ap-southeast-1.amazonaws.com";
    private String hostConnectionId = "EgAnYdQlyQ0CHpA=";

    private String guestConnectionId = "Ef81_eo8SQ0CGqA=";
    private String passcode = "pass3";

    private HttpClient client = new HttpClient(endpoint);

    IGame game = new IGame();

    public void createRoom() throws IOException {
        client.asyncProcess(new HttpRequestEventHandler() {
            @Override
            public HttpResponse executeRequest(URL baseURL) {
                System.out.println("EXECUTING REQUEST5");
                HashMap body = new HashMap();
                //  make the request body
                body.put("connectionId", hostConnectionId);
                body.put("passcode", passcode);

                HttpResponse response = client.post("/game/create", body);
                return response;
            }

            @Override
            public void onSuccess(HttpResponse response) {
                System.out.println("REQUEST FAILED");
                printIGameAttribute(response.getRawBody());
            }

            @Override
            public void onFail(HttpResponse response, Exception e) {
                System.out.println(response.getRawBody());

            }
        });
    }

    public void JoinGame() throws IOException {

        String n_endpoint = endpoint + "/game/join";
        URL url = new URL(n_endpoint);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();

        connection.setRequestMethod("POST");
        connection.setRequestProperty("Content-Type", "application/json");

        String jsonBody = "{\"connectionId\": \"" + this.guestConnectionId + "\", \"passcode\": \"" + this.passcode + "\"}";

        connection.setDoOutput(true);
        DataOutputStream outputStream = new DataOutputStream(connection.getOutputStream());
        outputStream.writeBytes(jsonBody);
        outputStream.flush();
        outputStream.close();

        int responseCode = connection.getResponseCode();
        GameResponseHandler response = new GameResponseHandler(responseCode, connection);
//        printIGameAttribute(response);
    }

//    public void LeaveGame() throws IOException {
//
//        String n_endpoint = endpoint + "/game/leave";
//        URL url = new URL(n_endpoint);
//        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
//
//        connection.setRequestMethod("POST");
//        connection.setRequestProperty("Content-Type", "application/json");
//
//        String jsonBody = "{\"connectionId\": \"" + this.guestConnectionId + "\", \"passcode\": \"" + this.passcode + "\"}";
////        String jsonBody = "{\"connectionId\": \"" + this.hostConnectionId + "\", \"passcode\": \"" + this.passcode + "\"}";
//
//
//        connection.setDoOutput(true);
//        DataOutputStream outputStream = new DataOutputStream(connection.getOutputStream());
//        outputStream.writeBytes(jsonBody);
//        outputStream.flush();
//        outputStream.close();
//
//        int responseCode = connection.getResponseCode();
//        GameResponseHandler response = new GameResponseHandler(responseCode, connection);
//        printIGameAttribute(response);
//
//    }

    public void printIGameAttribute(String rawValue) {

        Gson gson = new Gson();
        IGame game = gson.fromJson(rawValue, IGame.class);
        System.out.println(game);
        System.out.println("Game ID : " + game.getGameId());
        System.out.println("Game's Status : " + game.getGameState());
        System.out.println("Round count : " + game.getRoundCounter());
        System.out.println("Player's info : " + game.getPlayers());

        System.out.println("HttpRequest send and receive IGame back successfully");

    }
}
