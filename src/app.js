import express from "express";

const app = express();

// Configuring middlewares for processing request.

// To parse json request.
app.use(express.json());

// To parse request send using html form.
app.use(express.urlencoded({ extended: true }));

export default app;
