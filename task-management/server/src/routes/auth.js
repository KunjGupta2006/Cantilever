import { Router } from "express";
import { register, login } from "../controllers/authController.js";
import { validate, registerSchema, loginSchema } from "../validators/auth.js";
import { authLimiter } from "../middleware/rateLimit.js";

const router = Router();

router.post("/register", authLimiter, validate(registerSchema), register);
router.post("/login", authLimiter, validate(loginSchema), login);

export default router;
