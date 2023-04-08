import { APIGatewayProxyEvent } from "aws-lambda";
import { ApiGatewayManagementApi } from "aws-sdk";
import env from "env";

export type Handler<T> = (event: APIGatewayProxyEvent) => Promise<T>;
export type wsContext = {
  routeKey: string;
  connectionId: string | undefined;
};

export const handlers = {
  debug: async (event: APIGatewayProxyEvent, context: wsContext) => {
    const api = new ApiGatewayManagementApi({
      apiVersion: "2018-11-29",
      endpoint:
        process.env.NODE_ENV === "development"
          ? "http://localhost:6000"
          : event.requestContext.domainName + "/" + event.requestContext.stage,
    });

    if (!context.connectionId) {
      throw new Error("No connectionId found");
    }

    console.log(context.connectionId);

    try {
      const res = await api
        .postToConnection({
          ConnectionId: context.connectionId,
          Data: "hi",
        })
        .promise();
    } catch (e) {
      console.log(e);
    }
  },
};

export const getHandler = (handlerId: keyof typeof handlers) => {
  return handlers[handlerId];
};
