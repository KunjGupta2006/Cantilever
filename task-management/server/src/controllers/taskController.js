import * as taskService from "../services/taskService.js";

export const createTask = async (req, res, next) => {
  try {
    const task = await taskService.createTask(req.body, req.user._id);
    res.status(201).json({ success: true, task });
  } catch (error) {
    next(error);
  }
};

export const getTasks = async (req, res, next) => {
  try {
    const result = await taskService.getTasks(req.user._id, req.query);
    res.status(200).json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
};

export const getTask = async (req, res, next) => {
  try {
    const task = await taskService.getTaskById(req.params.id, req.user._id);
    res.status(200).json({ success: true, task });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const task = await taskService.updateTask(
      req.params.id,
      req.user._id,
      req.body
    );
    res.status(200).json({ success: true, task });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    await taskService.deleteTask(req.params.id, req.user._id);
    res.status(200).json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const getStats = async (req, res, next) => {
  try {
    const stats = await taskService.getTaskStats(req.user._id);
    res.status(200).json({ success: true, ...stats });
  } catch (error) {
    next(error);
  }
};
