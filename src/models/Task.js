import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    crop: {
      type: String,
      required: true,
      trim: true,
    },

    locationName: {
      type: String,
      required: true,
      trim: true,
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true, // ✅ faster queries for user tasks
    },

    status: {
      type: String,
      enum: ["pending", "started", "stopped", "completed"],
      default: "pending",
      index: true,
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
  {
    timestamps: true,

    // ✅ VERY IMPORTANT — allow virtual populate to appear in response
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

/* ✅ Virtual relation: Task → Sales */
taskSchema.virtual("sales", {
  ref: "Sale", // Sale model
  localField: "_id", // Task._id
  foreignField: "task", // Sale.task
});

export default mongoose.model("Task", taskSchema);
