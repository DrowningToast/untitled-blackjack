package Internal.HTTP.Base;

import java.io.IOException;
import java.net.URL;

public interface HttpRequestEventHandler {

    // MUST RETURN RESPONSE IN ORDER FOR onSuccess and onFail to process
    HttpResponse executeRequest(URL baseURL) throws IOException;

    void onSuccess(HttpResponse response);

    /**
     * Request error exception
     * @param response
     * @param e
     */
    void onFail(HttpResponse response, Exception e);



}
