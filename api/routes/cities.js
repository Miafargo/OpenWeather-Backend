import Express from "express";
import { Cities } from "../models/cities.js";

export const router = Express.Router();

router.get("/", (request, respond, next) => {
  respond.status(200).json({
    message: "Handling GET requests to cities database",
  });
});

router.get("/cities/search/:searchTerm", async (request, respond, next) => {
  const term = request.params.searchTerm;
  const res = await Cities.find({ name: { $regex: `^${term}`, $options: "i" } })
    .limit(12)
    .exec();
  respond.send(res);
});
