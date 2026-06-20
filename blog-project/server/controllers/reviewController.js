import Blog from "../models/blogSchema.js";
import Review from "../models/reviewSchema.js";
import  asyncHandler from  "../utils/asyncHandler.js";


export const postReview = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return res.status(404).json({
      message: "Blog not found",
    });
  }
  if (!req.body.review) {
    return res.status(400).json({
      message: "Review data is required",
    });
  }

  const newReview = new Review(req.body.review);
  newReview.user = req.user._id;
  newReview.blog = blog._id;

  await newReview.save();

  blog.reviews.push(newReview._id);
  await blog.save();

  return res.status(201).json({
    message: "Review created successfully",
    review: newReview,
  });
});

export const destroyReview = asyncHandler(async (req, res) => {
  const { id, reviewId } = req.params;

  const review = await Review.findById(reviewId);

  if (!review) {
    return res.status(404).json({
      message: "Review not found",
    });
  }

  if (!review.blog.equals(id)) {
    return res.status(400).json({
      message: "Review does not belong to this blog",
    });
  }

  if (!review.user.equals(req.user._id)) {
    return res.status(403).json({
      message: "Forbidden",
    });
  }

  await Blog.findByIdAndUpdate(id, {
    $pull: { reviews: reviewId },
  });

  await Review.findByIdAndDelete(reviewId);

  return res.status(200).json({
    message: "Review deleted successfully",
  });
});