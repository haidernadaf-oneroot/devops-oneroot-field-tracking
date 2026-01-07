// import Task from "../models/Task.js";

// /* CREATE TASK */
// export const createTask = async (req, res) => {
//   try {
//     const { title, crop, locationName } = req.body;

//     const task = await Task.create({
//       title,
//       crop,
//       locationName,
//       assignedTo: req.user._id,
//     });

//     res.status(201).json(task);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// /* GET MY TASKS */
// export const getMyTasks = async (req, res) => {
//   try {
//     const tasks = await Task.find({ assignedTo: req.user._id }).sort({
//       createdAt: -1,
//     });

//     res.json(tasks);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// /* START TASK */
// export const startTask = async (req, res) => {
//   try {
//     const { latitude, longitude } = req.body;

//     const task = await Task.findById(req.params.id);
//     if (!task) return res.status(404).json({ message: "Task not found" });

//     task.status = "started";
//     task.startLocation = {
//       latitude,
//       longitude,
//       time: new Date(),
//     };

//     await task.save();
//     res.json({ message: "Task started", task });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// /* STOP TASK */
// export const stopTask = async (req, res) => {
//   try {
//     const { latitude, longitude } = req.body;

//     const task = await Task.findById(req.params.id);
//     if (!task) return res.status(404).json({ message: "Task not found" });

//     task.status = "stopped";
//     task.stopLocation = {
//       latitude,
//       longitude,
//       time: new Date(),
//     };

//     await task.save();
//     res.json({ message: "Task stopped", task });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// /* COMPLETE TASK */
// export const completeTask = async (req, res) => {
//   try {
//     const task = await Task.findById(req.params.id);
//     if (!task) return res.status(404).json({ message: "Task not found" });

//     task.status = "completed";
//     await task.save();

//     res.json({ message: "Task completed", task });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
