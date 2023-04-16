import mongoose from "mongoose";
import { Card } from "../utils/Card";
import { IUser, ZodUserStrip, _IUser } from "./UserModel";
import { v4 as uuid } from "uuid";
import z from "zod";

/**
 * @description Remove sensitive data from the model
 */
export const ZodGameStrip = z.object({
  _id: z.any(),
  id: z.string().min(1),
  gameId: z.string().min(1),
  gameState: z.union([
    z.literal("onGoing"),
    z.literal("ended"),
    z.literal("notStarted"),
  ]),
  players: z.array(ZodUserStrip),
  turnOwner: ZodUserStrip.optional(),
  roundCouter: z.number().min(1),
  cardPointTarget: z.number().min(21),
});

export type IGame = z.infer<typeof ZodGameStrip>;

export type _IGame = IGame & {
  players: _IUser[];
  turnOwner: _IUser;
  remainingCards: Card[];
};

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
  roundCounter: {
    type: Number,
    default: 1,
  },
  cardPointTarget: {
    type: Number,
    default: 1,
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
