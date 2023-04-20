import { getAPIG } from "../APIGateway";
import { $connectEvent } from "../events/connection/$connectEvent";
import { WebsocketRouter } from "../utils/type";

export const $connectRouter: WebsocketRouter = async (event, context) => {
  const api = getAPIG(event, context);

  const [_, err] = await $connectEvent(api, context.connectionId);

  return;
};
