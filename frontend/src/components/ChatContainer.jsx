import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessageInput from "./MessageInput";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";
import AIChatContainer from "./AIChatContainer";

function ChatContainer() {
  const {
    selectedUser,
    getMessagesByUserId,
    messages,
    isMessagesLoading,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();

  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  // ✅ HOOKS MUST ALWAYS RUN
  useEffect(() => {
    if (!selectedUser || !authUser) return;
    if (selectedUser.isAI) return; // 🚫 skip human logic for AI

    let active = true;

    (async () => {
      await getMessagesByUserId(selectedUser._id);
      if (active) subscribeToMessages();
    })();

    return () => {
      active = false;
      unsubscribeFromMessages();
    };
  }, [selectedUser, authUser]);

  useEffect(() => {
    if (!selectedUser?.isAI) {
      messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, selectedUser]);

  // ✅ CONDITIONAL RENDER AFTER HOOKS
  if (selectedUser?.isAI) {
    return <AIChatContainer />;
  }

  return (
    <>
      <ChatHeader />

      <div className="flex-1 px-6 py-8 overflow-y-auto">
        {messages.map((msg) => {
  const isMe = String(msg.senderId) === String(authUser._id);

  return (
    <div
      key={msg._id}
      className={`chat ${isMe ? "chat-end" : "chat-start"}`}
    >
      <div
        className={`chat-bubble relative max-w-xs md:max-w-md ${
          isMe
            ? "bg-gradient-to-br from-cyan-500 to-emerald-500 text-white"
            : "bg-slate-800 text-slate-200"
        }`}
      >
        {/* 🖼️ IMAGE */}
        {msg.image && (
          <img
            src={msg.image}
            alt="Sent"
            className="rounded-lg mb-2 max-h-64 object-cover"
          />
        )}

        {/* 📝 TEXT */}
        {msg.text && <p>{msg.text}</p>}
      </div>
    </div>
  );
})}

      </div>

      <MessageInput />
    </>
  );
}

export default ChatContainer;
