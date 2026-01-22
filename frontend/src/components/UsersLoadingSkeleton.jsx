function UsersLoadingSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className="
            p-4 rounded-xl
            bg-slate-900/50 backdrop-blur-xl
            border border-cyan-500/10
            animate-pulse
          "
        >
          <div className="flex items-center gap-4">
            {/* AVATAR */}
            <div className="relative">
              <div className="w-11 h-11 rounded-full bg-slate-800" />
              <div className="absolute inset-0 rounded-full
                bg-gradient-to-br from-cyan-500/20 to-emerald-500/10" />
            </div>

            {/* TEXT */}
            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/4 rounded
                bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800" />
              <div className="h-3 w-1/2 rounded
                bg-gradient-to-r from-slate-800/80 via-slate-700/80 to-slate-800/80" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UsersLoadingSkeleton;
