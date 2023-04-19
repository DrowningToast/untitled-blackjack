import { GameActionController, GameController, IGame } from "database";
import { ERR_INIT_GAME } from "../utils/ErrorMessages";
import { getAPIG } from "../APIGateway";
import { clientStateBroadcast } from "./clientStateBroadcast";
import { AsyncExceptionHandler } from "../AsyncExceptionHandler";
import { initRoundMessage } from "../utils/WebsocketResponses";

/**
 * Initialize the game with full setup
 */
export const initRoundBroadcast = AsyncExceptionHandler(
  async (
    APIG: ReturnType<typeof getAPIG>,
    gameState: IGame,
    connectionIds: string[]
  ) => {
    const { broadcast } = APIG;
    await broadcast(initRoundMessage(gameState), connectionIds);
  }
);
