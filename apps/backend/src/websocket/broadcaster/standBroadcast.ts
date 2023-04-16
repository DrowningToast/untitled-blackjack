import { APIG } from "../APIGateway";
import { AsyncExceptionHandler } from "../AsyncExceptionHandler";
import { standEventMessage } from "../utils/WebsocketResponses";

export const standBroadcast = AsyncExceptionHandler(
  async (api: APIG, username: string, connectionIds: [string, string]) => {
    const { broadcast } = api;

    // Tell the client the game is switching side
    await broadcast(standEventMessage(username), connectionIds);
  }
);
