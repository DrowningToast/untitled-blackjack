import {
  ERR_INVALID_USER,
  GameActionController,
  GameController,
  User,
  UserController,
} from "database";
import { asyncTransaction } from "database/src/utils/Transaction";

export const getGameSession = asyncTransaction(async (connectionId: string) => {
  const [user] = await UserController.getUserMeta({
    connectionId: connectionId,
  });

  if (!user) {
    throw ERR_INVALID_USER;
  }

  const [game] = await GameController.getGame({
    players: user._id,
  });

  return {
    game,
    _game: user,
  };
});
