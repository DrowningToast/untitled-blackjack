import { FilterQuery } from "mongoose";
import { APIG } from "../../../../apps/backend/src/websocket/APIGateway";
import { Card } from "../utils/Card";
import { IGame, ZodGameStrip } from "./GameModel";
import { IUser, ZodUserStrip } from "./UserModel";
import z from "zod";

export const TrumpCardValidator = z.object({
  handler: z.string(),
  type: z.enum(["DRAW", "ATTACK", "UTILITY"]),
  onUse: z.function(z.tuple([ZodUserStrip, ZodGameStrip]), z.promise(z.any())),
  afterHandler: z.function(z.tuple([z.any(), z.string()]), z.promise(z.any())),
});

/**
 * Type of the card
 *
 * DRAW: Draw specific number of cards returns the user new hand
 * ATTACK: Attack the opponent, returns the opponent/target IUser
 * UTILITY: Utility card, returns User IUser
 */

/**
 * onUse: is invoked by the user controller
 */

/**
 * afterHandler: is invoked by the websocket events
 */

export interface drawTrumpCard {
  handler: string;
  type: "DRAW";
  // Handle the effeec of the card
  afterHandler: (
    api: APIG,
    userConnectionId: string,
    success: boolean
  ) => Promise<any>;
}

export interface attackTrumpCard {
  handler: string;
  type: "ATTACK";
  // Handle the effeec of the card
  afterHandler: (api: APIG, userConnectionId: string) => Promise<any>;
}

export interface utilityTrumpCard {
  handler: string;
  type: "UTILITY";
  // Handle the effeec of the card
  afterHandler: (api: APIG, userConnectionId: string) => Promise<any>;
}

export interface dummyTrumpCard {
  type: "dummy";
  afterHandler: () => Promise<any>;
}

interface BaseTrumpCard<T> {
  handler: string;
  onUse: (
    // The user who used the card
    cardUser: FilterQuery<IUser>,

    // The game the user is in
    game: IGame
  ) => Promise<T>;
}

export type TrumpCard<T = any> = BaseTrumpCard<T> &
  (drawTrumpCard | attackTrumpCard | utilityTrumpCard | dummyTrumpCard);
