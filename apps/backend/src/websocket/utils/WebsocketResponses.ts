import { Card, GlobalCardsContext } from "database/src/utils/Card";
import { ConnectionId, WebsocketResponse } from "./type";
import { IGame, IUser, _IUser } from "database";
import {
  TrumpCard,
  TrumpCardDocument,
} from "database/src/models/TrumpCardModel";

export const healthCheckMessage = (): WebsocketResponse => {
  return {
    status: "OK",
    handler: "HEALTH_CHECK",
  };
};

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
    handler: "CONNECTION_AUTHORIZED",
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

export const newGameMessage = (gameId: string): WebsocketResponse<string> => {
  return {
    status: "OK",
    handler: "NEW_GAME",
    content: gameId,
  };
};

export const initRoundMessage = (game: IGame): WebsocketResponse<IGame> => {
  return {
    status: "OK",
    handler: "INIT_ROUND",
    content: game,
  };
};

/**
 * @description Update the cards state of both players
 *@param
 *
 * @returns
 */
export const cardStateMessage = (
  cardsFromPov: GlobalCardsContext["pov"]
): WebsocketResponse<GlobalCardsContext["pov"]> => {
  return {
    status: "OK",
    handler: "UPDATE_CARDS",
    content: cardsFromPov,
  };
};

interface HitEvent {
  username: string;
  card: Card | null;
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
    content: { card: card ?? null, username },
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
export const gameStopDueQuit = (
  username: string
): WebsocketResponse<string> => {
  return {
    status: "OK",
    handler: "GAME_STOP_DUE_QUITTING",
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

export interface RoundWinner {
  winner: IUser | null;
  pointsEarned: number;
  game: IGame;
  cards: GlobalCardsContext["pov"];
}

export const roundWinnerMessage = (
  args: RoundWinner
): WebsocketResponse<RoundWinner> => {
  return {
    status: "OK",
    handler: "ROUND_WINNER",
    content: args,
  };
};

export const nextRoundMessage = (
  roundNumber: number
): WebsocketResponse<number> => {
  return {
    status: "OK",
    handler: "NEXT_ROUND",
    content: roundNumber,
  };
};

export interface GameWinner {
  winner: IUser | null;
  game: IGame;
}

export const gameWinnerMessage = (
  args: GameWinner
): WebsocketResponse<GameWinner> => {
  return {
    status: "OK",
    handler: "GAME_WINNER",
    content: args,
  };
};

export const useTrumpMessage = (
  username: string,
  trumpCard: TrumpCard
): WebsocketResponse<{ username: string; trumpCard: TrumpCard }> => {
  return {
    status: "OK",
    handler: "USE_TRUMP",
    content: {
      username,
      trumpCard,
    },
  };
};

export const updateTrumpCardStateMessage = (
  trumpCards: TrumpCardDocument[]
): WebsocketResponse<TrumpCardDocument[]> => {
  return {
    handler: "UPDATE_TRUMP_CARDS_STATE",
    status: "OK",
    content: trumpCards,
  };
};

export const updateTrumpStatusMessage = (
  users: { username: string; trumpStatus: IUser["trumpStatus"] }[]
): WebsocketResponse<
  {
    username: string;
    statuses: IUser["trumpStatus"];
  }[]
> => {
  return {
    status: "OK",
    handler: "UPDATE_TRUMP_STATUS",
    content: users.map((user) => ({
      username: user.username,
      statuses: user.trumpStatus,
    })),
  };
};

export const updatePointTargetMessage = (
  pointTarget: number
): WebsocketResponse<number> => {
  return {
    status: "OK",
    handler: "UPDATE_POINT_TARGET",
    content: pointTarget,
  };
};

export const nextHitCardTrumpEffect = (
  card: Card[]
): WebsocketResponse<Card[]> => {
  return {
    status: "OK",
    handler: "NEXT_HIT_CARD_TRUMP_EFFECT",
    content: card,
  };
};

export const gameEndMessage = (): WebsocketResponse => {
  return {
    status: "OK",
    handler: "GAME_END",
  };
};
