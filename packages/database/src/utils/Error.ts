export interface ErrorMessage {
  /**
   * Error handler code
   */
  error: string;
  /**
   * Error message
   */
  description: string;
}

export const ERR_INTERNAL: ErrorMessage = {
  error: "internal-error",
  description: "An internal error has occured",
};

export const ERR_INVALID_SESSID: ErrorMessage = {
  error: "invalid-sessid",
  description: "Session ID not found",
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
