import fastify from "fastify";
import { userRouter } from "./http/v1/user";
import { gameRouter } from "./http/v1/game";
import { UserController } from "database";

function init() {
  const app = fastify();

  app.get("/", (request, reply) => reply.send({ hello: "world" }));

  app.get("/ping", (request, reply) => reply.send("Pong"));

  app.get("/verbose", (req, rep) => rep.send(req));

  app.get("/test", async (req, rep) => {
    const [user] = await UserController.getUserMeta({
      username: "Gus",
    });

    rep.send(user);
  });

  userRouter(app, "/user");
  gameRouter(app, "/game");

  return app;
}

export default init;
