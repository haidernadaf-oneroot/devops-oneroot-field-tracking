// controllers/reports.controller.js
import Sale from "../models/Sale.js";
import Task from "../models/Task.js";
import Tracking from "../models/Tracking.js";

export const getDailyReport = async (req, res) => {
  try {
    const userId = req.user._id;

    // Get today's date range (start and end of today)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // 1. Total Sales Today
    const salesToday = await Sale.find({
      user: userId,
      createdAt: { $gte: today, $lt: tomorrow },
    });

    const totalSalesToday = salesToday.reduce(
      (sum, sale) => sum + sale.grandTotal,
      0
    );

    // 2. Tasks Completed Today
    const completedTasksToday = await Task.countDocuments({
      assignedTo: userId,
      status: "completed",
      updatedAt: { $gte: today, $lt: tomorrow },
    });

    // 3. Unique Locations Visited Today (from tracking)
    const trackingToday = await Tracking.find({
      user: userId,
      time: { $gte: today, $lt: tomorrow },
    }).select("latitude longitude");

    // Deduplicate locations (simple rounding to avoid GPS noise)
    const uniqueLocations = new Set();
    trackingToday.forEach((t) => {
      const key = `${Math.round(t.latitude * 1000)},${Math.round(
        t.longitude * 1000
      )}`;
      uniqueLocations.add(key);
    });
    const locationsVisitedToday = uniqueLocations.size;

    res.json({
      totalSalesToday,
      completedTasksToday,
      locationsVisitedToday,
    });
  } catch (error) {
    console.error("Daily report error:", error);
    res.status(500).json({ message: error.message });
  }
};
