import jwt from "jsonwebtoken"
import User from "../models/User.js"
import 'dotenv/config'
export const protectRoute=async(req,res,next)=>{
    try {
        const token= req.cookies.jwt;
        if(!token){
            return res.status(401).json({message:'Unauthorized- No token provided'});
        }

        const decodedToken=jwt.verify(token,process.env.JWT_SECRET);
        if(!decodedToken){
            return res.status(401).json('Not authorized- Invalid token');
        }

        const user= await User.findById(decodedToken.userId).select('-password'); 
        if(!user){
            return res.status(400).json({message:"User not found"});
        }
        req.user=user;
        next();

    } catch (error) {
        console.log("Error in protectRoute middleware", error.message);
        return res.status(500).json('Internal server error');
    }
}