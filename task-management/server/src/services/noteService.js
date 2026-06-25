import Note from "../models/Note.js";
import { AppError } from "../middleware/error.js";

export const createNote = async (data, userId) => {
  const note = await Note.create({ ...data, createdBy: userId });
  return note;
};

export const getNotes = async (userId) => {
  const notes = await Note.find({ createdBy: userId }).sort({ updatedAt: -1 });
  return notes;
};

export const getNoteById = async (noteId, userId) => {
  const note = await Note.findOne({ _id: noteId, createdBy: userId });
  if (!note) {
    throw new AppError("Note not found", 404);
  }
  return note;
};

export const updateNote = async (noteId, userId, data) => {
  const note = await Note.findOneAndUpdate(
    { _id: noteId, createdBy: userId },
    data,
    { new: true, runValidators: true }
  );
  if (!note) {
    throw new AppError("Note not found", 404);
  }
  return note;
};

export const deleteNote = async (noteId, userId) => {
  const note = await Note.findOneAndDelete({
    _id: noteId,
    createdBy: userId,
  });
  if (!note) {
    throw new AppError("Note not found", 404);
  }
  return note;
};
