package Internal.Network.HTTP;

import Internal.Network.HTTP.Base.HttpRequestEventHandler;
import Internal.Network.HTTP.Base.HttpResponse;
import Internal.Network.HTTP.Base.HttpThreadManager;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.HashMap;

public class HttpClient extends HttpThreadManager {

    private URL url;

    public HttpClient(String urlAsString) {
        super(urlAsString);
        try {
            this.url = new URL(urlAsString);
        } catch (MalformedURLException e) {
            e.printStackTrace();
            System.out.println(e.toString());
        }
    }

    /**
     * CUSTOM REQUEST METHODS:
     * <p>
     * เขียนโดยการเรียกใช้ method makeRequest() แล้วใส่เงื่อนไขและ Event ต่างๆ ลงไปดังตัวอย่าง
     * นอกจากนี้ยังมี method httpGET กับ httpPOST ของ parent class ที่สามารถเรียกใช้ได้
     * <p>
     * การหลีกเลี่ยงการใช้งาน htppGET กับ httpPOST เองโดยตรงไม่ผ่าน makeRequest จะป้องกันการ block main thread
     */

    public HttpClient asyncProcess(HttpRequestEventHandler eventHandler) {
        makeRequest(eventHandler);
        return this;
    }

    /**
     * Raw http get request
     * Only use them in asyncProcess
     *
     * @param subpath
     */
    public HttpResponse get(String subpath) {
        try {
            return super.httpGET(new URL(url + subpath));
        } catch (MalformedURLException e) {
            e.printStackTrace();
            System.out.println(e.toString());
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println(e.toString());
        }
        return null;
    }

    /**
     * Raw http post request
     * Only use them in asyncProcess
     *
     * @param subpath
     * @param body
     */
    public HttpResponse post(String subpath, HashMap body) {
        try {
            return super.httpPOST(new URL(url + subpath), body);
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println(e.toString());
        }
        return null;
    }
}
