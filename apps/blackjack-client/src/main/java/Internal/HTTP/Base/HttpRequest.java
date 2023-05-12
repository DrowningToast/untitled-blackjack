package Internal.HTTP.Base;

import Internal.HTTP.Exception.HttpExecutorException;

import java.net.URL;

public class HttpRequest implements Runnable {

    private final HttpRequestEventHandler eventHandler;
    private final URL url;

    public HttpRequest(HttpRequestEventHandler args, URL url) {
        this.eventHandler = args;
        this.url = url;
    }

    @Override
    public void run() {

        HttpResponse response;

        // Execute the function
        try {
            response = eventHandler.executeRequest(url);
            if (!response.isOK) throw new HttpExecutorException(response);

            // Handle on request complete
            onSuccess(response);

        } catch (HttpExecutorException e) {
            // Request error
            onFail(e.response, e);
        } catch (Exception e) {
            // Unknown error
            onFail(null, e);
        }

    }

    void onSuccess(HttpResponse httpResponse) {
        eventHandler.onSuccess(httpResponse);
    }

    void onFail(HttpResponse response, Exception e) {
        eventHandler.onFail(response, e);
    }
}
