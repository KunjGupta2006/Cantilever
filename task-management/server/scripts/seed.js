import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../src/models/User.js";
import Task from "../src/models/Task.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/task-management";

const seedData = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected");

    await User.deleteMany({});
    await Task.deleteMany({});

    const user = await User.create({
      name: "Demo User",
      email: "demo@example.com",
      password: "password123",
    });

    console.log("Demo user created:", user.email);

    const tasks = [
      {
        title: "Complete project proposal",
        description: "Finish the proposal document for the new client project",
        status: "completed",
        priority: "high",
        dueDate: new Date("2026-07-01"),
        createdBy: user._id,
      },
      {
        title: "Review team updates",
        description: "Go through the weekly updates from the development team",
        status: "in-progress",
        priority: "medium",
        dueDate: new Date("2026-06-28"),
        createdBy: user._id,
      },
      {
        title: "Update website content",
        description: "Revise the homepage and about page content",
        status: "todo",
        priority: "low",
        dueDate: new Date("2026-07-05"),
        createdBy: user._id,
      },
      {
        title: "Fix login bug",
        description: "Users are reporting issues with the login flow on mobile devices",
        status: "completed",
        priority: "high",
        dueDate: new Date("2026-06-25"),
        createdBy: user._id,
      },
      {
        title: "Design new dashboard",
        description: "Create wireframes and mockups for the new analytics dashboard",
        status: "in-progress",
        priority: "medium",
        dueDate: new Date("2026-07-10"),
        createdBy: user._id,
      },
      {
        title: "Set up CI/CD pipeline",
        description: "Configure GitHub Actions for automated testing and deployment",
        status: "todo",
        priority: "high",
        dueDate: new Date("2026-06-30"),
        createdBy: user._id,
      },
      {
        title: "Write API documentation",
        description: "Document all REST API endpoints with request/response examples",
        status: "todo",
        priority: "low",
        dueDate: new Date("2026-07-15"),
        createdBy: user._id,
      },
      {
        title: "Refactor auth module",
        description: "Clean up and optimize the authentication middleware",
        status: "completed",
        priority: "medium",
        dueDate: new Date("2026-06-20"),
        createdBy: user._id,
      },
    ];

    await Task.insertMany(tasks);
    console.log(`${tasks.length} tasks created`);

    console.log("\nSeed data created successfully!");
    console.log("Login with: demo@example.com / password123");

    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }
};

seedData();
