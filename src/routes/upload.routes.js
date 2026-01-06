import express from "express";
import upload from "../utils/multer.js";
import auth from "../middleware/authMiddleware.js";
import { uploadImages } from "../controllers/upload.controller.js";

const router = express.Router();

router.post("/", auth, upload.array("images", 4), uploadImages);
router.post("/task-images", protect, uploadImages);

export default router;
