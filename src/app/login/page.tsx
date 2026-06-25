"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Sparkles } from "lucide-react";

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

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
        if (!res.ok) throw new Error(data.error || "Registration failed.");
        toast.success("Account created.");
      }
      const result = await signIn("credentials", { redirect: false, email: form.email, password: form.password });
      if (result?.error) throw new Error("Invalid email or password.");
      toast.success("Welcome back.");
      router.push("/dashboard");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ background: "var(--bg)" }}>

      <div
        className="hidden lg:flex w-[420px] shrink-0 flex-col justify-between p-12"
        style={{ background: "var(--sidebar-bg)" }}
      >
        <Logo dark />

        <div>
          <p
            className="text-2xl font-semibold leading-snug mb-4 tracking-tight"
            style={{ color: "rgba(255,255,255,0.9)" }}
          >
            "The journey of a thousand miles begins with one step."
          </p>
          <span className="text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
            — Lao Tzu
          </span>
        </div>

        <p className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
          © 2026 MindBridge
        </p>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-[400px] fade-up">

          {/* Mobile logo */}
          <div className="lg:hidden mb-10">
            <Logo />
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-semibold tracking-tight mb-1.5" style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
              {mode === "login" ? "Welcome back" : "Create your account"}
            </h1>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              {mode === "login"
                ? "Sign in to continue to MindBridge."
                : "Start your wellness journey today."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            {mode === "signup" && (
              <div className="grid grid-cols-2 gap-3">
                <Field label="First name">
                  <Input name="firstName" value={form.firstName} onChange={handleChange} placeholder="Amara" required autoComplete="given-name" />
                </Field>
                <Field label="Last name">
                  <Input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Obi" required autoComplete="family-name" />
                </Field>
              </div>
            )}

            <Field label="Email">
              <Input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required autoComplete="email" />
            </Field>

            <Field label="Password">
              <Input type="password" name="password" value={form.password} onChange={handleChange} placeholder="••••••••" required autoComplete={mode === "login" ? "current-password" : "new-password"} />
            </Field>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 text-sm font-medium rounded-lg transition-all mt-1 disabled:opacity-50"
              style={{ background: "var(--violet)", color: "white" }}
            >
              {loading ? "Please wait…" : mode === "login" ? "Sign in" : "Create account"}
            </button>
          </form>

          <p className="text-center mt-6 text-sm" style={{ color: "var(--text-secondary)" }}>
            {mode === "login" ? (
              <>New here?{" "}
                <button type="button" onClick={() => setMode("signup")} className="font-medium underline underline-offset-2" style={{ color: "var(--violet)" }}>
                  Create account
                </button>
              </>
            ) : (
              <>Already have an account?{" "}
                <button type="button" onClick={() => setMode("login")} className="font-medium underline underline-offset-2" style={{ color: "var(--violet)" }}>
                  Sign in
                </button>
              </>
            )}
          </p>

          <p className="text-center mt-4 text-xs" style={{ color: "var(--text-tertiary)" }}>
            By continuing, you agree to our{" "}
            <a href="/" className="underline underline-offset-2">Terms</a> and{" "}
            <a href="/" className="underline underline-offset-2">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}

function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <img 
        src="/logo.png" 
        alt="MindBridge Logo" 
        className="w-12 h-12 object-contain"
      />
      <span className="font-semibold text-[14px]" style={{ color: "var(--sidebar-text-active)" }}>
        MindBridge
      </span>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
        {label}
      </label>
      {children}
    </div>
  );
}

function Input({ className = "", ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`w-full px-3 py-2.5 text-sm rounded-lg outline-none transition-all ${className}`}
      style={{
        background: "var(--bg-subtle)",
        border: "1px solid var(--border)",
        color: "var(--text-primary)",
      }}
      onFocus={(e) => {
        e.currentTarget.style.borderColor = "var(--violet)";
        e.currentTarget.style.boxShadow = "var(--shadow-violet)";
        e.currentTarget.style.background = "var(--bg)";
      }}
      onBlur={(e) => {
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.background = "var(--bg-subtle)";
      }}
      {...props}
    />
  );
}