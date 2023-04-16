import { GameActionController, GameController } from "database";
import { APIG } from "../APIGateway";
import { AsyncExceptionHandler } from "../AsyncExceptionHandler";
import { standBroadcast } from "../broadcaster/standBroadcast";

export const standEvent = AsyncExceptionHandler(
  async (api: APIG, gameId: string) => {
    // get game
    const [game, err] = await GameController.getGame({ gameId });
    if (err || !game) throw err;

    // get turn owner
    const [owner, error] = await GameActionController.getTurnOwner(gameId);
    if (error) throw error;

    // get connection ids
    const [connectionIds, errConn] =
      await GameController.getPlayerConnectionIds(gameId);
    if (errConn) throw errConn;

    return await standBroadcast(api, owner.username, connectionIds);
  }
);
