import express from "express";
import {
  createTask,
  getTasksByUser,
  startTask,
  completeTask,
} from "../controllers/task.controller.js";

import auth from "../middleware/authMiddleware.js"; // ✅ ADD THIS

const router = express.Router();

router.post("/", auth, createTask);
router.get("/", auth, getTasksByUser);

router.post("/start", protect, startTask);
router.post("/stop", protect, stopTask);
router.patch("/:taskId/complete", protect, completeTask);

export default router;
