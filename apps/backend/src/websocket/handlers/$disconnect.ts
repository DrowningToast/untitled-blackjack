import { UserController } from "database";
import { WebsocketHandler } from "../utils/type";

export const $disconnectHandler: WebsocketHandler = async (event, context) => {
  // Find if the user is authorized in the DB or not
  const [user, e] = await UserController.getUserMeta({
    connectionId: context.connectionId,
  });

  if (user) {
    // If the user is authorized, update the DB to remove the connectionId
    await UserController.updateUser(
      {
        connectionId: context.connectionId,
      },
      {
        connectionId: null,
      }
    );
  }

  return;
};
