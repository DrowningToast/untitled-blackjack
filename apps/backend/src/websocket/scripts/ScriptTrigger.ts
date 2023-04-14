import { ERR_INTERNAL, ZodErrorMessage } from "database";

/**
 *
 * @description Handle sending multiple websocket messages to notify the user
 *
 * @param callback
 * @returns
 */
export const ScriptTrigger = <T extends any[]>(
  callback: (...args: T) => Promise<any>
) => {
  return async (...args: T) => {
    try {
      const response = await callback(...args);
      return {
        sucesess: true,
        error: undefined,
      };
    } catch (e: unknown) {
      try {
        const error = ZodErrorMessage.parse(e);
        return {
          sucesess: false,
          error,
        };
      } catch (e) {
        return {
          sucesess: false,
          error: ERR_INTERNAL,
        };
      }
    }
  };
};
