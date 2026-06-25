import { z } from "zod";

export const createNoteSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
});

export const updateNoteSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
});

export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    const messages = error.errors.map((e) => e.message);
    return res.status(400).json({
      success: false,
      message: messages.join(", "),
    });
  }
};
