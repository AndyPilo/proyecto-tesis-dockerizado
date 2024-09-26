import mongoose from "mongoose";

const alertSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    message: {
        type: String,
        required: true,
      },
      temperature: {
        type: Number,
      },
      humidity: {
        type: Number,
      },
    date: {
      type: Date,
      required: true,
    },
  },
);

export default mongoose.model("Alert", alertSchema);
