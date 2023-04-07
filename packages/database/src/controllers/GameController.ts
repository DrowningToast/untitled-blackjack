import { FilterQuery, UpdateQuery } from "mongoose";
import { Game, IGame } from "../models/GameModel";
import { IUser } from "../models/UserModel";
import {
  aceCard,
  eightCard,
  fiveCard,
  fourCard,
  jackCard,
  kingCard,
  nineCard,
  queenCard,
  sevenCard,
  sixCard,
  sortedAllCards,
  tenCard,
  threeCard,
  twoCard,
} from "../utils/Card";
import { asyncTransaction } from "../utils/Transaction";
import { UserController } from "./UserController";

/**
 * There should be no function that updates the game instance data directly for security reasons
 */

/**
 * @description This function create a new game instance
 */
const createGame = asyncTransaction(
  async (playersIDs: string[], passcode: string) => {
    /**
     * Ensure there is at least one player
     */
    if (playersIDs.length !== 1) {
      throw new Error("There should be at least one player");
    }

    const _ = new Game({
      players: playersIDs,
      gameState: "notStarted",
      passcode: passcode,
      // the instance starts with all cards
      remainingCards: [
        aceCard,
        twoCard,
        threeCard,
        fourCard,
        fiveCard,
        sixCard,
        sevenCard,
        eightCard,
        nineCard,
        tenCard,
        jackCard,
        queenCard,
        kingCard,
      ],
    });
    const res = await _.save();
    return res;
  }
);

/**
 * @description Get the current turn owner
 */
const getTurnOwner = asyncTransaction(async (gameId: string) => {
  // Get the game owner
  const _ = await Game.findOne({
    gameId,
  }).select("turnOwner");
  return _;
});

/**
 * @description Get the game instance non-sensitive data (exclude remainingCards, player.cards)
 */
const getGame = asyncTransaction(async (arg: FilterQuery<IGame>) => {
  // Get the game instance and populate the players
  const _ = await Game.findOne(arg)
    .populate("players")
    .select("-remainingCards -players.cards");
  return _;
});

/**
 * @description Join another game instance
 */
const joinGame = asyncTransaction(async (gameId: string, userId: string) => {
  // Get the game instance
  const _ = await Game.findByIdAndUpdate(gameId, {
    $push: {
      players: userId,
    },
  });
  return _;
});

/**
 * @description Change the player ready state in the game instance
 */
const changePlayerReadyState = asyncTransaction(
  async (sessID: string, ready: boolean) => {
    const [userMeta] = await UserController.getUserMeta({ sessID });
    const _ = await Game.findOneAndUpdate(
      {
        players: userMeta?.id,
      },
      {
        $set: {
          [`players.$.ready`]: ready,
        },
      }
    );
    return _;
  }
);

export const GameController = {
  createGame,
  getTurnOwner,
  getGame,
  joinGame,
  changePlayerReadyState,
};
