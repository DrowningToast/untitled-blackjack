import { WebsocketRouter } from "../utils/type";
import z from "zod";
import { getAPIG } from "../APIGateway";
import { ERR_BAD_REQUEST } from "../utils/ErrorMessages";
import { authEvent } from "../events/auth/authEvent";

const bodyValdiation = z.object({
  username: z.string(),
});

/**
 *
 * @description Authenticate the connection and make a new user document
 *
 * @param event
 * @param context
 * @returns
 */
export const authRouter: WebsocketRouter = async (event, context) => {
  const { send, connectionId } = getAPIG(event, context);

  const json = JSON.parse(event.body!);

  if (bodyValdiation.safeParse(json).success === false) {
    return await send({
      status: "REQUEST_ERROR",
      error: ERR_BAD_REQUEST,
    });
  }

  const body = bodyValdiation.parse(json);

  const { username } = body;

  const [res, err] = await authEvent(event, context, { username });
  if (err) {
    console.log(err);
    return await send({
      status: "INTERNAL_ERROR",
      error: err,
    });
  }
};
