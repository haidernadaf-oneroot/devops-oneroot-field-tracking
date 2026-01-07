import express from "express";
import {
  getTasks,
  createTask,
  startTask,
  stopTask,
  completeTask,
} from "../controllers/task.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protect, getTasks);
router.post("/", protect, createTask);

// ✅ START
router.patch("/:taskId/start", protect, startTask);

// ✅ STOP
router.patch("/:taskId/stop", protect, stopTask);

// ✅ COMPLETE
router.patch("/:taskId/complete", protect, completeTask);

export default router;
