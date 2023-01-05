import mongoose, { Schema } from "mongoose";

const sagaSchema = new Schema({
  name: { type: String, require: true },
  summary: { type: String },
  episodes: { type: [Number] },
  chapters: { type: [Number] },
  volumes: { type: [Number] },
  number: { type: Number },
});

export const Saga = mongoose.model("saga", sagaSchema);

export interface ISaga {}
