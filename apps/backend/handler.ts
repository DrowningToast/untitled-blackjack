import { APIGatewayEvent, Callback, Context, Handler } from "aws-lambda";
import initFastify from "./src/fastifyApp";

import awsLambdaFastify from "@fastify/aws-lambda";
import { connectToDatabase } from "database";
import { getEvents, WebsocketRouters } from "./src/websocket/WebsocketRouter";
import { getAPIG } from "./src/websocket/APIGateway";
import { ERR_INVALID_HANDLER } from "./src/websocket/utils/ErrorMessages";

const proxy = awsLambdaFastify(initFastify());
// const handler = awsLambdaFastify(app());

/**
 * @description HTTP Connection Handler
 * @param event
 * @param context
 * @param callback
 * @returns
 */
const handler = (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback
) => {
  console.log(event.body);
  context.callbackWaitsForEmptyEventLoop = false;
  return connectToDatabase().then(() => proxy(event, context));
};

/**
 * @description Websocket Connection router
 * @param event
 * @param context
 * @param callback
 * @returns
 */
const websocket: Handler<
  APIGatewayEvent,
  { statusCode: number; body: string }
> = async (event: APIGatewayEvent, context: Context, callback: Callback) => {
  await connectToDatabase();

  const {
    requestContext: { routeKey, connectionId },
  } = event;

  if (!connectionId) {
    throw new Error("No connectionId found");
  }

  let body;

  switch (routeKey) {
    case "$connect":
      await getEvents("$connect")(event, { connectionId });

      return {
        statusCode: 200,
        body: JSON.stringify({
          connected: true,
          hello: "world2",
        }),
      };

    case "$disconnect":
      await getEvents("$disconnect")(event, { connectionId });

      return {
        statusCode: 200,
        body: JSON.stringify({
          connected: true,
        }),
      };
      break;

    default:
      body = JSON.parse(event?.body ?? "");

      /**
       * Check for invalid route handler
       */
      if (!Object.keys(WebsocketRouters).includes(body.handler as string)) {
        const { send } = getAPIG(event, { connectionId });
        await send({
          status: "REQUEST_ERROR",
          error: ERR_INVALID_HANDLER,
        });
      } else {
        await getEvents(body.handler as string)(event, {
          connectionId,
        });
      }

      return {
        statusCode: 200,
        body: JSON.stringify({
          connected: true,
        }),
      };
      break;
  }
};

export { handler, websocket };
