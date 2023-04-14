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
import { cardStateMessage, hitEventMessage } from "../utils/websocketReponses";
import { hitEventScript } from "../event/hitEventScript";

export const hitHandler: WebsocketHandler = async (event, context) => {
  const api = getAPIG(event, context);
  const { send, connectionId } = api;

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

  const [game, err2] = await GameController.getGame({
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
  } else if (!game.turnOwner) {
    return await send({
      status: "REQUEST_ERROR",
      error: ERR_ILLEGAL_ACTION,
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
  const [drawnCards, err5] = await GameActionController.drawCard(
    game.gameId,
    1
  );
  if (err5) throw err5;
  let [cards] = await UserController.addCards(connectionId, drawnCards ?? []);

  const [visibleCards, err3] = await GameActionController.getAllPlayersCards(
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

  // Send hit event
  await hitEventScript(api, user.username, drawnCards[0]);

  // return await send(cardStateMessage(myCards, visibleCards));
};
