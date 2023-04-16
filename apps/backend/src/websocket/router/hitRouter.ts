import { WebsocketRouter } from "../utils/type";
import { getAPIG } from "../APIGateway";
import { hitEvent } from "../events/hitEvent";
import { switchTurnEvent } from "../events/switchTurnEvent";

export const hitRouter: WebsocketRouter = async (event, context) => {
  const api = getAPIG(event, context);

  // Send hit event
  let [_1, err1] = await hitEvent(api);
  if (err1) {
    return await api.send({
      status: "INTERNAL_ERROR",
      error: err1,
    });
  }

  let [_2, err2] = await switchTurnEvent(api);
  if (err2) {
    return await api.send({
      status: "INTERNAL_ERROR",
      error: err2,
    });
  }
};
