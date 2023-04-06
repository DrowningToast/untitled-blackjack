import { createGame, getGame, getUserMeta, joinGame } from "database";
import {
  ERR_EXISTED_GAME,
  ERR_ILLEGAL_OPERATION,
  ERR_INTERNAL,
  ERR_INVALID_GAME,
  ERR_INVALID_PASSCODE,
  ERR_INVALID_SESSID,
  ERR_INVALID_USER,
} from "database/src/utils/Error";
import { FastifyInstance } from "fastify";

const gameRouter = (app: FastifyInstance, prefix: string) => {
  return app.register(
    function (api, opts, done) {
      /**
       * Initialize a new game instance
       */
      api.post<{ Body: { sessId: string; passcode: string } }>(
        "/create",
        async (request, reply) => {
          const { sessId, passcode } = request.body;
          const [user, isError] = await getUserMeta({ sessId });
          if (isError) {
            return reply.status(500).send(ERR_INTERNAL);
          } else if (!user) {
            return reply.status(400).send(ERR_INVALID_SESSID);
          } else if (!passcode) {
            return reply.status(400).send(ERR_INVALID_PASSCODE);
          } else {
            // Check if there is already an active game with the same passcode or user inside
            const [existGame] = await getGame({ passcode, players: sessId });
            if (existGame) {
              return reply.status(400).send(ERR_EXISTED_GAME);
            }

            // Create the game
            const [game, error] = await createGame([user.id], passcode);
            if (error) {
              reply.status(500).send(ERR_INTERNAL);
            }

            return game;
          }
        }
      );

      /**
       * Check does the game exist
       */
      api.get<{
        Params: {
          passcode: string;
        };
      }>("/check/:passcode", async (request, reply) => {
        const { passcode } = request.params;
        const [game] = await getGame({ passcode });
        if (!game) {
          return reply.status(400).send(ERR_INVALID_GAME);
        }
        // Send the game back
        return game;
      });

      /**
       * Join the game
       */
      api.post<{ Body: { sessId: string; passcode: string } }>(
        "/join",
        async (request, reply) => {
          const { sessId, passcode } = request.body;
          const [user, isError] = await getUserMeta({ sessId });
          if (isError) {
            return reply.status(500).send(ERR_INTERNAL);
          } else if (!user) {
            return reply.status(400).send(ERR_INVALID_USER);
          } else if (!passcode) {
            return reply.status(400).send(ERR_INVALID_PASSCODE);
          } else {
            // Check if the game found or not
            const [existGame] = await getGame({ passcode, players: sessId });
            if (!existGame) {
              return reply.status(400).send(ERR_INVALID_PASSCODE);
            }

            // Check if the game is full or already active?
            if (
              existGame.players.length >= 2 ||
              existGame.gameState !== "notStarted"
            ) {
              return reply.status(400).send(ERR_INVALID_GAME);
            }

            // Check if the player who created the session is trying to join the game
            if (existGame.players[0] === user.id) {
              return reply.status(400).send(ERR_ILLEGAL_OPERATION);
            }

            // Join the game
            const [game, error] = await joinGame(existGame.gameId, user.id);
            if (error) {
              reply.status(500).send(ERR_INTERNAL);
            }

            // Send the game back
            return game;
          }
        }
      );
      done();
    },

    { prefix }
  );
};

export { gameRouter };
