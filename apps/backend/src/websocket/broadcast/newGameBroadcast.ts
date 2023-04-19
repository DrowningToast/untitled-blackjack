import { GameActionController, GameController, IGame } from "database";
import { ERR_INIT_GAME } from "../utils/ErrorMessages";
import { getAPIG } from "../APIGateway";
import { clientStateBroadcast } from "./clientStateBroadcast";
import { AsyncExceptionHandler } from "../AsyncExceptionHandler";
import { initRoundMessage, newGameMessage } from "../utils/WebsocketResponses";

/**
 * Initialize the game with full setup
 */
export const newGameBroadcast = AsyncExceptionHandler(
  async (
    APIG: ReturnType<typeof getAPIG>,
    gameId: string,
    connectionIds: string[]
  ) => {
    const { broadcast } = APIG;
    await broadcast(newGameMessage(gameId), connectionIds);
  }
);
