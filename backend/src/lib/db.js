import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config();
const MONGO_URI=process.env.MONGO_URI;
export const connectDb= async ()=>{

    try{
        if(!MONGO_URI) throw new Error("MONGO_URI is not set");
        const conn=await mongoose.connect(MONGO_URI);
        console.log("MongoDB connected: ", conn.connection.host);
    }
    catch(error){
        console.log("Error in connecting MongoDB", error.message);
        process.exit(1);
    }
}