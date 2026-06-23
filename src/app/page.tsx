"use client";

import { useState } from "react";
import Link from "next/link";
import { Brain, HeartPulse, ShieldCheck, ArrowRight, Menu, X } from "lucide-react";

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden">

      {/* ── Navigation ─────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-display text-xl font-normal text-foreground tracking-tight">
            MindBridge
          </div>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/login"
              className="text-sm text-muted hover:text-foreground transition-colors duration-fast font-medium"
            >
              Sign in
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-fg text-sm font-medium rounded-DEFAULT hover:bg-primary-hover transition-colors duration-fast shadow-xs"
            >
              Get started
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-DEFAULT text-muted hover:text-foreground hover:bg-surface-hover transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile full-screen drawer */}
      <div
        className={`fixed inset-0 z-40 bg-surface flex flex-col items-center justify-center gap-8 transition-opacity duration-normal
          ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        <Link
          href="/login"
          className="text-2xl font-display text-foreground"
          onClick={() => setIsMenuOpen(false)}
        >
          Sign in
        </Link>
        <Link
          href="/login"
          className="px-8 py-4 bg-primary text-primary-fg text-lg font-medium rounded-DEFAULT"
          onClick={() => setIsMenuOpen(false)}
        >
          Get started
        </Link>
      </div>

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <main className="max-w-6xl mx-auto px-6 pt-24 pb-28 text-center">

        <p className="text-sm font-medium text-muted tracking-wide uppercase mb-6 font-sans">
          Mental wellness, reimagined
        </p>

        <h1 className="font-display text-5xl md:text-7xl font-normal text-foreground mb-8 tracking-tight leading-[1.05]">
          Your thoughts,<br className="hidden md:block" />{" "}
          <span className="italic text-muted">understood.</span>
        </h1>

        <p className="text-lg md:text-xl text-muted mb-12 max-w-[480px] mx-auto leading-relaxed">
          A private, non-judgmental space to reflect, track your emotions,
          and find clarity — powered by empathetic AI.
        </p>

        <Link
          href="/login"
          className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-primary text-primary-fg text-base font-medium rounded-DEFAULT hover:bg-primary-hover transition-colors duration-fast shadow-sm"
        >
          Start for free <ArrowRight size={16} strokeWidth={2} />
        </Link>

        <p className="mt-5 text-xs text-subtle">
          No credit card required · Completely private
        </p>
      </main>

      {/* ── Features ───────────────────────────────────────────────── */}
      <section className="border-t border-border">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-border">
            <FeatureCard
              icon={<Brain size={20} />}
              title="Empathetic AI"
              desc="Conversations designed to listen first. MindBridge reflects, never lectures."
            />
            <FeatureCard
              icon={<HeartPulse size={20} />}
              title="Mood tracking"
              desc="Log how you feel daily. Watch patterns emerge over days, weeks, and months."
            />
            <FeatureCard
              icon={<ShieldCheck size={20} />}
              title="Private by default"
              desc="Your reflections belong to you. Your data is encrypted and never shared."
            />
          </div>
        </div>
      </section>

      {/* ── Disclaimer ─────────────────────────────────────────────── */}
      <section className="border-t border-border bg-background-alt">
        <div className="max-w-3xl mx-auto px-6 py-10 text-center">
          <p className="text-sm text-subtle leading-relaxed">
            MindBridge supports self-reflection and emotional awareness.
            It is not a substitute for professional medical advice, diagnosis, or treatment.
            If you are in crisis, please reach out to a mental health professional immediately.
          </p>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <footer className="border-t border-border">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between text-xs text-subtle">
          <span>© 2026 MindBridge</span>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-muted transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-muted transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="px-8 py-10 first:pl-0 last:pr-0 md:first:pl-0 md:last:pr-0">
      <div className="text-primary mb-5">{icon}</div>
      <h3 className="font-display text-lg font-normal text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted leading-relaxed">{desc}</p>
    </div>
  );
}