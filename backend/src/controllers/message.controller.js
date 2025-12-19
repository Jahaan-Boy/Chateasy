import cloudinary from "../lib/cloudinary.js";
import Message from "../models/Message.js"
import User from "../models/User.js"

export const getAllContacts = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in getAllContacts:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMessageByUserId= async(req,res)=>{
    try {
        
        const userId=req.user._id;
        const {id:chatUserId}=req.params;

        const messages= await Message.find({
            $or:[
                {senderId:userId, receiverId: chatUserId},
                {senderId:chatUserId, receiverId: userId}
            ]
        })

        res.status(200).json(messages);

    } catch (error) {
        console.log("Error in getMessages controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const sendMessage= async(req,res)=>{
    try {
        const {text,image}= req.body;
        const senderId= req.user._id;
        const {id:receiverId} = req.params;
    
        if (!text && !image) {
          return res.status(400).json({ message: "Text or image is required." });
        }
        
        if (senderId.equals(receiverId)) {
          return res.status(400).json({ message: "Cannot send messages to yourself." });
        }
    
        const receiverExists = await User.exists({ _id: receiverId });
        if (!receiverExists) {
          return res.status(404).json({ message: "Receiver not found." });
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
    
        await newMessage.save();
        res.send(newMessage)
    }catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const getChatPartners=async(req,res)=>{
    try {
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

    res.status(200).json(chatPartners);
  } catch (error) {
    console.error("Error in getChatPartners: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}