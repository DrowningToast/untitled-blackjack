import mongoose from "mongoose";
import { Card } from "../static/Card";
import { IUser } from "./UserModel";
import { v4 as uuid } from "uuid";

export interface IGame {
  gameId: string;
  onGoing: boolean;
  /**
   * Only supported 2 players, no less, no more
   */
  players: IUser[];
  turnOwner: IUser;
  remainingCards: Card;
}

const GameSchema = new mongoose.Schema({
  gameId: {
    type: String,
    default: uuid,
  },
  onGoing: {
    type: Boolean,
    default: false,
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
  remainingCard: {
    display: {
      type: String,
      required: true,
    },
    values: [
      {
        types: Number,
        required: true,
      },
    ],
  },
});

const Game = mongoose.model<IGame>("Game", GameSchema);
export { Game };
