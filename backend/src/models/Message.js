import mongoose, { Mongoose } from "mongoose";

const messageScema= new mongoose.Schema({
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    text:{
        type:String,
        trim: true,
        maxLength:2000
    },
    image:{
        type:String
    }

},{timestamps:true});

const Message= mongoose.model('Message',messageScema);

export default Message;