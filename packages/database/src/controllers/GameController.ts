import { FilterQuery, Types, UpdateQuery } from "mongoose";
import { Game, IGame, ZodGameStrip } from "../models/GameModel";
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
  tenCard,
  threeCard,
  twoCard,
} from "../utils/Card";
import { asyncTransaction } from "../utils/Transaction";
import { UserController } from "./UserController";
import {
  ERR_INGAME_PLAYERS,
  ERR_INVALID_GAME,
  ERR_INVALID_USER,
} from "../utils/Error";

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
    if (playersIDs.length !== 1)
      throw new Error("There should be at least one player");

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

    return null;
  }
);

const getGame = asyncTransaction(async (arg: FilterQuery<IGame>) => {
  // Get the game instance and populate the players
  const _ = await Game.findOne(arg)
    .populate("players", { cards: 0, connectionId: 0, trumpCards: 0 })
    .populate("turnOwner", { cards: 0, connection: 0, trumpCards: 0 })
    .select({
      remainingCards: 0,
      passcode: 0,
    });

  if (!_) throw ERR_INVALID_GAME;

  const game = ZodGameStrip.parse(_);

  return game;
});

const updateGame = asyncTransaction(
  async (query: FilterQuery<IGame>, update: UpdateQuery<IGame>) => {
    // Get the game instance and populate the players
    let _ = await Game.findOneAndUpdate(query, update);

    if (!_) throw ERR_INVALID_GAME;

    const [game, err] = await getGame({ gameId: _.gameId });
    if (err) throw ERR_INVALID_GAME;

    return game;
  }
);

const joinGame = asyncTransaction(
  async (_id: string, userId: Types.ObjectId) => {
    // Get the game instance
    const _ = await Game.findByIdAndUpdate(_id, {
      $push: { players: userId },
    });

    const [updated, err] = await getGame({ _id });

    if (err) throw ERR_INVALID_GAME;

    return ZodGameStrip.parse(updated);
  }
);

const leaveGame = asyncTransaction(
  async (connectionId: string, gameId: string) => {
    const [userMeta] = await UserController.getUserMeta({
      connectionId,
    });

    // Ensure the user is valid
    if (!userMeta) throw ERR_INVALID_USER;

    // Ensure the game instance is valid
    let [game] = await getGame({ gameId });

    if (!game) throw ERR_INVALID_GAME;

    /**
     * If the game players is empty, delete the game instance
     */
    if (game.players?.length <= 1) {
      await Game.deleteOne({
        gameId: game.gameId,
      });
      return null;
    } else {
      const _ = await Game.findOneAndUpdate(
        {
          gameId: game.gameId,
        },
        {
          $pull: {
            players: userMeta?._id,
          },
        }
      );

      const [res, e] = await getGame({ gameId });

      if (e) throw ERR_INVALID_GAME;

      return res;
    }
  }
);

const getPlayers = asyncTransaction(async (gameId: string) => {
  const [game] = await getGame({ gameId });

  if (!game) throw ERR_INVALID_GAME;

  return game?.players ?? [];
});

const startGame = asyncTransaction(async (gameId: string) => {
  const [game] = await getGame({ gameId });

  if (!game) throw ERR_INVALID_GAME;

  const _ = await Game.findOneAndUpdate(
    {
      gameId,
    },
    {
      gameState: "onGoing",
    }
  );

  if (!_) throw ERR_INVALID_GAME;

  const [res, e] = await getGame({ gameId });

  return ZodGameStrip.parse(res);
});

const getPlayerConnectionIds = asyncTransaction(async (gameId: string) => {
  const [game, err] = await getGame({ gameId });

  if (err) throw ERR_INVALID_GAME;

  if (game.players.length !== 2) throw ERR_INGAME_PLAYERS;

  const [[connectionA, errA], [connectionB, errB]] = await Promise.all([
    UserController.getConnectionId({ username: game.players[0].username }),
    UserController.getConnectionId({ username: game.players[1].username }),
  ]);

  if (errA || errB) throw ERR_INVALID_USER;

  return [connectionA, connectionB] as [string, string];
});

const deleteGame = asyncTransaction(async (gameId: string) => {
  const _ = await Game.deleteOne({
    gameId,
  });

  return;
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
   * @description Get the game instance non-sensitive data (exclude remainingCards, player.cards and connectionIds)
   */
  getGame,
  /**
   * @access System level
   * @description Update the game instance directly
   * @param query
   * @param update
   * @returns
   */
  updateGame,
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
   * Change the state of game to started.
   */
  startGame,

  /**
   * @access System level
   *
   * Get both players connection ids
   */
  getPlayerConnectionIds,
  /**
   * @access System level
   *
   * Delete the game instance
   */
  deleteGame,
};
