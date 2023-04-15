import {
  ERR_INTERNAL,
  GameActionController,
  GameController,
  UserController,
} from "database";
import { getAPIG } from "../APIGateway";
import { cardStateMessage, gameStartMessage } from "../utils/WebsocketReponses";
import { AsyncExceptionHandler } from "../AsyncExceptionHandler";

/**
 *
 * @description Update client side game context
 *
 * @param api
 * @param gameId
 */
export const clientStateBroadcaster = AsyncExceptionHandler(
  async (
    api: ReturnType<typeof getAPIG>,
    gameId: string,
    isStart: boolean = false
  ) => {
    // get game state
    const [game, err] = await GameController.getGame({ gameId });
    if (err) throw err;

    const [connectionA, errA] = await UserController.getConnectionId({
      username: game.players[0].username,
    });
    const [connectionB, errB] = await UserController.getConnectionId({
      username: game.players[1].username,
    });
    if (errA || errB) throw ERR_INTERNAL;

    // get visible cards
    const [cards, errCards] = await GameActionController.getAllPlayersCards(
      gameId
    );
    if (errCards) throw errCards;

    // get user cards
    const [cardsA, eA] = await UserController.getCards(
      {
        connectionId: connectionA,
      },
      true
    );
    const [cardsB, eB] = await UserController.getCards(
      {
        connectionId: connectionB,
      },
      true
    );
    if (eA || eB) throw ERR_INTERNAL;

    // send to client
    const { send, broadcast } = api;

    // update game client
    await broadcast(isStart ? gameStartMessage(game) : gameStartMessage(game), [
      connectionA,
      connectionB,
    ]);

    // update cards client
    await send(cardStateMessage(cardsA, cards), connectionA);
    await send(cardStateMessage(cardsB, cards), connectionB);
  }
);
