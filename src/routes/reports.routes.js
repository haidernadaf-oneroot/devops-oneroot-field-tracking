// routes/reports.routes.js
import express from "express";
import { getDailyReport } from "../controllers/reports.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/daily", protect, getDailyReport);

export default router;
