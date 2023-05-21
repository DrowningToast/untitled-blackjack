package Internal.HTTP.Base;


import Internal.JSON.JSON;

import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;

public abstract class HttpClient {

    protected HttpResponse httpGET(URL url) throws IOException {
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("GET");
        InputStreamReader inputStreamReader = new InputStreamReader(connection.getInputStream());
        HttpResponse httpResponse = new HttpResponse(inputStreamReader, true);


        return httpResponse;
    }

    protected HttpResponse httpPOST(URL url, HashMap body) throws IOException {

        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("POST");
        connection.setRequestProperty("Content-Type", "application/json");
        connection.setDoOutput(true);

        String bodyAsString = JSON.parseHashMaptoString(body);
        OutputStreamWriter outputStreamWriter = new OutputStreamWriter(connection.getOutputStream());
        outputStreamWriter.write(bodyAsString);
        outputStreamWriter.close();

        try {
            // response
            InputStreamReader inputStreamReader = new InputStreamReader(connection.getInputStream());
            HttpResponse response = new HttpResponse(inputStreamReader, true);
            return response;
        } catch (IOException e) {
            System.out.println(e.toString());
            e.printStackTrace();

            InputStreamReader inputStream = new InputStreamReader(connection.getErrorStream());
            int code = connection.getResponseCode();

            return new HttpResponse(inputStream, code == 200);
        }

    }
}
