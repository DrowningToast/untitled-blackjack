import mongoose, { ObjectId } from "mongoose";
import { Card } from "../utils/Card";
import { IGame } from "./GameModel";
import { v4 as uuid } from "uuid";

export interface IUser {
  username: string;
  connectionId: string;
  gameScore: number;
  cards: Card[];
  game: IGame;
  ready: boolean;
  stand: boolean;
  // trumpCards: Trump[];
}

const UserSchema = new mongoose.Schema({
  /**
   * User choosen name
   */
  username: {
    type: String,
    required: true,
    unqiue: true,
  },
  /**
   * @protected Sensitive information
   * WS connection ID
   */
  connectionId: {
    type: String,
    required: true,
  },
  gameScore: {
    type: Number,
    default: 0,
  },
  /**
   * @protected Sensitive information
   * WS connection ID
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
        },
      ],
    },
  ],
  /**
   * Game
   */
  game: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Game",
  },
  /**
   * @protected Sensitive information
   * WS connection ID
   */
  trumpCards: [
    {
      handler: {
        type: String,
      },
    },
  ],
  /**
   * Is the player ready for the game to starts?
   */
  ready: {
    type: Boolean,
    default: false,
  },
  /**
   * Is the player choosing the stand?
   */
  stand: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model<IUser>("User", UserSchema);
export { User };
