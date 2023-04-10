import { APIGatewayProxyEvent } from "aws-lambda";
import { getAPIG } from "../APIGateway";

export type WebsocketContext = {
  connectionId: string;
};
