import { GameActionController, GameController, UserController } from "database";
import { APIG } from "../../APIGateway";
import { AsyncExceptionHandler } from "../../AsyncExceptionHandler";
import { switchTurnBroadcast } from "../../broadcast/switchTurnBroadcast";

export const switchTurnEvent = AsyncExceptionHandler(async (api: APIG) => {
  const { connectionId } = api;

  const [user, err] = await UserController.getUserMeta({ connectionId });
  if (err) throw err;

  const [game, err2] = await GameController.getGame({ players: user._id });
  if (err2) throw err2;

  const [owner, error] = await GameActionController.switchPlayerTurn(
    game.gameId
  );
  if (error) throw error;

  const [connectionIds, errConn] = await GameController.getPlayerConnectionIds(
    game.gameId
  );
  if (errConn) throw errConn;

  return await switchTurnBroadcast(api, owner.username, connectionIds);
});
