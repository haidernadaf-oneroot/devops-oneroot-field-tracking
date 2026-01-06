import Task from "../models/Task.js";

// CREATE TASK
// export const createTask = async (req, res) => {
//   console.log("USER FROM TOKEN:", req.user); // 👈 add this
//   try {
//     const task = await Task.create(req.body);
//     res.status(201).json(task);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };
export const createTask = async (req, res) => {
  console.log("USER FROM TOKEN:", req.user); // 👈 add this

  try {
    const { title, crop, locationName } = req.body;

    const task = await Task.create({
      title,
      crop,
      locationName,
      assignedTo: req.user._id,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET TASKS FOR USER
export const getTasksByUser = async (req, res) => {
  try {
    const { userId } = req.query;
    const tasks = await Task.find({ assignedTo: userId }).sort({
      createdAt: -1,
    });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// START TASK
export const startTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status: "started", startTime: new Date() },
      { new: true }
    );
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// COMPLETE TASK
export const completeTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status: "completed", endTime: new Date() },
      { new: true }
    );
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
