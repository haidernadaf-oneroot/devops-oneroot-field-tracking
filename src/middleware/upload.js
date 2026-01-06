import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "field-tracking",
    resource_type: "image",
    format: "jpg",
  }),
});

const upload = multer({ storage });

export default upload;
