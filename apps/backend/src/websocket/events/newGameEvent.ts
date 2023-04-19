import { GameActionController, GameController } from "database";
import { APIG } from "../APIGateway";
import { AsyncExceptionHandler } from "../AsyncExceptionHandler";
import { newGameBroadcast } from "../broadcast/newGameBroadcast";

export const newGameEvent = AsyncExceptionHandler(
  async (api: APIG, gameId: string) => {
    // start the game
    const [_, err] = await GameController.startGame(gameId);
    if (err) throw err;

    // get connection ids
    const [connectionIds, errConn] =
      await GameController.getPlayerConnectionIds(gameId);
    if (errConn) throw errConn;

    await newGameBroadcast(api, gameId, connectionIds);
  }
);
