import { FastifyInstance } from "fastify";
import {
  ERR_EXISTED_USER,
  ERR_INTERNAL,
  ERR_INVALID_CONNECTION_ID,
  ERR_INVALID_GAME,
  ERR_INVALID_USER,
} from "database/src/utils/Error";
import { GameController, UserController } from "database";
import { ERR_BAD_REQUEST } from "../../websocket/utils/error";

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

      api.patch<{
        Body: { connectionId: string; ready: boolean; gameId: string };
      }>("/ready", async (request, reply) => {
        const { connectionId, ready, gameId } = request.body;
        if (!connectionId) {
          return reply.status(400).send(ERR_INVALID_CONNECTION_ID);
        }

        if (ready === undefined || !gameId) {
          return reply.status(400).send(ERR_BAD_REQUEST);
        }

        const [user, isError] = await UserController.getUserMeta({
          connectionId,
        });
        if (isError) {
          return reply.status(500).send(ERR_INTERNAL);
        } else if (!user) {
          return reply.status(400).send(ERR_INVALID_USER);
        }

        const [game, error] = await GameController.getGame({
          gameId,
        });

        if (error) {
          return reply.status(500).send(ERR_INTERNAL);
        } else if (!game) {
          return reply.status(400).send(ERR_INVALID_GAME);
        } else if (!game.players.includes(user.id)) {
          return reply.status(400).send(ERR_INVALID_GAME);
        }

        const [updatedUser, err] = await UserController.setReadyState(
          connectionId,
          ready
        );

        if (err) {
          return reply.status(500).send(ERR_INTERNAL);
        }

        /**
         * If the player choose to be ready, check if all players are ready
         */
        if (ready) {
          const allReady = game.players.every((player) => {
            return player.ready;
          });

          if (allReady) {
            // start the game
            await GameController.startGame(gameId);
          }
        }

        return { ...updatedUser, ready };
      });
      done();
    },

    { prefix }
  );
};

export { userRouter };
