import { GameActionController, GameController } from "database";
import { AsyncExceptionHandler } from "../../AsyncExceptionHandler";
import { APIG } from "../../APIGateway";
import { nextRoundBroadcast } from "../../broadcast/nextRoundBroadcast";

export const nextRoundEvent = AsyncExceptionHandler(
  async (api: APIG, gameId: string) => {
    // check if the game is valid
    const [game, errGame] = await GameActionController.nextRound(gameId);
    if (errGame) throw errGame;

    const [connectionIds, errIds] = await GameController.getPlayerConnectionIds(
      gameId
    );
    if (errIds) throw errIds;

    const [_, err] = await nextRoundBroadcast(
      api,
      game.roundCounter,
      connectionIds
    );
    if (err) throw err;
  }
);
