import { GameActionController } from "database";
import { APIG } from "../../APIGateway";
import { AsyncExceptionHandler } from "../../AsyncExceptionHandler";

const endGameEvent = AsyncExceptionHandler(
  async (api: APIG, gameId: string) => {
    const { broadcast, connectionId } = api;

    const [winner, errEnd] = await GameActionController.endGame(gameId);
    if (errEnd) throw errEnd;

    // announce winner

    // announce game over
  }
);
