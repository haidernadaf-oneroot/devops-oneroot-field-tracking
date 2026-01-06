import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: String,
    crop: String,
    locationName: String,

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "started", "stopped", "completed"],
      default: "pending",
    },

    startLocation: {
      latitude: Number,
      longitude: Number,
      time: Date,
    },

    stopLocation: {
      latitude: Number,
      longitude: Number,
      time: Date,
    },

    images: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
