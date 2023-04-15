import { WebsocketRouter } from "../utils/type";
import { getAPIG } from "../APIGateway";
import { hitEvent } from "../events/hitEvent";
import { switchTurnEvent } from "../events/switchTurnEvent";

export const hitRouter: WebsocketRouter = async (event, context) => {
  const api = getAPIG(event, context);

  // Send hit event
  let [, err] = await hitEvent(api);
  if (err) {
    return await api.send({
      status: "INTERNAL_ERROR",
      error: err,
    });
  }

  [, err] = await switchTurnEvent(api);
  if (err) {
    return await api.send({
      status: "INTERNAL_ERROR",
      error: err,
    });
  }
};
