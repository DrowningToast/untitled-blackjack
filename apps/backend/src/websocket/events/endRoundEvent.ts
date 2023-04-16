import { APIG } from "../APIGateway";
import { AsyncExceptionHandler } from "../AsyncExceptionHandler";

const endRoundEvent = AsyncExceptionHandler(
  async (api: APIG, gameId: string) => {}
);
