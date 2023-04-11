import { FilterQuery, UpdateQuery } from "mongoose";
import { IUser, User } from "../models/UserModel";
import { asyncTransaction } from "../utils/Transaction";
import { Card } from "../utils/Card";
import { ERR_INVALID_USER } from "../utils/Error";

const createUser = asyncTransaction(async (args: FilterQuery<IUser>) => {
  const _ = new User(args);
  const res = await _.save();

  return res;
});

/**
 * @description Update a user instance
 * TRY NOT TO USE THIS FOR SECURITY REASONS
 */
const updateUser = asyncTransaction(
  async (target: FilterQuery<IUser>, value: UpdateQuery<IUser>) => {
    const _ = await User.findOneAndUpdate(target, value);
    if (!_?.id) {
      return new Error("User not found");
    }
    return _;
  }
);

/**
 * @description Delete a user instance
 */
const deleteUser = asyncTransaction(async (args: FilterQuery<IUser>) => {
  const _ = await User.deleteOne(args);
  return _;
});

/**
 * @descrition Get basic non-sensitive user information
 * @param args
 */
const getUserMeta = asyncTransaction(async (args: FilterQuery<IUser>) => {
  const _ = await User.findOne(args).select(["-cards -connectionId"]);
  return _;
});

/**
 * @description Get user session id (sensitive information)
 * @param args
 * @returns
 */
const getUserConnectionId = asyncTransaction(
  async (args: FilterQuery<IUser>) => {
    const _ = await User.findOne(args).select(["connectionId"]);
    return _;
  }
);

/**
 * @description Get all of the target user cards (the first one should be hidden from opponenet)
 */
const getCards = asyncTransaction(
  async (args: FilterQuery<IUser>, all: boolean = false) => {
    const _ = await User.findOne(args).select("cards");
    if (all) return _?.cards ?? [];
    return _?.cards.slice(1) ?? [];
  }
);

/**
 * @access System level
 */
const setCards = asyncTransaction(
  async (connectionId: string, cards: Card[]) => {
    const [userMeta] = await getUserMeta({ connectionId });
    const _ = await User.findOneAndUpdate(
      {
        _id: userMeta?.id,
      },
      {
        cards,
      }
    );
    return _;
  }
);

/**
 * @access System level
 *
 * @description Add cards to the user, returns ALL the cards
 */
const addCards = asyncTransaction(
  async (connectionId: string, cards: Card[]) => {
    const [oldCards, err] = await getCards({ connectionId });
    if (err) {
      throw ERR_INVALID_USER;
    }
    const [_] = await setCards(connectionId, [...cards, ...oldCards]);

    return [...cards, ...oldCards];
  }
);
/**
 * @access User themselves
 *
 * @description Set the player ready state
 */
const setReadyState = asyncTransaction(
  async (connectionId: string, ready: boolean) => {
    const [userMeta] = await getUserMeta({ connectionId });
    const _ = await User.findOneAndUpdate(
      {
        _id: userMeta?.id,
      },
      {
        $set: {
          ready,
        },
      }
    );
    return _;
  }
);

export const UserController = {
  /**
   * @access Public
   *
   * @description Create a new user
   */
  createUser,
  /**
   * @access System level
   */
  updateUser,
  /**
   * @access System level
   */
  deleteUser,
  /**
   * @access System Level, User themselves, Authorized users
   */
  getUserMeta,
  /**
   * @access System level
   */
  getUserConnectionId,
  /**
   * @access System level, User themselves
   */
  getCards,
  /**
   * @access System level
   */
  setCards,
  /**
   * @access System level
   */
  addCards,
  /**
   * @access User themselves
   */
  setReadyState,
};
