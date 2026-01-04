import mongoose from "mongoose";

const magazineSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    year: {
      type: Number,
      required: true,
    },

    theme: {
      type: String,
      trim: true,
    },

    image: {
      type: String, 
      required: true,
    },

    link: {
      type: String, 
      required: true,
      trim: true,
    },

    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Magazine", magazineSchema);
