import fastify from "fastify";
import { userRouter } from "./http/v1/user";
import { gameRouter } from "./http/v1/game";
import { mongooseMiddleware, registerMongoose } from "database";
import cors from "@fastify/cors";

function init() {
  const app = fastify();

  app.register(cors, {
    origin: "*",
  });
  // registerMongoose(app);

  app.get("/", (request, reply) => reply.send({ hello: "world" }));

  app.get("/ping", (request, reply) => reply.send("Pong"));

  app.get("/verbose", (req, rep) => rep.send(req));

  userRouter(app, "/user");
  gameRouter(app, "/game");

  return app;
}

export default init;
