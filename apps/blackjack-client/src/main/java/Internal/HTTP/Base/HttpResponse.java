package Internal.HTTP.Base;


import Internal.JSON.JSON;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.HashMap;

public class HttpResponse {
    public boolean isOK = false;

    private String value;

    public String getRawBody() {
        return value;
    }

    public HttpResponse(InputStreamReader inputStreamReader, boolean isOK) throws IOException {
        BufferedReader bufferedReader = new BufferedReader(inputStreamReader);
        String inputLine;
        StringBuffer stringBuffer = new StringBuffer();

        while ((inputLine = bufferedReader.readLine()) != null) {
            stringBuffer.append(inputLine);
        }

        // close
        bufferedReader.close();
        inputStreamReader.close();

        String result = stringBuffer.toString();
        this.value = result;

        this.isOK = isOK;
    }

    public HashMap getMap() {
        HashMap hashMap = JSON.parseJSONtoHashMap(value);
        return hashMap;
    }
}
