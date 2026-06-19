import Blog from "../models/blogSchema.js";
import Review from "../models/reviewSchema.js";
import asyncHandler from "../utils/asyncHandler.js";

// GET ALL BLOGS
export const getAllBlogs = asyncHandler(async (req, res) => {
  const page    = Math.max(1, parseInt(req.query.page)  || 1);
  const limit   = Math.min(20, parseInt(req.query.limit) || 10);
  const skip    = (page - 1) * limit;
  const search  = req.query.search || "";
  const tag     = req.query.tag    || "";

  const filter = {};
  if (search) filter.title = { $regex: search, $options: "i" };
  if (tag)    filter.tags  = tag;

  const [blogs, total] = await Promise.all([
    Blog.find(filter)
      .populate("author", "username profileImage bio")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Blog.countDocuments(filter),
  ]);

  res.status(200).json({
    blogs,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page < Math.ceil(total / limit),
    },
  });
});

// GET BLOG BY ID
export const getBlogById = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id)
    .populate("author", "username profileImage bio")
    .populate({
      path: "reviews",
      populate: {
        path: "user",
        select: "username profileImage",
      },
    });

  if (!blog) {
    return res.status(404).json({
      message: "Blog not found",
    });
  }

  res.status(200).json(blog);
});

// CREATE BLOG
export const createBlog = asyncHandler(async (req, res) => {
  const { title, content, image, tags } = req.body;

  const blog = await Blog.create({
    title,
    content,
    image,
    tags,
    author: req.user._id,
  });

  res.status(201).json({
    message: "Blog created successfully",
    blog,
  });
});

// UPDATE BLOG
export const updateBlog = asyncHandler(async (req, res) => {
  const updatedBlog = await Blog.findOneAndUpdate(
    {
      _id: req.params.id,
      author: req.user._id, // ownership check here
    },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedBlog) {
    return res.status(404).json({
      message: "Blog not found or unauthorized",
    });
  }

  res.status(200).json({
    message: "Blog updated successfully",
    blog: updatedBlog,
  });
});

// DELETE BLOG
export const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return res.status(404).json({
      message: "Blog not found",
    });
  }

  await Review.deleteMany({ blog: blog._id });
  await Blog.findByIdAndDelete(blog._id);

  res.status(200).json({
    message: "Blog deleted successfully",
  });
});