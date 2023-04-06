import mongoose, { FilterQuery } from "mongoose";
import { IUser, User } from "../models/UserModel";
import { asyncTransaction } from "../utils/Transaction";

export const createUser = asyncTransaction(async (args: FilterQuery<IUser>) => {
  console.log(args);
  const _ = new User(args);
  const res = await _.save();

  return res;
});

export const updateUser = asyncTransaction(
  async (target: FilterQuery<IUser>, value: FilterQuery<IUser>) => {
    const _ = await User.updateOne(target, value);
    return _;
  }
);

export const deleteUser = asyncTransaction(async (args: FilterQuery<IUser>) => {
  const _ = await User.deleteOne(args);
  return _;
});

/**
 * @descrition Get basic non-sensitive user information
 * @param args
 */
export const getUserMeta = asyncTransaction(
  async (args: FilterQuery<IUser>) => {
    const _ = await User.findOne({
      sessID: "5ed728fe-88bd-4723-ac71-19c3dd99af49",
    }).select(["-cards", "-sessID"]);
    return _;
  }
);

/**
 * @description Get user session id (sensitive information)
 * @param args
 * @returns
 */

export const getUserSession = asyncTransaction(
  async (args: FilterQuery<IUser>) => {
    const _ = await User.findOne(args).select(["sessID"]);
    return _;
  }
);

/**
 * @description Get all of the target user cards (the first one should be hidden from opponenet)
 */
export const getUserCards = asyncTransaction(
  async (args: FilterQuery<IUser>, all: boolean = false) => {
    const _ = await User.findOne(args).select("cards");
    if (all) return _?.cards ?? [];
    return _?.cards.slice(1) ?? [];
  }
);
