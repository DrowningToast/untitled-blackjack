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
  players: { player: IUser; ready: boolean }[];
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
      player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      ready: {
        type: Boolean,
        default: false,
      },
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
    },
  ],
});

const Game = mongoose.model<IGame>("Game", GameSchema);
export { Game };
