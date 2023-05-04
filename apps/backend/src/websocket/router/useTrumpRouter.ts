import { z } from "zod";
import { WebsocketRouter } from "../utils/type";
import { getAPIG } from "../APIGateway";
import { useTrumpEvent } from "../events/gameplay/useTrumpEvent";
import {
  ERR_BAD_REQUEST,
  ERR_ILLEGAL_ACTION,
  ERR_INVALID_USER,
} from "../utils/ErrorMessages";
import { GameController, UserController } from "database";
import { switchTurnEvent } from "../events/gameplay/switchTurnEvent";

const useTrumpBodyValidator = z.object({
  trumpCard: z.string(),
});

export const useTrumpRouter: WebsocketRouter = async (event, context) => {
  const apig = getAPIG(event, context);
  if (!event.body) {
    return await apig.send({
      status: "REQUEST_ERROR",
      error: ERR_BAD_REQUEST,
    });
  }

  const { connectionId } = apig;

  // get user
  const [user, err1] = await UserController.getUserMeta({ connectionId });
  if (err1) {
    await apig.send({
      status: "REQUEST_ERROR",
      error: err1,
    });
    return;
  }

  // get game
  const [game, err2] = await GameController.getGame({ players: user._id });
  if (err2) {
    await apig.send({
      status: "REQUEST_ERROR",
      error: err2,
    });
    return;
  }

  // check turn owner
  if (game.turnOwner?.username !== user.username) {
    await apig.send({
      status: "REQUEST_ERROR",
      error: ERR_ILLEGAL_ACTION,
    });
    return;
  }

  // reset players stand state to false
  const [[p1, errP1], [p2, errP2]] = await Promise.all([
    UserController.setStandState({ username: game.players[0].username }, false),
    UserController.setStandState({ username: game.players[1].username }, false),
  ]);
  if (errP1) throw errP1;
  if (errP2) throw errP2;
  if (!p1 || !p2) throw ERR_INVALID_USER;

  const body = useTrumpBodyValidator.parse(JSON.parse(event.body));

  const [_, err] = await useTrumpEvent(apig, apig.connectionId, body.trumpCard);
  if (err) {
    return await apig.send({
      status: "INTERNAL_ERROR",
      error: err,
    });
  }

  const [_3, err3] = await switchTurnEvent(apig);
  if (err1) {
    return await apig.send({
      status: "INTERNAL_ERROR",
      error: err1,
    });
  }
};
