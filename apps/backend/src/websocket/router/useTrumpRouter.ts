import { z } from "zod";
import { WebsocketRouter } from "../utils/type";
import {
  trumpCardsAsArray,
  trumpCardsAsObject,
} from "database/src/utils/TrumpCard";
import { getAPIG } from "../APIGateway";
import { useTrumpEvent } from "../events/gameplay/useTrumpEvent";
import { ERR_BAD_REQUEST } from "../utils/ErrorMessages";

const trumpCardHandlers = trumpCardsAsArray.map((card) => card.handler);

const useTrumpBodyValidator = z.object({
  trumpCard: z.enum(
    trumpCardsAsArray.map((trump) => trump.handler) as [string, ...string[]]
  ),
});

export const useTrumpRouter: WebsocketRouter = async (event, context) => {
  const apig = getAPIG(event, context);
  if (!event.body) {
    return await apig.send({
      status: "REQUEST_ERROR",
      error: ERR_BAD_REQUEST,
    });
  }

  const body = useTrumpBodyValidator.parse(JSON.parse(event.body));

  const [_, err] = await useTrumpEvent(apig, apig.connectionId, body.trumpCard);
  if (err) {
    return await apig.send({
      status: "INTERNAL_ERROR",
      error: err,
    });
  }
};
