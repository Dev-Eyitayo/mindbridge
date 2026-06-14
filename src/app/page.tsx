import Link from 'next/link';
import { Sparkles, Brain, HeartPulse, ShieldCheck, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between">
        <div className="flex items-center gap-2 font-serif text-2xl font-bold">
          <span className="text-teal-600">🌿</span> MindBridge
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium hover:text-teal-600 transition-colors">Sign In</Link>
          <Link href="/login" className="px-5 py-2 bg-slate-900 text-white text-sm rounded-full font-medium hover:bg-slate-800 transition-all">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-4xl mx-auto px-6 pt-24 pb-32 text-center">
        <div className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-wide uppercase text-teal-700 bg-teal-50 rounded-full">
          Reflect. Grow. Heal.
        </div>
        <h1 className="text-6xl md:text-8xl font-serif font-bold text-slate-900 mb-8 tracking-tight">
          Your thoughts, <br />understood.
        </h1>
        <p className="text-xl text-slate-600 mb-12 max-w-lg mx-auto leading-relaxed">
          MindBridge provides a safe, non-judgmental space to reflect on your day 
          and gain clarity through empathetic AI conversation.
        </p>
        <Link 
          href="/login"
          className="inline-flex items-center gap-2 px-8 py-4 bg-teal-600 text-white rounded-full text-lg font-semibold hover:bg-teal-700 transition-all"
        >
          Start Reflecting <ArrowRight size={20} />
        </Link>
      </main>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-t border-slate-100">
        <div className="grid md:grid-cols-3 gap-16">
          <FeatureCard 
            icon={<Brain className="text-teal-600" />} 
            title="Empathetic AI" 
            desc="Conversations designed to listen, reflect, and guide you through complex emotions without judgment." 
          />
          <FeatureCard 
            icon={<HeartPulse className="text-teal-600" />} 
            title="Mood Tracking" 
            desc="Visualize your emotional trends over time with daily check-ins and actionable insights." 
          />
          <FeatureCard 
            icon={<ShieldCheck className="text-teal-600" />} 
            title="Private & Secure" 
            desc="Your reflections belong to you. Your data is encrypted, private, and strictly for your eyes." 
          />
        </div>
      </section>

      {/* Visually Distinct CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="bg-slate-900 rounded-[2rem] px-8 py-20 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Ready to find clarity?</h2>
          <p className="text-slate-400 mb-10 max-w-md mx-auto text-lg">Join thousands of others who use MindBridge to stay mindful every single day.</p>
          <Link 
            href="/login" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 rounded-full font-semibold hover:bg-teal-50 transition-all"
          >
            Create your free account
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-slate-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="flex items-center gap-2 font-serif text-xl font-bold">
            <span className="text-teal-500">🌿</span> MindBridge
          </div>
          <div className="flex flex-wrap gap-8 md:justify-end text-sm text-slate-500">
            <Link href="/privacy" className="hover:text-teal-600">Privacy</Link>
            <Link href="/terms" className="hover:text-teal-600">Terms</Link>
            <a href="mailto:support@mindbridge.ai" className="hover:text-teal-600">support@mindbridge.ai</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="space-y-4">
      <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{desc}</p>
    </div>
  );
}