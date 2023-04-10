import { FastifyInstance } from "fastify";
import {
  ERR_EXISTED_USER,
  ERR_INTERNAL,
  ERR_INVALID_CONNECTION_ID,
} from "database/src/utils/Error";
import { UserController } from "database";

/**
 *
 *
 *
 * @param app
 * @param prefix
 * @returns
 */
const userRouter = (app: FastifyInstance, prefix: string) => {
  return app.register(
    function (api, opts, done) {
      /**
       * Initialize the user loggin in
       */
      api.post<{ Body: { username: string; connectionId: string } }>(
        "/authenticate",
        async (request, reply) => {
          const { username, connectionId } = request.body;
          const [user] = await UserController.getUserMeta({ username });

          /**
           * Validate the username and connectionId
           */
          if (!username || !connectionId) {
            reply.status(400).send(ERR_INVALID_CONNECTION_ID);
          }

          /**
           * If the username is taken, reply with an error
           */
          if (!user) {
            // Create the user
            const [user, error] = await UserController.createUser({
              username,
              connectionId,
            });
            if (error) {
              reply.status(500).send(ERR_INTERNAL);
            }

            return user;
          } else if (user.connectionId) {
            // The username is already taken
            reply.status(400).send(ERR_EXISTED_USER);
          } else {
            // Delete old user
            await UserController.deleteUser({ username });

            // create a new user with the same username but different session ID
            const [user, error] = await UserController.createUser({ username });
            if (error) {
              reply.status(500).send(ERR_INTERNAL);
            }

            return user;
          }
        }
      );
      done();
    },

    { prefix }
  );
};

export { userRouter };
