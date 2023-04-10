import { APIGatewayEvent, Callback, Context, Handler } from "aws-lambda";
import app from "./src/app";

import awsLambdaFastify from "@fastify/aws-lambda";
import { connectToDatabase } from "database";
import { getHandler, handlers } from "./src/websocket/handler";
import { getAPIG } from "./src/websocket/APIGateway";

const proxy = awsLambdaFastify(app());
// const handler = awsLambdaFastify(app());

/**
 * @description HTTP Connection Handler
 * @param event
 * @param context
 * @param callback
 * @returns
 */
const handler = (event: Event, context: Context, callback: Callback) => {
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
  const {
    requestContext: { routeKey, connectionId },
  } = event;

  console.log("incoming");

  if (!connectionId) {
    throw new Error("No connectionId found");
  }

  let body;

  switch (routeKey) {
    case "$connect":
      await getHandler("$connect")(event, { routeKey, connectionId });

      return {
        statusCode: 200,
        body: JSON.stringify({
          connected: true,
          hello: "world2",
        }),
      };

    case "$disconnect":
      return {
        statusCode: 200,
        body: JSON.stringify({
          connected: true,
        }),
      };
      break;

    case "broadcast":
      body = JSON.parse(event?.body ?? "");

      /**
       * Check for invalid route handler
       */
      if (!Object.keys(handlers).includes(body.handler as string)) {
        const { send } = getAPIG(event, { connectionId, routeKey });
        await send({
          status: "REQUEST_ERROR",
          handler: "INVALID_HANDLER",
        });
      } else {
        await getHandler(body.handler as string)(event, {
          routeKey,
          connectionId,
        });
      }

      return {
        statusCode: 200,
        body: JSON.stringify({
          connected: true,
          hello: "world2",
        }),
      };
      break;

    default:
      console.log("default case");
      await getHandler("$default")(event, {
        connectionId,
        routeKey: "default",
      });

      return {
        statusCode: 400,
        body: JSON.stringify({
          connected: undefined,
        }),
      };
      break;
  }
};

export { handler, ws };
