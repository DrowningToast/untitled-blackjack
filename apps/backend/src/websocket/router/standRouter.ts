import { GameController, UserController } from "database";
import { getAPIG } from "../APIGateway";
import { switchTurnEvent } from "../events/switchTurnEvent";
import { WebsocketRouter } from "../utils/type";
import z from "zod";
import { ERR_ILLEGAL_ACTION } from "../utils/ErrorMessages";
import { standEvent } from "../events/standEvent";
import { checkShowDownEvent } from "../events/checkShowdownEvent";

const bodyValidation = z.object({});

export const standRouter: WebsocketRouter = async (event, context) => {
  const api = getAPIG(event, context);
  const { connectionId } = api;

  // Get user
  const [user, errUser] = await UserController.getUserMeta({
    connectionId,
  });
  if (errUser) {
    return await api.send({
      status: "INTERNAL_ERROR",
      error: errUser,
    });
  }

  // Get game
  const [game, errGame] = await GameController.getGame({ players: user._id });
  if (errGame) {
    return await api.send({
      status: "INTERNAL_ERROR",
      error: errGame,
    });
  }

  // Check if the turn is the user's turn
  if (game.turnOwner?.username !== user.username) {
    return await api.send({
      status: "REQUEST_ERROR",
      error: ERR_ILLEGAL_ACTION,
    });
  }

  //   Stand event
  const [_, err] = await standEvent(api, game.gameId);
  if (err) {
    return await api.send({
      status: "INTERNAL_ERROR",
      error: err,
    });
  }

  // Check both player stand or not
  const [result, errStand] = await checkShowDownEvent(game.gameId);
  if (errStand) {
    return await api.send({
      status: "INTERNAL_ERROR",
      error: errStand,
    });
  }

  // initiate showdown
  if (result) {
  } else {
    console.log("Switching turn");
    let [_2, err2] = await switchTurnEvent(api);
    if (err2) {
      return await api.send({
        status: "INTERNAL_ERROR",
        error: err2,
      });
    }

    console.log(_2);
  }
};
