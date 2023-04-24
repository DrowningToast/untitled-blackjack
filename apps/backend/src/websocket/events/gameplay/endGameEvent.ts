import { GameActionController, GameController } from "database";
import { APIG } from "../../APIGateway";
import { AsyncExceptionHandler } from "../../AsyncExceptionHandler";
import { gameWinnerBroadcast } from "../../broadcast/gameWinnerBroadcast";
import { endGameBroadcast } from "../../broadcast/endGameBroadcast";

export const endGameEvent = AsyncExceptionHandler(
  async (api: APIG, gameId: string) => {
    // get connection ids for who to send from game instance
    const [connectionIds, errConn] =
      await GameController.getPlayerConnectionIds(gameId);
    if (errConn) throw errConn;

    // end the game and delete the instnace
    const [winner, errEnd] = await GameActionController.endGame(gameId);
    if (errEnd) throw errEnd;

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
    const [resetPlayersState, errReset] =
      await GameActionController.resetPlayersState(gameId);
    if (errReset) throw errReset;

    // delete the game instance
    const [_3, errDelete] = await GameController.deleteGame(gameId);
    if (errDelete) throw errDelete;
  }
);
