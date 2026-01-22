import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { receiverId, text, image } = req.body;
    const senderId = req.user._id;

    // 🚫 BLOCK AI HERE
    if (receiverId === "ai") {
      return res.status(400).json({
        message: "AI messages must use /api/ai/chat",
      });
    }

    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return res.status(404).json({ message: "User not found" });
    }

    const message = await Message.create({
      senderId,
      receiverId,
      text,
      image,
    });

    res.status(201).json(message);
  } catch (error) {
    console.error("Error in sendMessage controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
