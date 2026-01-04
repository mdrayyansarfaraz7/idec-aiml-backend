import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
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

    techStack: [
      {
        type: String,
        trim: true,
      },
    ],

    image: {
      type: String, // Cloudinary or external image URL
      required: true,
    },

    year: {
      type: Number,
      required: true,
    },

    link: {
      type: String,
      trim: true,
    },

    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Project", projectSchema);
