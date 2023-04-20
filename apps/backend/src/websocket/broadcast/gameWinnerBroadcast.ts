import { GameActionController, GameController, IUser } from "database";
import { APIG } from "../APIGateway";
import { AsyncExceptionHandler } from "../AsyncExceptionHandler";

const gameWinnerBroadcast = AsyncExceptionHandler(
  async (API: APIG, gameId: string, username: IUser) => {
    const { broadcast, connectionId } = API;
    const [game, err] = await GameController.getGame({ gameId });
    if (err) throw err;

    // get connection ids
    const [connectionIds, errConn] =
      await GameController.getPlayerConnectionIds(gameId);
    if (errConn) throw errConn;

    // broadcast winner
  }
);
