import { AsyncExceptionHandler } from "../../websocket/AsyncExceptionHandler";
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
  denyHitTrumpEventHandler,
  invincibilityTrumpEventHandler,
  maxCardOpponentTrumpEventHandler,
  removeLastCardTrumpEventHandler,
  seeNextHitTrumpEventHandlder,
  undoHitTrumpEventHandler,
} from "./TrumpCardEventHandler";

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
    const [cards, err1] = await GameActionController.getRemainingCards(
      game.gameId
    );
    if (err1) throw err1;

    // check if choosenCard card is in the deck
    const choosenCard = cards.find(
      (card) => card.display === targetCard.display
    );
    if (!choosenCard) return undefined;

    const [allCards, err3] = await GameActionController.takeCards(
      cardUser,
      game.gameId,
      [choosenCard]
    );
    if (err3) throw err3;

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

    const [targetCards, errTargetCards] = await UserController.getCards(
      {
        username: target.username,
      },
      true
    );
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
  handler: "blind",
  type: "ATTACK",
  onUse: async (cardUser, game) => {
    const [target, errTarget] = await GameController.getOpponent(
      game.gameId,
      cardUser.username
    );
    if (errTarget) throw errTarget;

    if (target.trumpStatus.find((status) => status === "BLIND")) return target;

    // add blind status
    const [statuses, errStatus] = await UserController.addTrumpStatus(
      { username: target.username },
      "BLIND"
    );
    if (errStatus) throw errStatus;

    const [updated, errUpdated] = await UserController.getUserMeta({
      username: target.username,
    });
    if (errUpdated) throw errUpdated;

    return updated;
  },
  afterHandler: blindDrawTrumpEventHandler(),
};

/**
 * Deny the opponent from drawing cards in the current round
 * gives opponent the trump status "DENY_HIT"
 *
 * @return the target IUser
 */
const denyHitTrump: TrumpCard<IUser> = {
  handler: "denyHit",
  type: "ATTACK",
  onUse: async (cardUser, game) => {
    const [target, errTarget] = await GameController.getOpponent(
      game.gameId,
      cardUser.username
    );

    if (errTarget) throw errTarget;

    if (target.trumpStatus.find((status) => status === "DENY_HIT"))
      return target;

    // add blind status
    const [statuses, errStatus] = await UserController.addTrumpStatus(
      { username: target.username },
      "DENY_HIT"
    );
    if (errStatus) throw errStatus;

    // return the updated user
    const [updated, errUpdated] = await UserController.getUserMeta({
      username: target.username,
    });
    if (errUpdated) throw errUpdated;

    return updated;
  },
  afterHandler: denyHitTrumpEventHandler(),
};

/**
 *  Prevent opponent from using trump cards and cleanse my
 */
const denyUseTrumpCardTrump: TrumpCard<IUser> = {
  handler: "denyUseTrumpCard",
  type: "ATTACK",
  onUse: async (cardUser, game) => {
    const [target, errTarget] = await GameController.getOpponent(
      game.gameId,
      cardUser.username
    );
    if (errTarget) throw errTarget;

    // add deny trump use status
    const [_, errStatus] = await UserController.addTrumpStatus(
      { username: target.username },
      "DENY_TRUMP_USE"
    );
    if (errStatus) throw errStatus;

    // get updated user
    const [updated, errUpdated] = await UserController.getUserMeta({
      username: target.username,
    });
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
    const [isInvinc, errInvinc] = await UserController.checkInvincibility({
      username: target.username,
    });
    if (errInvinc) throw errInvinc;
    if (isInvinc) return currCards;

    const [maxCard, errMax] = await GameActionController.takeMaxCard(
      game.gameId
    );
    if (errMax) throw errMax;

    if (!maxCard) return currCards;

    const [newCards, err3] = await UserController.addCards(
      { username: target.username },
      [maxCard]
    );
    if (err3) throw err3;

    return newCards;
  },
  afterHandler: maxCardOpponentTrumpEventHandler(),
};

/**
 * Notify the user of what card is the next card in the deck
 */
const seeNextHitTrump: TrumpCard<void> = {
  handler: "seeNextHit",
  type: "UTILITY",
  onUse: async (cardUser, game) => {},
  afterHandler: seeNextHitTrumpEventHandlder(),
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
    const [currCards, errCurr] = await UserController.getCards(cardUser, true);
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
    const [statuses, err] = await UserController.setTrumpStatus(cardUser, [
      "INVINCIBLE",
    ]);
    if (err) throw err;

    // get the updated user meta
    const [user, err2] = await UserController.getUserMeta(cardUser);
    if (err2) throw err2;

    return user;
  },
  afterHandler: invincibilityTrumpEventHandler(),
};

// All trump cards in the game
export const trumpCardsAsArray: TrumpCard[] = [
  /**
   * Blind the opponent from seeing any cards, including hitting cards
   */
  blindDrawTrump,
  /**
   * Prevent the opponent from hitting
   */
  denyHitTrump,
  /**
   * Prevent the opponent from using trump cards
   */
  denyUseTrumpCardTrump,
  /**
   * Draw the max card in the deck and add it to the opponent's hand
   */
  maxCardOpponentTrump,
  /**
   * Return the next 2 cards in the deck
   */
  seeNextHitTrump,
  /**
   * Change the target point in the round from 21 to 25, resets back to default target point next round
   */
  changePointsLimit25Trump,
  /**
   * When the user has more than 3 cards, they can use this card to remove their last card
   */
  undoHitTrump,
  /**
   * Prevent opponent from using attack trump cards, and cleanse the statuses on the user
   */
  invincibilityTrump,
  /**
   * Prevented by: Invincibility status
   */
  removeLastCardTrump,
  /**
   * Draws Ace card, if it's still in the deck
   */
  aceTrump,
  /**
   * Draws Three card, if it's still in the deck
   */
  threeTrump,
  /**
   * Draws Five card, if it's still in the deck
   */
  fiveTrump,
  /**
   * Draws Seven card, if it's still in the deck
   */
  sevenTrump,
  /**
   * Draws any cards with value of 10, if it's still in the deck
   */
  tenTrumps,
];

export const trumpCardsAsObject: { [key: string]: TrumpCard } = {
  blindDrawTrump,
  denyHitTrump,
  denyUseTrumpCardTrump,
  maxCardOpponentTrump,
  seeNextHitTrump,
  changePointsLimit25Trump,
  undoHitTrump,
  invincibilityTrump,
  removeLastCardTrump,
  aceTrump,
  threeTrump,
  fiveTrump,
  sevenTrump,
  tenTrumps,
};
