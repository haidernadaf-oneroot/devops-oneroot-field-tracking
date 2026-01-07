import Task from "../models/Task.js";

export const uploadTaskImages = async (req, res) => {
  const { taskId } = req.params;

  const urls = req.files.map((f) => f.path);

  const task = await Task.findByIdAndUpdate(
    taskId,
    { $push: { images: { $each: urls } } },
    { new: true }
  );

  res.json({ images: urls, task });
};
