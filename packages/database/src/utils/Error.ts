import z from "zod";

export type ErrorMessage = z.infer<typeof ZodErrorMessage> & {
  stack?: string;
};

export const ZodErrorMessage = z.object({
  error: z.string(),
  stack: z.string().optional(),
  description: z.string(),
});

export const insertErrorStack = (error: ErrorMessage) => {
  return {
    ...error,
    stack: new Error(error.error).stack,
  };
};
export const ERR_INTERNAL: ErrorMessage = {
  error: "internal-error",
  description:
    "An unknown internal error has occured. Or Zod validation failed",
};

export const ERR_INVALID_SESSID: ErrorMessage = {
  error: "invalid-sessid",
  description: "Session ID not found",
};

export const ERR_INVALID_CONNECTION_ID: ErrorMessage = {
  error: "invalid-connection-id",
  description: "Connection ID not found",
};

export const ERR_INVALID_PASSCODE: ErrorMessage = {
  error: "invalid-passcode",
  description: "Passcode not found",
};

export const ERR_INVALID_GAME: ErrorMessage = {
  error: "invalid-game",

  description: "Game not found",
};

export const ERR_EXISTED_GAME: ErrorMessage = {
  error: "existed-game",
  description: "Game already existed",
};

export const ERR_EXISTED_USER: ErrorMessage = {
  error: "existed-user",
  description: "User already existed",
};

export const ERR_INVALID_USER: ErrorMessage = {
  error: "invalid-user",
  description: "User not found",
};

/**
 * Refer to illegal database level operation
 *
 * The operation would completely break the game/database
 */
export const ERR_ILLEGAL_OPERATION: ErrorMessage = {
  error: "illegal-operation",
  description:
    "What you're trying to do is illegal and would break the game system",
};

export const ERR_INGAME_PLAYERS: ErrorMessage = {
  error: "invalid-imgame-player",
  description: "Players in the game instance is invalid and maybe broken",
};

export const ERR_USER_STAND: ErrorMessage = {
  error: "invalid-user-stand",
  description: "Both users aren't in stand state",
};

export const ERR_NO_WINNER: ErrorMessage = {
  error: "no-winner",
  description: "Cannot determine which player wins",
};

export const ERR_ROUND_COUNTER: ErrorMessage = {
  error: "invalid-round-counter",
  description: "Round counter is invalid. It may exceed maximum round counter.",
};

export const ERR_WINNER_POINTS: ErrorMessage = {
  error: "invalid-winner-points",
  description: "Can't determine how much scores/points the winner should get.",
};

export const ERR_INVALID_CARDS: ErrorMessage = {
  error: "invalid-cards",
  description: "Players cards are invalid",
};

export const ERR_INVALID_TRUMP_CARD: ErrorMessage = {
  error: "invalid-trump-card",
  description: "Trump card is invalid",
};

export const ERR_NO_TRUMP_FOUND: ErrorMessage = {
  error: "no-trump-found",
  description: "trump card is not found in the player's hand",
};

export const ERR_HIT_WHEN_DEINED_HIT: ErrorMessage = {
  error: "hit-when-denied-hit",
  description: "You're trying to perform hit action while you're deined hit",
};

export const ERR_TRUMP_USE_DENIED: ErrorMessage = {
  error: "trump-use-denied",
  description: "The user attempt to use trump card while being denied",
};
