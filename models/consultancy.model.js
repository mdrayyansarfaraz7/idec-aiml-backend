import mongoose from "mongoose";

const consultancySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    imgUrl: {
      type: String, // Cloudinary image URL
      required: true,
    },

    link: {
      type: String,
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

export default mongoose.model("Consultancy", consultancySchema);
