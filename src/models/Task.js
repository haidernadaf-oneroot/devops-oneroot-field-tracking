import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    crop: {
      type: String,
      required: true,
    },
    locationName: {
      type: String,
      required: true,
    },

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
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
