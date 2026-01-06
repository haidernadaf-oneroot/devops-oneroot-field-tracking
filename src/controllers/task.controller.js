import Task from "../models/Task.js";
import Tracking from "../models/Tracking.js";

/* ================= START TASK ================= */
export const startTask = async (req, res) => {
  try {
    const { taskId, latitude, longitude } = req.body;

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

/* ================= STOP TASK ================= */
export const stopTask = async (req, res) => {
  try {
    const { taskId, latitude, longitude } = req.body;

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

/* ================= COMPLETE TASK ================= */
export const completeTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.taskId,
      { status: "completed" },
      { new: true }
    );

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
