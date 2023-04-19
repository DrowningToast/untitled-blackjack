import { ERR_EXISTED_USER, UserController } from "database";
import { getAPIG } from "../APIGateway";
import { connectionAuthorizedMessage } from "../utils/WebsocketResponses";
import { AsyncExceptionHandler } from "../AsyncExceptionHandler";

interface args {
  username: string;
}

const authEvent = AsyncExceptionHandler(async (event, context, args) => {
  const { send, connectionId } = getAPIG(event, context);
  const { username } = args;

  const [user] = await UserController.getUserMeta({ username });

  /**
   * If the username is taken, reply with an error
   */
  if (user) {
    // The username is already taken
    throw ERR_EXISTED_USER;
  } else {
    // Create new user
    const [user, error] = await UserController.createUser({
      username,
      connectionId,
    });

    if (error) {
      throw error;
    }

    return await send(connectionAuthorizedMessage(user.username, connectionId));
  }
});

export { authEvent };
