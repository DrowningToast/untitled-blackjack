import { GameActionController, GameController, IUser } from "database";
import { APIG } from "../APIGateway";
import { AsyncExceptionHandler } from "../AsyncExceptionHandler";
import { gameWinnerMessage } from "../utils/WebsocketResponses";

export const gameWinnerBroadcast = AsyncExceptionHandler(
  async (
    API: APIG,
    gameId: string,
    winner: IUser | null,
    connectionIds: string[]
  ) => {
    const { broadcast, connectionId } = API;
    const [game, err] = await GameController.getGame({ gameId });
    if (err) throw err;

    // broadcast winner
    return await broadcast(
      gameWinnerMessage({
        winner: winner,
        game,
      }),
      connectionIds
    );
  }
);
