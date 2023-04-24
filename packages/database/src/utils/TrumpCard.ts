import { GameActionController } from "../controllers/GameActionController";
import { GameController } from "../controllers/GameController";
import { UserController } from "../controllers/UserController";
import { IGame } from "../models/GameModel";
import { IUser, User } from "../models/UserModel";
import {
  aceCard,
  fiveCard,
  jackCard,
  kingCard,
  queenCard,
  sevenCard,
  tenCard,
  threeCard,
} from "./Card";

export interface TrumpCard<T = any> {
  handler: string;
  // Handle the effeec of the card
  onUse: (
    // The user who used the card
    cardUser: IUser,
    // The game the user is in
    game: IGame
  ) => Promise<T>;
}

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

export const attackRemoveLastCardTrump: TrumpCard<boolean> = {
  handler: "attackRemoveLastCard",
  onUse: async (cardUser, game) => {
    return false;
  },
};

export const trumpCards = [demoTrump];
