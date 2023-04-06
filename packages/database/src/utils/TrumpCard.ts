import { getGame } from "../controllers/GameController";
import { getUserMeta } from "../controllers/UserController";

export interface TrumpCard {
  handler: string;
  // Handle the effeec of the card
  onUse: (
    // The user who used the card
    sessID: string,
    // The game the user is in
    gameId: string
  ) => Promise<void>;
}

export const demoTrump: TrumpCard = {
  handler: "demo",
  onUse: async (sessId, gameId) => {
    const [user] = await getUserMeta({
      sessId,
    });
    const [game] = await getGame({ gameId });
    console.log(user?.username);
    console.log(game?.remainingCards);
    console.log("Demo card used");
  },
};
