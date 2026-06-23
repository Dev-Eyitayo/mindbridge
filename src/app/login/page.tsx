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
        if (!res.ok) throw new Error(data.error || "Something went wrong during registration.");
        toast.success("Account created.");
      }

      const result = await signIn("credentials", {
        redirect: false,
        email: form.email,
        password: form.password,
      });

      if (result?.error) throw new Error("Invalid email or password.");

      toast.success("Welcome back.");
      router.push("/chat");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-background">

      {/* ── Left panel ─────────────────────────────────────────────── */}
      <div
        className="hidden lg:flex w-[420px] shrink-0 flex-col justify-between p-12 relative overflow-hidden"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 10% 90%, #1e1b4b 0%, #0f0e17 100%)",
        }}
      >
        {/* Logo */}
        <div className="font-display text-xl font-normal text-white/90 tracking-tight">
          MindBridge
        </div>

        {/* Quote */}
        <div>
          <blockquote className="font-display text-[22px] font-normal italic text-white/70 leading-relaxed mb-5">
            "You don't have to control your thoughts. You just have to stop letting them control you."
          </blockquote>
          <cite className="text-white/35 text-sm font-sans not-italic tracking-wide">
            — Dan Millman
          </cite>
        </div>
      </div>

      {/* ── Right panel ────────────────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-[440px] animate-fade-in">

          {/* Mobile-only logo */}
          <div className="lg:hidden font-display text-2xl font-normal text-foreground mb-10 tracking-tight">
            MindBridge
          </div>

          <div className="mb-8">
            <h1 className="font-display text-[30px] font-normal text-foreground tracking-tight">
              {mode === "login" ? "Welcome back" : "Create account"}
            </h1>
            <p className="text-sm text-muted mt-1.5">
              {mode === "login"
                ? "Sign in to continue to MindBridge."
                : "Join the MindBridge community."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div className="grid grid-cols-2 gap-3">
                <Field label="First name">
                  <Input
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder="Amara"
                    required
                    autoComplete="given-name"
                  />
                </Field>
                <Field label="Last name">
                  <Input
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder="Obi"
                    required
                    autoComplete="family-name"
                  />
                </Field>
              </div>
            )}

            <Field label="Email address">
              <Input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                autoComplete="email"
              />
            </Field>

            <Field label="Password">
              <Input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                autoComplete={mode === "login" ? "current-password" : "new-password"}
              />
            </Field>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-2 bg-primary hover:bg-primary-hover text-primary-fg text-sm font-medium rounded-DEFAULT transition-colors duration-fast shadow-xs disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading
                ? "Please wait…"
                : mode === "login"
                ? "Sign in"
                : "Create account"}
            </button>
          </form>

          <p className="text-center mt-8 text-sm text-muted">
            {mode === "login" ? (
              <>
                New to MindBridge?{" "}
                <button
                  type="button"
                  onClick={() => setMode("signup")}
                  className="text-primary hover:text-primary-hover font-medium transition-colors"
                >
                  Create account
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className="text-primary hover:text-primary-hover font-medium transition-colors"
                >
                  Sign in
                </button>
              </>
            )}
          </p>

          <p className="text-center mt-6 text-xs text-subtle">
            By continuing, you agree to our{" "}
            <a href="/terms" className="underline hover:text-muted transition-colors">
              Terms
            </a>{" "}
            and{" "}
            <a href="/privacy" className="underline hover:text-muted transition-colors">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Primitives ──────────────────────────────────────────────────────────── */

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-medium text-muted tracking-wide">
        {label}
      </label>
      {children}
    </div>
  );
}

function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`
        w-full px-3.5 py-2.5 text-sm text-foreground
        bg-background-alt placeholder:text-subtle
        border border-border rounded-DEFAULT
        focus:bg-surface focus:border-border-focus focus:ring-4 focus:ring-primary/8
        outline-none transition-all duration-fast
        ${className ?? ""}
      `}
      {...props}
    />
  );
}