package Internal.Websocket.Controller.Errorhandlers;

import org.json.simple.JSONObject;

import java.util.HashMap;

public class ErrorCaseMaker {
    HashMap<String, WebsocketErrorHandler> errorHandlers = new HashMap();
    public ErrorCaseMaker(){
//        errorHandlers.put("INTERNAL_ERROR", );
//        errorHandlers.put("INVALID_CONNECTION_ID", );

//        errorHandlers.put("INVALID_PASSCODE", );
//        errorHandlers.put("INVALID_USER", );
//        errorHandlers.put("INVALID-GAME", );
//        errorHandlers.put("EXISTED_GAME", );
        errorHandlers.put("existed-user", new ExistedUser());

//        errorHandlers.put("ILLEGAL_OPERATION", );
//        errorHandlers.put("INVALID_INGAME_PLAYERS", );
//        errorHandlers.put("USER_STAND", );
//        errorHandlers.put("NO_WINNER", );
//        errorHandlers.put("INVALID_ROUND_COUNTER", );
//        errorHandlers.put("INVALID_WINNER_POINT", );
//        errorHandlers.put("INVALID_CARDS", );
//        errorHandlers.put("INVALID_TRUMP_CARD", );
//        errorHandlers.put("NO_TRUMP_CARD", );
//        errorHandlers.put("HIT_WHEN_DENIED_HIT", );
//        errorHandlers.put("TRUMP_USE_DENIED", );


    }
}
