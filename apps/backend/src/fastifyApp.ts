import fastify from "fastify";
import { gameRouter } from "./http/v1/gameRoute";

function initFastify() {
  const app = fastify();

  app.get("/", (request, reply) => reply.send({ hello: "world" }));

  app.get("/ping", (request, reply) => reply.send("Pong"));

  app.get("/verbose", (req, rep) => {
    console.log("TRIGGERING VERBOSE");
    rep.send(req);
  });

  gameRouter(app, "/game");

  return app;
}

export default initFastify;
