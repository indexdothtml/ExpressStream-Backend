import { createLogger, transports, format } from "winston";

import env from "./env.config.js";

const logger = createLogger({
  level: "info",
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.Console({
      format: format.combine(format.simple()),
    }),

    ...(env.nodeEnv === "development"
      ? [new transports.File({ dirname: "./src/logs", filename: "app.log" })]
      : []),
  ],
});

export default logger;
