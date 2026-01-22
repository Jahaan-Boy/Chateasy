import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { MessageCircleIcon, LockIcon, MailIcon, UserIcon, LoaderIcon } from "lucide-react";
import { Link } from "react-router";

function SignUpPage() {
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
  const { signup, isSigningUp } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 p-6 relative overflow-hidden">

      <div className="absolute -top-32 -left-32 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />

      <div className="relative w-full max-w-6xl rounded-2xl overflow-hidden border border-cyan-500/20 bg-slate-900/70 backdrop-blur-xl shadow-[0_0_80px_-20px_rgba(34,211,238,0.25)]">
        <div className="flex flex-col md:flex-row">

          <div className="md:w-1/2 p-10 flex items-center justify-center">
            <div className="w-full max-w-md">

              <div className="text-center mb-10">
                <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-emerald-500 text-slate-900 shadow-lg">
                  <MessageCircleIcon className="w-7 h-7" />
                </div>
                <h2 className="text-3xl font-bold text-slate-100 tracking-tight">
                  Create Account
                </h2>
                <p className="text-slate-400 mt-2">
                  Join the conversation in seconds
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">

                <div>
                  <label className="block text-sm text-slate-400 mb-1">Full Name</label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400" />
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="John Doe"
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-800/60 border border-slate-700 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-slate-200 outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-slate-400 mb-1">Email</label>
                  <div className="relative">
                    <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="johndoe@gmail.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-800/60 border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-slate-200 outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-slate-400 mb-1">Password</label>
                  <div className="relative">
                    <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400" />
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-800/60 border border-slate-700 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-slate-200 outline-none transition"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSigningUp}
                  className="w-full py-3 rounded-lg font-semibold text-slate-900 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 transition-all disabled:opacity-60 flex items-center justify-center shadow-lg"
                >
                  {isSigningUp ? (
                    <LoaderIcon className="w-5 h-5 animate-spin" />
                  ) : (
                    "Create Account"
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <Link to="/login" className="text-cyan-400 hover:text-cyan-300 transition">
                  Already have an account? Login
                </Link>
              </div>
            </div>
          </div>

          <div className="hidden md:flex md:w-1/2 items-center justify-center p-10 bg-gradient-to-br from-slate-900/40 to-emerald-900/10 border-l border-cyan-500/10">
            <div className="text-center">
              <img
                src="/signup.png"
                alt="Signup illustration"
                className="max-w-md mx-auto drop-shadow-xl"
              />
              <h3 className="mt-8 text-2xl font-semibold text-emerald-400">
                Start Your Journey
              </h3>
              <p className="text-slate-400 mt-2">
                Secure · Fast · Real-time messaging
              </p>

              <div className="mt-6 flex justify-center gap-3">
                <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-sm border border-cyan-500/20">
                  Free
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm border border-emerald-500/20">
                  Private
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-500/10 text-slate-300 text-sm border border-slate-500/20">
                  Realtime
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
