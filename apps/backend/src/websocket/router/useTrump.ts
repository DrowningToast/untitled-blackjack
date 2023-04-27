import { z } from "zod";
import { WebsocketRouter } from "../utils/type";
import { trumpCardsAsObject } from "database/src/utils/TrumpCard";
import { getAPIG } from "../APIGateway";

const useTrumpBodyValidator = z.object({
  trumpCard: z.enum([...Object.keys(trumpCardsAsObject)] as [
    string,
    ...string[]
  ]),
});

const useTrump: WebsocketRouter = async (event, context) => {
  const apig = getAPIG(event, context);
  const body = useTrumpBodyValidator.parse(event.body);
};
