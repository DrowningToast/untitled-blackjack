import { AWSError, Request, Response } from "aws-sdk";
import { WebsocketContext } from "./websocket";
import { APIGatewayProxyEvent } from "aws-lambda";
import { ErrorMessage } from "database";

export type websocketHandlerCode =
  | "PONG"
  /**
   * Backend has acknowledged the connection
   */
  | "CONNECTION_SUCCESS"
  /**
   * User document created
   */
  | "CONNECTION_AUTHROIZED"
  /**
   * Game started
   */
  | "GAME_STARTED"
  /**
   * reply that backend acknowledged the request that request is true
   */
  | "READY_STATE";

export interface WebsocketResponse<T = undefined> {
  /**
   * INTERNAL_ERROR: An internal error occurred.
   * REQUEST_ERROR: The request was invalid.
   */
  status: "OK" | "INTERNAL_ERROR" | "REQUEST_ERROR";
  /**
   * Handler code when an action is performed successfully
   */
  handler?: websocketHandlerCode;
  /**
   * Response content
   */
  content?: T;
  /**
   * Error message
   * @description Only available when status is "REQUEST_ERROR"
   * @description Only available when status is "INTERNAL_ERROR"
   */
  error: ErrorMessage | null;
}

export type Handler<T> = (event: APIGatewayProxyEvent) => Promise<T>;

export type WebsocketHandler = (
  event: APIGatewayProxyEvent,
  context: WebsocketContext
) => Promise<{
  $response: Response<{}, AWSError>;
} | void>;
