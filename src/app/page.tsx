"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Brain, HeartPulse, ShieldCheck, ArrowRight, Menu, X } from 'lucide-react';

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans overflow-x-hidden">
      {/* Navigation */}
      <nav className="w-full px-6 py-8 flex items-center justify-between z-50">
        <div className="flex items-center gap-2 font-serif text-2xl font-bold">
          <span className="text-teal-600 text-xl">🌿</span> MindBridge
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/login" className="text-sm font-semibold hover:text-teal-600 transition-colors">Sign In</Link>
          <Link href="/login" className="px-6 py-2.5 bg-slate-900 text-white text-sm rounded-full font-semibold hover:bg-slate-800 transition-all">
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2 z-50 relative" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Drawer Overlay */}
      <div className={`fixed inset-0 bg-white z-40 flex flex-col items-center justify-center gap-8 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <Link href="/login" className="text-2xl font-medium" onClick={() => setIsMenuOpen(false)}>Sign In</Link>
        <Link href="/login" className="px-8 py-4 bg-teal-600 text-white rounded-full text-lg font-medium" onClick={() => setIsMenuOpen(false)}>
          Get Started
        </Link>
      </div>

      {/* Hero Section */}
      <main className="w-full px-6 pt-16 md:pt-24 pb-20 text-center">
        <div className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase text-teal-700 bg-teal-50 rounded-full">
          Reflect. Grow. Heal.
        </div>
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-slate-900 mb-6 tracking-tight">
          Your thoughts, <br className="hidden md:block"/> understood.
        </h1>
        <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-lg mx-auto leading-relaxed px-2">
          MindBridge provides a safe, non-judgmental space to reflect on your day 
          and gain clarity through empathetic AI conversation.
        </p>
        <Link 
          href="/login"
          className="inline-flex items-center gap-2 px-8 py-4 bg-teal-600 text-white rounded-full text-base font-semibold hover:bg-teal-700 transition-all"
        >
          Get Started <ArrowRight size={18} />
        </Link>
      </main>

      {/* Features Grid */}
      <section className="w-full px-6 py-20 border-t border-slate-100">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
          <FeatureCard icon={<Brain size={24} className="text-teal-600" />} title="Empathetic AI" desc="Conversations designed to listen, reflect, and guide you through complex emotions." />
          <FeatureCard icon={<HeartPulse size={24} className="text-teal-600" />} title="Mood Tracking" desc="Visualize your emotional trends over time with daily check-ins." />
          <FeatureCard icon={<ShieldCheck size={24} className="text-teal-600" />} title="Private & Secure" desc="Your reflections belong to you. Your data is encrypted and strictly private." />
        </div>
      </section>
      
      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-6 py-12 border-t border-slate-100 text-sm text-slate-500 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>© 2026 MindBridge. All rights reserved.</div>
        <div className="flex gap-8">
          <Link href="/privacy" className="hover:text-teal-600">Privacy</Link>
          <Link href="/terms" className="hover:text-teal-600">Terms</Link>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="space-y-4 px-2">
      <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-slate-600 leading-relaxed text-base">{desc}</p>
    </div>
  );
}