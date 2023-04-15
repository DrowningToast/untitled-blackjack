import { getAPIG } from "../APIGateway";
import { ERR_INVALID_ACTION } from "../utils/ErrorMessages";
import { WebsocketRouter } from "../utils/type";

export const $defaultRouter: WebsocketRouter = async (event, context) => {
  // Send the message back tot the client invalid handler

  const { send } = getAPIG(event, context);

  await send({
    status: "REQUEST_ERROR",
    error: ERR_INVALID_ACTION,
  });

  return;
};
