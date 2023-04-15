import { Card } from "database/src/utils/Card";
import { APIG } from "../APIGateway";
import {
  ERR_INTERNAL,
  GameActionController,
  GameController,
  UserController,
} from "database";
import { hitEventMessage, switchTurnMessage } from "../utils/websocketReponses";
import { AsyncExceptionHandler } from "../AsyncExceptionHandler";

/**
 * @description Handle sending multiple websocket messages to notify the user
 */
export const hitEvent = AsyncExceptionHandler(
  async (api: APIG, username: string, drawnCard: Card | undefined) => {
    const { send, broadcast } = api;

    const [user, err] = await UserController.getUserMeta({ username });
    if (err) throw err;

    // get game
    const [game, err2] = await GameController.getGame({ players: user?._id });
    if (err2) throw err2;

    const [playerA, playerB] = game.players;

    // get connection id
    const [connectionA, errConnA] = await UserController.getConnectionId({
      username: playerA.username,
    });
    const [connectionB, errConnB] = await UserController.getConnectionId({
      username: playerB.username,
    });
    if (errConnA || errConnB) throw ERR_INTERNAL;

    // send to clients
    await broadcast(hitEventMessage(username, drawnCard), [
      connectionA,
      connectionB,
    ]);

    // Switch turn
    const [turn, err3] = await GameActionController.switchPlayerTurn(
      game.gameId
    );
    if (err3) throw err3;

    // Tell the client the game is switching side
    await broadcast(switchTurnMessage(turn), [connectionA, connectionB]);
  }
);
