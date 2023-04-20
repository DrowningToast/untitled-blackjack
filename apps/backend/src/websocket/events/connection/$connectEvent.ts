import { APIG } from "../../APIGateway";
import { AsyncExceptionHandler } from "../../AsyncExceptionHandler";

export const $connectEvent = AsyncExceptionHandler(
  async (api: APIG, connectionId: string) => {
    const { send } = api;

    try {
      /**
       * DO NOT PUT AWAIT HERE
       * IT WILL SEND THE POST BEFORE THE CONNECTION IS ESTABLISHED
       */
      const res = send({
        status: "OK",
        handler: "CONNECTION_SUCCESS",
        content: connectionId,
      });
    } catch (e) {
      console.log(e);
    }
  }
);
