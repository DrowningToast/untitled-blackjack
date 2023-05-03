import {
  ERR_INTERNAL,
  ERR_INVALID_TRUMP_CARD,
  ERR_INVALID_USER,
  ERR_NO_TRUMP_FOUND,
  ERR_TRUMP_USE_DENIED,
  UserController,
  insertErrorStack,
} from "database";
import { AsyncExceptionHandler } from "../../AsyncExceptionHandler";
import { useTrumpBroadcast } from "../../broadcast/useTrumpBroadcast";
import { APIG } from "../../APIGateway";
import { trumpCardsAsArray } from "../../../gameplay/trumpcards/TrumpCard";

export const useTrumpEvent = AsyncExceptionHandler(
  async (api: APIG, userConnectionId: string, trumpHandler: string) => {
    const [user, err] = await UserController.getUserMeta({
      connectionId: userConnectionId,
    });
    if (err) throw err;
    if (!user) throw ERR_INVALID_USER;

    // check for deny use trumpcard
    if (user.trumpStatus.includes("DENY_TRUMP_USE"))
      throw insertErrorStack(ERR_TRUMP_USE_DENIED);

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
    const [trumpCardsAsDoc, err2] = await UserController.getTrumpCards({
      username: user.username,
    });
    if (err2) throw err2;

    console.log(trumpCardsAsDoc);

    const trumpCardAsDoc = trumpCardsAsDoc.find(
      (trump) => trump.handler === trumpHandler
    );
    if (!trumpCardAsDoc) throw ERR_NO_TRUMP_FOUND;

    // get the trump card as an object
    const trumpCard = trumpCardsAsArray.find(
      (trump) => trump.handler === trumpCardAsDoc.handler
    );
    if (!trumpCard) throw ERR_INTERNAL;

    // user cards before using trump card
    const [oldCards, errCards] = await UserController.getCards({
      username: user.username,
    });
    if (errCards) throw errCards;

    console.log({
      username: user.username,
    });

    // use trump card
    const [res, err3] = await UserController.useTrumpCard(
      {
        username: user.username,
      },
      trumpCard
    );
    if (err3) throw err3;

    console.log("Used the trump card");

    // announce use or trump card
    const [_, errBroadcast] = await useTrumpBroadcast(
      api,
      user.username,
      trumpCard
    );
    if (errBroadcast) throw errBroadcast;

    if (trumpCard.type === "DRAW") {
      // check if the user has drawn the card successfully or not
      // get user cards
      const [newCards, errCards2] = await UserController.getCards({
        username: user.username,
      });
      if (errCards2) throw errCards2;

      console.log(oldCards);
      console.log(newCards);

      const success = newCards.length > oldCards.length;

      console.log(success);

      // trigger trump card events with success
      await trumpCard.afterHandler(api, userConnectionId, success);
    } else {
      // trigger trump card events
      await trumpCard.afterHandler(api, userConnectionId);
    }
  }
);
