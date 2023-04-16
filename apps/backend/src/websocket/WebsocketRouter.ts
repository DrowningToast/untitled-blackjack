import { WebsocketRouter } from "./utils/type";
import { $connectRouter } from "./router/$connectRouter";
import { $disconnectRouter } from "./router/$disconnectRouter";
import { debugRouter } from "./router/debugRouter";
import { $defaultRouter } from "./router/defaultRouter";
import { authRouter } from "./router/authRouter";
import { readyRouter } from "./router/readyRouter";
import { hitRouter } from "./router/hitRouter";
import { standRouter } from "./router/standRouter";

export const WebsocketRouters: Record<string, WebsocketRouter> = {
  $connect: $connectRouter,
  $disconnect: $disconnectRouter,

  debug: debugRouter,
  auth: authRouter,
  ready: readyRouter,
  hit: hitRouter,
  stand: standRouter,

  $default: $defaultRouter,
};

export const getEvents = (eventId: keyof typeof WebsocketRouters) => {
  console.log(`Finding router of ${eventId} BRUH MOMENT`);

  return WebsocketRouters[eventId];
};
