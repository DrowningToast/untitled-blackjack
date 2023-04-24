import { IGame, ZodGameStrip } from "./GameModel";
import { IUser, ZodUserStrip } from "./UserModel";
import z from "zod";

export const TrumpCardValidator = z.object({
  handler: z.string(),
  onUse: z.function(z.tuple([ZodUserStrip, ZodGameStrip]), z.promise(z.any())),
});

export interface TrumpCard<T = any> {
  handler: string;
  // Handle the effeec of the card
  onUse: (
    // The user who used the card
    cardUser: IUser,
    // The game the user is in
    game: IGame
  ) => Promise<T>;
}
