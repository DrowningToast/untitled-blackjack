import mongoose, { ObjectId } from "mongoose";
import { Card } from "../utils/Card";
import { IGame } from "./GameModel";
import { v4 as uuid } from "uuid";
import { z } from "zod";

/**
 * @description Remove sensitive data from the model
 */
export const ZodUserStrip = z.object({
  _id: z.any(),
  id: z.string().min(1),
  username: z.string().min(1),
  gameScore: z.number().min(0),
  ready: z.boolean(),
  stand: z.boolean(),
});

export type IUser = z.infer<typeof ZodUserStrip>;

/**
 * @description Contain sensitive data from the model
 */
export type _IUser = IUser & {
  _id: ObjectId;
  connectionId: string;
  cards: Card[];
};

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
