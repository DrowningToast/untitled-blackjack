import { AsyncExceptionHandler } from "../AsyncExceptionHandler";

const parseBody = AsyncExceptionHandler(async (body: string) => {
  const json = JSON.parse(body);
});
