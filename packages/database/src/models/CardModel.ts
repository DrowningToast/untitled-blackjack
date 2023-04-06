import { Schema } from "mongoose";

const CardSchema = new Schema({
  displayName: {
    type: String,
    required: true,
  },
  values: [
    {
      type: Number,
    },
  ],
});
