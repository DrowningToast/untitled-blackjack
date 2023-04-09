import { FastifyInstance } from "fastify";
import { ERR_EXISTED_USER, ERR_INTERNAL } from "database/src/utils/Error";
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
      api.post<{ Body: { username: string } }>(
        "/create",
        async (request, reply) => {
          const { username } = request.body;
          const [user] = await UserController.getUserMeta({ username });

          /**
           * Initialize the user loggin in
           *
           * If the user already exists
           * The Session ID will be replaced, if the document doesn't have connectionID
           *
           * @description Create new user document in the database with the username and session ID
           * if the user with the same name already exists, the session ID will be replaced.
           * but if the user already has a connection ID, the session ID will not be replaced.
           */
          if (!user) {
            // Create the user
            const [user, error] = await UserController.createUser({ username });
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
