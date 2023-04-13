import { GameController, UserController } from "database";
import {
  ERR_EXISTED_GAME,
  ERR_ILLEGAL_OPERATION,
  ERR_INTERNAL,
  ERR_INVALID_CONNECTION_ID,
  ERR_INVALID_GAME,
  ERR_INVALID_PASSCODE,
  ERR_INVALID_SESSID,
  ERR_INVALID_USER,
} from "database/src/utils/Error";
import { FastifyInstance } from "fastify";
import { ERR_BAD_REQUEST } from "../../websocket/utils/error";

const gameRouter = (app: FastifyInstance, prefix: string) => {
  return app.register(
    function (api, opts, done) {
      /**
       * Initialize a new game instance
       * The user creating the game must be authorized
       */
      api.post<{
        Body: { connectionId: string; passcode: string };
      }>("/create", async (request, reply) => {
        const { connectionId, passcode } = request.body;
        const [user, isError] = await UserController.getUserMeta({
          connectionId,
        });

        if (isError) {
          return reply.status(500).send(ERR_INVALID_USER);
        } else if (!passcode) {
          return reply.status(400).send(ERR_INVALID_PASSCODE);
        } else {
          // Check if there is already an active game with the same passcode or user inside
          const [existGame] = await GameController.getGame({
            passcode,
            players: [user.id],
          });

          if (existGame) {
            return reply.status(400).send(ERR_EXISTED_GAME);
          }

          // Create the game
          const [game, error] = await GameController.createGame(
            [user._id],
            passcode
          );

          if (error) {
            reply.status(500).send(ERR_INTERNAL);
          }

          return game;
        }
      });

      /**
       * Check does the game exist
       */
      api.get<{
        Params: {
          passcode: string;
        };
      }>("/check/:passcode", async (request, reply) => {
        const { passcode } = request.params;
        const [game] = await GameController.getGame({ passcode });
        if (!game) {
          return reply.status(400).send(ERR_INVALID_GAME);
        }
        // Send the game back
        return game;
      });

      /**
       * Join the game
       */
      api.post<{
        Body: { passcode: string; connectionId: string; gameId: string };
      }>("/join", async (request, reply) => {
        const { connectionId, passcode } = request.body;
        const [user, isError] = await UserController.getUserMeta({
          connectionId,
        });

        if (isError) {
          return reply.status(500).send(ERR_INTERNAL);
        } else if (!user) {
          return reply.status(400).send(ERR_INVALID_USER);
        } else if (!passcode) {
          return reply.status(400).send(ERR_INVALID_PASSCODE);
        } else {
          // The same player cannot join the game instance themselves
          let [existGame] = await GameController.getGame({
            passcode,
            players: user._id,
          });
          if (existGame) {
            return reply.status(400).send(ERR_ILLEGAL_OPERATION);
          }

          // Check if the game exist
          [existGame] = await GameController.getGame({ passcode });
          if (!existGame) {
            return reply.status(400).send(ERR_INVALID_GAME);
          }

          // Check if the game is full or already active?
          if (
            existGame.players.length >= 2 ||
            existGame.gameState !== "notStarted"
          ) {
            return reply.status(400).send(ERR_INVALID_GAME);
          }

          // Join the game
          const [game, error] = await GameController.joinGame(
            existGame.id,
            user._id
          );

          if (error) {
            reply.status(500).send(ERR_INTERNAL);
          }

          // Send the game back
          return game;
        }
      });

      /**
       * Leave the game
       */
      api.post<{
        Body: { connectionId: string; gameId: string };
      }>("/leave", async (request, reply) => {
        const { connectionId, gameId } = request.body;
        const [user, isError] = await UserController.getUserMeta({
          connectionId,
        });

        if (isError) {
          return reply.status(500).send(ERR_INTERNAL);
        } else if (!user) {
          return reply.status(400).send(ERR_INVALID_USER);
        } else if (!gameId) {
          return reply.status(400).send(ERR_BAD_REQUEST);
        }

        const [existGame] = await GameController.getGame({ gameId });

        if (!existGame) {
          return reply.status(400).send(ERR_INVALID_GAME);
        }

        // Check if the user is in the game
        if (!existGame.players.find((p) => p.username === user.username)) {
          return reply.status(400).send(ERR_ILLEGAL_OPERATION);
        }

        // Leave the game
        const [game, error] = await GameController.leaveGame(
          connectionId,
          gameId
        );

        if (error) {
          reply.status(500).send(ERR_INTERNAL);
        }

        return game;
      });

      done();
    },

    { prefix }
  );
};

export { gameRouter };
