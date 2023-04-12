import { Game, ZodGameStrip } from "../models/GameModel";
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

  if (!game) throw ERR_INVALID_GAME;

  const [players, err] = await GameController.getPlayers(gameId);
  if (err) throw err;

  const [playerA, playerB] = players;
  const [connectionA, errA] = await UserController.getConnectionId({
    username: playerA.username,
  });
  const [connectionB, errB] = await UserController.getConnectionId({
    username: playerB.username,
  });

  if (errA || errB) throw ERR_INTERNAL;

  // Reset the cards
  await resetRemainingCards(gameId);
  // Shuffle the cards
  await shuffleRemainingCards(gameId);

  // Draw 2 cards for each player
  const [cardA, eA] = await drawCard(gameId, 2);
  const [cardB, eB] = await drawCard(gameId, 2);

  if (eA || eB) throw ERR_INTERNAL;

  // Deal the cards to the players
  const _ = await Promise.all([
    UserController.setCards(connectionA, cardA),
    UserController.setCards(connectionB, cardB),
  ]);

  // Set the turn owner
  const [newGame, e] = await setTurnOwner(gameId);
  if (e) throw ERR_INTERNAL;

  const [res] = await GameController.getGame({ gameId });

  return res;
});

const drawCard = asyncTransaction(
  async (gameId: string, amount: number = 1) => {
    const [remainingCardsCount] = await getAmountOfRemainingCards(gameId);

    if (remainingCardsCount === undefined) throw ERR_INTERNAL;

    if (remainingCardsCount < amount) {
      amount = remainingCardsCount;
    }

    // Get the game instance
    const [game] = await GameController.getGame({ gameId });

    if (!game) throw ERR_INVALID_GAME;

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

    if (!game) throw ERR_INVALID_GAME;

    const players = game.players;

    let connectionId: string = connId ?? "";

    if (!connId) {
      const randomPlayer = players[Math.floor(Math.random() * players.length)];
      const [conn, err] = await UserController.getConnectionId({
        username: randomPlayer.username,
      });
      if (err) throw ERR_INVALID_USER;
      connectionId = conn;
    }

    const [user] = await UserController.getUserMeta({
      connectionId: connectionId,
    });

    if (!user) throw ERR_INVALID_USER;

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
    if (err) throw ERR_INVALID_GAME;

    const [connectionA, errA] = await UserController.getConnectionId({
      username: players[0].username,
    });
    const [connectionB, errB] = await UserController.getConnectionId({
      username: players[1].username,
    });

    if (errA || errB) throw ERR_INTERNAL;

    const [A, B] = players;

    // Get their cards manually
    const [cardsA, eA] = await UserController.getCards(
      {
        connectionId: connectionA,
      },
      includeHidden
    );
    const [cardsB, eB] = await UserController.getCards(
      {
        connectionId: connectionB,
      },
      includeHidden
    );

    if (eA || eB) throw ERR_INVALID_USER;

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
  const _ = await GameController.updateGame(
    {
      gameId,
    },
    {
      remainingCards: sortedAllCards,
    }
  );
  return ZodGameStrip.parse(_);
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

  const [newGame, err] = await GameController.getGame({ gameId });

  if (err) throw ERR_INTERNAL;

  return newGame.remainingCards;
});

const getAmountOfRemainingCards = asyncTransaction(async (gameId: string) => {
  const game = await Game.findOne({
    gameId,
  }).select("remainingCards");

  if (!game) throw ERR_INVALID_GAME;

  return game.remainingCards.length;
});

const switchPlayerTurn = asyncTransaction(async (gameId: string) => {
  // Get the game instance
  const [game, err] = await GameController.getGame({ gameId });

  if (err) throw ERR_INVALID_GAME;

  // Get the current turn owner
  const currentTurnOwner = game.turnOwner;

  const [_, err2] = await GameController.updateGame(
    { gameId },
    {
      // If the current turn owner is undefined, set the turn owner to a random player
      // Else, set the turn owner to the player that is not the current
      turnOwner: !currentTurnOwner
        ? game.players[Math.floor(Math.random() * 2)]
        : game?.players.filter((player) => player !== currentTurnOwner)[0],
    }
  );

  if (err2) throw ERR_INTERNAL;

  return _;
});

const drawRandomTrumpCard = asyncTransaction(async () => {
  // return a random trump card
  return trumpCards[Math.floor(Math.random() * trumpCards.length)];
});

export const GameActionController = {
  /**
   * @access System level
   *
   * Initilize game starting conditions
   * This includes
   * 1. Reset the deck
   * 2. Shuffle the deck
   * 3. Randomize who starts first
   * 4. Deal cards to players
   */
  initGame,
  /**
   * @access System level, users themselves
   *
   * @description Return array of cards, and update the remaining cards
   */
  drawCard,
  /**
   * @access System level
   *
   * @description Reset the remaining cards to the original deck
   */
  resetRemainingCards,
  /**
   * @access System level
   *
   * @description Shuffle the remaining cards
   */
  shuffleRemainingCards,
  /**
   * @access System level
   *
   * @description Get the amount of remaining cards
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
