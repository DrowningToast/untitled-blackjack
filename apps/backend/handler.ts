import { APIGatewayEvent, Callback, Context, Handler } from "aws-lambda";
import app from "./src/app";

import awsLambdaFastify from "@fastify/aws-lambda";
import { connectToDatabase } from "database";
import { getHandler, handlers } from "./src/websocket/handler";
import { getAPIG } from "./src/websocket/APIGateway";
import { ERR_INVALID_HANDLER } from "./src/websocket/utils/error";

const proxy = awsLambdaFastify(app());
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
const ws: Handler<
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
      await getHandler("$connect")(event, { connectionId });

      return {
        statusCode: 200,
        body: JSON.stringify({
          connected: true,
          hello: "world2",
        }),
      };

    case "$disconnect":
      await getHandler("$disconnect")(event, { connectionId });

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
      if (!Object.keys(handlers).includes(body.handler as string)) {
        const { send } = getAPIG(event, { connectionId });
        await send({
          status: "REQUEST_ERROR",
          error: ERR_INVALID_HANDLER,
        });
      } else {
        await getHandler(body.handler as string)(event, {
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

export { handler, ws };
