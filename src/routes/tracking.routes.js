import express from "express";
import {
  saveLocation,
  getTaskTracking,
} from "../controllers/tracking.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, saveLocation);
router.get("/:taskId", protect, getTaskTracking);

export default router;
