import { Card } from "database/src/utils/Card";
import { APIG } from "../APIGateway";
import { AsyncExceptionHandler } from "../AsyncExceptionHandler";
import { hitEventMessage } from "../utils/WebsocketResponses";

/**
 * @description Handle sending multiple websocket messages to notify the user
 */
export const hitBroadcast = AsyncExceptionHandler(
  async (
    api: APIG,
    username: string,
    drawnCard: Card | undefined,
    connectionIds: [string, string]
  ) => {
    const { send, connectionId, broadcast } = api;

    // Tell the client the game is switching side
    await broadcast(hitEventMessage(username, drawnCard), connectionIds);
  }
);
