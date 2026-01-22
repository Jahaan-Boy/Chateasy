import User from '../models/User.js';
import bcrypt from 'bcrypt'
import { generateToken } from '../lib/utils.js';
import 'dotenv/config'
import { sendWelcomeEmail } from '../emails/emailHandler.js';
import cloudinary from '../lib/cloudinary.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

export const signup=asyncHandler(async(req,res)=>{
    const {fullName, email, password}= req.body;

        if(!email || !password || ! fullName){
            throw new ApiError(400,"All fields are required");
        }

        if(password.length < 6){
            throw new ApiError(400,"Password must be of atleast 6 characters");
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new ApiError(400,"Invalid email format");
        }

        const user= await User.findOne({email});
        if(user){
            throw new ApiError(409,"Email already exists");
        }

        const salt= await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(password, salt);
        const newUser=await User.create({
            fullName,
            email,
            password: hashedPassword,
            profilePic:""
        })
        
        if(newUser){
            const savedUser = await newUser.save();
            await generateToken(savedUser._id, res);
            
            res.status(201).json({
                _id: newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                profilePic: ""
            })

            try {
                await sendWelcomeEmail(savedUser.email,savedUser.fullName,process.env.CLIENT_URL)
            } catch (error) {
                console.log("Failed to send welcome email", error.message);
            }
        }
        else{
            throw new ApiError(400,"Invalid user data");
        }
})

export const login=asyncHandler(async(req,res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        throw new ApiError(400,"All fields are required");
    }
        const user=await User.findOne({email});
        if(!user){
            throw new ApiError(401,"Invalid credentials");
        }
    
        const isPasswordCorrect=await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            throw new ApiError(401,"Invalid credentials");
        }
    
        await generateToken(user._id,res);
        res.status(200).json({
            _id: user._id,
            fullName:user.fullName,
            email:user.email,
            profilePic:user.profilePic
        })
})

export const logout=async(req,res)=>{
    res.clearCookie("jwt","",{maxAge:0});
    res.status(200).json(new ApiResponse(200,{success:true},"Logout successful"))
}

export const updateProfile=asyncHandler(async(req, res)=>{
        const {profilePic}= req.body;
        if(!profilePic){
            throw new ApiError(400,"ProfilePic is required");
        }

        const userId=req.user._id;
        
        const uploadedProfilePic=await cloudinary.uploader.upload(profilePic);

        const updatedUser = await User.findByIdAndUpdate(userId,{ profilePic: uploadedProfilePic.secure_url },{ new: true });

        return res.status(200).json(new ApiResponse(200,updatedUser,"Profile updated successfully"));
})