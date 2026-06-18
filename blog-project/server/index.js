import { configDotenv } from "dotenv";
configDotenv();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

// routers
import blogRouter from "./routes/blogRoutes.js";
import reviewRouter from "./routes/reviewRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app=express();
const __dirname=path.resolve();

// import from env
const PORT=process.env.PORT;
const FRONTEND_URL=process.env.FRONTEND_URL;
const MONGO_URI=process.env.MONGO_URI;

// middlewares
app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin:FRONTEND_URL,
  credentials: true,
}));



// health check
app.get("/health", (req, res) => res.status(200).json({ status: 'ok' }));
app.get("/api",    (req, res) => res.send("Server working fine"));

// routes
app.use("/api/blog",blogRouter );
app.use("/api/review",reviewRouter );
app.use("/api/user",userRouter );

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

// db connection +start server
mongoose.connect(MONGO_URI).then(()=>{
    console.log("Database connected successfully");
    app.listen(PORT, () => {
      console.log(`Server is listening on port: ${PORT}`);
    });
  })
    .catch((error) => {
    console.log("Database connection failed:", error.message);
  });

