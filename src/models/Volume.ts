import mongoose, { Schema } from "mongoose";

const volumeSchema = new Schema({
  number: { type: Number, require: true },
  title: { type: String, require: true },
  chapters: { type: [Number], require: true },
  summary: { type: String, require: true },
});

export const Volume = mongoose.model("volume", volumeSchema);

export interface IVolume {}
