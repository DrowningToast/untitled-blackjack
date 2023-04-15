import fastify from "fastify";
import { Game, UserController } from "database";
import { userRouter } from "./http/v1/userRoute";
import { gameRouter } from "./http/v1/gameRoute";

function initFastify() {
  const app = fastify();

  app.get("/", (request, reply) => reply.send({ hello: "world" }));

  app.get("/ping", (request, reply) => reply.send("Pong"));

  app.get("/verbose", (req, rep) => {
    console.log("bruh verbose");
    rep.send(req);
  });

  app.get("/test", async (req, rep) => {
    const _ = await Game.find({
      passcode: "testing_ground",

      players: "64347175af7ea6291d05b0cf",
    }).populate("players", "-cards -connectionId");

    rep.send(_);
  });

  userRouter(app, "/user");
  gameRouter(app, "/game");

  return app;
}

export default initFastify;
