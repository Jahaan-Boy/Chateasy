import { MessageCircleIcon } from "lucide-react";

const NoConversationPlaceholder = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-6">

      {/* ICON */}
      <div className="relative mb-6">
        <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-2xl" />
        <div
          className="relative w-20 h-20 rounded-full
          bg-gradient-to-br from-cyan-500/25 to-emerald-500/10
          border border-cyan-500/20
          flex items-center justify-center"
        >
          <MessageCircleIcon className="w-10 h-10 text-cyan-400" />
        </div>
      </div>

      {/* TITLE */}
      <h3 className="text-xl font-semibold text-slate-100 mb-2">
        Select a conversation
      </h3>

      {/* SUBTEXT */}
      <p className="text-slate-400 text-sm max-w-md leading-relaxed">
        Choose a contact from the sidebar to start chatting
        or continue an existing conversation.
      </p>

      {/* DIVIDER */}
      <div className="mt-6 h-px w-40
        bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
    </div>
  );
};

export default NoConversationPlaceholder;
