import { APIGatewayProxyEvent } from "aws-lambda";
import { getAPIG } from "../APIGateway";

export type WebsocketContext = {
  routeKey: string;
  connectionId: string;
};
