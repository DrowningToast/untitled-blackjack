import { GameActionController, GameController } from "database";
import { ERR_INIT_GAME } from "../utils/ErrorMessages";
import { getAPIG } from "../APIGateway";
import { clientStateBroadcaster } from "../broadcaster/clientStateBroadcaster";
import { initGameBroadcaster } from "../broadcaster/initGameBroadcaster";
import { cardStateBroadcaster } from "../broadcaster/cardStateBroadcast";
import { AsyncExceptionHandler } from "../AsyncExceptionHandler";

/**
 * Initialize the game with full setup
 */
export const initGameEvent = AsyncExceptionHandler(
  async (APIG: ReturnType<typeof getAPIG>, gameId: string) => {
    const api = APIG;

    // start the game
    const [_1, err] = await GameController.startGame(gameId);
    if (err) throw err;

    // init the game
    const [game, err2] = await GameActionController.initGame(gameId);
    if (err2) throw err2;

    // get connection ids
    const [connectionIds, errIds] = await GameController.getPlayerConnectionIds(
      gameId
    );
    if (errIds) throw errIds;

    const [GlobalCardsContext, errAll] =
      await GameActionController.getAllPlayersCards(gameId);
    if (errAll) throw errAll;

    // get visible cards
    const [cardsA, errA] = await GameActionController.getPlayerCards(
      gameId,
      connectionIds[0],
      true
    );
    const [cardsB, errB] = await GameActionController.getPlayerCards(
      gameId,
      connectionIds[1],
      true
    );
    if (errA || errB) throw errA || errB;

    const [_, error] = await initGameBroadcaster(api, game, connectionIds);
    const [_2, error2] = await cardStateBroadcaster(api, {
      cards: [GlobalCardsContext[0], GlobalCardsContext[1]],
      pov_A: {
        username: game.players[0].username,
        cards: cardsA,
      },
      pov_B: {
        username: game.players[1].username,
        cards: cardsB,
      },
    });
    if (error || error2) throw ERR_INIT_GAME;
  }
);
