import { Card } from "database/src/utils/Card";
import { APIG } from "../APIGateway";
import { AsyncExceptionHandler } from "../AsyncExceptionHandler";
import {
  ERR_INTERNAL,
  ERR_INVALID_GAME,
  GameActionController,
  GameController,
  UserController,
} from "database";
import {
  hitEventMessage,
  switchTurnMessage,
} from "../utils/WebsocketResponses";
import { ERR_GAME_STATE, ERR_ILLEGAL_ACTION } from "../utils/ErrorMessages";
import { hitBroadcaster } from "../broadcaster/hitBroadcaster";
import { cardStateBroadcaster } from "../broadcaster/cardStateBroadcast";

/**
 * @description Handle sending multiple websocket messages to notify the user
 */
export const hitEvent = AsyncExceptionHandler(async (api: APIG) => {
  const { send, connectionId } = api;

  const [user, err] = await UserController.getUserMeta({
    connectionId,
  });

  if (err) {
    throw err;
  }

  const [game, err2] = await GameController.getGame({
    players: user._id,
  });

  if (err2) {
    throw ERR_INTERNAL;
  } else if (game.gameState !== "onGoing") {
    throw ERR_GAME_STATE;
  } else if (!game.turnOwner || game.turnOwner.username !== user.username) {
    throw ERR_ILLEGAL_ACTION;
  }

  // DONE CHECKING

  // Draw
  const [drawnCards, err5] = await GameActionController.drawCard(
    game.gameId,
    1
  );
  if (err5) throw err5;
  let [cards, err6] = await UserController.addCards(
    connectionId,
    drawnCards ?? []
  );
  if (err6) throw err6;

  const [connectionIds, errIds] = await GameController.getPlayerConnectionIds(
    game.gameId
  );
  if (errIds) throw errIds;

  // Broadcast hit event
  const [_, error] = await hitBroadcaster(
    api,
    user.username,
    drawnCards[0],
    connectionIds
  );
  if (error) throw error;

  const [visibleCards, err3] = await GameActionController.getAllPlayersCards(
    game.gameId,
    false
  );

  if (err3 || !cards || !visibleCards) {
    throw ERR_INTERNAL;
  }

  // Update the client state
  return await cardStateBroadcaster(api, {
    cards: visibleCards,
    pov_A: {
      username: game.players[0].username,
      cards: visibleCards[0].cards,
    },
    pov_B: {
      username: game.players[1].username,
      cards: visibleCards[1].cards,
    },
  });
});
