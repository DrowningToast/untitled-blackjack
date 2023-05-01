import {
  ERR_INTERNAL,
  ErrorMessage,
  ZodErrorMessage,
  insertErrorStack,
} from "database";

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
      console.log(e);
      let err = insertErrorStack(e as ErrorMessage);
      try {
        const error = ZodErrorMessage.parse(err);
        return [undefined, error];
      } catch (e) {
        return [undefined, insertErrorStack(ERR_INTERNAL)];
      }
    }
  };
};
