import { IUser, User } from "../models/UserModel";

export const createUser = async (args: IUser) => {
  const _ = new User(args);
  const res = await _.save();

  return res;
};

export const getUser = async (args: Partial<IUser>) => {
  const _ = await User.findOne({
    ...args,
  });
  return _;
};
