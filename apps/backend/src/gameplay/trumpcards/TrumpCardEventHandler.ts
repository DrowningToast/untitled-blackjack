import { AsyncExceptionHandler } from "../../websocket/AsyncExceptionHandler";
import { APIG } from "../../websocket/APIGateway";
import {
  ERR_INTERNAL,
  ERR_INVALID_GAME,
  GameActionController,
  GameController,
  IGame,
  UserController,
  insertErrorStack,
} from "database";
import { cardStateBroadcast } from "../../websocket/broadcast/cardStateBroadcast";
import {
  hitEventMessage,
  nextHitCardTrumpEffect,
  updatePointTargetMessage,
} from "../../websocket/utils/WebsocketResponses";
import { Card } from "database/src/utils/Card";
import { hitBroadcast } from "../../websocket/broadcast/hitBroadcast";
import { trumpStatusBroadcast } from "../../websocket/broadcast/trumpStatusBroadcast";
import { ERR_INIT_GAME } from "../../websocket/utils/ErrorMessages";

const _cardUpdateEventHandler = () =>
  AsyncExceptionHandler(async (api: APIG, game: IGame) => {
    console.log("getting visible cards");
    // get visible cards and update everybody's card state
    const [visibleCards, err5] = await GameController.getCardsOnPerspectives(
      game.gameId
    );
    if (err5) throw err5;

    console.log(visibleCards);

    // get cards from user respective pov
    const [[cards_A, err4], [cards_B, err7]] = await Promise.all([
      UserController.getCards({ username: game.players[0].username }, true),
      UserController.getCards({ username: game.players[1].username }, true),
    ]);

    if (err4 || err7 || !cards_A || !cards_B || !visibleCards) {
      throw ERR_INTERNAL;
    }

    await cardStateBroadcast(api, visibleCards);
  });

const _trumpStatusUpdateEventHandler = () =>
  AsyncExceptionHandler(async (api: APIG, game: IGame) => {
    // broadcast
    await trumpStatusBroadcast(api, game.gameId);
  });

export const DrawTrumpEventHandler = (card: Card) =>
  AsyncExceptionHandler(
    async (api: APIG, userConnectionId: string, success: boolean) => {
      const { broadcast } = api;
      const [user, err] = await UserController.getUserMeta({
        connectionId: userConnectionId,
      });
      if (err) throw err;

      const [game, err1] = await GameController.getGame({
        players: user._id,
      });
      if (err1) throw err1;

      const [connectionIds, err2] = await GameController.getPlayerConnectionIds(
        game.gameId
      );
      if (err2) throw err2;

      if (!game.turnOwner?.username) throw ERR_INVALID_GAME;

      if (success) {
        // draw successful
        await broadcast(hitEventMessage(user.username, card), connectionIds);
      }
      // if not, do not send hit event message

      await _cardUpdateEventHandler()(api, game);
    }
  );

export const removeLastCardTrumpEventHandler = () =>
  AsyncExceptionHandler(async (api: APIG, userConnectionId: string) => {
    const { send, broadcast } = api;

    const [user, err1] = await UserController.getUserMeta({
      connectionId: userConnectionId,
    });
    if (err1) throw err1;

    const [game, err2] = await GameController.getGame({ players: user._id });
    if (err2) throw err2;

    await _cardUpdateEventHandler()(api, game);
  });

export const blindDrawTrumpEventHandler = () =>
  AsyncExceptionHandler(async (api: APIG, userConnectionId: string) => {
    const { broadcast } = api;

    // validate user
    const [user, err1] = await UserController.getUserMeta({
      connectionId: userConnectionId,
    });
    if (err1) throw err1;

    // get game
    const [game, err2] = await GameController.getGame({ players: user._id });
    if (err2) throw err2;

    // get opponent
    const [opponent, err3] = await GameController.getOpponent(
      game.gameId,
      user.username
    );
    if (err3) throw err3;

    // get connection ids of all players
    const [connectionIds, errConn] =
      await GameController.getPlayerConnectionIds(game.gameId);
    if (errConn) throw errConn;

    // broadcast user status
    await _trumpStatusUpdateEventHandler()(api, game);

    await _cardUpdateEventHandler()(api, game);
  });

export const maxCardOpponentTrumpEventHandler = () =>
  AsyncExceptionHandler(async (api: APIG, userConnectionId: string) => {
    const { broadcast } = api;

    // validate user
    const [user, err1] = await UserController.getUserMeta({
      connectionId: userConnectionId,
    });
    if (err1) throw err1;

    // get game
    const [game, err2] = await GameController.getGame({ players: user._id });
    if (err2) throw err2;

    // get opponent
    const [opponent, err3] = await GameController.getOpponent(
      game.gameId,
      user.username
    );
    if (err3) throw err3;

    // get connection ids of all players
    const [connectionIds, err4] = await GameController.getPlayerConnectionIds(
      game.gameId
    );
    if (err4) throw err4;

    const [newCards, errCards] = await UserController.getCards({
      username: opponent.username,
    });
    if (errCards) throw errCards;
    // get the latest card
    const card = newCards[newCards.length - 1];

    await hitBroadcast(api, opponent.username, card, connectionIds);
    await _cardUpdateEventHandler()(api, game);
  });

// see through
export const seeNextHitTrumpEventHandlder = () =>
  AsyncExceptionHandler(async (api: APIG, userConnectionId: string) => {
    // get remaining cards
    const { send } = api;

    // get user
    const [user, err1] = await UserController.getUserMeta({
      connectionId: userConnectionId,
    });
    if (err1) throw err1;

    // get game
    const [game, err2] = await GameController.getGame({ players: user._id });
    if (err2) throw err2;

    const [cards, errCards] = await GameActionController.getRemainingCards(
      game.gameId
    );
    if (errCards) throw errCards;

    // the first 2 cards
    const shownCards = cards.slice(0, 2);

    await send(nextHitCardTrumpEffect(shownCards));
  });

// change point target
export const changePointTargetTrumpEventHandler = (target: number) =>
  AsyncExceptionHandler(async (api: APIG, userConnectionId: string) => {
    const { broadcast } = api;

    // get all connection ids
    const [user, err1] = await UserController.getUserMeta({
      connectionId: userConnectionId,
    });
    if (err1) throw err1;

    // get game
    const [game, err2] = await GameController.getGame({ players: user._id });
    if (err2) throw err2;

    // get all connections id
    const [connectionIds, err3] = await GameController.getPlayerConnectionIds(
      game.gameId
    );
    if (err3) throw err3;

    await broadcast(updatePointTargetMessage(target), connectionIds);
  });

export const undoHitTrumpEventHandler = () =>
  AsyncExceptionHandler(async (api: APIG, userConnectionId: string) => {
    const { broadcast } = api;

    // get all connection ids
    const [user, err1] = await UserController.getUserMeta({
      connectionId: userConnectionId,
    });
    if (err1) throw err1;

    // get game
    const [game, err2] = await GameController.getGame({ players: user._id });
    if (err2) throw err2;

    // get all connections id
    const [connectionIds, err3] = await GameController.getPlayerConnectionIds(
      game.gameId
    );
    if (err3) throw err3;

    await _cardUpdateEventHandler()(api, game);
  });

export const invincibilityTrumpEventHandler = () =>
  AsyncExceptionHandler(async (api: APIG, userConnectionId: string) => {
    // get user meta
    const [user, err1] = await UserController.getUserMeta({
      connectionId: userConnectionId,
    });
    if (err1) throw err1;

    // get game
    const [game, err2] = await GameController.getGame({ players: user._id });
    if (err2) throw err2;

    // get connection ids
    const [connectionIds, err3] = await GameController.getPlayerConnectionIds(
      game.gameId
    );
    if (err3) throw err3;

    // update users cards in case they're blinded
    const [GlobalCardsContext, errAll] =
      await GameController.getCardsOnPerspectives(game.gameId);

    if (errAll) throw errAll;
    if (!GlobalCardsContext[0]) throw insertErrorStack(ERR_INIT_GAME);
    if (!GlobalCardsContext[1]) throw insertErrorStack(ERR_INIT_GAME);

    const [_2, error2] = await cardStateBroadcast(api, GlobalCardsContext);
    if (error2) throw ERR_INIT_GAME;

    // broadcast user status
    await _trumpStatusUpdateEventHandler()(api, game);
  });

export const denyHitTrumpEventHandler = () =>
  AsyncExceptionHandler(async (api: APIG, userConnectionId: string) => {
    // get user meta
    const [user, err1] = await UserController.getUserMeta({
      connectionId: userConnectionId,
    });
    if (err1) throw err1;

    // get game
    const [game, err2] = await GameController.getGame({ players: user._id });
    if (err2) throw err2;

    // get opponent effect
    const [opponent, err3] = await GameController.getOpponent(
      game.gameId,
      user.username
    );
    if (err3) throw err3;

    // broadcast user status
    await _trumpStatusUpdateEventHandler()(api, game);
  });
