import { ErrorMessage } from "database";

export * from "database";

export const ERR_BAD_REQUEST: ErrorMessage = {
  error: "bad-request",
  description: "Bad request, check your payload",
};

export const ERR_GAME_FULL: ErrorMessage = {
  error: "game-full",
  description: "The game is full",
};

export const ERR_INVALID_HANDLER: ErrorMessage = {
  error: "invalid-handler",
  description: "Given handler doesn't match any from the server",
};

export const ERR_INVALID_ACTION: ErrorMessage = {
  error: "invalid-action",
  description: "Given action doesn't match any from the server",
};

export const ERR_UNAUTHORIZED_CONNECTION: ErrorMessage = {
  error: "unauthorized-connection",
  description: "This connection is unauthorized",
};

export const ERR_UNAUTHORIZED_ACTION: ErrorMessage = {
  error: "unauthorized-action",
  description: "This action is unauthorized",
};

export const ERR_INVALID_AUTHORIZE_CONNECTION_INSTANCE: ErrorMessage = {
  error: "invalid-authorize-connection-instance",
  description:
    "The username you're trying to authorized is already tied to a connection",
};

export const ERR_GAME_STATE: ErrorMessage = {
  error: "invalid-game-state",
  description: "The game is in a state that doesn't allow this action",
};

export const ERR_ILLEGAL_ACTION: ErrorMessage = {
  error: "illegal-action",
  description:
    "The action you're trying to perform is illegal, maybe due to state of the game or user. Trying waiting/changing state then try again.",
};

export const ERR_INIT_GAME: ErrorMessage = {
  error: "init-game",
  description:
    "Error while initializing the game. Check console for more information",
};

export const ERR_INVALID_JSON: ErrorMessage = {
  error: "invalid-json",
  description: "Invalid body JSON",
};

export const ERR_OPPONENT_INVINCIBILITY: ErrorMessage = {
  error: "opponent-invincibility",
  description: "Opponent is invincible, and you're trying to use attack card",
};
