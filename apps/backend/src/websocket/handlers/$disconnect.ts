import { GameController, UserController } from "database";
import { WebsocketHandler } from "../utils/type";
import { getAPIG } from "../APIGateway";

export const $disconnectHandler: WebsocketHandler = async (event, context) => {
  // Find if the user is authorized in the DB or not
  const [user, e] = await UserController.getUserMeta({
    connectionId: context.connectionId,
  });

  if (user) {
    // If the user is authorized, update the DB to remove the connectionId
    await UserController.deleteUser({
      connectionId: context.connectionId,
    });

    // If the user is in a game, remove the user from the game
    const [game] = await GameController.getGame({
      players: [
        {
          player: user._id,
        },
      ],
    });

    if (game) {
      await GameController.leaveGame(user.username);
    }
  }

  /**
   * TODO:
   * If a player disconnect, the game should be deleted automatically
   * and inform the other players
   */

  return;
};
