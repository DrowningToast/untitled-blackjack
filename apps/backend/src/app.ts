import fastify from "fastify";

function init() {
  const app = fastify();

  app.get("/", (request, reply) => reply.send({ hello: "world" }));

  app.get("/ping", (request, reply) => reply.send("Pong"));

  app.get("/verbose", (req, rep) => rep.send(req));

  return app;
}

export default init;
