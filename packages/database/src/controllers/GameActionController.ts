import { ERR_GAME_STATE } from "../../../../apps/backend/src/websocket/utils/ErrorMessages";
import { Game, ZodGameStrip, _IGame } from "../models/GameModel";
import { sortedGlobalCardsContext } from "../utils/Card";
import {
  ERR_INTERNAL,
  ERR_INVALID_CARDS,
  ERR_INVALID_GAME,
  ERR_INVALID_USER,
  ERR_NO_WINNER,
  ERR_ROUND_COUNTER,
  ERR_USER_STAND,
  ERR_WINNER_POINTS,
} from "../utils/Error";
import { asyncTransaction } from "../utils/Transaction";
import { trumpCards } from "../utils/TrumpCard";
import {
  GAME_ROUND_PLAYED_MAX,
  GAME_ROUND_SCORE_MAPPING,
  GAME_TARGET_POINT,
  GAME_WIN_SCORE_TARGET,
} from "../utils/config";
import { GameController } from "./GameController";
import { UserController } from "./UserController";

const initRound = asyncTransaction(async (gameId: string) => {
  console.log("INITING GAME");

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
  // Reset target card points
  await resetTargetPoint(gameId);

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

  return newGame;
});

const resetTargetPoint = asyncTransaction((gameId: string) => {
  return Game.findOneAndUpdate(
    {
      gameId,
    },
    {
      targetPoint: GAME_TARGET_POINT,
    }
  );
});

const drawCard = asyncTransaction(
  async (gameId: string, amount: number = 1) => {
    const [remainingCardsCount] = await getAmountOfRemainingCards(gameId);

    if (remainingCardsCount === undefined) throw ERR_INTERNAL;

    if (remainingCardsCount < amount) {
      amount = remainingCardsCount;
    }

    // Get the game instance
    const [game, err] = await GameController.getGame({ gameId });
    if (err) throw ERR_INVALID_GAME;

    const [cards, err2] = await getRemainingCards(gameId);
    if (err2) throw ERR_INTERNAL;

    const remaining = cards.slice(amount);
    const drawn = cards.slice(0, amount);

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

const getRemainingCards = asyncTransaction(async (gameId: string) => {
  const game = (await Game.findOne({
    gameId,
  }).select("remainingCards")) as unknown as _IGame;

  if (!game.remainingCards) throw ERR_INTERNAL;

  return game.remainingCards;
});

const getTurnOwner = asyncTransaction(async (gameId: string) => {
  // Get the game owner
  const _ = await Game.findOne({
    gameId,
  }).select("turnOwner");

  const [user, err] = await UserController.getUserMeta({
    _id: _?.turnOwner,
  });
  if (err) throw err;

  return user;
});

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

    await Game.findOneAndUpdate(
      {
        gameId,
      },
      {
        turnOwner: user._id,
      }
    );

    const [updatedGame, err] = await GameController.getGame({
      gameId,
    });

    if (err) throw ERR_INVALID_GAME;

    return updatedGame;
  }
);

const getAllPlayersCards = asyncTransaction(
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

const getPlayerCards = asyncTransaction(
  async (
    gameId: string,
    connectionId: string,
    includeHidden: boolean = true
  ) => {
    const [game, err] = await GameController.getGame({
      gameId,
    });
    if (err) throw ERR_INVALID_GAME;

    const [user, err2] = await UserController.getUserMeta({
      connectionId,
    });
    if (err2) throw ERR_INVALID_USER;

    if (game.players.find((p) => p.username === user.username) === undefined)
      throw ERR_INVALID_USER;

    const [cards, err3] = await UserController.getCards(
      {
        connectionId,
      },
      includeHidden
    );
    if (err3) throw ERR_INVALID_USER;

    return cards;
  }
);

const resetPlayersState = asyncTransaction(async (gameId: string) => {
  const [game, err] = await GameController.getGame({ gameId });
  if (err) throw ERR_INVALID_GAME;

  const players = game.players;
  const [[_1, err2], [_2, err3]] = await Promise.all(
    players.map(
      asyncTransaction(async (player) => {
        const [user, err] = await UserController.setStandState(
          { username: player.username },
          false
        );
        if (err) throw err;
        return user;
      })
    )
  );
  if (err2 || err3) throw ERR_INTERNAL;

  return players;
});

const resetRemainingCards = asyncTransaction(async (gameId: string) => {
  const _ = await GameController.updateGame(
    {
      gameId,
    },
    {
      remainingCards: sortedGlobalCardsContext,
      $set: {
        cardPointTarget: 21,
      },
    }
  );

  const [game, err] = await GameController.getGame({ gameId });
  if (err) throw ERR_INVALID_GAME;
  return ZodGameStrip.parse(game);
});

const shuffleRemainingCards = asyncTransaction(async (gameId: string) => {
  const [cards, err] = await getRemainingCards(gameId);

  if (err) throw ERR_INTERNAL;

  const shuffledCards = cards.sort(() => Math.random() - 0.5);

  // Update the shuffled cards back to the game instance
  const _ = await Game.findOneAndUpdate(
    {
      gameId,
    },
    {
      remainingCards: shuffledCards,
    }
  );

  // const [newGame, err2] = await GameController.getGame({ gameId });
  const [newCards, err2] = await getRemainingCards(gameId);

  if (err2) throw ERR_INTERNAL;

  return newCards;
});

const getAmountOfRemainingCards = asyncTransaction(async (gameId: string) => {
  const [cards, err] = await getRemainingCards(gameId);

  if (err) throw ERR_INTERNAL;

  return cards.length;
});

const switchPlayerTurn = asyncTransaction(async (gameId: string) => {
  // Get the game instance
  const [game, err] = await GameController.getGame({ gameId });

  if (err) throw ERR_INVALID_GAME;

  // Get the current turn owner
  const currentTurnOwner = game.turnOwner;
  const newTurnOwner = !currentTurnOwner
    ? game.players[Math.floor(Math.random() * 2)]
    : game?.players.filter(
        (player) => player.username !== currentTurnOwner.username
      )[0];

  const [_, err2] = await GameController.updateGame(
    { gameId },
    {
      // If the current turn owner is undefined, set the turn owner to a random player
      // Else, set the turn owner to the player that is not the current
      turnOwner: newTurnOwner._id,
    }
  );

  if (err2) throw ERR_INTERNAL;

  return newTurnOwner;
});

const setTargetPoint = asyncTransaction(
  async (gameId: string, point: number) => {
    const [game, err] = await GameController.updateGame(
      { gameId },
      {
        cardPointTarget: point,
      }
    );
    if (err) throw err;
    return game;
  }
);

const nextRound = asyncTransaction(async (gameId: string) => {
  const [game, err] = await GameController.getGame({ gameId });
  if (err) throw err;

  // check is the on going game or not
  if (game.gameState !== "onGoing") throw ERR_GAME_STATE;

  // players
  const [playerA, playerB] = game.players;

  // check if both players are in stand state
  if (!playerA.stand || !playerB.stand) throw ERR_USER_STAND;

  if (game.roundCounter >= GAME_ROUND_PLAYED_MAX) throw ERR_ROUND_COUNTER;

  // proceed to next round
  const newGame = await Game.findOneAndUpdate(
    {
      gameId,
    },
    {
      $inc: {
        roundCounter: 1,
      },
    }
  );

  const [updatedGame, err2] = await GameController.getGame({ gameId });
  if (err2) throw err2;

  return updatedGame;
});

const endGame = asyncTransaction(async (gameId: string) => {
  const [game, err] = await GameController.getGame({ gameId });
  if (err) throw err;

  // check is the on going game or not
  if (game.gameState !== "onGoing") throw ERR_GAME_STATE;

  // players
  const [playerA, playerB] = game.players;

  if (playerA.gameScore >= GAME_WIN_SCORE_TARGET) {
    return playerA;
  } else if (playerB.gameScore >= GAME_WIN_SCORE_TARGET) {
    return playerB;
  } else {
    return null;
  }
});

/**
 * @description Find the winner and ends
 */
const showdownRound = asyncTransaction(async (gameId: string) => {
  const [game, err] = await GameController.getGame({ gameId });
  if (err) throw ERR_INVALID_GAME;

  // check is the on going game or not
  if (game.gameState !== "onGoing") throw ERR_GAME_STATE;

  // players
  const [playerA, playerB] = game.players;

  // check if both players are in stand state
  if (!playerA.stand || !playerB.stand) throw ERR_USER_STAND;

  // Find out who wins
  // get points sum
  const targetPoints = game.cardPointTarget;
  const [playerASums, errA] = await UserController.getCardsSums({
    username: playerA.username,
  });
  const [playerBSums, errB] = await UserController.getCardsSums({
    username: playerB.username,
  });
  if (errA || errB) throw ERR_INTERNAL;

  let [isAExceed, isBExceed] = [false, false];

  // Check if both players exceed the target points
  if (playerASums[0] > targetPoints && playerASums[1] > targetPoints) {
    isAExceed = true;
  }
  if (playerBSums[0] > targetPoints && playerBSums[1] > targetPoints) {
    isBExceed = true;
  }

  // Get safe best sum
  let A_sum =
    Math.max(...playerASums) <= targetPoints
      ? Math.max(...playerASums)
      : Math.min(...playerASums);
  let B_sum =
    Math.max(...playerBSums) <= targetPoints
      ? Math.max(...playerBSums)
      : Math.min(...playerBSums);

  console.log(`player A sum: ${A_sum}`);
  console.log(`player B sum: ${B_sum}`);

  let winner: string = "";

  if (isAExceed && !isBExceed) {
    winner = "A";
  } else if (!isAExceed && isBExceed) {
    winner = "B";
  } else if (isAExceed && isBExceed) {
    winner = "AB";
  } else if (A_sum > B_sum) {
    winner = "A";
  } else if (A_sum < B_sum) {
    winner = "B";
  } else if (A_sum === B_sum) {
    winner = "AB";
  } else {
    throw ERR_NO_WINNER;
  }

  console.log(`winner: ${winner}`);

  // determine how many points the winner gets
  const winnerPoints = GAME_ROUND_SCORE_MAPPING[game.roundCounter];
  if (!winnerPoints) throw ERR_WINNER_POINTS;

  console.log(winner);
  console.log(game.roundCounter);
  console.log(winnerPoints);

  // Update winner points
  if (winner === "A") {
    const [_, err] = await UserController.updateUser(
      { username: playerA.username },
      {
        $inc: {
          gameScore: winnerPoints,
        },
      }
    );
    if (err) throw err;
  } else if (winner === "B") {
    const [_, err] = await UserController.updateUser(
      { username: playerB.username },
      {
        $inc: {
          gameScore: winnerPoints,
        },
      }
    );
    if (err) throw err;
  } else if (winner === "AB") {
    const [_, err] = await UserController.updateUser(
      { username: playerA.username },
      {
        $inc: {
          gameScore: winnerPoints,
        },
      }
    );
    const [_2, err2] = await UserController.updateUser(
      { username: playerB.username },
      {
        $inc: {
          gameScore: winnerPoints,
        },
      }
    );
    if (err || err2) throw ERR_INTERNAL;
  }

  // get cards for the reveal
  const [[updatedGame, err2], [playerACards, err3], [playerBCards, err4]] =
    await Promise.all([
      GameController.getGame({ gameId }),
      UserController.getCards({ username: playerA.username }, true),
      UserController.getCards({ username: playerB.username }, true),
    ]);

  if (err2 || err3 || err4) throw ERR_INTERNAL;
  if (!updatedGame) throw ERR_INVALID_GAME;
  if (!playerACards?.length) throw ERR_INVALID_CARDS;
  if (!playerBCards?.length) throw ERR_INVALID_CARDS;

  return {
    game: updatedGame,
    winner: winner === "A" ? playerA : winner === "B" ? playerB : null,
    pointsEarned: winnerPoints,
    cards: [
      {
        username: playerA.username,
        cards: playerACards,
      },
      {
        username: playerB.username,
        cards: playerBCards,
      },
    ],
  };
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
  initRound,
  /**
   * @access System level, users themselves
   *
   * @description Return array of cards, and update the remaining cards
   */
  drawCard,
  /**
   * @access System level
   *
   * @description Reset game card target points
   */
  resetTargetPoint,
  /**
   * @access System level
   *
   * @description Reset players state for stand to false
   */
  resetPlayersState,
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
   *
   * returns new turn owner username
   */
  switchPlayerTurn,
  /**
   * @access User themselves
   */
  drawRandomTrumpCard,
  /**
   * @access System Level
   *
   * @description Get the remaining cards of the game instance
   */
  getRemainingCards,
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
  getAllPlayersCards,
  /**
   * @access System Level
   *
   * @description Get the player cards of the game instance, include hidden by default
   */
  getPlayerCards,
  /**
   * @access System level
   *
   * @description set the turn owner
   */
  setTurnOwner,
  /**
   * @access User
   *
   * @description Set the target point of the game
   */
  setTargetPoint,
  /**
   * @access System level
   *
   * @description increment the round counter by 1
   */
  nextRound,
  /**
   * @access System level
   *
   * @description end the game, returns the winner
   */
  endGame,
  /**
   * @access System level
   *
   * @description determine the winner of the round
   * returns the winner, points earned, cards and game
   */
  showdownRound,
};
