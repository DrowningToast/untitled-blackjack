import {
  ERR_INTERNAL,
  ERR_INVALID_GAME,
  ERR_INVALID_USER,
  GameActionController,
  GameController,
  UserController,
} from "database";
import { getAPIG } from "../APIGateway";
import { ERR_BAD_REQUEST } from "../utils/error";
import { WebsocketHandler } from "../utils/type";
import z from "zod";

const bodyValidation = z.object({
  connectionId: z.string(),
  ready: z.boolean(),
  gameId: z.string(),
});

export const readyHandler: WebsocketHandler = async (event, context) => {
  const { send } = getAPIG(event, context);

  // const { connectionId, ready, gameId } = request.body;

  if (!event.body) {
    return await send({
      status: "REQUEST_ERROR",
      error: ERR_BAD_REQUEST,
    });
  }

  if (bodyValidation.safeParse(JSON.parse(event.body)).success === false) {
    return await send({
      status: "REQUEST_ERROR",
      error: ERR_BAD_REQUEST,
    });
  }

  const body = bodyValidation.parse(JSON.parse(event.body));
  const { connectionId, ready, gameId } = body;

  const [user, isError] = await UserController.getUserMeta({
    connectionId,
  });

  if (isError) {
    return await send({
      status: "INTERNAL_ERROR",
      error: ERR_INTERNAL,
    });
  } else if (!user) {
    return await send({
      status: "REQUEST_ERROR",
      error: ERR_INVALID_USER,
    });
  }

  const [game, error] = await GameController.getGame({
    gameId,
  });

  if (error) {
    // Unknown error
    return await send({
      status: "INTERNAL_ERROR",
      error: ERR_INTERNAL,
    });
  } else if (!game) {
    // The game is not found
    return await send({
      status: "REQUEST_ERROR",
      error: ERR_INVALID_GAME,
    });
  } else if (
    // Find if the player saying ready is in the game or not?
    !game.players.find((player) => player.username === user.username)
  ) {
    return await send({
      status: "REQUEST_ERROR",
      error: ERR_INVALID_GAME,
    });
  }

  const [_, err] = await UserController.setReadyState(connectionId, ready);

  if (err) {
    return await send({
      status: "INTERNAL_ERROR",
      error: ERR_INTERNAL,
    });
  }

  const [res] = await GameController.getGame({ gameId });

  if (!res) {
    return await send({
      status: "INTERNAL_ERROR",
      error: ERR_INTERNAL,
    });
  }

  /**
   * If the player choose to be ready, check if all players are ready
   */
  if (ready) {
    const allReady = res.players.every((player) => {
      return player.ready;
    });

    if (allReady) {
      // start the game
      await GameController.startGame(gameId);
      // init the game
      await GameActionController.initGame(gameId);

      // TODO: Notify the first player the game has started

      const [playerA, playerB] = res.players;
      const [connectionA] = await UserController.getUserConnectionId({
        username: playerA.username,
      });
      const [connectionB] = await UserController.getUserConnectionId({
        username: playerB.username,
      });
      if (!connectionA || !connectionB) {
        return await send({
          status: "INTERNAL_ERROR",
          error: ERR_INTERNAL,
        });
      }

      // send to A
      await send(
        {
          status: "OK",
          handler: "GAME_STARTED",
          content: res,
          error: null,
        },
        connectionA
      );

      // send to be B
      return await send(
        {
          status: "OK",
          handler: "GAME_STARTED",
          content: res,
          error: null,
        },
        connectionB
      );
    }
  }

  return await send({
    status: "OK",
    handler: "READY_STATE",
    error: null,
    content: ready,
  });
};
