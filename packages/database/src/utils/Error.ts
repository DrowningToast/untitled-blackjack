export interface errorMessage {
  /**
   * Error handler code
   */
  error: string;
  /**
   * Error message
   */
  description: string;
}

export const ERR_INTERNAL: errorMessage = {
  error: "internal-error",
  description: "An internal error has occured",
};

export const ERR_INVALID_SESSID: errorMessage = {
  error: "invalid-sessid",
  description: "Session ID not found",
};

export const ERR_INVALID_PASSCODE: errorMessage = {
  error: "invalid-passcode",
  description: "Passcode not found",
};

export const ERR_INVALID_GAME: errorMessage = {
  error: "invalid-game",
  description: "Game not found",
};

export const ERR_EXISTED_GAME: errorMessage = {
  error: "existed-game",
  description: "Game already existed",
};

export const ERR_EXISTED_USER: errorMessage = {
  error: "existed-user",
  description: "User already existed",
};

export const ERR_INVALID_USER: errorMessage = {
  error: "invalid-user",
  description: "User not found",
};

export const ERR_ILLEGAL_OPERATION: errorMessage = {
  error: "illegal-operation",
  description: "An illegal operation has been performed",
};
