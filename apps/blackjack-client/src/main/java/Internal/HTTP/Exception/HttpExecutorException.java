package Internal.HTTP.Exception;

import Internal.HTTP.Base.HttpResponse;

public class HttpExecutorException extends Exception {

    public HttpResponse response;

    public HttpExecutorException(HttpResponse response) {
        super();
        this.response = response;
    }
}
