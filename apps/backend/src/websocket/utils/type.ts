import { AWSError, Request, Response } from "aws-sdk";
import { WebsocketContext } from "./websocket";
import { APIGatewayProxyEvent } from "aws-lambda";
import { ErrorMessage } from "database";

export type websocketHandlerCode =
  | "PONG"
  | "CONNECTION_SUCCESS"
  | "CONNECTION_AUTHROIZED";

/**
 * @description PONG
 */
export type PING = "PONG";

/**
 * @description Successful websocket connection estabilshed. (Still unauthorized)
 */
export type SUCCESS_CONN = "CONNECTION_SUCCESS";

/**
 * @description Websocket connection authroized
 */
export type AUTHROIZED = "CONNECTION_AUTHROIZED";

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
