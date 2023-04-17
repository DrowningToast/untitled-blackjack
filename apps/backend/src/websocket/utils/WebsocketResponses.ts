import { Card, GlobalCardsContext } from "database/src/utils/Card";
import { ConnectionId, WebsocketResponse } from "./type";
import { IGame, IUser } from "database";

export const pingMessage = (): WebsocketResponse => {
  return {
    status: "OK",
    handler: "PONG",
  };
};

export const connectionSuccessMessage = (
  connectionId: string
): WebsocketResponse<ConnectionId> => {
  return {
    status: "OK",
    handler: "CONNECTION_SUCCESS",
    content: connectionId,
  };
};

export const connectionAuthorizedMessage = (
  username: string,
  connectionId: string
): WebsocketResponse<{ username: IUser["username"]; connectionId }> => {
  return {
    status: "OK",
    handler: "CONNECTION_AUTHROIZED",
    content: {
      username,
      connectionId,
    },
  };
};

interface ReadyMessage {
  username: string;
  ready: boolean;
}

export const readyStateMessage = (
  username: string,
  ready: boolean
): WebsocketResponse<ReadyMessage> => {
  return {
    status: "OK",
    handler: "READY_STATE",
    content: { username, ready },
  };
};

export const gameStartMessage = (game: IGame): WebsocketResponse<IGame> => {
  return {
    status: "OK",
    handler: "GAME_STARTED",
    content: game,
  };
};

/**
 * @description Update the score and turn owner.
 *
 * @param gameState
 * @returns
 */
export const gameStateMessage = (
  gameState: IGame
): WebsocketResponse<IGame> => {
  return {
    status: "OK",
    handler: "UPDATE_GAME_STATE",
    content: gameState,
  };
};

interface CardState {
  cards: Card[];
  gameCards: GlobalCardsContext;
}

/**
 * @description Update the cards state of both players
 *@param
 *
 * @returns
 */
export const cardStateMessage = (
  cards: CardState["cards"],
  gameCards: CardState["gameCards"]
): WebsocketResponse<CardState> => {
  return {
    status: "OK",
    handler: "UPDATE_CARDS",
    content: {
      cards,
      gameCards,
    },
  };
};

interface HitEvent {
  username: string;
  card: Card | undefined;
}

/**
 * @description Send to the both sides of the game. When someone draw a card.
 *
 * @param cards
 * @returns
 */
export const hitEventMessage = (
  username: string,
  card: Card | undefined
): WebsocketResponse<HitEvent> => {
  return {
    status: "OK",
    handler: "HIT_EVENT",
    content: { card, username },
  };
};

/**
 * @description Send a message that tell the client the game is switching turn
 */
export const switchTurnMessage = (
  username: string
): WebsocketResponse<string> => {
  return {
    status: "OK",
    handler: "SWITCH_TURN",
    content: username,
  };
};

/**
 * @description Game stopped mid way due to someone quitting
 * @param username
 */
export const gameStopMessage = (
  username: string
): WebsocketResponse<string> => {
  return {
    status: "OK",
    handler: "GAME_STOP",
    content: username,
  };
};

export const standEventMessage = (
  username: string
): WebsocketResponse<string> => {
  return {
    status: "OK",
    handler: "STAND_EVENT",
    content: username,
  };
};
