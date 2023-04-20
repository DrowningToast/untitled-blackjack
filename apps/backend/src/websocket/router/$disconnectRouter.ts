import { GameController, UserController } from "database";
import { WebsocketRouter } from "../utils/type";
import { getAPIG } from "../APIGateway";
import { gameStopDueQuit } from "../utils/WebsocketResponses";

export const $disconnectRouter: WebsocketRouter = async (event, context) => {
  try {
    const { connectionId, broadcast, isConnected, send } = getAPIG(
      event,
      context
    );

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
        /**
         * If the player quit mid game
         */
        if (game.gameState === "onGoing") {
          // get connection ids
          const [connectionIds, e] =
            await GameController.getPlayerConnectionIds(game.gameId);
          if (e || !connectionIds) {
            console.log("Error in $disconnectRouter 3");
            console.log(e);
          } else {
            // Delete the game
            const [_, e2] = await GameController.deleteGame(game.gameId);
            if (e2) return console.log(e2);

            connectionIds.forEach(async (connectionId) => {
              if (await isConnected(connectionId)) {
                await send(gameStopDueQuit(user.username), connectionId);
              }
            });
          }
        } else {
          const [_, e2] = await GameController.leaveGame(
            connectionId,
            game.gameId
          );
          if (e2) {
            console.log("Error in $disconnectRouter 4");
            console.log(e2);
          }
        }
      }

      // If the user is authorized, update the DB to remove the connectionId
      const [_, e2] = await UserController.deleteUser({
        connectionId: context.connectionId,
      });
      if (e2) {
        console.log("Error in $disconnectRouter 5");
        console.log(e2);
      }
    }

    return;
  } catch (e) {
    console.log(e);
  }
};
