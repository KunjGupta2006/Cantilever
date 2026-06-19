import { Router } from "express";
import { checkAuth } from "../middlewares/authMiddlewares.js";
import { uploadBlogImage, uploadProfileImage } from "../middlewares/uploadMiddleware.js";

const uploadRouter = Router();

uploadRouter.post("/blog", checkAuth, (req, res) => {
  uploadBlogImage(req, res, (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No image provided" });
    }
    res.status(200).json({
      success: true,
      url: req.file.path, // Cloudinary URL
    });
  });
});

uploadRouter.post("/profile", checkAuth, (req, res) => {
  uploadProfileImage(req, res, (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No image provided" });
    }
    res.status(200).json({
      success: true,
      url: req.file.path,
    });
  });
});

export default uploadRouter;