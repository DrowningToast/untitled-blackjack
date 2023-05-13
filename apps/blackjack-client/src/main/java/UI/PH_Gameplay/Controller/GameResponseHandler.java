package UI.Demo.Controller;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.io.IOException;

public class GameResponseHandler {
    private StringBuilder value;

    public StringBuilder getValue() {
        return value;
    }

    public void setValue(StringBuilder value) {
        this.value = value;
    }

    public GameResponseHandler(int responseCode, HttpURLConnection connection) {
        StringBuilder response = null;
        try {
            if (responseCode != HttpURLConnection.HTTP_OK) {
                System.out.println("POST request failed with error code: " + responseCode);
                BufferedReader errorReader = new BufferedReader(new InputStreamReader(connection.getErrorStream()));
                String errorResponse = "";
                String line;
                while ((line = errorReader.readLine()) != null) {
                    errorResponse += line;
                }
                errorReader.close();
                System.out.println("Error response message: " + errorResponse);
            } else {
                // read the response
                BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                response = new StringBuilder();
                String line;
                while ((line = in.readLine()) != null) {
                    response.append(line);
                }
                in.close();
                this.value = response;
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
