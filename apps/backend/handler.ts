import { Context } from "aws-lambda";
import serverless, { Application } from "serverless-http";
import app from "./src/app";
import { connectToDatabase } from "database/src/connection";

import awsLambdaFastify from "@fastify/aws-lambda";

const proxy = awsLambdaFastify(app());

// export const handler = (event: string, context: Context) => {
//   return connectToDatabase().then(() => {
//     return serverless(app() as Application, {
//       request: (request, event, context) => {
//         context.callbackWaitsForEmptyEventLoop = false;
//         request.context = context;
//         request.event = event;
//       },
//     })(event, context);
//   });
// };

let isConnected;

export const handler = (event: string, context: Context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return connectToDatabase().then((db) => {
    return proxy(event, context);
  });
};
