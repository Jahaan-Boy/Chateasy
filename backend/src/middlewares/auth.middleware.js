import jwt from "jsonwebtoken"
import User from "../models/User.js"
import 'dotenv/config'
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"

export const protectRoute=asyncHandler(async(req,res,next)=>{
        const token= req.cookies.jwt;
        if(!token){
            throw new ApiError(401,'Unauthorized- No token provided');
        }

        const decodedToken=jwt.verify(token,process.env.JWT_SECRET);

        const user= await User.findById(decodedToken.userId).select('-password'); 
        if(!user){
            throw new ApiError(401,"User not found");
        }
        req.user=user;
        next();
})