import * as noteService from "../services/noteService.js";

export const createNote = async (req, res, next) => {
  try {
    const note = await noteService.createNote(req.body, req.user._id);
    res.status(201).json({ success: true, note });
  } catch (error) {
    next(error);
  }
};

export const getNotes = async (req, res, next) => {
  try {
    const notes = await noteService.getNotes(req.user._id);
    res.status(200).json({ success: true, notes });
  } catch (error) {
    next(error);
  }
};

export const getNote = async (req, res, next) => {
  try {
    const note = await noteService.getNoteById(req.params.id, req.user._id);
    res.status(200).json({ success: true, note });
  } catch (error) {
    next(error);
  }
};

export const updateNote = async (req, res, next) => {
  try {
    const note = await noteService.updateNote(
      req.params.id,
      req.user._id,
      req.body
    );
    res.status(200).json({ success: true, note });
  } catch (error) {
    next(error);
  }
};

export const deleteNote = async (req, res, next) => {
  try {
    await noteService.deleteNote(req.params.id, req.user._id);
    res.status(200).json({ success: true, message: "Note deleted successfully" });
  } catch (error) {
    next(error);
  }
};
