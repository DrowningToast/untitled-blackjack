import { WebsocketHandler } from "./utils/type";
import { $connectHandler } from "./handlers/$connectHandler";
import { $disconnectHandler } from "./handlers/$disconnectHandler";
import { debugHandler } from "./handlers/debugHandler";
import { $defaultHandler } from "./handlers/defaultHandler";
import { authHandler } from "./handlers/authHandler";
import { readyHandler } from "./handlers/readyHandler";

export const handlers: Record<string, WebsocketHandler> = {
  $connect: $connectHandler,
  $disconnect: $disconnectHandler,

  debug: debugHandler,
  auth: authHandler,
  ready: readyHandler,

  $default: $defaultHandler,
};

export const getHandler = (handlerId: keyof typeof handlers) => {
  console.log(`Finding handler of ${handlerId}`);

  return handlers[handlerId];
};
