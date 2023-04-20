import { GameController } from "database";
import { AsyncExceptionHandler } from "../../AsyncExceptionHandler";

interface args {
  gameId: string;
}

export const checkStartEvent = AsyncExceptionHandler(
  async (event, conext, args) => {
    const [players, err] = await GameController.getPlayers(args.gameId);
    if (err) throw err;

    const readyPlayers = players.filter((player) => player.ready);

    return readyPlayers.length === 2;
  }
);
