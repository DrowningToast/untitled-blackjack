import { GameController, UserController } from "database";
import { WebsocketHandler } from "../utils/type";

export const $disconnectHandler: WebsocketHandler = async (event, context) => {
  // Find if the user is authorized in the DB or not
  const [user, e] = await UserController.getUserMeta({
    connectionId: context.connectionId,
  });

  if (user) {
    // If the user is in a game, remove the user from the game
    const [game] = await GameController.getGame({
      players: user._id,
    });

    if (game) {
      await GameController.leaveGame(user.connectionId, game.gameId);
    }

    // If the user is authorized, update the DB to remove the connectionId
    await UserController.deleteUser({
      connectionId: context.connectionId,
    });
  }

  return;
};
