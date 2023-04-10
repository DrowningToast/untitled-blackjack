import { authHandler } from "./handlers/auth";
import { WebsocketHandler } from "./utils/type";
import { $connectHandler } from "./handlers/$connect";
import { $disconnectHandler } from "./handlers/$disconnect";
import { debugHandler } from "./handlers/debug";
import { $defaultHandler } from "./handlers/default";

export const handlers: Record<string, WebsocketHandler> = {
  $connect: $connectHandler,
  $disconnect: $disconnectHandler,

  auth: authHandler,

  debug: debugHandler,

  $default: $defaultHandler,
};

export const getHandler = (handlerId: keyof typeof handlers) => {
  console.log(`Finding handler of ${handlerId}`);

  return handlers[handlerId];
};
