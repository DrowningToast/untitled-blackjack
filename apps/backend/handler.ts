import { Callback, Context } from "aws-lambda";
import app from "./src/app";

import awsLambdaFastify from "@fastify/aws-lambda";
import { connectToDatabase } from "./src/connection";

const proxy = awsLambdaFastify(app());

export const handler = (
  event: string,
  context: Context,
  callback: Callback
) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return connectToDatabase().then(() => {
    // proxy
    return callback(null, proxy(event, context));
  });
};
