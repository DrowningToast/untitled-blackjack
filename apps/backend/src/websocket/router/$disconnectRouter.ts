import { GameController, UserController } from "database";
import { WebsocketRouter } from "../utils/type";
import { getAPIG } from "../APIGateway";

export const $disconnectRouter: WebsocketRouter = async (event, context) => {
  const { connectionId } = getAPIG(event, context);

  // Find if the user is authorized in the DB or not
  const [user, e] = await UserController.getUserMeta({
    connectionId: context.connectionId,
  });

  if (e) {
    console.log("Error in $disconnectRouter 1");
    console.log(e);
  }

  if (user) {
    // If the user is in a game, remove the user from the game
    const [game, e] = await GameController.getGame({
      players: user._id,
    });
    if (e) {
      console.log("Error in $disconnectRouter 2");
      console.log(e);
    }

    if (game) {
      const [_, e] = await GameController.leaveGame(connectionId, game.gameId);
      if (e) {
        console.log("Error in $disconnectRouter 3");
        console.log(e);
      }
    }

    // If the user is authorized, update the DB to remove the connectionId
    const [_, e2] = await UserController.deleteUser({
      connectionId: context.connectionId,
    });
    if (e2) {
      console.log("Error in $disconnectRouter 4");
      console.log(e2);
    }
  }

  return;
};
