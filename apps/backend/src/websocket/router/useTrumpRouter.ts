import { z } from "zod";
import { WebsocketRouter } from "../utils/type";
import { getAPIG } from "../APIGateway";
import { useTrumpEvent } from "../events/gameplay/useTrumpEvent";
import { ERR_BAD_REQUEST, ERR_ILLEGAL_ACTION } from "../utils/ErrorMessages";
import { trumpCardsAsArray } from "../../gameplay/trumpcards/TrumpCard";
import { GameController, UserController } from "database";

const trumpCardHandlers = trumpCardsAsArray.map((card) => card.handler);

const useTrumpBodyValidator = z.object({
  trumpCard: z.enum(
    trumpCardsAsArray.map((trump) => trump.handler) as [string, ...string[]]
  ),
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

  const body = useTrumpBodyValidator.parse(JSON.parse(event.body));

  const [_, err] = await useTrumpEvent(apig, apig.connectionId, body.trumpCard);
  if (err) {
    return await apig.send({
      status: "INTERNAL_ERROR",
      error: err,
    });
  }
};
