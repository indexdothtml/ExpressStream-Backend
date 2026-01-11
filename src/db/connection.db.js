import mongoose from "mongoose";

import env from "../env.config.js";
import { databaseName } from "../constants.js";
import logger from "../log.config.js";

async function connectDB() {
  try {
    await mongoose.connect(`${env.dbURI}/${databaseName}`);
    logger.info("MongoDB database connected!");
  } catch (error) {
    logger.error(`Error in MongoDB connection: ${error.message}`);
    process.exit(1);
  }
}

async function disconnectDB() {
  try {
    await mongoose.disconnect();
    logger.info(`MongoDB database disconnected!`);
  } catch (error) {
    logger.error(`Error while closing database connection ${error.message}`);
    process.exit(1);
  }
}

export { connectDB, disconnectDB };
