import mongoose, { mongo } from 'mongoose'
import User from '../models/User.js';
import bcrypt from 'bcrypt'
import { generateToken } from '../lib/utils.js';
import 'dotenv/config'
import { sendWelcomeEmails } from '../emails/emailHandler.js';
export const signup=async(req,res)=>{
    const {fullName, email, password}= req.body;

    try {
        if(!email || !password || ! fullName){
            return res.status(400).json({message: "All fields are required"});
        }

        if(password.length < 6){
            return res.status(400).json({message:"Password must be of atleast 6 characters"})
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        const user= await User.findOne({email});
        if(user){
            return res.status(400).json({message:"Email already exists"})
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
                fullName:newUser.fullName,
                email:newUser.email,
                profilePic: ""
            })

            try {
                await sendWelcomeEmails(savedUser.email,savedUser.fullName,process.env.CLIENT_URL)
            } catch (error) {
                console.log("Failed to send welcome email", error.message);
            }
        }
        else{
            return res.status(400).json({message:"invalid user data"})
        }
    } catch (error) {
        console.log("Error in signup controller", error.message);
        return res.status(500).json({message:"Internal server error"});
    }
    
}