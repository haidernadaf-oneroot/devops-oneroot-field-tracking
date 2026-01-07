import express from "express";
import upload from "../middleware/upload.js";
import { uploadTaskImages } from "../controllers/upload.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post(
  "/task/:taskId",
  protect,
  upload.array("images", 4),
  uploadTaskImages
);

export default router;
