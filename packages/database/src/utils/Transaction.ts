import {
  ERR_INTERNAL,
  ErrorMessage,
  ZodErrorMessage,
  insertErrorStack,
} from "./databaseErrors";

/**
 * @description Error handling function which accepts callbacks
 * @param callback async function(...args) => T
 * @returns Promise<[QueryResult: T, isError: boolean]>
 */
export const asyncTransaction = <T, K extends any[]>(
  callback: (...args: K) => Promise<T>
) => {
  return async (
    ...args: K
  ): Promise<[T, undefined] | [result: undefined, error: ErrorMessage]> => {
    try {
      const response = await callback(...args);
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
