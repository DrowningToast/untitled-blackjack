import { GameActionController } from "database";
import { APIG } from "../APIGateway";
import { AsyncExceptionHandler } from "../AsyncExceptionHandler";
import { nextRoundMessage } from "../utils/WebsocketResponses";

export const nextRoundBroadcast = AsyncExceptionHandler(
  async (api: APIG, roundCounter: number, connectionIds: string[]) => {
    const { broadcast } = api;
    await broadcast(nextRoundMessage(roundCounter), connectionIds);
    return;
  }
);
