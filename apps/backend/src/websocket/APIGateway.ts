import { APIGatewayProxyEvent } from "aws-lambda";
import { ApiGatewayManagementApi } from "aws-sdk";
import env from "env";
import { WebsocketResponse } from "./utils/type";
import { WebsocketContext } from "./utils/websocket";

export const getAPIG = (
  event: APIGatewayProxyEvent,
  context: WebsocketContext
) => {
  try {
    const api = new ApiGatewayManagementApi({
      apiVersion: "2018-11-29",
      endpoint:
        env.NODE_ENV === "development"
          ? "http://localhost:6000"
          : event.requestContext.domainName + "/" + event.requestContext.stage,
    });

    const send = async <T>(
      data?: WebsocketResponse<T>,
      connectionId?: string
    ) => {
      try {
        return await api
          .postToConnection({
            ConnectionId: connectionId ?? context.connectionId,
            Data: JSON.stringify(data),
          })
          .promise();
      } catch (e) {
        console.log(e);
        throw e;
      }
    };

    return {
      /**
       * ApiGatewayManagementApi instance
       */
      api,
      /**
       * Send data to client
       */
      send,
      /**
       * Shorthand for getting connectionId
       */
      connectionId: context.connectionId,
    };
  } catch (e) {
    console.log(e);
    throw e;
  }
};
