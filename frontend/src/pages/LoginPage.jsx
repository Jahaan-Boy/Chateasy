import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { MessageCircleIcon, MailIcon, LoaderIcon, LockIcon } from "lucide-react";
import { Link } from "react-router";

function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="w-full flex items-center justify-center p-4">
      <div className="relative w-full max-w-6xl md:h-[800px] h-[650px]
        rounded-2xl overflow-hidden
        bg-slate-900/70 backdrop-blur-xl
        border border-cyan-500/20
        shadow-[0_0_80px_-20px_rgba(34,211,238,0.25)]">

        <div className="flex flex-col md:flex-row h-full">

          {/* LEFT — FORM */}
          <div className="md:w-1/2 p-10 flex items-center justify-center">
            <div className="w-full max-w-md">

              {/* HEADER */}
              <div className="text-center mb-10">
                <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center
                  rounded-xl bg-gradient-to-br from-cyan-500 to-emerald-500
                  text-slate-900 shadow-lg">
                  <MessageCircleIcon className="w-7 h-7" />
                </div>
                <h2 className="text-3xl font-bold text-slate-100 tracking-tight">
                  Welcome Back
                </h2>
                <p className="text-slate-400 mt-2">
                  Login to continue chatting
                </p>
              </div>

              {/* FORM */}
              <form onSubmit={handleSubmit} className="space-y-6">

                {/* EMAIL */}
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Email</label>
                  <div className="relative">
                    <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2
                      w-5 h-5 text-emerald-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="johndoe@gmail.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg
                        bg-slate-800/60 border border-slate-700
                        focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500
                        text-slate-200 outline-none transition"
                    />
                  </div>
                </div>

                {/* PASSWORD */}
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Password</label>
                  <div className="relative">
                    <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2
                      w-5 h-5 text-cyan-400" />
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg
                        bg-slate-800/60 border border-slate-700
                        focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500
                        text-slate-200 outline-none transition"
                    />
                  </div>
                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full py-3 rounded-lg font-semibold text-slate-900
                    bg-gradient-to-r from-cyan-400 to-emerald-400
                    hover:from-cyan-300 hover:to-emerald-300
                    transition-all disabled:opacity-60
                    flex items-center justify-center shadow-lg"
                >
                  {isLoggingIn ? (
                    <LoaderIcon className="w-5 h-5 animate-spin" />
                  ) : (
                    "Sign In"
                  )}
                </button>
              </form>

              {/* FOOTER */}
              <div className="mt-6 text-center">
                <Link
                  to="/signup"
                  className="text-cyan-400 hover:text-cyan-300 transition"
                >
                  Don't have an account? Sign Up
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT — ILLUSTRATION */}
          <div className="hidden md:flex md:w-1/2 items-center justify-center p-10
            bg-gradient-to-br from-slate-900/40 to-emerald-900/10
            border-l border-cyan-500/10">
            <div className="text-center">
              <img
                src="/login.png"
                alt="Login illustration"
                className="max-w-md mx-auto drop-shadow-xl"
              />
              <h3 className="mt-8 text-2xl font-semibold text-cyan-400">
                Connect Anytime
              </h3>
              <p className="text-slate-400 mt-2">
                Secure · Real-time · Private
              </p>

              <div className="mt-6 flex justify-center gap-3">
                <span className="px-3 py-1 rounded-full
                  bg-cyan-500/10 text-cyan-400 text-sm
                  border border-cyan-500/20">
                  Free
                </span>
                <span className="px-3 py-1 rounded-full
                  bg-emerald-500/10 text-emerald-400 text-sm
                  border border-emerald-500/20">
                  Private
                </span>
                <span className="px-3 py-1 rounded-full
                  bg-slate-500/10 text-slate-300 text-sm
                  border border-slate-500/20">
                  Fast
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default LoginPage;
