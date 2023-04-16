import { APIG } from "../APIGateway";
import { AsyncExceptionHandler } from "../AsyncExceptionHandler";
import { readyStateMessage } from "../utils/WebsocketResponses";

export const readyStateBroadcaster = AsyncExceptionHandler(
  async (
    api: APIG,
    targetUsername: string,
    ready: boolean,
    connectionIds: string[]
  ) => {
    const { broadcast } = api;
    await broadcast(readyStateMessage(targetUsername, ready), connectionIds);
  }
);
