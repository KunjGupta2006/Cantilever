import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/userSchema.js";
import Blog from "../models/blogSchema.js";
import generateToken from "../utils/generateToken.js";

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
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: "$user",
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

export const usersignup = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields required",
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 6 characters",
    });
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "Email already exists",
    });
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  generateToken(res, user);

  return res.status(201).json({
    success: true,
    message: "User signed up successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
});

export const userlogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields required",
    });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  generateToken(res, user);

  res.status(200).json({
    success: true,
    message: "Login successful",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
});

export const userlogout = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const { username, profileImage } = req.body;

 const updates = {};
if (username) updates.username = username;
if (profileImage) updates.profileImage = profileImage;

const user = await User.findByIdAndUpdate(
  req.user._id, updates, { new: true, runValidators: true }
).select("-password");
});

// GET CURRENT LOGGED IN USER
export const getUser = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});