import { APIG } from "../APIGateway";
import { AsyncExceptionHandler } from "../AsyncExceptionHandler";
import { switchTurnMessage } from "../utils/WebsocketReponses";

export const switchTurnBroadcast = AsyncExceptionHandler(
  async (
    api: APIG,
    newTurnUsername: string,
    connectionIds: [string, string]
  ) => {
    const { broadcast } = api;

    return await broadcast(switchTurnMessage(newTurnUsername), connectionIds);
  }
);
