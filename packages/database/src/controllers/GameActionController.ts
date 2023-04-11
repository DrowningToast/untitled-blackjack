import { Game } from "../models/GameModel";
import { sortedAllCards } from "../utils/Card";
import {
  ERR_INGAME_PLAYERS,
  ERR_INTERNAL,
  ERR_INVALID_GAME,
  ERR_INVALID_USER,
} from "../utils/Error";
import { asyncTransaction } from "../utils/Transaction";
import { trumpCards } from "../utils/TrumpCard";
import { GameController } from "./GameController";
import { UserController } from "./UserController";

const initGame = asyncTransaction(async (gameId: string) => {
  const [game] = await GameController.getGame({ gameId, gameState: "onGoing" });

  if (!game) {
    throw ERR_INVALID_GAME;
  }

  // Get first player
  const [players, err] = await GameController.getPlayers(gameId);
  if (err) {
    throw err;
  }
  const [playerA, playerB] = players;

  // Draw 2 cards for each player
  const [cardA, eA] = await drawCard(gameId, 2);
  const [cardB, eB] = await drawCard(gameId, 2);

  if (eA || eB) {
    throw ERR_INTERNAL;
  }

  // Deal the cards to the players
  const _ = await Promise.all([
    UserController.setCards(playerA.connectionId, cardA),
    UserController.setCards(playerB.connectionId, cardB),
  ]);

  // Set the turn owner
  const [newGame, e] = await setTurnOwner(gameId);
  if (e) {
    throw ERR_INTERNAL;
  }

  const [res] = await GameController.getGame({ gameId });

  return res;
});

const drawCard = asyncTransaction(
  async (gameId: string, amount: number = 1) => {
    const [remainingCardsCount] = await getAmountOfRemainingCards(gameId);

    if (remainingCardsCount === undefined) {
      throw ERR_INTERNAL;
    }

    if (remainingCardsCount < amount) {
      amount = remainingCardsCount;
    }

    // Get the game instance
    const [game] = await GameController.getGame({ gameId });

    if (!game) {
      throw ERR_INVALID_GAME;
    }

    const remaining = game?.remainingCards.slice(amount);
    const drawn = game?.remainingCards.slice(0, amount);

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

const getTurnOwner = asyncTransaction(
  async (connectionId: string, gameId: string) => {
    // Get the game owner
    const _ = await Game.findOne({
      connectionId,
      gameId,
    }).select("turnOwner");

    const [user] = await UserController.getUserMeta({
      _id: _?.turnOwner,
    });

    return user;
  }
);

const setTurnOwner = asyncTransaction(
  async (gameId: string, connId?: string) => {
    const [game] = await GameController.getGame({
      gameId,
    });

    if (!game) {
      throw ERR_INVALID_GAME;
    }

    const players = game.players;

    let connectionId: string = connId ?? "";

    // Get the user meta
    if (!connId) {
      // Random player
      const randomPlayer = players[Math.floor(Math.random() * players.length)];
      connectionId = randomPlayer.connectionId;
    }

    const [user] = await UserController.getUserMeta({
      connectionId: connectionId,
    });

    if (!user) {
      throw ERR_INVALID_USER;
    }

    const updatedGame = await Game.findOneAndUpdate(
      {
        gameId,
      },
      {
        turnOwner: user._id,
      }
    );

    return updatedGame;
  }
);

const getPlayersCards = asyncTransaction(
  async (gameId: string, includeHidden: boolean = false) => {
    const [players, err] = await GameController.getPlayers(gameId);

    if (err) {
      throw ERR_INGAME_PLAYERS;
    }

    const [A, B] = players;

    // Get their cards manually
    const [cardsA] = await UserController.getCards(
      {
        connectionId: A.connectionId,
      },
      includeHidden
    );
    const [cardsB] = await UserController.getCards(
      {
        connectionId: B.connectionId,
      },
      includeHidden
    );

    return [
      {
        username: A.username,
        cards: cardsA,
      },
      {
        username: B.username,
        cards: cardsB,
      },
    ];
  }
);

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

const getAmountOfRemainingCards = asyncTransaction(async (gameId: string) => {
  const game = await Game.findOne({
    gameId,
  }).select("remainingCards");

  if (!game) {
    throw ERR_INVALID_GAME;
  }

  return game.remainingCards.length;
});

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

const drawRandomTrumpCard = asyncTransaction(async () => {
  // return a random trump card
  return trumpCards[Math.floor(Math.random() * trumpCards.length)];
});

export const GameActionController = {
  /**
   * @access System level
   *
   * Initilize game starting conditions (eg. deals cards)
   */
  initGame,
  /**
   * @access System level, users themselves
   */
  drawCard,
  /**
   * @access System level
   */
  resetRemainingCards,
  /**
   * @access System level
   */
  shuffleRemainingCards,
  /**
   * @access System level
   */
  getAmountOfRemainingCards,
  /**
   * @access System level, users themselves
   */
  switchPlayerTurn,
  /**
   * @access User themselves
   */
  drawRandomTrumpCard,
  /**
   * @access Public
   *
   * - Returns document of player
   */
  getTurnOwner,
  /**
   * @access System Level
   *
   * @description Get the players cards of the game instance
   */
  getPlayersCards,
  /**
   * @access System level
   *
   * @description set the turn owner
   */
  setTurnOwner,
};
