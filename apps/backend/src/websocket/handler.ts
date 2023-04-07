import { APIGatewayProxyEvent } from "aws-lambda";

export type Handler<T> = (event: APIGatewayProxyEvent) => Promise<T>;

export const handlers = {
  debug: async (event: APIGatewayProxyEvent) => {
    console.log(event);
    return {
      statusCode: 200,
      body: JSON.stringify({
        connected: true,
        hello: "world",
      }),
    };
  },
};

export const getHandler = (handlerId: keyof typeof handlers) => {
  return handlers[handlerId];
};
