import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import env from "./env.config.js";

const app = express();

// Configuring middlewares for processing request.

// To parse json request.
app.use(express.json());

// To parse request send using html form.
app.use(express.urlencoded({ extended: true }));

// To parse cookies.
app.use(cookieParser());

// Configuring cors rules.

app.use(
  cors({
    origin: env.origin,
    credentials: true,
  })
);

export default app;
