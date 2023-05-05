import mongoose, { ObjectId } from "mongoose";
import { Card } from "../utils/Card";

import { z } from "zod";
import { TrumpCardDocument } from "./TrumpCardModel";

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
  trumpStatus: z.array(
    z.union([
      /**
       * THEIR TRUMP CARDS WON'T AFFECT ME
       */
      z.literal("INVINCIBLE"),
      /**
       * TARGET CANT SEE THEIR OWN CARDS
       */
      z.literal("BLIND"),
      /**
       * OPPONENT CANT DRAW THE CARDS
       */
      z.literal("DENY_HIT"),
      /**
       * OPPONENT CANT USE ANY TRUMP CARDS AFTER THIS
       */
      z.literal("DENY_TRUMP_USE"),
    ])
  ),
});

export type IUser = z.infer<typeof ZodUserStrip>;

/**
 * @description Contain sensitive data from the model
 */
export type _IUser = IUser & {
  _id: ObjectId;
  connectionId: string;
  cards: Card[];
  trumpCards: TrumpCardDocument[];
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
      type: {
        type: String,
      },
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
  /**
   * The effect from trump status
   */
  trumpStatus: [
    {
      type: String,
      enum: [
        "INVINCIBLE",
        "BLIND",
        "HIDE_CARDS",
        "SEE_OPPONENT_CARDS",
        "DENY_HIT",
        "DENY_TRUMP_USE",
      ],
    },
  ],
  /**
   * TODO: Prevent prolonging the game by keep hitting an empty deck
   */
});

const User = mongoose.model<IUser>("User", UserSchema);
export { User };
