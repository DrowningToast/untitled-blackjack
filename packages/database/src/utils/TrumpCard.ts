import { GameController } from "../controllers/GameController";
import { UserController } from "../controllers/UserController";

export interface TrumpCard {
  handler: string;
  // Handle the effeec of the card
  onUse: (
    // The user who used the card
    connectionId: string,
    // The game the user is in
    gameId: string
  ) => Promise<void>;
}

export const demoTrump: TrumpCard = {
  handler: "demo",
  onUse: async (connectionId, gameId) => {
    const [user] = await UserController.getUserMeta({
      connectionId,
    });
    const [game] = await GameController.getGame({ gameId });
  },
};

export const trumpCards = [demoTrump];
