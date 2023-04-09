import { APIGatewayProxyEvent } from "aws-lambda";
import { ApiGatewayManagementApi } from "aws-sdk";
import env from "env";
import { WebsocketResponse } from "./utils/type";

export const getAPIG = (event: APIGatewayProxyEvent, context: any) => {
  try {
    const api = new ApiGatewayManagementApi({
      apiVersion: "2018-11-29",
      endpoint:
        env.NODE_ENV === "development"
          ? "http://localhost:6000"
          : event.requestContext.domainName + "/" + event.requestContext.stage,
    });

    const send = async <T>(data?: WebsocketResponse<T>) => {
      try {
        return await api
          .postToConnection({
            ConnectionId: context.connectionId,
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
    };
  } catch (e) {
    console.log(e);
    throw e;
  }
};
