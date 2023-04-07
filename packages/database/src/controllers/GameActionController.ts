import { Game } from "../models/GameModel";
import { sortedAllCards } from "../utils/Card";
import { asyncTransaction } from "../utils/Transaction";
import { trumpCards } from "../utils/TrumpCard";

/**
 * @description Draw the card from the remaining cards
 */
const drawCard = asyncTransaction(
  async (gameId: string, amount: number = 1) => {
    const game = await Game.findOne({
      gameId,
    }).select("remainingCards");

    const remaining = game?.remainingCards.slice(0, -amount);
    const drawn = game?.remainingCards.slice(-amount);

    // Update the remaining cards back to the game instance
    const _ = await Game.findOneAndUpdate(
      {
        gameId,
      },
      {
        remainingCards: remaining,
      }
    );

    return drawn;
  }
);

/**
 * @description reset the remaining cards to the initial state
 */
const resetRemainingCards = asyncTransaction(async (gameId: string) => {
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
const shuffleRemainingCards = asyncTransaction(async (gameId: string) => {
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
});

/**
 * @description Get the amount of remaining cards
 */
const getAmountOfRemainingCards = asyncTransaction(async (gameId: string) => {
  const game = await Game.findOne({
    gameId,
  }).select("remainingCards");
  return game?.remainingCards.length;
});

/**
 * @description Switch the player turn
 */
const switchPlayerTurn = asyncTransaction(async (gameId: string) => {
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
const drawRandomTrumpCard = asyncTransaction(async () => {
  // return a random trump card
  return trumpCards[Math.floor(Math.random() * trumpCards.length)];
});

export const GameActionController = {
  drawCard,
  resetRemainingCards,
  shuffleRemainingCards,
  getAmountOfRemainingCards,
  switchPlayerTurn,
  drawRandomTrumpCard,
};
