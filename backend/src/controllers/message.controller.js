import cloudinary from "../lib/cloudinary.js";
import Message from "../models/Message.js"
import User from "../models/User.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const getAllContacts=asyncHandler(async(req, res)=>{
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

    res.status(200).json(new ApiResponse(200,filteredUsers,"Contacts fetched successfully"));
});

export const getMessageByUserId= asyncHandler(async(req,res)=>{
        const userId=req.user._id;
        const {id:chatUserId}=req.params;

        const messages= await Message.find({
            $or:[
                {senderId:userId, receiverId: chatUserId},
                {senderId:chatUserId, receiverId: userId}
            ]
        })

        res.status(200).json(new ApiResponse(200,messages,"Messages fetched successfully"));
})

export const sendMessage= asyncHandler(async(req,res)=>{
        const {text,image}= req.body;
        const senderId= req.user._id;
        const {id:receiverId} = req.params;
    
        if (!text && !image) {
          throw new ApiError(400,"Text or image is required.");
        }
        
        if (senderId.equals(receiverId)) {
          throw new ApiError(403,"Cannot send messages to yourself.");
        }
    
        const receiverExists = await User.exists({ _id: receiverId });
        if (!receiverExists) {
          throw new ApiError(404,"Receiver not found.");
        }
    
        let imageUrl;
        if(image){
            const uploadedImage=await cloudinary.uploader.upload(image);
            imageUrl=uploadedImage.secure_url;
        }
    
        const newMessage= await Message.create({
            senderId,
            receiverId,
            text,
            image:imageUrl
        });
    
        res.status(201).json(new ApiResponse(201,newMessage,"Message send successfully"));
})

export const getChatPartners=asyncHandler(async(req,res)=>{
    const loggedInUserId = req.user._id;

    const messages = await Message.find({
      $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }],
    });

    const chatPartnerIds = [
      ...new Set(
        messages.map((msg) =>
          msg.senderId.toString() === loggedInUserId.toString()
            ? msg.receiverId.toString()
            : msg.senderId.toString()
        )
      ),
    ];

    const chatPartners = await User.find({ _id: { $in: chatPartnerIds } }).select("-password");

    res.status(200).json(new ApiResponse(200,chatPartners),"All Chat partners fetched successfully");
})