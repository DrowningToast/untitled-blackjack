import {
  GameActionController,
  GameController,
  UserController,
  insertErrorStack,
} from "database";
import { ERR_INIT_GAME } from "../../utils/ErrorMessages";
import { getAPIG } from "../../APIGateway";
import { initRoundBroadcast } from "../../broadcast/initRoundBroadcast";
import { cardStateBroadcast } from "../../broadcast/cardStateBroadcast";
import { AsyncExceptionHandler } from "../../AsyncExceptionHandler";
import { trumpCardStateBroadcast } from "../../broadcast/trumpCardStateBroadcast";
import { trumpStatusBroadcast } from "../../broadcast/trumpStatusBroadcast";

/**
 * Initialize the game with full setup
 */
export const initRoundEvent = AsyncExceptionHandler(
  async (APIG: ReturnType<typeof getAPIG>, gameId: string) => {
    const api = APIG;

    console.log("INITING ROUND EVENT");

    // get connection ids
    const [connectionIds, errIds] = await GameController.getPlayerConnectionIds(
      gameId
    );
    if (errIds) throw errIds;

    // soft reset player states
    const [[A, errResetA], [B, errResetB]] = await Promise.all(
      connectionIds.map(async (id) => {
        return await UserController.softResetPlayersState({
          connectionId: id,
        });
      })
    );
    if (errResetA) throw errResetA;
    if (errResetB) throw errResetB;

    // init the game
    const [game, err2] = await GameActionController.initRound(gameId);
    if (err2) throw err2;

    const [GlobalCardsContext, errAll] =
      await GameController.getCardsOnPerspectives(gameId);

    if (errAll) throw errAll;
    if (!GlobalCardsContext[0]) throw insertErrorStack(ERR_INIT_GAME);
    if (!GlobalCardsContext[1]) throw insertErrorStack(ERR_INIT_GAME);

    // get visible cards
    // use Promise.all
    const [[cardsA, errA], [cardsB, errB]] = await Promise.all(
      connectionIds.map(async (connId) => {
        return await GameActionController.getPlayerCards(gameId, connId, true);
      })
    );

    if (errA || !cardsA) throw errA;
    if (errB || !cardsB) throw errB;

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

    const [_, error] = await initRoundBroadcast(api, game, connectionIds);

    const [_2, error2] = await cardStateBroadcast(api, GlobalCardsContext);
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

    // update trump status
    // const [___, error4] = await trumpStatusBroadcast(api, gameId);
    // if (error4) throw error4;
  }
);
