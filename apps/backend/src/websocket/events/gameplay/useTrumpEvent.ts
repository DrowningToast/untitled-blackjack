import {
  ERR_INVALID_TRUMP_CARD,
  ERR_INVALID_USER,
  ERR_NO_TRUMP_FOUND,
  UserController,
  insertErrorStack,
} from "database";
import { AsyncExceptionHandler } from "../../AsyncExceptionHandler";
import { trumpCardsAsArray } from "database/src/utils/TrumpCard";
import { useTrumpBroadcast } from "../../broadcast/useTrumpBroadcast";
import { APIG } from "../../APIGateway";

export const useTrumpEvent = AsyncExceptionHandler(
  async (api: APIG, userConnectionId: string, trumpHandler: string) => {
    const [user, err] = await UserController.getUserMeta({
      connectionId: userConnectionId,
    });
    if (err) throw err;
    if (!user) throw ERR_INVALID_USER;

    console.log(user);

    // find if trump card is valid or not
    // if not valid, throw error
    const validTrump = trumpCardsAsArray.find((trump) => {
      console.log(`${trump.handler} ${trumpHandler}`);
      return trump.handler === trumpHandler;
    });
    console.log(validTrump);
    if (!validTrump) throw insertErrorStack(ERR_INVALID_TRUMP_CARD);

    console.log(validTrump);

    // check if the user has the trump card
    const [trumpCards, err2] = await UserController.getTrumpCards({
      username: user.username,
    });
    if (err2) throw err2;

    console.log(trumpCards);

    const trumpCard = trumpCards.find(
      (trump) => trump.handler === trumpHandler
    );
    if (!trumpCard) throw ERR_NO_TRUMP_FOUND;

    // use trump card
    const [res, err3] = await UserController.useTrumpCard(
      {
        username: user.username,
      },
      trumpCard
    );
    if (err3) throw err3;

    // announce use or trump card
    const [_, errBroadcast] = await useTrumpBroadcast(api, user, trumpCard);
    if (errBroadcast) throw errBroadcast;

    // trigger trump card events
    await trumpCard.eventHandler(api, userConnectionId);
  }
);
