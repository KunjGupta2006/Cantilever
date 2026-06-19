import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";
import Blog from "../models/blogSchema.js";
import asyncHandler from "../utils/asyncHandler.js";

export const checkAuth = asyncHandler(
async(req,res,next)=>{

    const token = req.cookies.token;

    if(!token){

        return res.status(401).json({
            success:false,
            message:"Please login first"
        });

    }
    let decoded;
    try{
        decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        )
    } catch (err) {
        return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }

    const user = await User.findById(
        decoded.id
    ).select("-password");

    if(!user){

        return res.status(404).json({
            success:false,
            message:"User not found"
        });

    }

    req.user = user;

    next();

});



export const authorize = asyncHandler(
async(req,res,next)=>{

    const blog = await Blog.findById(
        req.params.id
    );

    if(!blog){

        return res.status(404).json({
            success:false,
            message:"Blog not found"
        });

    }

    if(
        blog.author.toString()
        !==
        req.user._id.toString()
    ){

        return res.status(403).json({
            success:false,
            message:"Unauthorized action"
        });

    }

    next();

});