import { GameController } from "../controllers/GameController";
import { UserController } from "../controllers/UserController";

export interface TrumpCard {
  handler: string;
  // Handle the effeec of the card
  onUse: (
    // The user who used the card
    sessId: string,
    // The game the user is in
    gameId: string
  ) => Promise<void>;
}

export const demoTrump: TrumpCard = {
  handler: "demo",
  onUse: async (sessId, gameId) => {
    const [user] = await UserController.getUserMeta({
      sessId,
    });
    const [game] = await GameController.getGame({ gameId });
    console.log(user?.username);
    console.log(game?.remainingCards);
    console.log("Demo card used");
  },
};

export const trumpCards = [demoTrump];
