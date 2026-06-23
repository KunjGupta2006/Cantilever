import { Router } from "express";
import { checkAuth } from "../middlewares/authMiddlewares.js";
import { uploadBlogImage, uploadProfileImage } from "../middlewares/uploadMiddleware.js";

const uploadRouter = Router();

uploadRouter.post("/blog", checkAuth, (req, res, next) => {
  uploadBlogImage(req, res, (err) => {
    if (err) return next(err);
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No image provided" });
    }
    res.status(200).json({
      success: true,
      url: req.file.path,
    });
  });
});

uploadRouter.post("/profile", checkAuth, (req, res, next) => {
  uploadProfileImage(req, res, (err) => {
    if (err) return next(err);
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