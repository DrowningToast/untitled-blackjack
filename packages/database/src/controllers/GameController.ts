import { FilterQuery, ObjectId, Types, UpdateQuery } from "mongoose";
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
import { ERR_INVALID_GAME, ERR_INVALID_USER } from "../utils/Error";

/**
 * There should be no function that updates the game instance data directly for security reasons
 */

/**
 * @access Users who aren't in the game
 *
 * @description This function create a new game instance
 */
const createGame = asyncTransaction(
  async (playersIDs: Types.ObjectId[], passcode: string) => {
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

    const [game] = await getGame({ gameId: res.gameId });

    return game;
  }
);

const getGame = asyncTransaction(async (arg: FilterQuery<IGame>) => {
  // Get the game instance and populate the players
  const _ = await Game.findOne(arg)
    .populate("players", { cards: 0, connectionId: 0, trumpCards: 0 })
    .select({
      remainingCards: 0,
      passcode: 0,
    });

  return _;
});

const joinGame = asyncTransaction(
  async (_id: string, userId: Types.ObjectId) => {
    // Get the game instance
    const _ = await Game.findByIdAndUpdate(_id, {
      $push: { players: userId },
    });

    const [updated, err] = await getGame({ _id });

    if (err) {
      throw ERR_INVALID_GAME;
    }

    return updated;
  }
);

const leaveGame = asyncTransaction(
  async (connectionId: string, gameId: string) => {
    const [userMeta] = await UserController.getUserMeta({
      connectionId,
    });

    // Ensure the user is valid
    if (!userMeta?._id) {
      throw ERR_INVALID_USER;
    }

    // Ensure the game instance is valid
    let [game] = await getGame({ gameId });

    if (
      !game ||
      !game.players.find((player) => player.username === userMeta.username)
    ) {
      throw ERR_INVALID_GAME;
    }

    console.log(game?.players);
    console.log(game!.players?.length);
    console.log(game!.players?.length <= 1);

    /**
     * If the game players is empty, delete the game instance
     */
    if (game!.players?.length <= 1) {
      await Game.deleteOne({
        _id: game!._id,
      });
      return null;
    } else {
      const _ = await Game.findOneAndUpdate(
        {
          gameId: game.gameId,
        },
        {
          $pull: {
            players: [{ _id: userMeta?._id }],
          },
        }
      );
      console.log(_);
      return _;
    }
  }
);

const getPlayers = asyncTransaction(async (gameId: string) => {
  const [game] = await getGame({ gameId });

  if (!game) {
    throw ERR_INVALID_GAME;
  }

  const [doc] = await getGame({ gameId });

  return doc?.players ?? [];
});

const startGame = asyncTransaction(async (gameId: string) => {
  const [game] = await getGame({ gameId });

  if (!game) {
    throw ERR_INVALID_GAME;
  }

  const _ = await Game.findOneAndUpdate(
    {
      gameId,
    },
    {
      gameState: "onGoing",
    }
  );

  return _;
});

export const GameController = {
  /**
   * @access Any authorized users
   *
   * - Create a new game instance
   *
   * 1. Passcode must be unqiue
   */
  createGame,
  /**
   * @access Any users
   *
   * @description Get the game instance non-sensitive data (exclude remainingCards, player.cards)
   */
  getGame,
  /**
   * @access User themselves
   *
   * @description Join another game instance
   */
  joinGame,
  /**
   * @access User themselves
   *
   * Make player leave the game, if the game instance is empty, delete the instance.
   */
  leaveGame,

  /**
   * @access User themselves, System Level
   *
   * Get the players in the game
   */
  getPlayers,

  /**
   * @access System level
   *
   * Change the state of game to started
   */
  startGame,
};
