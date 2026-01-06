import express from "express";
import {
  saveLocation,
  getTaskTracking,
} from "../controllers/tracking.controller.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", auth, saveLocation);
router.get("/:taskId", auth, getTaskTracking);

export default router;
