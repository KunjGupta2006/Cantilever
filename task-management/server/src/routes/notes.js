import { Router } from "express";
import {
  createNote,
  getNotes,
  getNote,
  updateNote,
  deleteNote,
} from "../controllers/noteController.js";
import { protect } from "../middleware/auth.js";
import { validate, createNoteSchema, updateNoteSchema } from "../validators/note.js";
import { apiLimiter } from "../middleware/rateLimit.js";

const router = Router();

router.use(protect);
router.use(apiLimiter);

router.get("/", getNotes);
router.post("/", validate(createNoteSchema), createNote);
router.get("/:id", getNote);
router.put("/:id", validate(updateNoteSchema), updateNote);
router.delete("/:id", deleteNote);

export default router;
