import { getAPIG } from "../APIGateway";
import { WebsocketRouter } from "../utils/type";
import z from "zod";

const dev_giveTrumpRequestValidator = z.object({
  id: z.array(z.number()),
});

export const dev_giveTrump: WebsocketRouter = async (event, context) => {
  const { send } = getAPIG(event, context);

  console.log("dev_giveTrump");
  console.log(event.body);
  console.log(context.connectionId);

  const body = dev_giveTrumpRequestValidator.parse(event.body);

  console.log(body);
  await send({
    status: "OK",
    handler: "dev_giveTrump",
    content: {
      id: body.id,
      trump: 1,
    },
  });
};
