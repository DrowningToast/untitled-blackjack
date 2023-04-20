import { GameActionController, GameController } from "database";
import { APIG } from "../../APIGateway";
import { AsyncExceptionHandler } from "../../AsyncExceptionHandler";
import { roundWinnerBroadcast } from "../../broadcast/roundWinnerBroadcast";

/**
 * Possible outcomes:
 * 1. A wins and B loses
 * 2. A loses and B wins
 * 3. A and B tie
 *
 * Automatically lose condition:
 *
 * @returns Winner username or null if tie
 *
 */

export const showdownEvent = AsyncExceptionHandler(
  async (api: APIG, gameId: string) => {
    const [showdown, errShowdown] = await GameActionController.showdownRound(
      gameId
    );
    if (errShowdown) throw errShowdown;

    // get connection ids
    const [connectionIds, errConnectionIds] =
      await GameController.getPlayerConnectionIds(gameId);
    if (errConnectionIds) throw errConnectionIds;

    // announce round winner
    await roundWinnerBroadcast(api, showdown, connectionIds);
  }
);
