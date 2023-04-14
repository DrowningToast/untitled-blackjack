import {
  ERR_INTERNAL,
  ERR_INVALID_USER,
  GameActionController,
  GameController,
  UserController,
} from "database";
import { ERR_INIT_GAME } from "../utils/error";
import { getAPIG } from "../APIGateway";
import { cardStateMessage, gameStartMessage } from "../utils/websocketReponses";
import { updateClientStateScript } from "./updateClientScript";

/**
 * Initialize the game with full setup
 */
export const initGameScript = async (
  APIG: ReturnType<typeof getAPIG>,
  gameId: string
) => {
  const api = APIG;

  try {
    // start the game
    const [_1, err] = await GameController.startGame(gameId);

    // init the game
    const [_2, err2] = await GameActionController.initGame(gameId);

    const event = await updateClientStateScript(api, gameId, true);
    if (event.error) throw ERR_INIT_GAME;
  } catch (e) {
    console.log(e);
    await api.send({
      status: "INTERNAL_ERROR",
      error: ERR_INIT_GAME,
    });
  }
};
