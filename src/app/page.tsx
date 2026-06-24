"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Brain, HeartPulse, ShieldCheck, X, Menu, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    if (id === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* ── Hero / Nav ─────────────────────────────────────────────── */}
      <div className="relative bg-[#1a0b2e] rounded-b-[3rem] md:rounded-b-[5rem] overflow-hidden">
        <div
          className="absolute inset-0 opacity-40 mix-blend-overlay"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2400&q=80')",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0b2e]/80 to-transparent" />

        <header className="relative z-40 w-full px-5 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-md flex items-center justify-center bg-purple-400">
                <Sparkles size={16} color="#1a0b2e" />
              </span>
              <span className="font-semibold text-lg tracking-tight text-white">
                MindBridge
              </span>
            </div>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8 bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/10">
              <a href="#" onClick={scrollTo("hero")} className="text-sm text-white/90 hover:text-white transition-colors cursor-pointer">Welcome</a>
              <a href="#about" onClick={scrollTo("about")} className="text-sm text-white/90 hover:text-white transition-colors cursor-pointer">About</a>
              <a href="#features" onClick={scrollTo("features")} className="text-sm text-white/90 hover:text-white transition-colors cursor-pointer">Features</a>
            </nav>

            <div className="hidden md:flex">
              <Link
                href="/login"
                className="px-5 py-2.5 text-sm font-medium rounded-full bg-[#10061e] text-white hover:bg-[#08030f] transition-all flex items-center gap-2"
              >
                Sign in <ArrowRight size={14} />
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 rounded-md text-white relative z-50"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              {/* Animated icon swap */}
              <span
                className="absolute inset-0 flex items-center justify-center transition-all duration-300"
                style={{
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? "rotate(0deg) scale(1)" : "rotate(-90deg) scale(0.5)",
                }}
              >
                <X size={24} />
              </span>
              <span
                className="flex items-center justify-center transition-all duration-300"
                style={{
                  opacity: menuOpen ? 0 : 1,
                  transform: menuOpen ? "rotate(90deg) scale(0.5)" : "rotate(0deg) scale(1)",
                }}
              >
                <Menu size={24} />
              </span>
            </button>
          </div>

          {/* ── Mobile drawer ──────────────────────────────────────── */}
          {/*
            We keep it in the DOM always and animate height + opacity
            so CSS transitions fire smoothly on both open and close.
          */}
          <div
            className="md:hidden absolute top-full left-0 w-full bg-[#1a0b2e]/95 backdrop-blur-md border-t border-white/10 overflow-hidden"
            style={{
              maxHeight: menuOpen ? "320px" : "0px",
              opacity: menuOpen ? 1 : 0,
              transition: "max-height 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease",
              pointerEvents: menuOpen ? "auto" : "none",
            }}
          >
            <div
              className="px-5 py-6 flex flex-col gap-5"
              style={{
                transform: menuOpen ? "translateY(0)" : "translateY(-12px)",
                transition: "transform 0.4s cubic-bezier(0.4,0,0.2,1)",
              }}
            >
              {["Welcome", "About", "Features"].map((item, i) => (
                <a
                  key={item}
                  href={item === "Welcome" ? "#" : `#${item.toLowerCase()}`}
                  className="text-sm text-white/90 hover:text-white transition-colors font-medium tracking-wide cursor-pointer"
                  onClick={scrollTo(item === "Welcome" ? "hero" : item.toLowerCase())}
                  style={{
                    opacity: menuOpen ? 1 : 0,
                    transform: menuOpen ? "translateX(0)" : "translateX(-16px)",
                    transition: `opacity 0.35s ease ${0.05 * i + 0.1}s, transform 0.35s ease ${0.05 * i + 0.1}s`,
                  }}
                >
                  {item}
                </a>
              ))}
              <Link
                href="/login"
                className="py-2.5 px-4 text-sm font-medium rounded-full bg-purple-500 hover:bg-purple-400 text-white text-center mt-1 transition-colors"
                style={{
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? "translateX(0)" : "translateX(-16px)",
                  transition: "opacity 0.35s ease 0.25s, transform 0.35s ease 0.25s",
                }}
                onClick={() => setMenuOpen(false)}
              >
                Sign in
              </Link>
            </div>
          </div>
        </header>

        {/* Hero text */}
        <section className="relative z-10 max-w-4xl mx-auto px-5 pt-20 pb-32 md:pt-32 md:pb-48 text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6 text-white">
            <span className="italic text-purple-400 font-serif pr-2">Feel heard.</span>
            <br />
            Get clarity.
          </h1>
          <p className="text-lg sm:text-xl max-w-xl mx-auto mb-10 leading-relaxed text-white/80">
            A private space to reflect, track your emotions, and understand yourself better — with an AI companion that listens.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-medium rounded-full bg-purple-400 text-[#1a0b2e] hover:bg-purple-300 transition-all shadow-md shadow-purple-500/20"
          >
            Start for free <ArrowRight size={16} />
          </Link>
        </section>
      </div>

      {/* ── About ─────────────────────────────────────────────────── */}
      <section id="about" className="max-w-7xl mx-auto px-5 py-16 -mt-12 md:-mt-20 relative z-20">
        <div className="grid md:grid-cols-2 rounded-3xl overflow-hidden shadow-md">
          <div
            className="relative p-10 md:p-16 flex flex-col justify-center min-h-[350px]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(26, 11, 46, 0.8), rgba(26, 11, 46, 0.8)), url('https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=1200&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">About Our AI</h2>
            <p className="text-white/80 leading-relaxed mb-6">
              MindBridge was created to provide a safe, judgement-free zone for personal reflection.
              Our empathetic AI model is designed to listen first, helping you spot patterns across
              days, weeks, and months without ever lecturing or diagnosing.
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-200 p-10 md:p-16 flex flex-col justify-center">
            <div className="grid grid-cols-2 gap-8 mb-10">
              {[
                { value: "24/7", label: "Availability" },
                { value: "100%", label: "Private & Secure" },
                { value: "0", label: "Judgement" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <div className="text-4xl font-bold text-[#1a0b2e] mb-1">{value}</div>
                  <div className="text-sm text-[#1a0b2e]/70 font-medium">{label}</div>
                </div>
              ))}
            </div>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 w-fit px-6 py-3 text-sm font-medium rounded-full bg-purple-500 text-white hover:bg-purple-600 transition-all shadow-md shadow-purple-500/20"
            >
              Get started <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Features ──────────────────────────────────────────────── */}
      <section id="features" className="max-w-7xl mx-auto px-5 py-16 md:py-24">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a0b2e]">AI Wellness Features</h2>
          <div className="hidden md:flex gap-2">
            <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-[#1a0b2e] hover:bg-purple-50 transition-colors bg-white">
              <ChevronLeft size={20} />
            </button>
            <button className="w-10 h-10 rounded-full flex items-center justify-center text-white bg-purple-500 hover:bg-purple-600 transition-colors shadow-sm shadow-purple-500/30">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Card 1 — Empathetic AI */}
          <FeatureCard
            icon={<Brain size={22} />}
            title="Empathetic AI"
            desc="Conversations that listen first. MindBridge reflects, never lectures or diagnoses."
            accentColor="#7c3aed"
            accentBg="#f3f0ff"
            illustration={<EmpathyIllustration />}
          />

          {/* Card 2 — Mood Tracking */}
          <FeatureCard
            icon={<HeartPulse size={22} />}
            title="Mood tracking"
            desc="Log how you feel daily. Spot patterns across days, weeks, and months."
            accentColor="#7c3aed"
            accentBg="#f3f0ff"
            illustration={<MoodIllustration />}
          />

          {/* Card 3 — Private by default */}
          <FeatureCard
            icon={<ShieldCheck size={22} />}
            title="Private by default"
            desc="Your reflections belong to you alone. Never shared, never sold."
            accentColor="#7c3aed"
            accentBg="#f3f0ff"
            illustration={<PrivacyIllustration />}
          />
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────── */}
      <footer className="bg-white border-t border-slate-100 mt-10">
        <div className="max-w-7xl mx-auto px-5 py-12 flex flex-col items-center">
          <p className="text-xs text-slate-400 mb-6 text-center max-w-xl leading-relaxed">
            MindBridge is not a substitute for professional mental health care.
            If you are in crisis, please contact a licensed professional immediately.
          </p>
          <div className="w-full flex flex-col md:flex-row items-center justify-between border-t border-slate-100 pt-6">
            <span className="text-sm text-slate-400 mb-4 md:mb-0">© 2026 MindBridge</span>
            <div className="flex items-center gap-6">
              {["Privacy Policy", "Terms of Service", "Contact"].map((link) => (
                <Link
                  key={link}
                  href={`/${link.toLowerCase().replace(/ /g, "-")}`}
                  className="text-sm text-slate-500 hover:text-[#1a0b2e] transition-colors"
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ─── Feature card component ──────────────────────────────────────────── */
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  accentColor: string;
  accentBg: string;
  illustration: React.ReactNode;
}

function FeatureCard({ icon, title, desc, accentColor, accentBg, illustration }: FeatureCardProps) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col">
      {/* Illustration area */}
      <div
        className="relative h-52 w-full flex items-center justify-center overflow-hidden"
        style={{ background: accentBg }}
      >
        {/* Decorative blobs */}
        <div
          className="absolute -top-6 -right-6 w-28 h-28 rounded-full opacity-20 transition-transform duration-500 group-hover:scale-125"
          style={{ background: accentColor }}
        />
        <div
          className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full opacity-10 transition-transform duration-500 group-hover:scale-110"
          style={{ background: accentColor }}
        />
        {/* Illustration */}
        <div className="relative z-10 w-40 h-40 transition-transform duration-500 group-hover:scale-105">
          {illustration}
        </div>
      </div>

      {/* Text */}
      <div className="p-6 flex flex-col flex-1">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300"
          style={{ background: accentBg, color: accentColor }}
        >
          {icon}
        </div>
        <h3 className="text-xl font-bold text-[#1a0b2e] mb-3">{title}</h3>
        <p className="text-slate-500 leading-relaxed text-sm flex-1">{desc}</p>
      </div>
    </div>
  );
}

/* ─── Custom SVG illustrations ─────────────────────────────────────────── */

/** Empathetic AI — person + speech bubbles */
function EmpathyIllustration() {
  return (
    <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Body */}
      <ellipse cx="80" cy="130" rx="32" ry="12" fill="#ddd6fe" opacity="0.5" />
      <rect x="60" y="88" width="40" height="40" rx="12" fill="#7c3aed" opacity="0.15" />
      {/* Head */}
      <circle cx="80" cy="72" r="22" fill="#7c3aed" opacity="0.2" />
      <circle cx="80" cy="72" r="16" fill="#7c3aed" opacity="0.35" />
      {/* Face */}
      <circle cx="74" cy="70" r="2.5" fill="#4c1d95" />
      <circle cx="86" cy="70" r="2.5" fill="#4c1d95" />
      <path d="M74 78 Q80 83 86 78" stroke="#4c1d95" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Left bubble */}
      <rect x="16" y="42" width="46" height="26" rx="10" fill="white" stroke="#ddd6fe" strokeWidth="1.5" />
      <path d="M38 68 L30 78 L44 68" fill="white" stroke="#ddd6fe" strokeWidth="1.5" strokeLinejoin="round" />
      <rect x="23" y="49" width="32" height="4" rx="2" fill="#c4b5fd" />
      <rect x="23" y="57" width="22" height="4" rx="2" fill="#e9d5ff" />
      {/* Right bubble */}
      <rect x="98" y="28" width="46" height="26" rx="10" fill="#7c3aed" />
      <path d="M106 54 L120 64 L118 54" fill="#7c3aed" />
      <rect x="105" y="35" width="32" height="4" rx="2" fill="white" opacity="0.9" />
      <rect x="105" y="43" width="20" height="4" rx="2" fill="white" opacity="0.6" />
    </svg>
  );
}

/** Mood tracking — waveform + emoji row */
function MoodIllustration() {
  const moods = [
    { cx: 28, emoji: "😔", fill: "#a78bfa" },
    { cx: 56, emoji: "😐", fill: "#8b5cf6" },
    { cx: 84, emoji: "🙂", fill: "#7c3aed" },
    { cx: 112, emoji: "😊", fill: "#6d28d9" },
    { cx: 140, emoji: "😄", fill: "#4c1d95" },
  ];

  return (
    <svg viewBox="0 0 168 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Card bg */}
      <rect x="12" y="10" width="144" height="140" rx="16" fill="white" stroke="#ddd6fe" strokeWidth="1.5" />
      {/* Title line */}
      <rect x="28" y="24" width="60" height="7" rx="3.5" fill="#c4b5fd" />
      <rect x="28" y="35" width="40" height="5" rx="2.5" fill="#ede9fe" />
      {/* Chart bars */}
      {[
        { x: 28, h: 28, y: 78 },
        { x: 52, h: 42, y: 64 },
        { x: 76, h: 20, y: 86 },
        { x: 100, h: 50, y: 56 },
        { x: 124, h: 34, y: 72 },
      ].map((bar, i) => (
        <rect
          key={i}
          x={bar.x}
          y={bar.y}
          width="18"
          height={bar.h}
          rx="5"
          fill="#7c3aed"
          opacity={0.25 + i * 0.15}
        />
      ))}
      {/* Trend line */}
      <polyline
        points="37,78 61,64 85,86 109,56 133,72"
        stroke="#7c3aed"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {[
        { cx: 37, cy: 78 },
        { cx: 61, cy: 64 },
        { cx: 85, cy: 86 },
        { cx: 109, cy: 56 },
        { cx: 133, cy: 72 },
      ].map((pt, i) => (
        <circle key={i} cx={pt.cx} cy={pt.cy} r="4" fill="#7c3aed" stroke="white" strokeWidth="2" />
      ))}
      {/* Emoji mood row */}
      {moods.map(({ cx, emoji }) => (
        <text key={cx} x={cx} y={138} textAnchor="middle" fontSize="16">
          {emoji}
        </text>
      ))}
    </svg>
  );
}

/** Privacy — shield with lock */
function PrivacyIllustration() {
  return (
    <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Glow ring */}
      <circle cx="80" cy="80" r="58" fill="#ede9fe" opacity="0.6" />
      <circle cx="80" cy="80" r="44" fill="#ddd6fe" opacity="0.5" />
      {/* Shield */}
      <path
        d="M80 28 L112 42 L112 76 C112 96 96 110 80 120 C64 110 48 96 48 76 L48 42 Z"
        fill="#7c3aed"
        opacity="0.18"
        stroke="#7c3aed"
        strokeWidth="2"
      />
      <path
        d="M80 36 L106 48 L106 76 C106 93 92 105 80 114 C68 105 54 93 54 76 L54 48 Z"
        fill="#7c3aed"
        opacity="0.3"
      />
      {/* Lock body */}
      <rect x="66" y="80" width="28" height="22" rx="5" fill="#4c1d95" />
      {/* Lock shackle */}
      <path
        d="M70 80 L70 73 A10 10 0 0 1 90 73 L90 80"
        stroke="#4c1d95"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      {/* Keyhole */}
      <circle cx="80" cy="89" r="4" fill="white" opacity="0.9" />
      <rect x="78" y="91" width="4" height="6" rx="1" fill="white" opacity="0.9" />
      {/* Sparkle dots */}
      <circle cx="44" cy="52" r="4" fill="#a78bfa" opacity="0.7" />
      <circle cx="116" cy="60" r="3" fill="#c4b5fd" opacity="0.8" />
      <circle cx="52" cy="112" r="3" fill="#a78bfa" opacity="0.5" />
      <circle cx="112" cy="108" r="4.5" fill="#c4b5fd" opacity="0.6" />
    </svg>
  );
}