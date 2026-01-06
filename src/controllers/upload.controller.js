import Task from "../models/Task.js";

export const uploadImages = async (req, res) => {
  try {
    const { taskId } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    const images = req.files.map((file) => file.path);

    const task = await Task.findByIdAndUpdate(
      taskId,
      { $push: { images: { $each: images } } },
      { new: true }
    );

    res.status(201).json({
      message: "Images uploaded successfully",
      images: task.images,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
