import mongoose from "mongoose";

const drinkSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
  },
  { _id: false }
);

const responseSchema = new mongoose.Schema(
  {
    drinks: {
      type: [drinkSchema],
      required: true,
      validate: (v) => Array.isArray(v) && v.length > 0,
    },
    timing: {
      type: String,
      required: true,
      enum: ["asap", "today", "tomorrow", "this-week", "no-rush"],
    },
    note: { type: String, default: "", maxlength: 500 },
  },
  { timestamps: true }
);

export default mongoose.model("Response", responseSchema);
