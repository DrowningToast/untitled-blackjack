import { ERR_INTERNAL, UserController } from "database";
import { APIG } from "../APIGateway";
import { AsyncExceptionHandler } from "../AsyncExceptionHandler";
import { GlobalCardsContext, Card } from "database/src/utils/Card";
import { cardStateMessage } from "../utils/WebsocketResponses";

/**
 * @description Send card state messages to both players
 */
export const cardStateBroadcast = AsyncExceptionHandler(
  async (api: APIG, cardInfo: GlobalCardsContext[]) => {
    const { send } = api;

    console.log(cardInfo);

    const [[connectionA, errA], [connectionB, errB]] = await Promise.all([
      UserController.getConnectionId({
        username: cardInfo[0].username,
      }),
      UserController.getConnectionId({
        username: cardInfo[1].username,
      }),
    ]);

    if (errA || errB) throw ERR_INTERNAL;

    // send to clients
    await Promise.all([
      send(cardStateMessage(cardInfo[0]["pov"]), connectionA),
      send(cardStateMessage(cardInfo[1]["pov"]), connectionB),
    ]);
  }
);
