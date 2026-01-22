import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import NoChatsFound from "./NoChatsFound";
import { useAuthStore } from "../store/useAuthStore";
import { Sparkles } from "lucide-react"; // icon (recommended)
import { AI_USER } from "../constants/aiUser";
function ChatsList() {
  const {
    getMyChatPartners,
    chats,
    isUsersLoading,
    setSelectedUser,
    selectedUser,
  } = useChatStore();

  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getMyChatPartners();
  }, [getMyChatPartners]);

  if (isUsersLoading) return <UsersLoadingSkeleton />;
  if (chats.length === 0) return <NoChatsFound />;

  return (
    <div className="relative h-full">
      {/* CHAT LIST */}
      <div className="space-y-2 pb-24">
        {chats.map((chat) => {
          const isOnline = onlineUsers.includes(chat._id);
          const isActive = selectedUser?._id === chat._id;

          return (
            <button
              key={chat._id}
              onClick={() => setSelectedUser(chat)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl
                transition-all text-left
                ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-500/20 to-emerald-500/10 border border-cyan-500/20"
                    : "bg-slate-800/50 hover:bg-slate-700/50"
                }`}
            >
              {/* AVATAR */}
              <div className="relative shrink-0">
                <img
                  src={chat.profilePic || "/avatar.png"}
                  alt={chat.fullName}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-cyan-500/20"
                />

                {/* ONLINE DOT */}
                <span
                  className={`absolute bottom-0 right-0 w-3 h-3 rounded-full
                    border-2 border-slate-900
                    ${isOnline ? "bg-emerald-400" : "bg-slate-500"}`}
                />
              </div>

              {/* USER INFO */}
              <div className="min-w-0 flex-1">
                <h4 className="text-slate-200 font-medium truncate">
                  {chat.fullName}
                </h4>
                <p
                  className={`text-xs mt-0.5 ${
                    isOnline ? "text-emerald-400" : "text-slate-400"
                  }`}
                >
                  {isOnline ? "Online" : "Offline"}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* 🤖 AI FLOATING BUTTON */}
      <button
        onClick={() => {
          // later: open AI modal / navigate to AI chat
          setSelectedUser(AI_USER);
        }}
        className="
          fixed bottom-6 right-6 z-50
          w-14 h-14 rounded-full
          bg-gradient-to-br from-cyan-500 to-emerald-500
          shadow-lg shadow-cyan-500/30
          flex items-center justify-center
          hover:scale-105 active:scale-95
          transition-all
        "
        aria-label="AI Assistant"
      >
        <Sparkles className="w-6 h-6 text-slate-900" />
      </button>
    </div>
  );
}

export default ChatsList;
