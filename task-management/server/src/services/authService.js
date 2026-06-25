import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";
import { AppError } from "../middleware/error.js";

export const registerUser = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError("Email already exists", 400);
  }

  const user = await User.create({ name, email, password });

  return {
    success: true,
    message: "User created successfully",
  };
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new AppError("Invalid email or password", 401);
  }

  const token = generateToken(user._id);

  return {
    success: true,
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
  };
};
