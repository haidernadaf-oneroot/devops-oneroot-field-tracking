import express from "express";
import cors from "cors";

import userRoutes from "./routes/user.routes.js";
import taskRoutes from "./routes/task.routes.js";
import authRoutes from "./routes/auth.routes.js";
import testRoutes from "./routes/test.routes.js";
import trackingRoutes from "./routes/tracking.routes.js";
import saleRoutes from "./routes/sale.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
import reportsRouter from "./routes/reports.routes.js";
import productRouter from "./routes/product.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/tracking", trackingRoutes);
app.use("/api/sales", saleRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/reports", reportsRouter);
app.use("/api/products", productRouter);

app.get("/", (req, res) => {
  res.send("Field Tracking Backend is running 🚜");
});

export default app;
