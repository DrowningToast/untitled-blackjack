import z from "zod";

export type ErrorMessage = z.infer<typeof ZodErrorMessage>;

export const ZodErrorMessage = z.object({
  error: z.string(),
  description: z.string(),
});

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
  error: "invalid-ingame-players",
  description: "Players in the game instance is invalid and maybe broken",
};

export const ERR_USER_STAND: ErrorMessage = {
  error: "user-stand",
  description: "Both users aren't in stand state",
};

export const ERR_NO_WINNER: ErrorMessage = {
  error: "no-winner",
  description: "Cannot determine which player wins",
};

export const ERR_ROUND_COUNTER: ErrorMessage = {
  error: "round-counter",
  description: "Round counter is invalid. It may exceed maximum round counter.",
};

export const ERR_WINNER_POINTS: ErrorMessage = {
  error: "winner-points",
  description: "Can't determine how much scores/points the winner should get.",
};

export const ERR_INVALID_CARDS: ErrorMessage = {
  error: "invalid-cards",
  description: "Players cards are invalid",
};
