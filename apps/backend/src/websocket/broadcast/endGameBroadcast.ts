import { APIG } from "../APIGateway";
import { AsyncExceptionHandler } from "../AsyncExceptionHandler";
import { gameEndMessage } from "../utils/WebsocketResponses";

export const endGameBroadcast = AsyncExceptionHandler(
  async (api: APIG, connectionIds: string[]) => {
    const { broadcast, connectionId } = api;

    return await broadcast(gameEndMessage(), connectionIds);
  }
);
