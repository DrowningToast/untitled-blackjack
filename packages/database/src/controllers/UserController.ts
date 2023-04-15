import { FilterQuery, UpdateQuery } from "mongoose";
import { IUser, User, ZodUserStrip, _IUser } from "../models/UserModel";
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
    return ZodUserStrip.parse(_);
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
  const _ = await User.findOne(args).select({
    cards: 0,
    connectionId: 0,
  });
  if (!_) throw ERR_INVALID_USER;
  return ZodUserStrip.parse(_);
});

/**
 * @description Get user session id (sensitive information)
 * @param args
 * @returns
 */
const getConnectionId = asyncTransaction(async (args: FilterQuery<IUser>) => {
  const _ = (await User.findOne(args).select([
    "connectionId",
  ])) as unknown as _IUser;
  if (!_?.connectionId) throw ERR_INVALID_USER;
  return _.connectionId;
});

const getCards = asyncTransaction(
  async (args: FilterQuery<IUser>, all: boolean = false) => {
    const _ = (await User.findOne(args).select("cards")) as unknown as _IUser;
    if (all) return _?.cards! ?? [];
    return _?.cards!.slice(1) ?? [];
  }
);

const setCards = asyncTransaction(
  async (connectionId: string, cards: Card[]) => {
    const [userMeta] = await getUserMeta({ connectionId });
    if (!userMeta) throw ERR_INVALID_USER;

    const _ = await User.findOneAndUpdate(
      {
        _id: userMeta.id,
      },
      {
        cards,
      }
    );

    if (!_) throw ERR_INVALID_USER;
    return ZodUserStrip.parse(_);
  }
);

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

const setReadyState = asyncTransaction(
  async (connectionId: string, ready: boolean) => {
    const [userMeta, err] = await getUserMeta({ connectionId });
    if (err) {
      throw ERR_INVALID_USER;
    }
    if (!userMeta) {
      throw ERR_INVALID_USER;
    }

    const _ = await User.findOneAndUpdate(
      {
        _id: userMeta.id,
      },
      {
        $set: {
          ready,
        },
      }
    );

    if (!_) throw ERR_INVALID_USER;

    return ZodUserStrip.parse(_);
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
  getConnectionId,
  /**
   * @access System level, User themselves
   *
   * @description Get all of the target user cards (the first one should be hidden from opponenet)
   */
  getCards,
  /**
   * @access System level
   */
  setCards,
  /**
   * @access System level
   *
   * @description Add cards to the user, returns ALL the cards
   */
  addCards,
  /**
   * @access User themselves
   *
   * @description Set the player ready state
   */
  setReadyState,
};
