import { Card } from "../utils/Card";
import { IGame, ZodGameStrip } from "./GameModel";
import { IUser, ZodUserStrip } from "./UserModel";
import z from "zod";

export const TrumpCardValidator = z.object({
  handler: z.string(),
  type: z.enum(["DRAW", "ATTACK", "UTILITY"]),
  onUse: z.function(z.tuple([ZodUserStrip, ZodGameStrip]), z.promise(z.any())),
});

/**
 * Type of the card
 *
 * DRAW: Draw specific number of cards returns the user new hand
 * ATTACK: Attack the opponent, returns the opponent/target IUser
 * UTILITY: Utility card, returns User IUser
 */

export interface drawTrumpCard<T = Card[]> {
  handler: string;
  type: "DRAW";
  // Handle the effeec of the card
  onUse: (
    // The user who used the card
    cardUser: IUser,

    // The game the user is in
    game: IGame
  ) => Promise<T>;
}

export interface attackTrumpCard<T = IUser> {
  handler: string;
  type: "ATTACK";
  // Handle the effeec of the card
  onUse: (
    // The user who used the card
    cardUser: IUser,

    // The game the user is in
    game: IGame
  ) => Promise<T>;
}

export interface utilityTrumpCard<T = IUser> {
  handler: string;
  type: "UTILITY";
  // Handle the effeec of the card
  onUse: (
    // The user who used the card
    cardUser: IUser,

    // The game the user is in
    game: IGame
  ) => Promise<T>;
}

export interface dummyTrumpCard {
  handler: string;
  type: "dummy";
  onUse: (cardUser: IUser, game: IGame) => any;
}

export type TrumpCard<T = any> =
  | drawTrumpCard<T>
  | attackTrumpCard<T>
  | utilityTrumpCard<T>
  | dummyTrumpCard;
