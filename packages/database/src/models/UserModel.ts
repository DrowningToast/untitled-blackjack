import mongoose, { ObjectId } from "mongoose";

export interface IUser {
  username: string;
  sessId: string;
}

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  sessID: {
    type: String,
    required: true,
  },
  /**
   * TODO:
   * - Add gameplay related fields
   * - Add Match ID field
   */
});

const User = mongoose.model<IUser>("User", UserSchema);
export { User };
