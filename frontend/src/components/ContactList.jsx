import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import { useAuthStore } from "../store/useAuthStore";

function ContactList() {
  const { getAllContacts, allContacts, setSelectedUser, isUsersLoading, selectedUser } =
    useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  if (isUsersLoading) return <UsersLoadingSkeleton />;

  return (
    <div className="space-y-2">
      {allContacts.map((contact) => {
        const isOnline = onlineUsers.includes(contact._id);
        const isActive = selectedUser?._id === contact._id;

        return (
          <button
            key={contact._id}
            onClick={() => setSelectedUser(contact)}
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
                src={contact.profilePic || "/avatar.png"}
                alt={contact.fullName}
                className="w-11 h-11 rounded-full object-cover
                  ring-2 ring-cyan-500/20"
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
                {contact.fullName}
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
  );
}

export default ContactList;
