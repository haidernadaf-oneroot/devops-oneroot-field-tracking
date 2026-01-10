import User from "../models/User.js";
import Task from "../models/Task.js";

/* ===== GET ALL FIELD USERS ===== */
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "field" }).select("-__v");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ===== GET ALL TASKS ===== */
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("assignedTo", "name phone")
      .sort({ createdAt: -1 });
    console.log(tasks);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ===== ADMIN CREATE TASK ===== */
export const createTaskAdmin = async (req, res) => {
  try {
    const { title, crop, locationName, assignedTo } = req.body;

    if (!title || !crop || !locationName || !assignedTo) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const task = await Task.create({
      title,
      crop,
      locationName,
      assignedTo,
      status: "pending",
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
