import dotenv from "dotenv";

dotenv.config();

import { connectDB, disconnectDB } from "./db/connection.db.js";
import app from "./app.js";
import env from "./env.config.js";
import logger from "./log.config.js";

connectDB().then(() => {
  const server = app.listen(env.port, () => {
    logger.info(`Server is listening on port ${env.port}`);
  });

  // Listens for error events.
  server.on("error", async (error) => {
    logger.error(`Error while starting http server ${error?.message}`);
    await disconnectDB();
    process.exit(1);
  });

  // Listens for uncaught exceptions events.
  server.on("uncaughtException", async (error) => {
    logger.error(`Uncaught Exception: ${error}`);
    await disconnectDB();
    server.close(() => process.exit(0));
  });

  // Listens for unhandled rejections of promises events.
  server.on("unhandledRejection", async (error) => {
    logger.error(`Unhandled Rejection: ${error}`);
    await disconnectDB();
    server.close(() => process.exit(0));
  });

  // Listens for interruption signal event.
  server.on("SIGINT", async () => {
    logger.info("SIGINT received, closing database and server.");
    await disconnectDB();
    server.close(() => process.exit(0));
  });

  // Listens for termination signal event.
  server.on("SIGTERM", async () => {
    logger.info("SIGINT received, closing database and server.");
    await disconnectDB();
    server.close(() => process.exit(0));
  });

  // Listens for server close event.
  server.on("close", () => {
    logger.info("Server closed!");
  });
});
