import {
  ERR_ILLEGAL_OPERATION,
  ERR_INTERNAL,
  ERR_INVALID_GAME,
  ERR_INVALID_USER,
  GameController,
  UserController,
} from "database";
import { getAPIG } from "../APIGateway";
import { ERR_BAD_REQUEST } from "../utils/ErrorMessages";
import { WebsocketRouter } from "../utils/type";
import z from "zod";
import { initGameBroadcaster } from "../broadcaster/initGameBroadcaster";
import { checkStartEvent } from "../events/checkStartEvent";
import { initGameEvent } from "../events/initGameEvent";
import { readyEvent } from "../events/readyEvent";

const bodyValidation = z.object({
  ready: z.boolean(),
  gameId: z.string().min(1),
});

export const readyRouter: WebsocketRouter = async (event, context) => {
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

  const [user, errUser] = await UserController.getUserMeta({
    connectionId,
  });
  if (errUser)
    return await send({
      status: "INTERNAL_ERROR",
      error: ERR_INTERNAL,
    });

  // Check if the game already started
  const [game, errGame] = await GameController.getGame({ gameId });
  if (errGame)
    return await send({
      status: "INTERNAL_ERROR",
      error: errGame,
    });

  if (game.gameState === "onGoing") {
    return await send({
      status: "REQUEST_ERROR",
      error: ERR_ILLEGAL_OPERATION,
    });
  }

  /**
   * READY EVENT
   */
  const [_, err4] = await readyEvent(api, {
    ready,
    gameId,
    username: user.username,
  });

  if (err4)
    return await send({
      status: "INTERNAL_ERROR",
      error: err4,
    });

  console.log(_);

  // Check if the both users are ready
  const [players, err] = await GameController.getPlayers(gameId);
  if (err)
    return await send({
      status: "INTERNAL_ERROR",
      error: ERR_INTERNAL,
    });

  if (players.length !== 2) return;

  const bothReady = players[0].ready && players[1].ready;
  console.log(bothReady);

  if (bothReady) {
    const [_, err] = await initGameEvent(api, gameId);
    if (err)
      return await send({
        status: "INTERNAL_ERROR",
        error: err,
      });
  }
};
