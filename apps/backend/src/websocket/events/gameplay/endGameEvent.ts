import {
  ERR_INVALID_USER,
  GameActionController,
  GameController,
  insertErrorStack,
} from "database";
import { APIG } from "../../APIGateway";
import { AsyncExceptionHandler } from "../../AsyncExceptionHandler";
import { gameWinnerBroadcast } from "../../broadcast/gameWinnerBroadcast";
import { endGameBroadcast } from "../../broadcast/endGameBroadcast";

export const endGameEvent = AsyncExceptionHandler(
  async (api: APIG, gameId: string) => {
    const [[connectionIds, errConn], [winner, errEnd]] = await Promise.all([
      GameController.getPlayerConnectionIds(gameId),
      GameActionController.endGame(gameId),
    ]);
    if (errConn) throw errConn;
    if (errEnd) throw errEnd;
    if (!winner) throw insertErrorStack(ERR_INVALID_USER);
    if (!connectionIds) throw insertErrorStack(ERR_INVALID_USER);

    // announce winner
    const [_, errWinner] = await gameWinnerBroadcast(
      api,
      gameId,
      winner,
      connectionIds
    );
    if (errWinner) throw errWinner;

    // announce game over
    const [_2, errGameOver] = await endGameBroadcast(api, connectionIds);
    if (errGameOver) throw errGameOver;

    /**
     * Clean up
     */
    const [hardResetPlayersState, errReset] =
      await GameActionController.hardResetPlayersState(gameId);
    if (errReset) throw errReset;

    // delete the game instance
    const [_3, errDelete] = await GameController.deleteGame(gameId);
    if (errDelete) throw errDelete;
  }
);
