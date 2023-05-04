import { GameController, UserController } from "database";
import { APIG } from "../APIGateway";
import { AsyncExceptionHandler } from "../AsyncExceptionHandler";
import { updateTrumpStatusMessage } from "../utils/WebsocketResponses";

export const trumpStatusBroadcast = AsyncExceptionHandler(
  async (api: APIG, gameId: string) => {
    // get game
    const [game, errGame] = await GameController.getGame({
      gameId,
    });
    if (errGame) throw errGame;

    // get connection ids
    const [connectionIds, errConn] =
      await GameController.getPlayerConnectionIds(game.gameId);
    if (errConn) throw errConn;

    await api.broadcast(
      updateTrumpStatusMessage(
        game.players.map((player) => {
          return {
            username: player.username,
            trumpStatus: player.trumpStatus,
          };
        })
      ),
      connectionIds
    );
  }
);
