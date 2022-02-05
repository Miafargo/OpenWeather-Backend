import Express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { router } from "./api/routes/cities.js";

export const app = Express();
const cityRoutes = router;

mongoose
  .connect("<database url/path>")
  .then(() => {
    console.log("connected");
  })
  .catch(() => {
    console.log("error");
  });

// insert script here

//For logging
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Allow cross origin resource scripting Prevent CORS Error
app.use((request, response, next) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (request.method === "OPTIONS") {
    response.header(
      "Access-Control-Allow-Methods",
      "PUT, POST, PATCH, DELETE, GET"
    );
    return response.status(200).json({});
  }
  // this next() added so that other routes can take over when this middleware is not responding
  next();
});

// Routes which should handle requests
app.use("/", cityRoutes);

// Handling errors
app.use((request, respond, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, request, respond, next) => {
  respond.status(error.status || 500);
  respond.json({
    error: {
      message: error.message,
    },
  });
});
