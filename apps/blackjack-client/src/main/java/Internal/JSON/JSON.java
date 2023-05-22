package Internal.JSON;

import com.google.gson.Gson;

import java.lang.reflect.Type;
import java.util.HashMap;

public class JSON {
    public static HashMap<String, String> parseJSONtoHashMap(String string) {
        Gson gson = new Gson();
        Type type = new HashMap<String, String>().getClass();

        HashMap<String, String> hashMap = gson.fromJson(string, type);
        return hashMap;
    }

    public static String parseHashMaptoString(HashMap hashMap) {
        Gson gson = new Gson();
        return gson.toJson(hashMap);
    }

}