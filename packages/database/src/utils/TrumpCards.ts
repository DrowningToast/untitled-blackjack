export interface TrumpCard {
  handler: string;
  // Handle the effeec of the card
  onUse: (
    // The user who used the card
    userId: string,
    // The game the user is in
    gameId: string
  ) => void;
}
