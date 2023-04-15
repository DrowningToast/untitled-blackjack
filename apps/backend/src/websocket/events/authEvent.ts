import { ERR_EXISTED_USER, UserController } from "database";
import { getAPIG } from "../APIGateway";
import { connectionAuthorizedMessage } from "../utils/WebsocketReponses";

interface args {
  username: string;
}

const authEvent = async (event, context, args) => {
  const { send, connectionId } = getAPIG(event, context);
  const { username } = args;

  const [user] = await UserController.getUserMeta({ username });

  /**
   * If the username is taken, reply with an error
   */
  if (user) {
    // The username is already taken
    return await send({
      status: "REQUEST_ERROR",
      error: ERR_EXISTED_USER,
    });
  } else {
    // Create new user
    const [user, error] = await UserController.createUser({
      username,
      connectionId,
    });

    if (error) {
      return await send({
        status: "INTERNAL_ERROR",
        error: error,
      });
    }

    return await send(connectionAuthorizedMessage(user.username, connectionId));
  }
};

export { authEvent };
