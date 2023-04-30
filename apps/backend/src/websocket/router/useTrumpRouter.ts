import { z } from "zod";
import { WebsocketRouter } from "../utils/type";
import { trumpCardsAsObject } from "database/src/utils/TrumpCard";
import { getAPIG } from "../APIGateway";
import { useTrumpEvent } from "../events/gameplay/useTrumpEvent";

const useTrumpBodyValidator = z.object({
  trumpCard: z.enum([...Object.keys(trumpCardsAsObject)] as [
    string,
    ...string[]
  ]),
});

export const useTrumpRouter: WebsocketRouter = async (event, context) => {
  const apig = getAPIG(event, context);
  const body = useTrumpBodyValidator.parse(event.body);

  const [_, err] = await useTrumpEvent(apig, apig.connectionId, body.trumpCard);
  if (err) {
    return await apig.send({
      status: "INTERNAL_ERROR",
      error: err,
    });
  }
};
