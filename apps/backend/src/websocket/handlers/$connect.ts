import { getAPIG } from "../APIGateway";
import { WebsocketHandler } from "../utils/type";

export const $connectHandler: WebsocketHandler = async (event, context) => {
  const { api, send } = getAPIG(event, context);

  try {
    /**
     * DO NOT PUT AWAIT HERE
     * IT WILL SEND THE POST BEFORE THE CONNECTION IS ESTABLISHED
     */
    const res = send({
      status: "OK",
      handler: "CONNECTION_SUCCESS",
      content: context.connectionId,
    });
  } catch (e) {
    console.log(e);
  }

  return;
};
