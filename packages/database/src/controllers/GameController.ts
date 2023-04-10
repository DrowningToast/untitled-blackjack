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

    const game = await Game.findOne({
      gameId: res.gameId,
    }).select("-remainingCards");

    return game;
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
  async (sessId: string, ready: boolean) => {
    const [userMeta] = await UserController.getUserMeta({ sessId });
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

/**
 * Make player leave the game
 */
const leaveGame = asyncTransaction(
  async (sessId: string, connectionId: string) => {
    const [userMeta] = await UserController.getUserMeta({
      sessId,
      connectionId,
    });

    // Ensure the user is valid
    if (!userMeta) {
      throw ERR_INVALID_USER;
    }

    // Ensure the game instance is valid
    let [game] = await getGame({ players: [userMeta?._id] });

    if (!game) {
      throw ERR_INVALID_GAME;
    }

    const _ = await Game.findOneAndUpdate(
      {
        players: [userMeta?._id],
      },
      {
        $pull: {
          players: userMeta?.id,
        },
      }
    );

    [game] = await getGame({ players: [userMeta?._id] });

    /**
     * If the game players is empty, delete the game instance
     */
    if (game!.players?.length <= 0) {
      await Game.deleteOne({
        _id: game!._id,
      });
      return null;
    } else {
      return game;
    }
  }
);

export const GameController = {
  createGame,
  getTurnOwner,
  getGame,
  joinGame,
  changePlayerReadyState,
  leaveGame,
};
