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
      players: { player: playersIDs },
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

    console.log(res);

    const [game] = await getGame({ gameId: res.gameId });

    console.log(res);

    return [game];
  }
);

/**
 * @access Players in the game
 *
 * @description Get the current turn owner
 */
const getTurnOwner = asyncTransaction(
  async (connectionId: string, gameId: string) => {
    // Get the game owner
    const _ = await Game.findOne({
      connectionId,
      gameId,
    }).select("turnOwner");
    return _;
  }
);

/**
 * @access Any users
 *
 * @description Get the game instance non-sensitive data (exclude remainingCards, player.cards)
 */
const getGame = asyncTransaction(async (arg: FilterQuery<IGame>) => {
  // Get the game instance and populate the players
  const _ = await Game.findOne(arg)
    .populate("players.player", "-cards -connectionId -trumpCards")
    .select("-remainingCards -passcode");

  return _;
});

/**
 * @access User themselves
 *
 * @description Join another game instance
 */
const joinGame = asyncTransaction(
  async (_id: string, userId: Types.ObjectId) => {
    // Get the game instance
    const _ = await Game.findByIdAndUpdate(_id, {
      players: { $push: { player: userId } },
    });
    return _;
  }
);

/**
 * @access User themselves
 *
 * @description Change the player ready state in the game instance
 */
const changePlayerReadyState = asyncTransaction(
  async (connectionId: string, ready: boolean) => {
    const [userMeta] = await UserController.getUserMeta({ connectionId });
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
 * @access User themselves
 *
 * Make player leave the game, if the game instance is empty, delete the instance.
 */
const leaveGame = asyncTransaction(async (connectionId: string) => {
  const [userMeta] = await UserController.getUserMeta({
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
});

export const GameController = {
  createGame,
  getTurnOwner,
  getGame,
  joinGame,
  changePlayerReadyState,
  leaveGame,
};
