import { Router } from "express";
import {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  getStats,
} from "../controllers/taskController.js";
import { protect } from "../middleware/auth.js";
import { validate, createTaskSchema, updateTaskSchema } from "../validators/task.js";
import { apiLimiter } from "../middleware/rateLimit.js";

const router = Router();

router.use(protect);
router.use(apiLimiter);

router.get("/stats", getStats);
router.get("/", getTasks);
router.post("/", validate(createTaskSchema), createTask);
router.get("/:id", getTask);
router.put("/:id", validate(updateTaskSchema), updateTask);
router.delete("/:id", deleteTask);

export default router;
