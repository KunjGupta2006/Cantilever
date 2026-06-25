import Task from "../models/Task.js";
import { AppError } from "../middleware/error.js";

export const createTask = async (taskData, userId) => {
  const task = await Task.create({ ...taskData, createdBy: userId });
  return task;
};

export const getTasks = async (userId, queryParams) => {
  const {
    search,
    status,
    priority,
    sort = "-createdAt",
    page = 1,
    limit = 12,
  } = queryParams;

  const query = { createdBy: userId };

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  if (status) {
    query.status = status;
  }

  if (priority) {
    query.priority = priority;
  }

  const sortOptions = {
    "-createdAt": { createdAt: -1 },
    createdAt: { createdAt: 1 },
    dueDate: { dueDate: 1 },
    priority: {
      high: -1,
      medium: -1,
      low: -1,
    },
  };

  let sortObj = sortOptions[sort] || { createdAt: -1 };

  if (sort === "priority") {
    const tasks = await Task.find(query);
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

    const total = tasks.length;
    const skip = (Number(page) - 1) * Number(limit);
    const paginatedTasks = tasks.slice(skip, skip + Number(limit));

    return {
      tasks: paginatedTasks,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit)),
      },
    };
  }

  const total = await Task.countDocuments(query);
  const tasks = await Task.find(query)
    .sort(sortObj)
    .skip((Number(page) - 1) * Number(limit))
    .limit(Number(limit));

  return {
    tasks,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit)),
    },
  };
};

export const getTaskById = async (taskId, userId) => {
  const task = await Task.findOne({ _id: taskId, createdBy: userId });
  if (!task) {
    throw new AppError("Task not found", 404);
  }
  return task;
};

export const updateTask = async (taskId, userId, updateData) => {
  const task = await Task.findOneAndUpdate(
    { _id: taskId, createdBy: userId },
    updateData,
    { new: true, runValidators: true }
  );
  if (!task) {
    throw new AppError("Task not found", 404);
  }
  return task;
};

export const deleteTask = async (taskId, userId) => {
  const task = await Task.findOneAndDelete({
    _id: taskId,
    createdBy: userId,
  });
  if (!task) {
    throw new AppError("Task not found", 404);
  }
  return task;
};

export const getTaskStats = async (userId) => {
  const [total, completed, pending] = await Promise.all([
    Task.countDocuments({ createdBy: userId }),
    Task.countDocuments({ createdBy: userId, status: "completed" }),
    Task.countDocuments({ createdBy: userId, status: "pending" }),
  ]);

  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return {
    total,
    completed,
    pending,
    completionRate,
  };
};
