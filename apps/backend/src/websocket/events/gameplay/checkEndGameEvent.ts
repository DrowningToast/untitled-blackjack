import {
  ERR_INVALID_GAME,
  GAME_TARGET_POINT,
  GAME_WIN_SCORE_TARGET,
  GameController,
} from "database";
import { APIG } from "../../APIGateway";
import { AsyncExceptionHandler } from "../../AsyncExceptionHandler";

export const checkEndGameEvent = AsyncExceptionHandler(
  async (api: APIG, gameId: string) => {
    // find game instance
    const [game, gameErr] = await GameController.getGame({
      gameId,
      gameState: "onGoing",
    });
    if (gameErr) throw gameErr;
    if (!game) throw ERR_INVALID_GAME;

    // check if any player has won
    const targetPoints = GAME_WIN_SCORE_TARGET;
    if (
      game.players[0].gameScore >= targetPoints ||
      game.players[1].gameScore >= targetPoints
    ) {
      return true;
    } else {
      return false;
    }
  }
);
