import { GameActionController, GameController, UserController } from "database";
import { getAPIG } from "../APIGateway";
import { WebsocketRouter } from "../utils/type";
import { ERR_ILLEGAL_ACTION } from "../utils/ErrorMessages";
import { standEvent } from "../events/gameplay/standEvent";
import { checkShowDownEvent } from "../events/gameplay/checkShowdownEvent";
import { showdownEvent } from "../events/gameplay/showdownEvent";
import { initRoundEvent } from "../events/gameplay/initRoundEvent";
import { nextRoundEvent } from "../events/gameplay/nextRoundEvent";
import { switchTurnEvent } from "../events/gameplay/switchTurnEvent";
import { checkEndGameEvent } from "../events/gameplay/checkEndGameEvent";
import { endGameEvent } from "../events/gameplay/endGameEvent";

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

  // Are both parties stand?
  if (result) {
    // initiate showdown
    const [_1, err1] = await showdownEvent(api, game.gameId);
    if (err1) {
      return await api.send({
        status: "INTERNAL_ERROR",
        error: err1,
      });
    }

    // Check if the game is over
    const [targetReached, errTarget] = await checkEndGameEvent(game.gameId);
    if (errTarget) {
      return await api.send({
        status: "INTERNAL_ERROR",
        error: errTarget,
      });
    }

    if (targetReached) {
      const [res, err] = await endGameEvent(api, game.gameId);
      if (err) return await api.send({ status: "INTERNAL_ERROR", error: err });

      // exit
      return;
    }

    // announcement of new round
    const [_2, err2] = await nextRoundEvent(api, game.gameId);
    if (err2) throw err2;

    // actually initing new round
    const [_3, err3] = await initRoundEvent(api, game.gameId);
    if (err3) throw err3;
  } else {
    let [_2, err2] = await switchTurnEvent(api);
    if (err2) {
      return await api.send({
        status: "INTERNAL_ERROR",
        error: err2,
      });
    }
  }
};
