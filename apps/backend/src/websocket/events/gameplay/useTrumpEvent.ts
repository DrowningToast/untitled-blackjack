import {
  ERR_INTERNAL,
  ERR_INVALID_TRUMP_CARD,
  ERR_INVALID_USER,
  ERR_NO_TRUMP_FOUND,
  ERR_TRUMP_USE_DENIED,
  GameController,
  UserController,
  insertErrorStack,
} from "database";
import { AsyncExceptionHandler } from "../../AsyncExceptionHandler";
import { useTrumpBroadcast } from "../../broadcast/useTrumpBroadcast";
import { APIG } from "../../APIGateway";
import { trumpCardsAsArray } from "../../../gameplay/trumpcards/TrumpCard";
import { ERR_OPPONENT_INVINCIBILITY } from "../../utils/ErrorMessages";
import { updateTrumpCardStateMessage } from "../../utils/WebsocketResponses";
import { trumpCardStateBroadcast } from "../../broadcast/trumpCardStateBroadcast";

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
      return trump.handler === trumpHandler;
    });
    if (!validTrump) throw insertErrorStack(ERR_INVALID_TRUMP_CARD);

    // check if the user has the trump card
    const [trumpCardsAsDoc, err2] = await UserController.getTrumpCards({
      username: user.username,
    });
    if (err2) throw err2;

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

    if (trumpCard.type === "ATTACK") {
      // get game
      const [game, errGame] = await GameController.getGame({
        players: user._id,
      });
      if (errGame) throw errGame;

      // get opponent
      const [opponent, errOpponent] = await GameController.getOpponent(
        game.gameId,
        user.username
      );
      if (errOpponent) throw errOpponent;

      if (opponent.trumpStatus.includes("INVINCIBLE"))
        throw insertErrorStack(ERR_OPPONENT_INVINCIBILITY);
    }

    // use trump card
    const [res, err3] = await UserController.useTrumpCard(
      {
        username: user.username,
      },
      trumpCard
    );
    if (err3) throw err3;

    // announce use or trump card
    const [_, errBroadcast] = await useTrumpBroadcast(
      api,
      user.username,
      trumpCard
    );
    if (errBroadcast) throw errBroadcast;

    const [remainingTrumpCards, errRemain] = await UserController.getTrumpCards;

    // send trump card update to the trump card user
    await api.send(
      updateTrumpCardStateMessage(remainingTrumpCards),
      userConnectionId
    );

    if (trumpCard.type === "DRAW") {
      // check if the user has drawn the card successfully or not
      // get user cards
      const [newCards, errCards2] = await UserController.getCards({
        username: user.username,
      });
      if (errCards2) throw errCards2;

      const success = newCards.length > oldCards.length;

      // trigger trump card events with success
      await trumpCard.afterHandler(api, userConnectionId, success);

      return;
    }

    // trigger trump card events
    await trumpCard.afterHandler(api, userConnectionId);
  }
);
