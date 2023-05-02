import {
  ERR_GAME_STATE,
  ERR_ILLEGAL_ACTION,
} from "../../../../apps/backend/src/websocket/utils/ErrorMessages";
import { Game, ZodGameStrip, _IGame } from "../models/GameModel";
import { Card, sortedGlobalCardsContext } from "../utils/Card";
import {
  ERR_INTERNAL,
  ERR_INVALID_CARDS,
  ERR_INVALID_GAME,
  ERR_INVALID_USER,
  ERR_NO_WINNER,
  ERR_ROUND_COUNTER,
  ERR_USER_STAND,
  ERR_WINNER_POINTS,
  insertErrorStack,
} from "../utils/error";
import { asyncTransaction } from "../utils/Transaction";
import { trumpCardsAsArray } from "../../../../apps/backend/src/gameplay/trumpcards/TrumpCard";
// import { trumpCards } from "../utils/TrumpCard";
import {
  GAME_ROUND_PLAYED_MAX,
  GAME_ROUND_SCORE_MAPPING,
  GAME_TARGET_POINT,
  GAME_WIN_SCORE_TARGET,
} from "../utils/config";
import { GameController } from "./GameController";
import { UserController } from "./UserController";
import { FilterQuery } from "mongoose";
import { IUser, _IUser } from "../models/UserModel";
import { TrumpCard } from "../models/TrumpCardModel";

const initRound = asyncTransaction(async (gameId: string) => {
  console.log("INITING GAME");
  console.log(gameId);

  const [game] = await GameController.getGame({ gameId, gameState: "onGoing" });

  console.log(game);

  if (!game) throw insertErrorStack(ERR_INVALID_GAME);

  const [players, err] = await GameController.getPlayers(gameId);
  if (err) throw err;

  console.log(players);

  const [playerA, playerB] = players;

  // Reset the cards
  await resetRemainingCards(gameId);
  // Shuffle the cards
  await shuffleRemainingCards(gameId);
  // Reset target card points
  await resetTargetPoint(gameId);
  // Reset players' stand state
  await UserController.setStandState(
    {
      username: playerA.username,
    },
    false
  );
  await UserController.setStandState(
    {
      username: playerB.username,
    },
    false
  );

  // Draw 2 cards for each player
  const [_A, eA] = await drawCards(
    {
      username: playerA.username,
    },
    gameId,
    2
  );

  console.log(_A);

  const [_B, eB] = await drawCards(
    {
      username: playerB.username,
    },
    gameId,
    2
  );

  if (eA) throw eA;
  if (eB) throw eB;

  // Draw 2 Trump Cards for each player
  const [trumpCardA, eTA] = await drawTrumpCards(
    {
      username: playerA.username,
    },
    game.gameId,
    2
  );
  const [trumpCardB, eTB] = await drawTrumpCards(
    {
      username: playerB.username,
    },
    game.gameId,
    2
  );

  console.log("trump A");
  console.log(trumpCardA);
  console.log("trump B");
  console.log(trumpCardB);

  if (eTA || eTB) throw insertErrorStack(ERR_INTERNAL);

  // Set the turn owner
  const [newGame, e] = await setTurnOwner(gameId);
  if (e) throw insertErrorStack(ERR_INTERNAL);

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

const drawCards = asyncTransaction(
  async (user: FilterQuery<IUser>, gameId: string, amount: number = 1) => {
    // validate the user
    const [userInstance, err] = await UserController.getUserMeta(user);
    if (err) throw err;

    const [remainingCardsCount] = await getAmountOfRemainingCards(gameId);
    if (remainingCardsCount === undefined) throw insertErrorStack(ERR_INTERNAL);

    if (remainingCardsCount < amount) {
      amount = remainingCardsCount;
    }

    // shift the cards
    const [cardStuff, err1] = await shiftCards(gameId, amount);
    if (err1) throw insertErrorStack(ERR_INTERNAL);

    const [drawn, remaining] = cardStuff;

    // Add the drawn cards to the user
    const [userCards, err3] = await UserController.addCards(
      { username: userInstance.username },
      drawn
    );
    if (err3) throw insertErrorStack(ERR_INTERNAL);

    return userCards;
  }
);

const takeCards = asyncTransaction(
  async (user: FilterQuery<IUser>, gameId: string, cards: Card[]) => {
    // validate the user
    const [userInstance, err] = await UserController.getUserMeta(user);
    if (err) throw err;

    // check if the user is in the game or not
    const [game] = await GameController.getGame({
      gameId,
      players: userInstance._id,
    });
    if (!game) throw insertErrorStack(ERR_INVALID_GAME);

    // Add the drawn cards to the user
    const [userCards, err3] = await UserController.addCards(
      { username: userInstance.username },
      cards
    );
    if (err3) throw insertErrorStack(ERR_INTERNAL);

    // filter out drawn card
    const _ = await Game.updateOne(
      { gameId },
      {
        $pull: {
          remainingCards: {
            $in: cards,
          },
        },
      }
    );

    // get remaining cards
    const [remainingCards, errRemain] = await getRemainingCards(gameId);
    if (errRemain) throw insertErrorStack(ERR_INTERNAL);

    return remainingCards;
  }
);

const shiftCards = asyncTransaction(
  async (gameId: string, amount: number = 1) => {
    const [remainingCardsCount] = await getAmountOfRemainingCards(gameId);

    if (remainingCardsCount === undefined) throw insertErrorStack(ERR_INTERNAL);

    if (remainingCardsCount < amount) {
      amount = remainingCardsCount;
    }

    // Get the game instance
    const [game, err] = await GameController.getGame({ gameId });
    if (err) throw insertErrorStack(ERR_INVALID_GAME);

    const [cards, err2] = await getRemainingCards(gameId);
    if (err2) throw insertErrorStack(ERR_INTERNAL);

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

    return [drawn, remaining];
  }
);

const setRemainingCards = asyncTransaction(
  async (gameId: string, cards: Card[]) => {
    const _ = await Game.findOneAndUpdate(
      {
        gameId,
      },
      {
        remainingCards: cards,
      }
    );

    return cards;
  }
);

const drawMaxCard = asyncTransaction(async (gameId: string) => {
  const [remainingCardsCount, errRemain] = await getAmountOfRemainingCards(
    gameId
  );
  if (errRemain) throw insertErrorStack(ERR_INTERNAL);
  if (remainingCardsCount === undefined) throw insertErrorStack(ERR_INTERNAL);
  if (remainingCardsCount === 0) return null;

  const [cards, err] = await getRemainingCards(gameId);
  if (err) throw insertErrorStack(ERR_INTERNAL);

  const maxCard = cards.reduce((prev, curr) => {
    if (Math.max(...prev.values) > Math.max(...curr.values)) return prev;
    return curr;
  }, cards[0]);

  const remainingCards = cards.filter(
    (card) => card.display !== maxCard.display
  );

  const [remain, err2] = await setRemainingCards(gameId, remainingCards);
  if (err2) throw insertErrorStack(ERR_INTERNAL);

  return maxCard;
});

const getRemainingCards = asyncTransaction(async (gameId: string) => {
  const game = (await Game.findOne({
    gameId,
  }).select("remainingCards")) as unknown as _IGame;

  if (!game.remainingCards) throw insertErrorStack(ERR_INTERNAL);

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

    if (!game) throw insertErrorStack(ERR_INVALID_GAME);

    const players = game.players;

    let connectionId: string = connId ?? "";

    if (!connId) {
      const randomPlayer = players[Math.floor(Math.random() * players.length)];
      const [conn, err] = await UserController.getConnectionId({
        username: randomPlayer.username,
      });
      if (err) throw err;
      connectionId = conn;
    }

    const [user] = await UserController.getUserMeta({
      connectionId: connectionId,
    });

    if (!user) throw insertErrorStack(ERR_INVALID_USER);

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

    if (err) throw err;

    return updatedGame;
  }
);

const getAllPlayersCards = asyncTransaction(
  async (gameId: string, includeHidden: boolean = false) => {
    const [players, err] = await GameController.getPlayers(gameId);
    if (err) throw err;

    const [playerA, playerB] = players;

    const [connectionA, errA] = await UserController.getConnectionId({
      username: players[0].username,
    });
    if (errA) throw errA;

    const [connectionB, errB] = await UserController.getConnectionId({
      username: players[1].username,
    });
    if (errB) throw errB;

    const [A, B] = players;

    // Get their cards manually
    const [cardsA, eA] = await UserController.getCards(
      {
        connectionId: connectionA,
      },
      playerB.trumpStatus.includes("SEE_OPPONENT_CARDS") ? true : includeHidden
    );
    if (eA) throw eA;
    const [cardsB, eB] = await UserController.getCards(
      {
        connectionId: connectionB,
      },
      playerA.trumpStatus.includes("SEE_OPPONENT_CARDS") ? true : includeHidden
    );
    if (eB) throw eB;

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
    if (err) throw err;

    const [user, err2] = await UserController.getUserMeta({
      connectionId,
    });
    if (err2) throw err2;

    if (game.players.find((p) => p.username === user.username) === undefined)
      throw insertErrorStack(ERR_INVALID_USER);

    const [cards, err3] = await UserController.getCards(
      {
        connectionId,
      },
      includeHidden
    );
    if (err3) throw err3;

    return cards;
  }
);

const resetPlayersState = asyncTransaction(async (gameId: string) => {
  const [game, err] = await GameController.getGame({ gameId });
  if (err) throw insertErrorStack(ERR_INVALID_GAME);

  const players = game.players;

  // get connection ids
  const [connectionIds, err1] = await GameController.getPlayerConnectionIds(
    gameId
  );
  if (err1) throw err1;

  // reset stand state
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

  if (err2) throw err2;
  if (err3) throw err3;

  // reset trump status
  const [[_3, err4], [_4, err5]] = await Promise.all(
    players.map(
      asyncTransaction(async (player) => {
        const [user, err] = await UserController.setTrumpStatus(
          { username: player.username },
          []
        );
        if (err) throw err;
        return user;
      })
    )
  );

  if (err4) throw err4;
  if (err5) throw err5;

  // reset trump cards
  const [[_5, err6], [_6, err7]] = await Promise.all(
    players.map(
      asyncTransaction(async (player) => {
        const [user, err] = await UserController.setTrumpCards(
          { username: player.username },
          []
        );
        if (err) throw err;
        return user;
      })
    )
  );
  if (err6) throw err6;
  if (err7) throw err7;

  // reset ready state
  const [[_7, err8], [_8, err9]] = await Promise.all(
    connectionIds.map(
      asyncTransaction(async (connectionId) => {
        const [user, err] = await UserController.setReadyState(
          connectionId,
          false
        );
        if (err) throw err;
        return user;
      })
    )
  );
  if (err8) throw err8;
  if (err9) throw err9;

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
  if (err) throw err;
  return ZodGameStrip.parse(game);
});

const shuffleRemainingCards = asyncTransaction(async (gameId: string) => {
  const [cards, err] = await getRemainingCards(gameId);

  if (err) throw err;

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

  if (err2) throw err2;

  return newCards;
});

const getAmountOfRemainingCards = asyncTransaction(async (gameId: string) => {
  const [cards, err] = await getRemainingCards(gameId);

  if (err) throw err;

  return cards.length;
});

const switchPlayerTurn = asyncTransaction(async (gameId: string) => {
  // Get the game instance
  const [game, err] = await GameController.getGame({ gameId });

  if (err) throw err;

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

  if (err2) throw err2;

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
  if (game.gameState !== "onGoing") throw insertErrorStack(ERR_GAME_STATE);

  // players
  const [playerA, playerB] = game.players;

  // check if both players are in stand state
  if (!playerA.stand || !playerB.stand) throw insertErrorStack(ERR_USER_STAND);

  if (game.roundCounter >= GAME_ROUND_PLAYED_MAX)
    throw insertErrorStack(ERR_ROUND_COUNTER);

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
  if (game.gameState !== "onGoing") throw insertErrorStack(ERR_GAME_STATE);

  // players
  const [playerA, playerB] = game.players;

  // update the state of the game
  const [_, errState] = await GameController.updateGame(
    {
      gameId: game.gameId,
    },
    {
      gameState: "ended",
    }
  );
  if (errState) throw errState;

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
  if (err) throw insertErrorStack(ERR_INVALID_GAME);

  // check is the on going game or not
  if (game.gameState !== "onGoing") throw insertErrorStack(ERR_GAME_STATE);

  // players
  const [playerA, playerB] = game.players;

  // check if both players are in stand state
  if (!playerA.stand || !playerB.stand) throw insertErrorStack(ERR_USER_STAND);

  // Find out who wins
  // get points sum
  const targetPoints = game.cardPointTarget;
  const [playerASums, errA] = await UserController.getCardsSums({
    username: playerA.username,
  });
  const [playerBSums, errB] = await UserController.getCardsSums({
    username: playerB.username,
  });
  if (errA || errB) throw insertErrorStack(ERR_INTERNAL);

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
    throw insertErrorStack(ERR_NO_WINNER);
  }

  console.log(`winner: ${winner}`);

  // determine how many points the winner gets
  const winnerPoints = GAME_ROUND_SCORE_MAPPING[game.roundCounter];
  if (!winnerPoints) throw insertErrorStack(ERR_WINNER_POINTS);

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
    if (err) throw err;
    if (err2) throw err2;
  }

  // get cards for the reveal
  const [[updatedGame, err2], [playerACards, err3], [playerBCards, err4]] =
    await Promise.all([
      GameController.getGame({ gameId }),
      UserController.getCards({ username: playerA.username }, true, true),
      UserController.getCards({ username: playerB.username }, true, true),
    ]);

  if (err2) throw err2;
  if (err3) throw err3;
  if (err4) throw err4;
  if (!updatedGame) throw insertErrorStack(ERR_INVALID_GAME);
  if (!playerACards?.length) throw insertErrorStack(ERR_INVALID_CARDS);
  if (!playerBCards?.length) throw insertErrorStack(ERR_INVALID_CARDS);

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

const drawTrumpCards = asyncTransaction(
  async (user: FilterQuery<IUser>, gameId: string, amount: number = 1) => {
    const [game, err] = await GameController.getGame({ gameId });
    if (err) throw insertErrorStack(ERR_INVALID_GAME);

    // check if the user is in the game or not
    if (!game.players.map((o) => o.username).includes(user.username))
      throw insertErrorStack(ERR_INVALID_GAME);

    // check if the user exists
    const [userInGame, err2] = await UserController.getUserMeta(user);
    if (err2) throw err2;

    // get user trump cards
    const [trumpCards, err3] = await UserController.getTrumpCards(user);
    if (err3) throw err3;

    // get randomized trump cards
    const [randomizedCards, err4] = await getRandomTrumpCards(
      amount,
      trumpCards
    );
    if (err4) throw err4;

    // add trump cards
    const [updatedCards, err5] = await UserController.addTrumpCards(
      user,
      randomizedCards
    );
    if (err5) throw err5;

    return updatedCards;
  }
);

const getRandomTrumpCards = asyncTransaction(
  async (amount: number = 1, unwanted: _IUser["trumpCards"]) => {
    // generate random pool, garuntee unqiue cards
    const randomPool = [...trumpCardsAsArray].filter(
      (randomCard) =>
        !unwanted.map((o) => o.handler).includes(randomCard.handler)
    );

    const shuffledPool = randomPool.sort(() => Math.random() - 0.5);
    const randomizedCards = shuffledPool.slice(0, amount);

    // return a random trump card
    return randomizedCards;
  }
);

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
  drawCards,
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
   *
   * draws a number of random trump cards
   * doesn't contain duplicate
   */
  drawTrumpCards,
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
   * If the user has see through status, the opponent cards will always be revealed
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
  /**
   * @access System level
   *
   * @description Set the remaining cards
   */
  setRemainingCards,
  /**
   * @access System level
   *
   * @description Get the max card from the remaining cards
   */
  drawMaxCard,
  /**
   * @access Take a card out of a deck and add it to the player
   *
   * @description returns the remaining cards
   */
  takeCards,
};
