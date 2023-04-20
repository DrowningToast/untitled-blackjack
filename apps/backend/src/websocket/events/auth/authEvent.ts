import { ERR_EXISTED_USER, UserController } from "database";
import { getAPIG } from "../../APIGateway";
import { connectionAuthorizedMessage } from "../../utils/WebsocketResponses";
import { AsyncExceptionHandler } from "../../AsyncExceptionHandler";

const authEvent = AsyncExceptionHandler(async (event, context, args) => {
  const { send, connectionId, isConnected } = getAPIG(event, context);

  // clear out stale connection
  const [connectionIds, error] = await UserController.getAllConnections();
  if (error) throw error;

  const status = await Promise.all(
    connectionIds?.map(async (connectionId: string) => {
      const connected = await isConnected(connectionId);
      return {
        connectionId,
        connected,
      };
    })
  );

  // Filter out non-stale connection
  const staleConnections = status.filter((connection) => !connection.connected);
  // Delete stale connections
  const [cleared, errCleared] = await UserController.clearStaleConnection(
    staleConnections.map((connection) => connection.connectionId)
  );
  if (errCleared) throw errCleared;

  const { username } = args;

  const [user] = await UserController.getUserMeta({ username });

  console.log(user);

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
