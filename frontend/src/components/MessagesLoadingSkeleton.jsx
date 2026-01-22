function MessagesLoadingSkeleton() {
  const widths = ["w-40", "w-64", "w-52", "w-72", "w-48"];

  return (
    <div className="max-w-3xl mx-auto space-y-6 px-2">
      {[...Array(7)].map((_, index) => {
        const isMe = index % 2 !== 0;

        return (
          <div
            key={index}
            className={`chat ${isMe ? "chat-end" : "chat-start"}`}
          >
            <div
              className={`
                ${widths[index % widths.length]}
                h-10 rounded-2xl
                animate-pulse
                ${
                  isMe
                    ? "bg-gradient-to-br from-cyan-500/20 to-emerald-500/20"
                    : "bg-slate-800/60"
                }
                border border-cyan-500/10
              `}
            />
          </div>
        );
      })}
    </div>
  );
}

export default MessagesLoadingSkeleton;
