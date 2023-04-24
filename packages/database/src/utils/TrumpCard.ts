import { GameActionController } from "../controllers/GameActionController";
import { GameController } from "../controllers/GameController";
import { UserController } from "../controllers/UserController";
import { IGame } from "../models/GameModel";
import { TrumpCard } from "../models/TrumpCardModel";
import { IUser, User } from "../models/UserModel";
import {
  Card,
  aceCard,
  fiveCard,
  jackCard,
  kingCard,
  queenCard,
  sevenCard,
  tenCard,
  threeCard,
} from "./Card";

export const demoTrump: TrumpCard = {
  handler: "demo",
  onUse: async (cardUser, game) => {
    console.log(cardUser);
    console.log(game);
  },
};

export const aceTrump: TrumpCard<typeof aceCard | undefined> = {
  handler: "ace",
  onUse: async (cardUser, game) => {
    const [cards, err1] = await GameActionController.getRemainingCards(
      game.gameId
    );
    if (err1) throw err1;

    // check if ace card is in the deck
    const ace = cards.find((card) => card.display === "A");
    if (!ace) return undefined;

    // insert the ace card into the user hand
    const [connectionId, err2] = await UserController.getConnectionId({
      username: cardUser.username,
    });
    if (err2) throw err2;

    const [user, err3] = await UserController.addCards(connectionId, [ace]);
    if (err3) throw err3;

    // return the ace indicating that the card was used
    return ace as typeof aceCard;
  },
};

export const threeTrump: TrumpCard<typeof threeCard | undefined> = {
  handler: "three",
  onUse: async (cardUser, game) => {
    const [cards, err1] = await GameActionController.getRemainingCards(
      game.gameId
    );
    if (err1) throw err1;

    // check if ace card is in the deck
    const three = cards.find((card) => card.display === "3");
    if (!three) return undefined;

    // insert the ace card into the user hand
    const [connectionId, err2] = await UserController.getConnectionId({
      username: cardUser.username,
    });
    if (err2) throw err2;

    const [user, err3] = await UserController.addCards(connectionId, [three]);
    if (err3) throw err3;

    // return the ace indicating that the card was used
    return three as typeof threeCard;
  },
};

export const fiveTrump: TrumpCard<typeof fiveCard | undefined> = {
  handler: "five",
  onUse: async (cardUser, game) => {
    const [cards, err1] = await GameActionController.getRemainingCards(
      game.gameId
    );
    if (err1) throw err1;

    // check if ace card is in the deck
    const five = cards.find((card) => card.display === "5");
    if (!five) return undefined;

    // insert the ace card into the user hand
    const [connectionId, err2] = await UserController.getConnectionId({
      username: cardUser.username,
    });
    if (err2) throw err2;

    const [user, err3] = await UserController.addCards(connectionId, [five]);
    if (err3) throw err3;

    // return the ace indicating that the card was used
    return five as typeof fiveCard;
  },
};

export const sevenTrump: TrumpCard<typeof sevenCard | undefined> = {
  handler: "seven",
  onUse: async (cardUser, game) => {
    const [cards, err1] = await GameActionController.getRemainingCards(
      game.gameId
    );
    if (err1) throw err1;

    // check if ace card is in the deck
    const seven = cards.find((card) => card.display === "7");
    if (!seven) return undefined;

    // insert the ace card into the user hand
    const [connectionId, err2] = await UserController.getConnectionId({
      username: cardUser.username,
    });
    if (err2) throw err2;

    const [user, err3] = await UserController.addCards(connectionId, [seven]);
    if (err3) throw err3;

    // return the ace indicating that the card was used
    return seven as typeof sevenCard;
  },
};

export const tenTrumps: TrumpCard<
  | typeof tenCard
  | typeof jackCard
  | typeof queenCard
  | typeof kingCard
  | undefined
> = {
  handler: "tens",
  onUse: async (cardUser, game) => {
    const [cards, err1] = await GameActionController.getRemainingCards(
      game.gameId
    );
    if (err1) throw err1;

    // check if ace card is in the deck
    const tens = cards.find((card) => card.values[0] === 10);
    if (!tens) return undefined;

    // insert the ace card into the user hand
    const [connectionId, err2] = await UserController.getConnectionId({
      username: cardUser.username,
    });
    if (err2) throw err2;

    const [user, err3] = await UserController.addCards(connectionId, [tens]);
    if (err3) throw err3;

    // return the ace indicating that the card was used
    return tens as
      | typeof tenCard
      | typeof jackCard
      | typeof queenCard
      | typeof kingCard;
  },
};

/**
 * Remove last drawn card from the opponent, returns ALL remaining cards
 */
export const attackRemoveLastCardTrump: TrumpCard<Card[] | undefined> = {
  handler: "attackRemoveLastCard",
  onUse: async (cardUser, game) => {
    const [target, errTarget] = await GameController.getOpponent(
      game.gameId,
      cardUser.username
    );
    if (errTarget) throw errTarget;

    const [targetCards, errTargetCards] = await UserController.getCards({
      username: target.username,
    });
    if (errTargetCards) throw errTargetCards;

    // check if the target has only 2 cards
    if (targetCards.length < 3) return;

    // remove the last card from the target
    const [connectionId, err2] = await UserController.getConnectionId({
      username: target.username,
    });
    if (err2) throw err2;

    const [cards, err3] = await UserController.removeCards(connectionId, [
      targetCards[targetCards.length - 1],
    ]);
    if (err3) throw err3;

    return cards;
  },
};

/**
 * The target won't be able to see their own cards
 */
export const blindDrawTrump: TrumpCard<IUser["trumpStatus"]> = {
  handler: "blindDraw",
  onUse: async (cardUser, game) => {
    const [target, errTarget] = await GameController.getOpponent(
      game.gameId,
      cardUser.username
    );
    if (errTarget) throw errTarget;

    if (target.trumpStatus.find((status) => status === "BLIND"))
      return target.trumpStatus;

    // add blind status
    const [statuses, errStatus] = await UserController.addTrumpStatus(
      { username: cardUser.username },
      "BLIND"
    );
    if (errStatus) throw errStatus;

    return statuses;
  },
};

export const denyDrawTrump: TrumpCard<IUser["trumpStatus"]> = {
  handler: "denyDraw",
  onUse: async (cardUser, game) => {
    const [target, errTarget] = await GameController.getOpponent(
      game.gameId,
      cardUser.username
    );

    if (errTarget) throw errTarget;

    if (target.trumpStatus.find((status) => status === "DENY_DRAW"))
      return target.trumpStatus;

    // add blind status
    const [statuses, errStatus] = await UserController.addTrumpStatus(
      { username: cardUser.username },
      "DENY_DRAW"
    );
    if (errStatus) throw errStatus;

    return statuses;
  },
};

export const nullifyTrumpCard: TrumpCard<IUser["trumpStatus"]> = {
  handler: "nullifyOpponentTrumpCards",
  onUse: async (cardUser, game) => {
    const [target, errTarget] = await GameController.getOpponent(
      game.gameId,
      cardUser.username
    );
    if (errTarget) throw errTarget;

    if (target.trumpStatus.find((status) => status === "DENY_TRUMP_USE"))
      return target.trumpStatus;

    // cleanse my status
    const [statuses, errStatus] = await UserController.removeTrumpStatus(
      cardUser
    );
    if (errStatus) throw errStatus;

    return statuses;
  },
};

/**
 * Force the opponent to draw the max card from the deck
 */
export const maxCardOpponentTrump: TrumpCard<Card[]> = {
  handler: "maxCardOpponent",
  onUse: async (cardUser, game) => {
    const [target, errTarget] = await GameController.getOpponent(
      game.gameId,
      cardUser.username
    );
    if (errTarget) throw errTarget;

    const [currCards, errCurr] = await UserController.getCards({
      username: target.username,
    });
    if (errCurr) throw errCurr;

    const [maxCard, errMax] = await GameActionController.getMaxCard(
      game.gameId
    );
    if (errMax) throw errMax;

    if (!maxCard) return currCards;

    // remove the last card from the target
    const [connectionId, err2] = await UserController.getConnectionId({
      username: target.username,
    });
    if (err2) throw err2;

    const [newCards, err3] = await UserController.addCards(connectionId, [
      maxCard,
    ]);
    if (err3) throw err3;

    return newCards;
  },
};

/**
 * Ability to see through the opponent's cards
 */
export const seeThroughTrump: TrumpCard<IUser["trumpStatus"]> = {
  handler: "seeThrough",
  onUse: async (cardUser, game) => {
    const [statuses, err] = await UserController.addTrumpStatus(
      cardUser,
      "SEE_OPPONENT_CARDS"
    );
    if (err) throw err;

    return statuses;
  },
};

/**
 * Change the target point in the round from 21 to 25
 */
export const changePointsLimit25Trump: TrumpCard<IGame> = {
  handler: "changePointsLimit25",
  onUse: async (cardUser, game) => {
    const [newGame, err] = await GameActionController.setTargetPoint(
      game.gameId,
      25
    );
    if (err) throw err;

    return newGame;
  },
};

/**
 * When the user has more than 3 cards, they can use this card to remove the last card
 */
export const undoHitTrump: TrumpCard<Card[]> = {
  handler: "undoHit",
  onUse: async (cardUser, game) => {
    const [currCards, errCurr] = await UserController.getCards(cardUser);
    if (errCurr) throw errCurr;

    if (currCards.length < 3) return currCards;

    const [connectionId, err2] = await UserController.getConnectionId(cardUser);
    if (err2) throw err2;

    const [_, err3] = await UserController.setCards(
      connectionId,
      currCards.slice(0, -1)
    );
    if (err3) throw err3;

    const [cards, errCards] = await UserController.getCards(cardUser);
    if (errCards) throw errCards;

    return cards;
  },
};

export const trumpCards = [demoTrump];
