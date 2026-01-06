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
router.patch("/:id/start", auth, startTask);
router.patch("/:id/complete", auth, completeTask);

export default router;
