import {
  ERR_ILLEGAL_OPERATION,
  ERR_INTERNAL,
  GameController,
  UserController,
} from "database";
import { AsyncExceptionHandler } from "../AsyncExceptionHandler";
import { APIG } from "../APIGateway";
import { readyStateBroadcast } from "../broadcast/readyStateBroadcast";

interface args {
  gameId: string;
  username: string;
  ready: boolean;
}

export const readyEvent = AsyncExceptionHandler(
  async (api: APIG, args: args) => {
    const { gameId, ready, username } = args;

    const { connectionId, send, broadcast } = api;

    const [user, isError] = await UserController.getUserMeta({
      connectionId,
    });

    if (isError) {
      throw isError;
    }

    const [game, error] = await GameController.getGame({
      gameId,
    });

    if (error) {
      // Unknown error
      throw error;
    } else if (
      // Find if the player saying ready is in the game or not?
      !game.players.find((player) => player.username === user.username) ||
      // There must be 2 players in the game to press ready
      game.players.length != 2
    ) {
      throw ERR_ILLEGAL_OPERATION;
    }

    const [_, err] = await UserController.setReadyState(connectionId, ready);

    if (err) throw err;

    const [[connectionA, errA], [connectionB, errB]] = await Promise.all([
      UserController.getConnectionId({ username: game.players[0].username }),
      UserController.getConnectionId({ username: game.players[1].username }),
    ]);
    if (errA || errB || !connectionA || !connectionB) throw ERR_INTERNAL;

    await readyStateBroadcast(api, username, ready, [connectionA, connectionB]);
  }
);
