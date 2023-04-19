import { APIG } from "../APIGateway";
import { AsyncExceptionHandler } from "../AsyncExceptionHandler";
import { RoundWinner, roundWinnerMessage } from "../utils/WebsocketResponses";

export const roundWinnerBroadcast = AsyncExceptionHandler(
  async (api: APIG, details: RoundWinner, connectionIds: string[]) => {
    const { broadcast } = api;
    await broadcast(roundWinnerMessage(details), connectionIds);
    return;
  }
);
