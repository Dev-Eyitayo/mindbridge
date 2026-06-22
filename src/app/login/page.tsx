"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === "signup") {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Something went wrong during registration.");
        }
        
        toast.success("Account created successfully!");
      }

      const result = await signIn("credentials", {
        redirect: false,
        email: form.email,
        password: form.password,
      });

      if (result?.error) {
        throw new Error("Invalid email or password");
      }

      toast.success("Welcome back!");
      router.push("/dashboard");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      <div className="hidden lg:flex w-[420px] bg-gradient-to-br from-slate-900 to-slate-800 flex-col p-12 relative overflow-hidden">
        <div className="absolute w-[300px] h-[300px] bg-teal-500 rounded-full blur-[80px] opacity-20 -bottom-12 -right-20" />
        <div className="absolute w-[200px] h-[200px] bg-emerald-500 rounded-full blur-[80px] opacity-20 top-24 -left-16" />

        <div className="relative z-10 flex-1 flex flex-col">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-emerald-400 rounded-xl flex items-center justify-center text-xl shadow-md">🌿</div>
            <div className="font-serif text-2xl font-bold text-white">MindBridge<span className="text-teal-400">.</span></div>
          </div>

          <div className="mt-auto font-serif text-[22px] italic text-slate-300 leading-relaxed">
            "You don't have to control your thoughts. You just have to stop letting them control you."
            <div className="text-slate-500 text-sm mt-4 font-sans not-italic">— Dan Millman</div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-[460px] bg-white rounded-3xl p-10 shadow-sm border-1 border-slate-100">
          <h1 className="font-serif text-3xl font-bold text-slate-900 mb-2 tracking-tight">
            {mode === "login" ? "Welcome back" : "Create account"}
          </h1>
          <p className="text-slate-500 text-sm mb-8 font-sans">
            {mode === "login"
              ? "Sign in to your MindBridge account"
              : "Join our wellness community today"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-2 tracking-wide uppercase font-sans">First Name</label>
                  <input required name="firstName" value={form.firstName} onChange={handleChange} className="font-sans w-full p-3 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition-all text-sm text-slate-900 placeholder:text-slate-400" placeholder="Amara" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-2 tracking-wide uppercase font-sans">Last Name</label>
                  <input required name="lastName" value={form.lastName} onChange={handleChange} className="font-sans w-full p-3 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition-all text-sm text-slate-900 placeholder:text-slate-400" placeholder="Obi" />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-2 tracking-wide uppercase font-sans">Email Address</label>
              <input required type="email" name="email" value={form.email} onChange={handleChange} className="font-sans w-full p-3 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition-all text-sm text-slate-900 placeholder:text-slate-400" placeholder="you@example.com" />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-2 tracking-wide uppercase font-sans">Password</label>
              <input required type="password" name="password" value={form.password} onChange={handleChange} className="font-sans w-full p-3 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition-all text-sm text-slate-900 placeholder:text-slate-400" placeholder="••••••••" />
            </div>

            <button disabled={loading} type="submit" className="font-sans w-full p-4 mt-2 bg-slate-900 hover:bg-slate-800 rounded-lg text-white font-bold transition-all shadow-sm disabled:opacity-70">
              {loading ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account"}
            </button>
          </form>

          <div className="text-center mt-8 text-slate-500 text-sm font-sans">
            {mode === "login" ? (
              <>New here? <button onClick={() => setMode("signup")} className="text-teal-600 font-bold hover:underline">Create account</button></>
            ) : (
              <>Have an account? <button onClick={() => setMode("login")} className="text-teal-600 font-bold hover:underline">Sign in</button></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}