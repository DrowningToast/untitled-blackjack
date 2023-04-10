import { FilterQuery, UpdateQuery } from "mongoose";
import { IUser, User } from "../models/UserModel";
import { asyncTransaction } from "../utils/Transaction";

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
  const _ = await User.findOne(args).select(["-cards", "-sessId"]);
  return _;
});

/**
 * @description Get user session id (sensitive information)
 * @param args
 * @returns
 */
const getUserSession = asyncTransaction(async (args: FilterQuery<IUser>) => {
  const _ = await User.findOne(args).select(["sessId"]);
  return _;
});

/**
 * @description Get all of the target user cards (the first one should be hidden from opponenet)
 */
const getUserCards = asyncTransaction(
  async (args: FilterQuery<IUser>, all: boolean = false) => {
    const _ = await User.findOne(args).select("cards");
    if (all) return _?.cards ?? [];
    return _?.cards.slice(1) ?? [];
  }
);

export const UserController = {
  createUser,
  updateUser,
  deleteUser,
  getUserMeta,
  getUserSession,
  getUserCards,
};
