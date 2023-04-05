import { Game } from "../models/GameModel";
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

/**
 * There should be no function that updates the game instance data directly for security reasons
 */

/**
 * @description This function create a new game instance
 */
export const createGame = asyncTransaction(async (playersIDs: string[]) => {
  /**
   * Ensure there are only 2 players
   */
  if (playersIDs.length !== 2) {
    throw new Error("Only 2 players are allowed");
  }

  const _ = new Game({
    players: playersIDs,
    onGoing: true,
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
});

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
export const getGame = asyncTransaction(async (gameId: string) => {
  // Get the game instance and populate the players
  const _ = await Game.findOne({
    gameId,
  })
    .populate("players")
    .select("-remainingCards -players.cards");
  return _;
});
