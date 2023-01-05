import mongoose, { Schema } from "mongoose";

const episodeSchema = new Schema({
  title: { type: String, require: true },
  number: { type: Number, require: true },
  release: { type: String },
  summary: { type: String },
  chapters: { type: [Number] },
  image: { type: String },
});

export const Episode = mongoose.model("episode", episodeSchema);

export interface IEpisode {}
