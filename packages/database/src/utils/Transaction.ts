/**
 * @description Error handling function which accepts callbacks
 * @param callback async function(...args) => T
 * @returns Promise<[QueryResult: T, isError: boolean]>
 */
export const asyncTransaction = <T, K extends any[]>(
  callback: (...args: K) => Promise<T>
) => {
  return async (...args: K): Promise<[T, false] | [undefined, true]> => {
    try {
      const response = await callback(...args);
      return [response, false];
    } catch (e) {
      console.log(e);
      return [undefined, true];
    }
  };
};
