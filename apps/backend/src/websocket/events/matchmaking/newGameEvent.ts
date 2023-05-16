import { GameActionController, GameController, UserController } from "database";
import { APIG } from "../../APIGateway";
import { AsyncExceptionHandler } from "../../AsyncExceptionHandler";
import { newGameBroadcast } from "../../broadcast/newGameBroadcast";
import { connection } from "mongoose";

export const newGameEvent = AsyncExceptionHandler(
  async (api: APIG, gameId: string) => {
    // start the game
    const [_, err] = await GameController.startGame(gameId);
    if (err) throw err;

    // get connection ids
    const [connectionIds, errConn] =
      await GameController.getPlayerConnectionIds(gameId);
    if (errConn) throw errConn;

    // reset player state
    const [[_2, err2], [_3, err3]] = await Promise.all(
      connectionIds.map(async (connId) => {
        return await UserController.hardResetPlayersState({
          connectionId: connId,
        });
      })
    );
    if (err2) throw err2;
    if (err3) throw err3;

    await newGameBroadcast(api, gameId, connectionIds);
  }
);
