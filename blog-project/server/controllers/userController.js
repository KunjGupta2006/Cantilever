import asyncHandler from "../utils/asyncHandler.js";
import User from  "../models/userSchema.js";
import Blog from "../models/blogSchema.js";


export const getAllAuthors = asyncHandler(async (req, res) => {
  const authors = await Blog.aggregate([
    {
      $group: {
        _id: "$author",
        blogCount: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: "users", // collection name in MongoDB
        localField: "_id",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: "$user", //convert array into single object
    },
    {
      $project: {
        _id: 1,
        blogCount: 1,
        "user.username": 1,
        "user.email": 1,
        "user.profileImage": 1,
      },
    },
  ]);

  res.status(200).json(authors);
});

export const usersignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Placeholder: replace with real signup logic
    return res.status(201).json({ message: "User signed up", user: { name, email } });
  } catch (error) {
    return res.status(500).json({ error: "Signup failed" });
  }
};

export const userlogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Placeholder: replace with real authentication logic
    return res.status(200).json({ message: "User logged in", user: { email } });
  } catch (error) {
    return res.status(500).json({ error: "Login failed" });
  }
};

export const userlogout = async (req, res) => {
  try {
    // Placeholder: replace with real logout logic
    return res.status(200).json({ message: "User logged out" });
  } catch (error) {
    return res.status(500).json({ error: "Logout failed" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const updates = req.body;
    // Placeholder: replace with real profile update logic
    return res.status(200).json({ message: "Profile updated", updates });
  } catch (error) {
    return res.status(500).json({ error: "Unable to update profile" });
  }
};

export const checkAuth = async (req, res) => {
  try {
    // Placeholder: replace with real auth check logic
    return res.status(200).json({ message: "Authenticated" });
  } catch (error) {
    return res.status(401).json({ error: "Not authenticated" });
  }
};
