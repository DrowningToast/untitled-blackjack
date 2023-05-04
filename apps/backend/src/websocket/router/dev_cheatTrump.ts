import { UserController } from "database";
import { getAPIG } from "../APIGateway";
import { WebsocketRouter } from "../utils/type";
import { trumpCardsAsArray } from "../../gameplay/trumpcards/TrumpCard";

export const dev_cheatTrump: WebsocketRouter = async (event, context) => {
  const { send, connectionId } = getAPIG(event, context);

  console.log("TRIGGERING DEV_CHEATRUMP");

  // get user
  const [user, err] = await UserController.getUserMeta({ connectionId });
  if (err) {
    await send({
      status: "REQUEST_ERROR",
      error: err,
    });
    return;
  }

  // give all trumpcards to the user
  // get all trump cards
  const trumpCards = [...trumpCardsAsArray];

  const [updated, err2] = await UserController.setTrumpCards(
    { username: user.username },
    trumpCards
  );
  if (err2) {
    await send({
      status: "REQUEST_ERROR",
      error: err2,
    });
    return;
  }

  await send({
    status: "OK",
    handler: "dev_cheatTrump",
    content: updated,
  });
};
