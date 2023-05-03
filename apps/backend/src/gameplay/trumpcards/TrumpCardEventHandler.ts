import { FilterQuery } from "mongoose";
import { AsyncExceptionHandler } from "../../websocket/AsyncExceptionHandler";
import { APIG } from "../../websocket/APIGateway";
import {
  ERR_INTERNAL,
  ERR_INVALID_GAME,
  GameActionController,
  GameController,
  IGame,
  IUser,
  UserController,
} from "database";
import { cardStateBroadcast } from "../../websocket/broadcast/cardStateBroadcast";
import {
  hitEventMessage,
  updatePointTargetMessage,
  updateTrumpStatusMessage,
} from "../../websocket/utils/WebsocketResponses";
import { Card } from "database/src/utils/Card";
import { hitBroadcast } from "../../websocket/broadcast/hitBroadcast";
import { switchTurnEvent } from "../../websocket/events/gameplay/switchTurnEvent";
import { trumpStatusBroadcast } from "../../websocket/broadcast/trumpStatusBroadcast";

const _cardUpdateEventHandler = () =>
  AsyncExceptionHandler(async (api: APIG, game: IGame) => {
    // get visible cards and update everybody's card state
    const [visibleCards, err5] = await GameActionController.getAllPlayersCards(
      game.gameId
    );
    if (err5) throw err5;

    // get cards from user respective pov
    const [[cards_A, err4], [cards_B, err7]] = await Promise.all([
      UserController.getCards({ username: game.players[0].username }, true),
      UserController.getCards({ username: game.players[1].username }, true),
    ]);

    if (err4 || err7 || !cards_A || !cards_B || !visibleCards) {
      throw ERR_INTERNAL;
    }

    await cardStateBroadcast(api, {
      cards: visibleCards,
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

const _trumpStatusUpdateEventHandler = () =>
  AsyncExceptionHandler(async (api: APIG, game: IGame) => {
    // broadcast
    await trumpStatusBroadcast(api, game.gameId);
  });

export const DrawTrumpEventHandler = (card: Card) =>
  AsyncExceptionHandler(
    async (api: APIG, userConnectionId: string, success: boolean) => {
      const { broadcast } = api;
      console.log(userConnectionId);
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

      console.log(success);
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
export const seeThroughTrumpEventHandler = () =>
  AsyncExceptionHandler(async (api: APIG, userConnectionId: string) => {
    // get game
    const [user, err1] = await UserController.getUserMeta({
      connectionId: userConnectionId,
    });
    if (err1) throw err1;

    // get game
    const [game, err2] = await GameController.getGame({ players: user._id });
    if (err2) throw err2;

    // broadcast see through status
    const [connectionIds, err3] = await GameController.getPlayerConnectionIds(
      game.gameId
    );
    if (err3) throw err3;

    // broadcast user status
    await _trumpStatusUpdateEventHandler()(api, game);

    await _cardUpdateEventHandler()(api, game);
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

    // broadcast user status
    await _trumpStatusUpdateEventHandler()(api, game);
  });

export const hideCardsTrumpEventHandler = () =>
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

    // broadcast user status

    await _trumpStatusUpdateEventHandler()(api, game);
    await _cardUpdateEventHandler()(api, game);
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
