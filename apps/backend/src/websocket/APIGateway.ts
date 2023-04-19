import { APIGatewayProxyEvent } from "aws-lambda";
import { ApiGatewayManagementApi } from "aws-sdk";
import env from "env";
import { WebsocketResponse } from "./utils/type";

export type APIG = ReturnType<typeof getAPIG>;

export type WebsocketContext = {
  connectionId: string;
};

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

    const send = async <T = undefined>(
      data?: WebsocketResponse<T>,
      connectionId?: string
    ) => {
      try {
        // if (!request) throw new Error("Connection not found");

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

    const broadcast = async <T>(
      data: WebsocketResponse<T>,
      connectionIds: string[]
    ) => {
      try {
        return await Promise.all(
          connectionIds.map((connectionId) => {
            return send(data, connectionId);
          })
        );
      } catch (e) {
        console.log(e);
        throw e;
      }
    };

    const isConnected = async (connectionId: string) => {
      try {
        return !!(await api
          .getConnection({ ConnectionId: connectionId })
          .promise());
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
       * Send data to multiple clients
       */
      broadcast,
      /**
       * Shorthand for getting connectionId
       */
      connectionId: context.connectionId,
      /**
       * @description Check if the connectionId is still connected
       */
      isConnected,
    };
  } catch (e) {
    console.log(e);
    throw e;
  }
};
