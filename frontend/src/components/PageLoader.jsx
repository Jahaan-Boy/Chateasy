import { LoaderIcon } from "lucide-react";

function PageLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center
      bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950">

      {/* GLOW */}
      <div className="absolute w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl" />

      {/* LOADER */}
      <div className="relative flex flex-col items-center gap-4">
        <div className="p-4 rounded-full
          bg-slate-900/80 backdrop-blur-xl
          border border-cyan-500/20
          shadow-[0_0_40px_-10px_rgba(34,211,238,0.4)]">
          <LoaderIcon className="w-8 h-8 animate-spin text-cyan-400" />
        </div>

        <p className="text-sm text-slate-400 tracking-wide">
          Loading…
        </p>
      </div>
    </div>
  );
}

export default PageLoader;
