"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Brain, HeartPulse, ShieldCheck, X, Menu, Sparkles } from "lucide-react";

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)", color: "var(--text-primary)" }}>


      <header
        className="sticky top-0 z-40 w-full"
        style={{
          borderBottom: "1px solid var(--border)",
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className="w-6 h-6 rounded-md flex items-center justify-center"
              style={{ background: "var(--violet)" }}
            >
              <Sparkles size={13} color="white" />
            </span>
            <span className="font-semibold text-[15px] tracking-tight" style={{ color: "var(--text-primary)" }}>
              MindBridge
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/login"
              className="px-3 py-1.5 text-sm rounded-md transition-colors"
              style={{ color: "var(--text-secondary)" }}
            >
              Sign in
            </Link>
            <Link
              href="/login"
              className="px-3.5 py-1.5 text-sm font-medium rounded-md transition-all"
              style={{
                background: "var(--violet)",
                color: "white",
              }}
            >
              Get started
            </Link>
          </nav>

          <button
            className="md:hidden p-2 rounded-md"
            style={{ color: "var(--text-secondary)" }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <div
            className="md:hidden px-5 pb-4 pt-2 flex flex-col gap-2"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            <Link href="/login" className="py-2.5 text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
              Sign in
            </Link>
            <Link
              href="/login"
              className="py-2.5 px-4 text-sm font-medium rounded-md text-center"
              style={{ background: "var(--violet)", color: "white" }}
            >
              Get started
            </Link>
          </div>
        )}
      </header>


      <section className="max-w-5xl mx-auto px-5 pt-24 pb-20 text-center fade-up">
        <div
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium mb-8"
          style={{
            background: "var(--violet-light)",
            color: "var(--violet)",
            border: "1px solid var(--violet-subtle)",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--violet)" }} />
          AI-powered mental wellness
        </div>

        <h1
          className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight leading-[1.05] mb-6"
          style={{ color: "var(--text-primary)", letterSpacing: "-0.03em" }}
        >
          Feel heard.
          <br />
          <span style={{ color: "var(--violet)" }}>Get clarity.</span>
        </h1>

        <p
          className="text-lg sm:text-xl max-w-md mx-auto mb-10 leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          A private space to reflect, track your emotions, and understand yourself better — with an AI companion that listens.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg transition-all w-full sm:w-auto justify-center"
            style={{ background: "var(--violet)", color: "white", boxShadow: "0 1px 2px rgba(124,58,237,0.3)" }}
          >
            Start for free <ArrowRight size={15} />
          </Link>
          <p className="text-xs sm:ml-2" style={{ color: "var(--text-tertiary)" }}>
            No credit card required
          </p>
        </div>
      </section>


      <section style={{ borderTop: "1px solid var(--border)" }}>
        <div className="max-w-5xl mx-auto px-5 py-20">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Brain size={18} />,
                title: "Empathetic AI",
                desc: "Conversations that listen first. MindBridge reflects, never lectures or diagnoses.",
              },
              {
                icon: <HeartPulse size={18} />,
                title: "Mood tracking",
                desc: "Log how you feel daily. Spot patterns across days, weeks, and months.",
              },
              {
                icon: <ShieldCheck size={18} />,
                title: "Private by default",
                desc: "Your reflections belong to you alone. Never shared, never sold.",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="fade-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: "var(--violet-light)", color: "var(--violet)" }}
                >
                  {f.icon}
                </div>
                <h3 className="font-semibold text-[15px] mb-2" style={{ color: "var(--text-primary)" }}>
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section style={{ borderTop: "1px solid var(--border)", background: "var(--bg-subtle)" }}>
        <div className="max-w-3xl mx-auto px-5 py-8 text-center">
          <p className="text-xs leading-relaxed" style={{ color: "var(--text-tertiary)" }}>
            MindBridge is not a substitute for professional mental health care.
            If you are in crisis, please contact a licensed professional immediately.
          </p>
        </div>
      </section>


      <footer style={{ borderTop: "1px solid var(--border)" }}>
        <div className="max-w-6xl mx-auto px-5 h-12 flex items-center justify-between">
          <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>© 2026 MindBridge</span>
          <div className="flex items-center gap-5">
            {["Privacy", "Terms"].map((l) => (
              <Link
                key={l}
                href={`/${l.toLowerCase()}`}
                className="text-xs transition-colors"
                style={{ color: "var(--text-tertiary)" }}
              >
                {l}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}