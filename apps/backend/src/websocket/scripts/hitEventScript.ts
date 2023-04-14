import { Card } from "database/src/utils/Card";
import { APIG } from "../APIGateway";
import { ScriptTrigger } from "./ScriptTrigger";
import { ERR_INTERNAL, GameController, UserController } from "database";
import { cardStateMessage, hitEventMessage } from "../utils/websocketReponses";

/**
 * @description Handle sending multiple websocket messages to notify the user
 *
 *
 */
export const hitEventScript = ScriptTrigger(
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
  }
);
