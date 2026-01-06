import Tracking from "../models/Tracking.js";

export const saveLocation = async (req, res) => {
  try {
    const { taskId, latitude, longitude } = req.body;

    if (!taskId || !latitude || !longitude) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const tracking = await Tracking.create({
      user: req.user._id,
      task: taskId,
      latitude,
      longitude,
      time: new Date(),
    });

    res.status(201).json({
      message: "Location saved",
      tracking,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTaskTracking = async (req, res) => {
  try {
    const records = await Tracking.find({
      task: req.params.taskId,
    }).sort({ time: 1 });

    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
