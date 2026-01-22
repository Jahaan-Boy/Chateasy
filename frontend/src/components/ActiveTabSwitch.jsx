import { useChatStore } from "../store/useChatStore";

function ActiveTabSwitch() {
  const { activeTab, setActiveTab } = useChatStore();

  return (
    <div className="relative mx-3 my-3 p-1 rounded-xl
      bg-slate-800/60 backdrop-blur-xl
      border border-cyan-500/10">

      {/* ACTIVE INDICATOR */}
      <div
        className={`absolute top-1 bottom-1 w-1/2 rounded-lg
          bg-gradient-to-r from-cyan-500/20 to-emerald-500/20
          transition-all duration-300 ease-out
          ${activeTab === "chats" ? "left-1" : "left-1/2"}`}
      />

      <div className="relative grid grid-cols-2 text-sm font-medium">
        <button
          onClick={() => setActiveTab("chats")}
          className={`py-2 rounded-lg z-10 transition-colors
            ${activeTab === "chats"
              ? "text-cyan-400"
              : "text-slate-400 hover:text-slate-200"}`}
        >
          Chats
        </button>

        <button
          onClick={() => setActiveTab("contacts")}
          className={`py-2 rounded-lg z-10 transition-colors
            ${activeTab === "contacts"
              ? "text-emerald-400"
              : "text-slate-400 hover:text-slate-200"}`}
        >
          Contacts
        </button>
      </div>
    </div>
  );
}

export default ActiveTabSwitch;
