import express from "express";
import cors from "cors";
import helmet from "helmet";
import { config } from "./config/index.js";
import { errorHandler } from "./middleware/error.js";
import authRoutes from "./routes/auth.js";
import taskRoutes from "./routes/tasks.js";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: config.clientUrl,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Server is running" });
});

app.use(errorHandler);

export default app;
