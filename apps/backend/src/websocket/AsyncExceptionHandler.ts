import { ERR_INTERNAL, ErrorMessage, ZodErrorMessage } from "database";

/**
 *
 * @description Handle sending multiple websocket messages to notify the user
 *
 * @param callback
 * @returns
 */
export const AsyncExceptionHandler = <T extends any[], K>(
  callback: (...args: T) => Promise<K>
): ((...args: T) => Promise<[K, undefined] | [undefined, ErrorMessage]>) => {
  return async (...args: T) => {
    try {
      const response = await callback(...args);
      console.log(response);
      return [response, undefined];
    } catch (e: unknown) {
      try {
        const error = ZodErrorMessage.parse(e);
        return [undefined, error];
      } catch (e) {
        return [undefined, ERR_INTERNAL];
      }
    }
  };
};
