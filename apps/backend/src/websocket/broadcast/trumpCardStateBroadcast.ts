import { TrumpCard } from "database/src/models/TrumpCardModel";
import { APIG } from "../APIGateway";
import { AsyncExceptionHandler } from "../AsyncExceptionHandler";
import { updateTrumpCardStateMessage } from "../utils/WebsocketResponses";

interface TrumpCardStatetContext {
  connectionId: string;
  trumpCards: TrumpCard[];
}

export const trumpCardStateBroadcast = AsyncExceptionHandler(
  async (api: APIG, context: TrumpCardStatetContext[]) => {
    await Promise.all(
      context.map(async (ctx) => {
        const { connectionId, trumpCards } = ctx;
        await api.send(updateTrumpCardStateMessage(trumpCards), connectionId);
      })
    );
  }
);
