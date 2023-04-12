import { WebsocketHandler } from "../utils/type";
import {
  ERR_INTERNAL,
  ERR_INVALID_GAME,
  ERR_INVALID_USER,
  GameActionController,
  GameController,
  UserController,
} from "database";
import { getAPIG } from "../APIGateway";
import { ERR_GAME_STATE, ERR_ILLEGAL_ACTION } from "../utils/error";
import { cardStateMessage } from "../utils/ResponseGenerator";

export const hitHandler: WebsocketHandler = async (event, context) => {
  const { send, connectionId } = getAPIG(event, context);

  let [user, err] = await UserController.getUserMeta({
    connectionId,
  });

  if (!user) {
    return await send({
      status: "REQUEST_ERROR",
      error: ERR_INVALID_USER,
    });
  } else if (err) {
    return await send({
      status: "INTERNAL_ERROR",
      error: ERR_INTERNAL,
    });
  }

  let [game, err2] = await GameController.getGame({
    players: user._id,
  });

  if (!game) {
    return await send({
      status: "REQUEST_ERROR",
      error: ERR_INVALID_GAME,
    });
  } else if (err2) {
    return await send({
      status: "INTERNAL_ERROR",
      error: ERR_INTERNAL,
    });
  } else if (game.gameState !== "onGoing") {
    return await send({
      status: "REQUEST_ERROR",
      error: ERR_GAME_STATE,
    });
  }

  // Check turn owner
  if (game.turnOwner.username !== user.username) {
    return await send({
      status: "REQUEST_ERROR",
      error: ERR_ILLEGAL_ACTION,
    });
  }

  // DONE CHECKING

  // Draw
  const [drawnCards] = await GameActionController.drawCard(game.gameId, 1);
  let [cards] = await UserController.addCards(connectionId, drawnCards ?? []);

  const [visibleCards, err3] = await GameActionController.getPlayersCards(
    game.gameId,
    false
  );
  const [myCards, err4] = await UserController.getCards({ connectionId }, true);

  if (err3 || err4 || !myCards || !visibleCards) {
    return await send({
      status: "INTERNAL_ERROR",
      error: ERR_INTERNAL,
    });
  }

  return await send(cardStateMessage(myCards, visibleCards, false));
};
