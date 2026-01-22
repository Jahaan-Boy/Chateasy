import { XIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";

function ChatHeader() {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  let isOnline = onlineUsers.includes(selectedUser._id);
  console.log(selectedUser.fullName)
  if(selectedUser.fullName=="AI Assistant") isOnline=true;

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") setSelectedUser(null);
    };

    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [setSelectedUser]);

  return (
    <div
      className="flex items-center justify-between px-6 h-[84px]
        bg-slate-900/60 backdrop-blur-xl
        border-b border-cyan-500/10"
    >
      {/* USER INFO */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <img
            src={selectedUser.profilePic || "/avatar.png"}
            alt={selectedUser.fullName}
            className="w-12 h-12 rounded-full object-cover
              ring-2 ring-cyan-500/20"
          />

          {/* ONLINE INDICATOR */}
          <span
            className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-slate-900
              ${isOnline ? "bg-emerald-400" : "bg-slate-500"}`}
          />
        </div>

        <div>
          <h3 className="text-slate-100 font-semibold leading-tight">
            {selectedUser.fullName}
          </h3>
          <p
            className={`text-sm ${
              isOnline ? "text-emerald-400" : "text-slate-400"
            }`}
          >
            {isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      {/* CLOSE BUTTON */}
      <button
        onClick={() => setSelectedUser(null)}
        className="p-2 rounded-lg
          text-slate-400 hover:text-slate-200
          hover:bg-slate-800/60 transition"
        aria-label="Close chat"
      >
        <XIcon className="w-5 h-5" />
      </button>
    </div>
  );
}

export default ChatHeader;
