import { GameController, IUser, UserController } from "database";
import { APIG } from "../APIGateway";
import { AsyncExceptionHandler } from "../AsyncExceptionHandler";
import { useTrumpMessage } from "../utils/WebsocketResponses";
import { TrumpCard } from "database/src/models/TrumpCardModel";

export const useTrumpBroadcast = AsyncExceptionHandler(
  async (api: APIG, username: String, trumpCard: TrumpCard) => {
    const { broadcast } = api;

    console.log(trumpCard);

    // get user
    const [user, err] = await UserController.getUserMeta({ username });
    if (err) throw err;

    // get game
    const [game, err2] = await GameController.getGame({ players: user._id });
    if (err2) throw err2;

    // get connection ids
    const [connectionIds, err3] = await GameController.getPlayerConnectionIds(
      game.gameId
    );
    if (err3) throw err3;

    console.log(connectionIds);

    await broadcast(useTrumpMessage(user.username, trumpCard), connectionIds);
  }
);
