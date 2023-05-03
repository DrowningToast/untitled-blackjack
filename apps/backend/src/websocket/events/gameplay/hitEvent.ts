import { APIG } from "../../APIGateway";
import { AsyncExceptionHandler } from "../../AsyncExceptionHandler";
import {
  ERR_INTERNAL,
  GameActionController,
  GameController,
  UserController,
} from "database";

import {
  ERR_GAME_STATE,
  ERR_HIT_WHEN_DEINED_HIT,
  ERR_ILLEGAL_ACTION,
  ERR_INVALID_USER,
  ERR_TRUMP_USE_DENIED,
  insertErrorStack,
} from "../../utils/ErrorMessages";
import { hitBroadcast } from "../../broadcast/hitBroadcast";
import { cardStateBroadcast } from "../../broadcast/cardStateBroadcast";

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

  // Check for deny hit status
  const isDeniedHit = user.trumpStatus.includes("DENY_HIT");

  // set stand state
  // Clear stand status on both players
  const [[p1, errP1], [p2, errP2]] = await Promise.all([
    UserController.setStandState({ username: game.players[0].username }, false),
    UserController.setStandState({ username: game.players[1].username }, false),
  ]);
  if (errP1 || errP2) throw ERR_INTERNAL;
  if (!p1 || !p2) throw ERR_INVALID_USER;

  const [connectionIds, errIds] = await GameController.getPlayerConnectionIds(
    game.gameId
  );
  if (errIds) throw errIds;

  if (isDeniedHit) throw insertErrorStack(ERR_HIT_WHEN_DEINED_HIT);

  // Draw
  const [drawnCards, err5] = await GameActionController.drawCards(
    {
      username: user.username,
    },
    game.gameId,
    1
  );
  if (err5) throw err5;

  console.log(drawnCards);
  // Broadcast hit event
  const [_, error] = await hitBroadcast(
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

  const [cardsInPerspectives, errCardsPerspectives] =
    await GameController.getCardsOnPerspectives(game.gameId);
  if (errCardsPerspectives) throw errCardsPerspectives;

  const [[cards_A, err4], [cards_B, err7]] = await Promise.all([
    UserController.getCards({ username: p1.username }, true),
    UserController.getCards({ username: p2.username }, true),
  ]);

  if (err4 || err7 || !cards_A || !cards_B || !visibleCards) {
    throw ERR_INTERNAL;
  }

  // Update the client state
  return await cardStateBroadcast(api, {
    cards: cardsInPerspectives,
    pov_A: {
      username: game.players[0].username,
      cards: cards_A,
    },
    pov_B: {
      username: game.players[1].username,
      cards: cards_B,
    },
  });
});
