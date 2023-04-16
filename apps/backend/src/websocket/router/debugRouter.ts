import { getAPIG } from "../APIGateway";
import { pingMessage } from "../utils/WebsocketResponses";
import { WebsocketRouter } from "../utils/type";

export const debugRouter: WebsocketRouter = async (event, context) => {
  const { send } = getAPIG(event, context);

  const res = await send(pingMessage());
  return res;
};

// Path: apps\backend\src\websocket\handlers\index.ts
// Compare this snippet from apps\backend\src\websocket\handlers\index.ts:
