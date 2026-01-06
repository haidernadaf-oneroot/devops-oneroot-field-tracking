export const uploadImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    const images = req.files.map((file) => {
      // CloudinaryStorage
      if (file.path) return file.path;

      // memoryStorage (dev mode)
      return null;
    });

    res.status(201).json({
      message: "Images uploaded successfully",
      images,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
