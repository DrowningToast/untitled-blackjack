import { APIGatewayEvent, Callback, Context, Handler } from "aws-lambda";
import app from "./src/app";

import awsLambdaFastify from "@fastify/aws-lambda";
import { connectToDatabase } from "database";

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
    requestContext: { routeKey },
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
      // await getHandler(event.body.handler)

      return {
        statusCode: 200,
        body: JSON.stringify({
          connected: true,
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
