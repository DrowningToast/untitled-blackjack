import { APIGatewayEvent, Callback, Context, Handler } from "aws-lambda";
import app from "./src/app";

import awsLambdaFastify from "@fastify/aws-lambda";
import { connectToDatabase } from "database";
import { getHandler } from "./src/websocket/handler";

const proxy = awsLambdaFastify(app());
// const handler = awsLambdaFastify(app());

const handler = (event: Event, context: Context, callback: Callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return connectToDatabase().then(() => proxy(event, context));
};

const ws: Handler<APIGatewayEvent, { statusCode: 200; body: string }> = async (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback
) => {
  const {
    requestContext: { routeKey, connectionId },
  } = event;
  console.log(routeKey);

  switch (routeKey) {
    case "$connect":
      return {
        statusCode: 200,
        body: JSON.stringify({
          connected: true,
        }),
      };
      break;

    case "$disconnect":
      return {
        statusCode: 200,
        body: JSON.stringify({
          connected: true,
        }),
      };
      break;

    case "broadcast":
      const body = JSON.parse(event?.body ?? "");

      await getHandler(body.handler)(event, { routeKey, connectionId });

      return {
        statusCode: 200,
        body: JSON.stringify({
          connected: true,
          hello: "world2",
        }),
      };
      break;

    default:
      return {
        statusCode: 200,
        body: JSON.stringify({
          connected: undefined,
        }),
      };
      break;
  }
};

export { handler, ws };
