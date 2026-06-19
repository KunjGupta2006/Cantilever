import {Router} from "express";
const blogRouter=Router();
import { createBlog, deleteBlog, getAllBlogs, getBlogById, updateBlog } from "../controllers/blogController.js"
import { authorize, checkAuth } from "../middlewares/authMiddlewares.js";
import { validateBlog } from "../middlewares/validationMiddleware.js";

blogRouter.get("/",getAllBlogs);
blogRouter.get("/:id",getBlogById);
blogRouter.post("/",checkAuth, validateBlog ,createBlog);
blogRouter.put("/:id",checkAuth,authorize, validateBlog ,updateBlog);
blogRouter.delete("/:id",checkAuth,authorize,deleteBlog); 
export default blogRouter;
