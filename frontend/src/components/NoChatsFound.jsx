import { MessageCircleIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

function NoChatsFound() {
  const { setActiveTab } = useChatStore();

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center px-6">

      {/* ICON */}
      <div className="relative mb-5">
        <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-xl" />
        <div
          className="relative w-16 h-16 rounded-full
          bg-gradient-to-br from-cyan-500/20 to-emerald-500/10
          border border-cyan-500/20
          flex items-center justify-center"
        >
          <MessageCircleIcon className="w-8 h-8 text-cyan-400" />
        </div>
      </div>

      {/* TEXT */}
      <h4 className="text-lg font-semibold text-slate-100 mb-1">
        No conversations yet
      </h4>
      <p className="text-slate-400 text-sm max-w-sm mb-6">
        Start a new chat by selecting a contact from your contacts list.
      </p>

      {/* CTA */}
      <button
        onClick={() => setActiveTab("contacts")}
        className="
          px-5 py-2.5 text-sm font-medium rounded-xl
          bg-slate-800/60 border border-slate-700
          text-slate-300
          hover:text-cyan-400 hover:border-cyan-500/30
          hover:bg-slate-800/80
          transition-all
        "
      >
        Browse contacts
      </button>
    </div>
  );
}

export default NoChatsFound;
