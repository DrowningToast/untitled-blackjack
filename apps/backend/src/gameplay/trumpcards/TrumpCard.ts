import { APIG } from "../../websocket/APIGateway";
import { AsyncExceptionHandler } from "../../websocket/AsyncExceptionHandler";
import { hitEventMessage } from "../../websocket/utils/WebsocketResponses";
import { GameActionController } from "database/src/controllers/GameActionController";
import { GameController } from "database/src/controllers/GameController";
import { UserController } from "database/src/controllers/UserController";
import { IGame } from "database/src/models/GameModel";
import { TrumpCard } from "database/src/models/TrumpCardModel";
import { IUser, User } from "database/src/models/UserModel";
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
} from "database/src/utils/Card";
import {
  DrawTrumpEventHandler,
  blindDrawTrumpEventHandler,
  changePointTargetTrumpEventHandler,
  denyDrawTrumpEventHandler,
  hideCardsTrumpEventHandler,
  invincibilityTrumpEventHandler,
  maxCardOpponentTrumpEventHandler,
  removeLastCardTrumpEventHandler,
  seeThroughTrumpEventHandler,
  undoHitTrumpEventHandler,
} from "./TrumpCardEventHandler";
import { ERR_INVALID_GAME } from "database/src/utils/error";

const demoTrump: TrumpCard = {
  handler: "demo",
  type: "dummy",
  onUse: async (cardUser, game) => {
    console.log(cardUser);
    console.log(game);
  },
  afterHandler: async () => {
    console.log("demo");
  },
};

const _handleDrawTrumpOnUse =
  (targetCard: Card): TrumpCard["onUse"] =>
  async (cardUser, game) => {
    console.log("choosenCard on use");
    console.log(cardUser);

    const [cards, err1] = await GameActionController.getRemainingCards(
      game.gameId
    );
    if (err1) throw err1;

    console.log(cards);

    // check if choosenCard card is in the deck
    const choosenCard = cards.find(
      (card) => card.display === targetCard.display
    );
    if (!choosenCard) return undefined;

    console.log(choosenCard);
    console.log(game.gameId);

    const [allCards, err3] = await GameActionController.takeCards(
      cardUser,
      game.gameId,
      [choosenCard]
    );
    console.log(allCards);
    if (err3) throw err3;

    console.log("returning");

    // return the choosenCard indicating that the card was used
    return choosenCard as typeof aceCard;
  };

const aceTrump: TrumpCard<typeof aceCard | undefined> = {
  handler: "ace",
  type: "DRAW",
  onUse: _handleDrawTrumpOnUse(aceCard),
  afterHandler: AsyncExceptionHandler(DrawTrumpEventHandler(aceCard)),
};

const threeTrump: TrumpCard<typeof threeCard | undefined> = {
  handler: "three",
  type: "DRAW",
  onUse: _handleDrawTrumpOnUse(threeCard),
  afterHandler: AsyncExceptionHandler(DrawTrumpEventHandler(threeCard)),
};

const fiveTrump: TrumpCard<typeof fiveCard | undefined> = {
  handler: "five",
  type: "DRAW",
  onUse: _handleDrawTrumpOnUse(fiveCard),
  afterHandler: DrawTrumpEventHandler(fiveCard),
};

const sevenTrump: TrumpCard<typeof sevenCard | undefined> = {
  handler: "seven",
  type: "DRAW",
  onUse: _handleDrawTrumpOnUse(sevenCard),
  afterHandler: DrawTrumpEventHandler(sevenCard),
};

const tenTrumps: TrumpCard<
  | typeof tenCard
  | typeof jackCard
  | typeof queenCard
  | typeof kingCard
  | undefined
> = {
  handler: "tens",
  type: "DRAW",
  onUse: async (cardUser, game) => {
    const ten = await _handleDrawTrumpOnUse(tenCard)(cardUser, game);
    if (ten) return ten;
    const jack = await _handleDrawTrumpOnUse(jackCard)(cardUser, game);
    if (jack) return jack;
    const queen = await _handleDrawTrumpOnUse(queenCard)(cardUser, game);
    if (queen) return queen;
    const king = await _handleDrawTrumpOnUse(kingCard)(cardUser, game);
    if (king) return king;
  },
  afterHandler: DrawTrumpEventHandler(tenCard),
};

/**
 * Remove last drawn card from the opponent, returns ALL remaining cards
 */
const removeLastCardTrump: TrumpCard<Card[] | undefined> = {
  handler: "removeLastCard",
  type: "ATTACK",
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

    // check if the opponent is invincible
    const [opponent, errOpponent] = await GameController.getOpponent(
      game.gameId,
      target.username
    );
    if (errOpponent) throw errOpponent;
    const [isInvinc, errInvinc] = await UserController.checkInvincibility(
      opponent
    );
    if (errInvinc) throw errInvinc;
    if (isInvinc) return;

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
  afterHandler: removeLastCardTrumpEventHandler(),
};

/**
 * The target won't be able to see their own cards,
 * gives opponent the trump status "BLIND"
 *
 * @return the target IUser
 */
const blindDrawTrump: TrumpCard<IUser> = {
  handler: "blindDraw",
  type: "ATTACK",
  onUse: async (cardUser, game) => {
    const [target, errTarget] = await GameController.getOpponent(
      game.gameId,
      cardUser.username
    );
    if (errTarget) throw errTarget;

    const [isInvinc, errInvinc] = await UserController.checkInvincibility(
      target
    );
    if (errInvinc) throw errInvinc;
    if (isInvinc) return target;

    if (target.trumpStatus.find((status) => status === "BLIND")) return target;

    // add blind status
    const [statuses, errStatus] = await UserController.addTrumpStatus(
      { username: cardUser.username },
      "BLIND"
    );
    if (errStatus) throw errStatus;

    const [updated, errUpdated] = await UserController.getUserMeta(target);
    if (errUpdated) throw errUpdated;

    return updated;
  },
  afterHandler: blindDrawTrumpEventHandler(),
};

/**
 * Deny the opponent from drawing cards in the current round
 * gives opponent the trump status "DENY_DRAW"
 *
 * @return the target IUser
 */
const denyDrawTrump: TrumpCard<IUser> = {
  handler: "denyDraw",
  type: "ATTACK",
  onUse: async (cardUser, game) => {
    const [target, errTarget] = await GameController.getOpponent(
      game.gameId,
      cardUser.username
    );

    if (errTarget) throw errTarget;

    const [isInvinc, errInvinc] = await UserController.checkInvincibility(
      target
    );
    if (errInvinc) throw errInvinc;
    if (isInvinc) return target;

    if (target.trumpStatus.find((status) => status === "DENY_DRAW"))
      return target;

    // add blind status
    const [statuses, errStatus] = await UserController.addTrumpStatus(
      { username: cardUser.username },
      "DENY_DRAW"
    );
    if (errStatus) throw errStatus;

    // return the updated user
    const [updated, errUpdated] = await UserController.getUserMeta(target);
    if (errUpdated) throw errUpdated;

    return updated;
  },
  afterHandler: denyDrawTrumpEventHandler(),
};

/**
 *  Opponent cards will be hidden for a round
 */
const preventTrumpCardTrump: TrumpCard<IUser> = {
  handler: "preventOpponentTrumpCards",
  type: "ATTACK",
  onUse: async (cardUser, game) => {
    const [target, errTarget] = await GameController.getOpponent(
      game.gameId,
      cardUser.username
    );
    if (errTarget) throw errTarget;

    if (target.trumpStatus.find((status) => status === "DENY_TRUMP_USE"))
      return target;

    // cleanse my status
    const [statuses, errStatus] = await UserController.removeTrumpStatus(
      cardUser
    );
    if (errStatus) throw errStatus;

    // get updated user
    const [updated, errUpdated] = await UserController.getUserMeta(target);
    if (errUpdated) throw errUpdated;

    return updated;
  },
  afterHandler: blindDrawTrumpEventHandler(),
};

/**
 * Force the opponent to draw the max card from the deck
 *
 * @return the opponent's cards
 */
const maxCardOpponentTrump: TrumpCard<Card[]> = {
  handler: "maxCardOpponent",
  type: "ATTACK",
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

    // check for invincibility
    const [isInvinc, errInvinc] = await UserController.checkInvincibility(
      target
    );
    if (errInvinc) throw errInvinc;
    if (isInvinc) return currCards;

    const [maxCard, errMax] = await GameActionController.drawMaxCard(
      game.gameId
    );
    if (errMax) throw errMax;

    if (!maxCard) return currCards;

    const [newCards, err3] = await UserController.addCards(target, [maxCard]);
    if (err3) throw err3;

    return newCards;
  },
  afterHandler: maxCardOpponentTrumpEventHandler(),
};

/**
 * Ability to see through the opponent's cards
 */
const seeThroughTrump: TrumpCard<IUser> = {
  handler: "seeThrough",
  type: "ATTACK",
  onUse: async (cardUser, game) => {
    const [target, errTarget] = await GameController.getOpponent(
      game.gameId,
      cardUser.username
    );
    if (errTarget) throw errTarget;

    const [isInvinc, errInvinc] = await UserController.checkInvincibility(
      target
    );
    if (errInvinc) throw errInvinc;
    if (isInvinc) return target;

    const [statuses, err] = await UserController.addTrumpStatus(
      cardUser,
      "SEE_OPPONENT_CARDS"
    );
    if (err) throw err;

    // updated opponent
    const [updated, errUpdated] = await UserController.getUserMeta(target);
    if (errUpdated) throw errUpdated;

    return updated;
  },
  afterHandler: seeThroughTrumpEventHandler(),
};

/**
 * Change the target point in the round from 21 to 25
 */
const changePointsLimit25Trump: TrumpCard<IGame> = {
  handler: "changePointsLimit25",
  type: "UTILITY",
  onUse: async (cardUser, game) => {
    const [newGame, err] = await GameActionController.setTargetPoint(
      game.gameId,
      25
    );
    if (err) throw err;

    return newGame;
  },
  afterHandler: changePointTargetTrumpEventHandler(25),
};

/**
 * When the user has more than 3 cards, they can use this card to remove the last card
 */
const undoHitTrump: TrumpCard<Card[]> = {
  handler: "undoHit",
  type: "UTILITY",
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
  afterHandler: undoHitTrumpEventHandler(),
};

/**
 *
 * @return cardUser updated information
 */
const invincibilityTrump: TrumpCard<IUser> = {
  handler: "invincibility",
  type: "UTILITY",
  onUse: async (cardUser, game) => {
    const [statuses, err] = await UserController.addTrumpStatus(
      cardUser,
      "INVINCIBLE"
    );
    if (err) throw err;

    // get the updated user meta
    const [user, err2] = await UserController.getUserMeta(cardUser);
    if (err2) throw err2;

    return user;
  },
  afterHandler: invincibilityTrumpEventHandler(),
};

const hideCardsTrump: TrumpCard<IUser> = {
  handler: "hideCards",
  type: "UTILITY",
  onUse: async (cardUser, game) => {
    const [statuses, err] = await UserController.addTrumpStatus(
      cardUser,
      "HIDE_CARDS"
    );
    if (err) throw err;

    // get the user meta
    const [user, err2] = await UserController.getUserMeta(cardUser);
    if (err2) throw err2;

    return user;
  },
  afterHandler: hideCardsTrumpEventHandler(),
};

// All trump cards in the game
export const trumpCardsAsArray: TrumpCard[] = [
  blindDrawTrump,
  denyDrawTrump,
  preventTrumpCardTrump,
  maxCardOpponentTrump,
  seeThroughTrump,
  changePointsLimit25Trump,
  undoHitTrump,
  invincibilityTrump,
  hideCardsTrump,
  removeLastCardTrump,
  aceTrump,
  threeTrump,
  fiveTrump,
  sevenTrump,
  tenTrumps,
];

export const trumpCardsAsObject: { [key: string]: TrumpCard } = {
  blindDrawTrump,
  denyDrawTrump,
  preventTrumpCardTrump,
  maxCardOpponentTrump,
  seeThroughTrump,
  changePointsLimit25Trump,
  undoHitTrump,
  invincibilityTrump,
  hideCardsTrump,
  removeLastCardTrump,
  aceTrump,
  threeTrump,
  fiveTrump,
  sevenTrump,
  tenTrumps,
};
