import mongoose from "mongoose";

export const citiesSchema = new mongoose.Schema({
  id: Number,
  name: String,
  country: String,
  country_name: String,
  coord: { lon: Number, lat: Number },
});

export const Cities = mongoose.model("Weather", citiesSchema, "Cities");
