import {Router} from "express";
import { getAllAuthors, getUser, updateProfile, userlogin, userlogout, usersignup } from "../controllers/userController.js";
const userRouter=Router();
import {checkAuth} from "../middlewares/authMiddlewares.js"
userRouter.get("/",getAllAuthors);  //get only authors who have written something

userRouter.post("/signup",usersignup);
userRouter.post("/login",userlogin);
userRouter.post("/logout",userlogout);
userRouter.get("/me", checkAuth, getUser);
userRouter.put("/update-profile", checkAuth, updateProfile);

export default userRouter;