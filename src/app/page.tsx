import Link from 'next/link';
import { Sparkles, Brain, HeartPulse, ShieldCheck, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans overflow-hidden">
      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5 font-serif text-3xl font-semibold tracking-tight">
          <span className="text-teal-600">🌿</span> MindBridge
        </div>
        <div className="flex items-center gap-6">
          <Link href="/login" className="text-sm font-medium hover:text-teal-600 transition-colors">
            Sign In
          </Link>
          <Link 
            href="/login" 
            className="px-6 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-full hover:bg-slate-800 transition-all active:scale-[0.985]"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-4xl mx-auto px-6 pt-20 pb-28 text-center">
        <div className="inline-flex items-center gap-2 px-5 py-1.5 mb-8 text-xs font-semibold tracking-[0.5px] uppercase text-teal-700 bg-teal-50 rounded-full border border-teal-100">
          <Sparkles size={16} /> Reflect. Grow. Heal.
        </div>

        <h1 className="text-6xl md:text-7xl font-serif font-semibold tracking-tighter text-slate-900 mb-8 leading-[1.05]">
          Your thoughts,<br />truly understood.
        </h1>

        <p className="text-xl text-slate-600 max-w-[520px] mx-auto leading-relaxed mb-12">
          A calm, private space for honest reflection. 
          Get empathetic guidance from AI that truly listens.
        </p>

        <Link 
          href="/login"
          className="inline-flex items-center gap-3 group px-8 py-4 bg-teal-600 text-white rounded-full text-lg font-semibold hover:bg-teal-700 transition-all active:scale-[0.985]"
        >
          Begin Your Journey
          <ArrowRight className="group-hover:translate-x-0.5 transition-transform" size={22} />
        </Link>
      </main>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-t border-slate-100">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-semibold tracking-tight mb-4">
            Designed for real growth
          </h2>
          <p className="text-slate-600 text-lg max-w-md mx-auto">
            Thoughtful tools that help you understand yourself better.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          <FeatureCard 
            icon={<Brain className="text-teal-600" size={28} />} 
            title="Deeply Empathetic AI" 
            desc="Conversations that feel human — reflective, non-judgmental, and emotionally intelligent." 
          />
          <FeatureCard 
            icon={<HeartPulse className="text-teal-600" size={28} />} 
            title="Mood & Pattern Insights" 
            desc="Track your emotional wellbeing over time with beautiful, private visualizations." 
          />
          <FeatureCard 
            icon={<ShieldCheck className="text-teal-600" size={28} />} 
            title="Private by Design" 
            desc="End-to-end encrypted. Your data is yours alone. No training, no sharing." 
          />
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-slate-900 rounded-3xl px-10 py-20 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(at_50%_30%,rgba(45,212,191,0.15),transparent)]" />
          
          <div className="relative">
            <h2 className="text-5xl font-serif font-semibold tracking-tighter mb-6">
              Ready to feel understood?
            </h2>
            <p className="text-slate-400 text-lg max-w-md mx-auto mb-10">
              Join thousands who’ve found clarity and calm with MindBridge.
            </p>
            <Link 
              href="/login" 
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-slate-900 rounded-2xl font-semibold hover:bg-teal-50 transition-all active:scale-[0.985]"
            >
              Create your free account
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 py-16 border-t border-slate-100">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2.5 font-serif text-2xl font-semibold tracking-tight">
            <span className="text-teal-600">🌿</span> MindBridge
          </div>
          
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-slate-500">
            <Link href="/privacy" className="hover:text-teal-600 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-teal-600 transition-colors">Terms</Link>
            <a href="mailto:support@mindbridge.ai" className="hover:text-teal-600 transition-colors">
              support@mindbridge.ai
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ 
  icon, 
  title, 
  desc 
}: { 
  icon: React.ReactNode; 
  title: string; 
  desc: string; 
}) {
  return (
    <div className="group p-8 rounded-3xl border border-slate-100 hover:border-teal-100 transition-all hover:shadow-sm">
      <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-105 transition-transform">
        {icon}
      </div>
      <h3 className="text-2xl font-semibold tracking-tight mb-4">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{desc}</p>
    </div>
  );
}