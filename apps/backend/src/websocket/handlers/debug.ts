import { getAPIG } from "../APIGateway";
import { WebsocketHandler } from "../utils/type";

export const debugHandler: WebsocketHandler = async (event, context) => {
  const { send } = getAPIG(event, context);

  const res = await send({
    status: "OK",
    handler: "PONG",
  });
  return res;
};

// Path: apps\backend\src\websocket\handlers\index.ts
// Compare this snippet from apps\backend\src\websocket\handlers\index.ts:
