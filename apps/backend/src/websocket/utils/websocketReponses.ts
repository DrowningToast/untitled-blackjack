import { Card } from "database/src/utils/Card";
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

export const readyStateMessage = (
  ready: boolean
): WebsocketResponse<boolean> => {
  return {
    status: "OK",
    handler: "READY_STATE",
    content: ready,
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

interface cardState {
  cards: Card[];
  gameCards: {
    username: string;
    cards: Card[];
  }[];
}

/**
 * @description Update the cards state of both players
 *@param
 *
 * @returns
 */
export const cardStateMessage = (
  cards: cardState["cards"],
  gameCards: cardState["gameCards"]
): WebsocketResponse<cardState> => {
  return {
    status: "OK",
    handler: "UPDATE_CARDS",
    content: {
      cards,
      gameCards,
    },
  };
};

interface hitEvent {
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
): WebsocketResponse<hitEvent> => {
  return {
    status: "OK",
    handler: "HIT_EVENT",
    content: { card: undefined, username },
  };
};
