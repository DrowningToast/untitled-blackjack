import { GameActionController, GameController } from "database";
import { APIG } from "../../APIGateway";
import { AsyncExceptionHandler } from "../../AsyncExceptionHandler";
import { gameWinnerBroadcast } from "../../broadcast/gameWinnerBroadcast";
import { endGameBroadcast } from "../../broadcast/endGameBroadcast";

export const endGameEvent = AsyncExceptionHandler(
  async (api: APIG, gameId: string) => {
    const { broadcast, connectionId } = api;

    const [winner, errEnd] = await GameActionController.endGame(gameId);
    if (errEnd) throw errEnd;

    // get connection ids
    const [connectionIds, errConn] =
      await GameController.getPlayerConnectionIds(gameId);
    if (errConn) throw errConn;

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
  }
);
