import {
  ERR_INTERNAL,
  GameActionController,
  GameController,
  UserController,
} from "database";
import { APIG } from "../APIGateway";
import { AsyncExceptionHandler } from "../AsyncExceptionHandler";
import { GlobalCardsContext, Card } from "database/src/utils/Card";
import { cardStateMessage } from "../utils/WebsocketResponses";

interface args {
  cards: GlobalCardsContext;
  pov_A: {
    username: string;
    cards: Card[];
  };
  pov_B: {
    username: string;
    cards: Card[];
  };
}

/**
 * @description Send card state messages to both players
 */
export const cardStateBroadcaster = AsyncExceptionHandler(
  async (
    api: APIG,
    cardInfo: {
      cards: GlobalCardsContext;
      pov_A: {
        username: string;
        cards: Card[];
      };
      pov_B: {
        username: string;
        cards: Card[];
      };
    }
  ) => {
    const { send } = api;

    const { pov_A, pov_B, cards } = cardInfo;

    const [[connectionA, errA], [connectionB, errB]] = await Promise.all([
      UserController.getConnectionId({
        username: pov_A.username,
      }),
      UserController.getConnectionId({
        username: pov_B.username,
      }),
    ]);

    if (errA || errB) throw ERR_INTERNAL;

    // send to clients
    await Promise.all([
      send(cardStateMessage(pov_A.cards, cards), connectionA),
      send(cardStateMessage(pov_B.cards, cards), connectionB),
    ]);
  }
);
