import {Router} from "express";
import { checkAuth, getAllAuthors, updateProfile, userlogin, userlogout, usersignup } from "../controllers/userController.js";
const userRouter=Router();

userRouter.get("/",getAllAuthors);  //get only authors who have written something

userRouter.post("/signup",usersignup);
userRouter.post("/login",userlogin);
userRouter.post("/logout",userlogout);

userRouter.put("/update-profile",updateProfile);
userRouter.get("/check",checkAuth);

export default userRouter;