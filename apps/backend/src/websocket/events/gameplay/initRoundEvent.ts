import { GameActionController, GameController, UserController } from "database";
import { ERR_INIT_GAME, insertErrorStack } from "../../utils/ErrorMessages";
import { getAPIG } from "../../APIGateway";
import { initRoundBroadcast } from "../../broadcast/initRoundBroadcast";
import { cardStateBroadcast } from "../../broadcast/cardStateBroadcast";
import { AsyncExceptionHandler } from "../../AsyncExceptionHandler";
import { trumpCardStateBroadcast } from "../../broadcast/trumpCardStateBroadcast";

/**
 * Initialize the game with full setup
 */
export const initRoundEvent = AsyncExceptionHandler(
  async (APIG: ReturnType<typeof getAPIG>, gameId: string) => {
    const api = APIG;

    console.log("INITING ROUND EVENT");
    console.log(gameId);

    // init the game
    const [game, err2] = await GameActionController.initRound(gameId);
    if (err2) throw err2;

    console.log(game);

    console.log("FUCK YOU");

    // get connection ids
    const [connectionIds, errIds] = await GameController.getPlayerConnectionIds(
      gameId
    );
    if (errIds) throw errIds;

    console.log(connectionIds);

    const [GlobalCardsContext, errAll] =
      await GameActionController.getAllPlayersCards(gameId);

    console.log(GlobalCardsContext);
    console.log("lmao");

    if (errAll) throw errAll;
    if (!GlobalCardsContext[0]) throw insertErrorStack(ERR_INIT_GAME);
    if (!GlobalCardsContext[1]) throw insertErrorStack(ERR_INIT_GAME);

    console.log("lmao2");

    // get visible cards
    // use Promise.all
    const [[cardsA, errA], [cardsB, errB]] = await Promise.all(
      connectionIds.map(async (connId) => {
        return await GameActionController.getPlayerCards(gameId, connId, true);
      })
    );

    if (errA || !cardsA) throw errA;
    if (errB || !cardsB) throw errB;

    console.log("getting trujmp");

    // get trump Cards
    // use Promise.all
    const [[trumpCardA, errTrump], [trumpCardB, errTrump2]] = await Promise.all(
      connectionIds.map(async (connId) => {
        return await UserController.getTrumpCards({
          connectionId: connId,
        });
      })
    );
    if (errTrump || !trumpCardA) throw errTrump;
    if (errTrump2 || !trumpCardB) throw errTrump2;

    if (errTrump || errTrump2) throw errTrump;

    console.log(trumpCardA);
    console.log(trumpCardB);

    const [_, error] = await initRoundBroadcast(api, game, connectionIds);

    console.log(_);

    const [_2, error2] = await cardStateBroadcast(api, {
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

    // trump state update
    const [__, error3] = await trumpCardStateBroadcast(api, [
      {
        trumpCards: trumpCardA,
        connectionId: connectionIds[0],
      },
      {
        trumpCards: trumpCardB,
        connectionId: connectionIds[1],
      },
    ]);
    if (error3) throw ERR_INIT_GAME;
  }
);
