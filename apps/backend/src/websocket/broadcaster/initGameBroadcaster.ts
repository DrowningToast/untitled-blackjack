import { GameActionController, GameController, IGame } from "database";
import { ERR_INIT_GAME } from "../utils/ErrorMessages";
import { getAPIG } from "../APIGateway";
import { clientStateBroadcaster } from "./clientStateBroadcaster";
import { AsyncExceptionHandler } from "../AsyncExceptionHandler";
import { gameStartMessage } from "../utils/WebsocketResponses";

/**
 * Initialize the game with full setup
 */
export const initGameBroadcaster = AsyncExceptionHandler(
  async (
    APIG: ReturnType<typeof getAPIG>,
    gameState: IGame,
    connectionIds: string[]
  ) => {
    const { broadcast } = APIG;
    await broadcast(gameStartMessage(gameState), connectionIds);
  }
);
