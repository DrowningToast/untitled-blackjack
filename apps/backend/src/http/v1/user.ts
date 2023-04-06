import { FastifyInstance } from "fastify";
import { createUser, getUserMeta } from "database";
import { ERR_EXISTED_USER, ERR_INTERNAL } from "database/src/utils/Error";

const userRouter = (app: FastifyInstance, prefix: string) => {
  return app.register(
    function (api, opts, done) {
      /**
       * Initialize the user loggin in
       */
      api.post<{ Body: { username: string } }>(
        "/create",
        async (request, reply) => {
          const { username } = request.body;
          const [user] = await getUserMeta({ username });

          if (!user) {
            // Create the user
            const [user, error] = await createUser({ username });
            if (error) {
              reply.status(500).send(ERR_INTERNAL);
            }

            return user;
          } else {
            // The username is already taken
            reply.status(400).send(ERR_EXISTED_USER);
          }
        }
      );
      done();
    },

    { prefix }
  );
};

export { userRouter };
