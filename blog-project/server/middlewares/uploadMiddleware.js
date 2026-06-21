import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary.js";

const blogStorage = new CloudinaryStorage({
  cloudinary,
  params:async (req,file)=> {return{
    folder: "blog-app/blogs",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ width: 1200, height: 630, crop: "limit" }],
  }}
});

const profileStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "blog-app/profiles",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ width: 400, height: 400, crop: "fill", gravity: "face" }],
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

export const uploadBlogImage    = multer({ storage: blogStorage,    fileFilter, limits: { fileSize: 5 * 1024 * 1024 } }).single("image");
export const uploadProfileImage = multer({ storage: profileStorage, fileFilter, limits: { fileSize: 2 * 1024 * 1024 } }).single("profileImage");