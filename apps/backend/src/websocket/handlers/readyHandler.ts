import {
  ERR_ILLEGAL_OPERATION,
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
import { gameStartMessage } from "../utils/websocketReponses";
import { initGameScript } from "../event/initGameScript";

const bodyValidation = z.object({
  ready: z.boolean(),
  gameId: z.string().min(1),
});

export const readyHandler: WebsocketHandler = async (event, context) => {
  const api = getAPIG(event, context);
  const { connectionId, send, broadcast } = api;

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
  const { ready, gameId } = body;

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

  let [game, error] = await GameController.getGame({
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
    !game.players.find((player) => player.username === user.username) ||
    // There must be 2 players in the game to press ready
    game.players.length != 2
  ) {
    return await send({
      status: "REQUEST_ERROR",
      error: ERR_ILLEGAL_OPERATION,
    });
  }

  const [_, err] = await UserController.setReadyState(connectionId, ready);

  if (err) {
    return await send({
      status: "INTERNAL_ERROR",
      error: ERR_INTERNAL,
    });
  }

  [game] = await GameController.getGame({ gameId });

  if (!game) {
    return await send({
      status: "INTERNAL_ERROR",
      error: ERR_INTERNAL,
    });
  }

  await send({
    status: "OK",
    handler: "READY_STATE",

    content: ready,
  });

  /**
   * If the player choose to be ready, check if all players are ready
   */
  if (ready && game.players.length >= 2) {
    const allReady = game.players.every((player) => {
      return player.ready;
    });

    if (allReady) {
      await initGameScript(api, gameId);
    }
  }
};
