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
import { getUserMeta } from "./UserController";

/**
 * There should be no function that updates the game instance data directly for security reasons
 */

/**
 * @description This function create a new game instance
 */
export const createGame = asyncTransaction(
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
 * @description reset the remaining cards to the initial state
 */
export const resetRemainingCards = asyncTransaction(async (gameId: string) => {
  const _ = await Game.findOneAndUpdate(
    {
      gameId,
    },
    {
      remainingCards: sortedAllCards,
    }
  );
  return _;
});

/**
 * @description Shuffle the remaining cards
 */
export const shuffleRemainingCards = asyncTransaction(
  async (gameId: string) => {
    const game = await Game.findOne({
      gameId,
    }).select("remainingCards");

    const shuffledCards = game?.remainingCards.sort(() => Math.random() - 0.5);

    // Update the shuffled cards back to the game instance
    const _ = await Game.findOneAndUpdate(
      {
        gameId,
      },
      {
        remainingCards: shuffledCards,
      }
    );
    return _;
  }
);

/**
 * @description Switch the player turn
 */
export const switchPlayerTurn = asyncTransaction(async (gameId: string) => {
  // Get the game instance
  const game = await Game.findOne({
    gameId,
  }).select("players turnOwner");
  // Get the current turn owner
  const currentTurnOwner = game?.turnOwner;

  // If the current turn owner is undefined, random the first turn owner
  if (currentTurnOwner === undefined) {
    const randomPlayer = Math.floor(Math.random() * 2);
    const _ = await Game.findOneAndUpdate(
      {
        gameId,
      },
      {
        turnOwner: game?.players[randomPlayer],
      }
    );
    return _;
  } else {
    // If the current turn owner is not undefined, switch the turn owner
    const _ = await Game.findOneAndUpdate(
      {
        gameId,
      },
      {
        turnOwner: game?.players.filter(
          (player) => player !== currentTurnOwner
        )[0],
      }
    );
    return _;
  }
});

/**
 * @description Get the current turn owner
 */
export const getTurnOwner = asyncTransaction(async (gameId: string) => {
  // Get the game owner
  const _ = await Game.findOne({
    gameId,
  }).select("turnOwner");
  return _;
});

/**
 * @description Get the game instance non-sensitive data (exclude remainingCards, player.cards)
 */
export const getGame = asyncTransaction(async (arg: FilterQuery<IGame>) => {
  // Get the game instance and populate the players
  const _ = await Game.findOne(arg)
    .populate("players")
    .select("-remainingCards -players.cards");
  return _;
});

/**
 * @description Join another game instance
 */
export const joinGame = asyncTransaction(
  async (gameId: string, userId: string) => {
    // Get the game instance
    const _ = await Game.findByIdAndUpdate(gameId, {
      $push: {
        players: userId,
      },
    });
    return _;
  }
);
