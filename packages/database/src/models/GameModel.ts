import mongoose from "mongoose";
import { Card } from "../utils/Card";
import { IUser } from "./UserModel";
import { v4 as uuid } from "uuid";

export interface IGame {
  gameId: string;
  gameState: "onGoing" | "ended" | "notStarted";
  passcode: string;
  /**
   * Only supported 2 players, no less, no more
   */
  players: IUser[];
  turnOwner: IUser;
  remainingCards: Card[];
}

const GameSchema = new mongoose.Schema({
  gameId: {
    type: String,
    default: uuid,
  },
  /**
   * default to false for security reasons
   */
  gameState: {
    type: String,
    enum: ["onGoing", "ended", "notStarted"],
    default: "notStarted",
  },
  /**
   * @protected Sensitive information
   */
  passcode: {
    type: String,
    required: true,
  },
  players: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  turnOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  /**
   * @protected Sensitive information
   */
  remainingCards: [
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
      default: [],
    },
  ],
});

const Game = mongoose.model<IGame>("Game", GameSchema);
export { Game };
