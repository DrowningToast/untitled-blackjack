import mongoose, { ObjectId } from "mongoose";
import { Card } from "../static/Card";
import { IGame } from "./GameModel";

export interface IUser {
  username: string;
  sessId: string;
  gameScore: number;
  cards: Card[];
  game: IGame;
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
  gameScore: {
    type: Number,
    default: 0,
  },
  /**
   * Card
   */
  cards: [
    {
      display: {
        type: String,
        required: true,
      },
      values: [
        {
          type: Number,
          required: true,
        },
      ],
    },
  ],
  /**
   * Game
   */
  game: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

const User = mongoose.model<IUser>("User", UserSchema);
export { User };
