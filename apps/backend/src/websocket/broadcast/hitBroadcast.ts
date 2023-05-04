import { Card, hiddenCard } from "database/src/utils/Card";
import { APIG } from "../APIGateway";
import { AsyncExceptionHandler } from "../AsyncExceptionHandler";
import { hitEventMessage } from "../utils/WebsocketResponses";
import { UserController } from "database";

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

    // check if the first user is blind or not
    const [userA, errA] = await UserController.getUserMeta({
      connectionId: connectionIds[0],
    });
    if (errA) throw errA;

    const [userB, errB] = await UserController.getUserMeta({
      connectionId: connectionIds[1],
    });
    if (errB) throw errB;

    // is A blind
    const isABlind = userA.trumpStatus.includes("BLIND");
    // is B blind
    const isBBlind = userB.trumpStatus.includes("BLIND");

    // send the hit message
    await Promise.all([
      await send(
        hitEventMessage(username, isABlind ? hiddenCard : drawnCard),
        connectionIds[0]
      ),
      await send(
        hitEventMessage(username, isBBlind ? hiddenCard : drawnCard),
        connectionIds[1]
      ),
    ]);
  }
);
