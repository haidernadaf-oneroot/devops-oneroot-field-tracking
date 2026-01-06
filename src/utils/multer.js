import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

let upload;

if (cloudinary.config().cloud_name) {
  const storage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder: "field-tracking",
      allowed_formats: ["jpg", "png", "jpeg"],
    },
  });

  upload = multer({ storage });
} else {
  // fallback (prevents crash)
  upload = multer({ storage: multer.memoryStorage() });
}

export default upload;
