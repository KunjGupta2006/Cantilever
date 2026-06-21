// dotenv MUST run before any other module is imported.
// With ES modules, static imports are hoisted — so we use a dynamic
// import bootstrap pattern to guarantee the env is loaded first.

import { configDotenv } from "dotenv";
configDotenv();

// Now that process.env is populated, dynamically import everything else.
// Dynamic imports run AFTER the current module's top-level code, so
// dotenv has already populated process.env by this point.
const { default: validateEnv }   = await import("./utils/validateENV.js");
validateEnv();

const { default: express }       = await import("express");
const { default: mongoose }      = await import("mongoose");
const { default: cors }          = await import("cors");
const { default: cookieParser }  = await import("cookie-parser");
const { default: helmet }        = await import("helmet");
const { default: morgan }        = await import("morgan");

const { default: blogRouter }    = await import("./routes/blogRoutes.js");
const { default: reviewRouter }  = await import("./routes/reviewRoutes.js");
const { default: userRouter }    = await import("./routes/userRoutes.js");
const { default: uploadRouter }  = await import("./routes/uploadRoutes.js");

const app = express();

const PORT        = process.env.PORT;
const FRONTEND_URL = process.env.FRONTEND_URL;
const MONGO_URI   = process.env.MONGO_URI;

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true,
}));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// health check
app.get("/health", (req, res) => res.status(200).json({ status: "ok" }));
app.get("/api",    (req, res) => res.send("Server working fine"));

// routes
app.use("/api/blog",    blogRouter);
app.use("/api/review",  reviewRouter);
app.use("/api/user",    userRouter);
app.use("/api/upload",  uploadRouter);

// global error handler — must be after all routes
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

// db connection + start server
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("Database connected successfully");
    app.listen(PORT, () => {
      console.log(`Server is listening on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Database connection failed:", error.message);
  });