import { AWSError, Response } from "aws-sdk";
import { APIGatewayProxyEvent } from "aws-lambda";
import { ErrorMessage } from "database";
import { WebsocketContext } from "../APIGateway";
import { AsyncExceptionHandler } from "../AsyncExceptionHandler";

export type ConnectionId = string;

type WebsocketRouterCode =
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

export interface BaseWebsocketResponse<T = undefined> {
  /**
   * INTERNAL_ERROR: An internal error occurred.
   * REQUEST_ERROR: The request was invalid.
   */
  status: "OK" | "INTERNAL_ERROR" | "REQUEST_ERROR";
}

export interface ErrorWebsocketResponse<T> extends BaseWebsocketResponse<T> {
  status: "INTERNAL_ERROR" | "REQUEST_ERROR";
  /**
   * Error message
   * @description Only available when status is "REQUEST_ERROR"
   * @description Only available when status is "INTERNAL_ERROR"
   */
  error: ErrorMessage | null;
}

export interface HandledWebsocketResponse<T> extends BaseWebsocketResponse<T> {
  status: "OK";
  /**
   * Handler code when an action is performed successfully
   */
  handler: string;
  /**
   * Response content
   */
  content?: T;
}

export type WebsocketResponse<T = undefined> =
  | HandledWebsocketResponse<T>
  | ErrorWebsocketResponse<T>;

export type Handler<T> = (event: APIGatewayProxyEvent) => Promise<T>;

export type WebsocketRouter = (
  event: APIGatewayProxyEvent,
  context: WebsocketContext
) => Promise<any>;
