import { ERR_INTERNAL, UserController } from "database";
import { getAPIG } from "../APIGateway";
import { authBody } from "../utils/zod";
import { APIGatewayProxyEvent } from "aws-lambda";
import { WebsocketContext } from "../utils/websocket";
import { WebsocketHandler } from "../utils/type";
import {
  ERR_BAD_REQUEST,
  ERR_INVALID_AUTHORIZE_CONNECTION_INSTANCE,
} from "../utils/error";

/**
 *
 * @description Link the user document to the connection
 *
 * @param event
 * @param context
 * @returns
 */
export const authHandler: WebsocketHandler = async (
  event: APIGatewayProxyEvent,
  context: WebsocketContext
) => {
  const { send } = getAPIG(event, context);

  if (!authBody.safeParse(JSON.parse(event.body!)).success) {
    return await send({
      status: "REQUEST_ERROR",
      error: ERR_BAD_REQUEST,
    });
  }

  const body = authBody.parse(JSON.parse(event.body!));

  // Find if the user with connection ID already exists
  const [_] = await UserController.getUserMeta({
    sessId: body.sessId,
    connectionId: {
      $ne: null,
    },
  });

  if (_) {
    return await send({
      status: "REQUEST_ERROR",
      error: ERR_INVALID_AUTHORIZE_CONNECTION_INSTANCE,
    });
  }

  const [user, isError] = await UserController.updateUser(
    {
      sessId: body.sessId,
    },
    {
      connectionId: context.connectionId,
    }
  );

  if (isError) {
    return await send({
      status: "INTERNAL_ERROR",
      error: ERR_INTERNAL,
    });
  }

  const res = await send({
    status: "OK",
    handler: "CONNECTION_AUTHROIZED",
    error: null,
    content: { user, connectionId: context.connectionId },
  });
  return res;
};
