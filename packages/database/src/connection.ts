import env from "env";
import mongoose from "mongoose";

mongoose.Promise = global.Promise;

let isConnected;

export const connectToDatabase = () => {
  if (isConnected) {
    console.log("=> using existing database connection");
    return Promise.resolve();
  }

  console.log("=> using new database connection");
  return mongoose
    .connect(
      `mongodb+srv://${env.DB_USERNAME}:${env.DB_PASSWORD}@${env.DB_URL}/?retryWrites=true&w=majority`,
      {
        bufferCommands: false,
      }
    )
    .then((db) => {
      console.log(db.connections[0].readyState);
      isConnected = db.connections[0].readyState;
      return db;
    });
};
