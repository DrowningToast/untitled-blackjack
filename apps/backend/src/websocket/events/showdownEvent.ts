import { APIG } from "../APIGateway";
import { AsyncExceptionHandler } from "../AsyncExceptionHandler";

/**
 * Possible outcomes:
 * 1. A wins and B loses
 * 2. A loses and B wins
 * 3. A and B tie
 *
 * Automatically lose condition:
 *
 * @returns Winner username or null if tie
 *
 */

export const showdownEvent = AsyncExceptionHandler(
  async (api: APIG, gameId: string) => {}
);
