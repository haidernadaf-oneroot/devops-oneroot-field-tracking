import Task from "../models/Task.js";
import Tracking from "../models/Tracking.js";

/* ================= GET TASKS ================= */
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      assignedTo: req.user._id,
    }).sort({ createdAt: -1 });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= CREATE TASK ================= */
export const createTask = async (req, res) => {
  try {
    const { title, crop, locationName } = req.body;

    if (!title || !crop || !locationName) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const task = await Task.create({
      title,
      crop,
      locationName,
      assignedTo: req.user._id, // self assign
      status: "pending",
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= START TASK ================= */
export const startTask = async (req, res) => {
  try {
    const { taskId, latitude, longitude } = req.body;

    if (!taskId || !latitude || !longitude) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const task = await Task.findByIdAndUpdate(
      taskId,
      {
        status: "started",
        startLocation: {
          latitude,
          longitude,
          time: new Date(),
        },
      },
      { new: true }
    );

    await Tracking.create({
      user: req.user._id,
      task: taskId,
      latitude,
      longitude,
    });

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// controllers/task.controller.js

/* ================= STOP TASK ================= */
export const stopTask = async (req, res) => {
  try {
    const { taskId } = req.params; // ← Use params, not body
    const { latitude, longitude } = req.body;

    if (!latitude || !longitude) {
      return res.status(400).json({ message: "Missing location data" });
    }

    const task = await Task.findByIdAndUpdate(
      taskId,
      {
        status: "stopped",
        stopLocation: {
          latitude,
          longitude,
          time: new Date(),
        },
      },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await Tracking.create({
      user: req.user._id,
      task: taskId,
      latitude,
      longitude,
    });

    res.json({ message: "Stop location saved", task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= COMPLETE TASK ================= */
export const completeTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findByIdAndUpdate(
      taskId,
      { status: "completed" },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task completed", task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
