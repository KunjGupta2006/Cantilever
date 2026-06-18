import {Router} from "express";
const blogRouter=Router();
import { createBlog, deleteBlog, getAllBlogs, getBlogById, updateBlog } from "../controllers/blogController.js"

blogRouter.get("/",getAllBlogs);
blogRouter.get("/:id",getBlogById);
blogRouter.post("/", createBlog); // TODO add middlewares auth + iscreator
blogRouter.put("/:id",updateBlog); //TODO add middlewares auth+ iscreator
blogRouter.delete("/:id",deleteBlog); // TODO add middlewares auth+ iscreator
export default blogRouter;