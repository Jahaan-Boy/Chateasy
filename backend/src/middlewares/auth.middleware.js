import jwt from "jsonwebtoken"
import User from "../models/User.js"
import 'dotenv/config'
import { asyncHandler } from "../utils/asyncHandler.js"
export const protectRoute=asyncHandler(async(req,res,next)=>{
        const token= req.cookies.jwt;
        if(!token){
            return res.status(401).json({message:'Unauthorized- No token provided'});
        }

        const decodedToken=jwt.verify(token,process.env.JWT_SECRET);

        const user= await User.findById(decodedToken.userId).select('-password'); 
        if(!user){
            return res.status(400).json({message:"User not found"});
        }
        req.user=user;
        next();
})