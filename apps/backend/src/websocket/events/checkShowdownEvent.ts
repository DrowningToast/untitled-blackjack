import { GameController } from "database";
import { AsyncExceptionHandler } from "../AsyncExceptionHandler";

/**
 * @description Check if both player stands
 */
export const checkShowDownEvent = AsyncExceptionHandler(
  async (gameId: string) => {
    // get game
    const [game, err] = await GameController.getGame({ gameId });
    if (err || !game) throw err;

    const [playerA, playerB] = game.players;

    return playerA.stand && playerB.stand;
  }
);
