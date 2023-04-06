import { FastifyInstance } from "fastify";
import mongoose from "mongoose";
import env from "env";

let connection: any | null = null;

const mongooseMiddleware = async (req, res, next) => {
  if (connection) {
    return next();
  }
  try {
    await connectDB();
    next();
  } catch (e) {
    console.log(e);
  }
};

export const registerMongoose = (app: FastifyInstance) => {
  app.register(mongooseMiddleware, { prefix: "/api" });
};

const connectDB = async () => {
  try {
    connection = mongoose
      .connect(
        `mongodb+srv://${env.DB_USERNAME}:${env.DB_PASSWORD}@${env.DB_URL}/?retryWrites=true&w=majority`,
        {
          serverSelectionTimeoutMS: 5000,
        }
      )
      .then(() => mongoose);
    await connection;
    console.log("Connected to DB.");
  } catch (e) {
    console.error("Could not connect to MongoDB...");
    throw e;
  }
};

function getDBConnection() {
  return connection;
}

export { connectDB, getDBConnection, mongooseMiddleware };
