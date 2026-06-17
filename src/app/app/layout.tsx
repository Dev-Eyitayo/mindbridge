"use client";

import { useRouter } from 'next/navigation';
import { signOut } from "next-auth/react";
import Link from "next/link";
import { 
  LayoutDashboard, 
  LogOut, 
  Plus, 
  Menu, 
  X, 
  History 
} from "lucide-react";
import { useState } from "react";
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url, { credentials: 'include' }).then(res => res.json());

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const router = useRouter();
  const { data } = useSWR('/api/chat/sessions', fetcher, { refreshInterval: 5000 });
  const sessions = Array.isArray(data) ? data : [];

  const handleCreateNewChat = () => {
    router.push('/app');
    setIsMobileDrawerOpen(false);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-slate-900 text-slate-100 border-r border-slate-800">
      <div className="p-6 font-serif text-xl font-bold tracking-tight">🌿 MindBridge</div>
      
      <div className="p-4">
        <button 
          onClick={handleCreateNewChat}
          className="w-full flex items-center justify-center gap-2 bg-teal-600 text-white p-3 rounded-xl hover:bg-teal-700 transition-all shadow-lg shadow-teal-900/20"
        >
          <Plus size={20} /> New Chat
        </button>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-6 overflow-y-auto">
        {/* <Link href="/app" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-800 transition-colors">
          <LayoutDashboard size={18} /> Overview
        </Link> */}
        
        <div className="px-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
            <History size={12} /> Recent
          </div>
          <div className="space-y-1">
            {sessions.map((s: {id: string, title: string}) => (
              <Link key={s.id} href={`/app/${s.id}`} className="block px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg truncate transition-colors">
                {s.title || "Untitled Chat"}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button onClick={() => signOut()} className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all">
          <LogOut size={20} /> Sign out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Mobile Menu Trigger */}
      <button 
        onClick={() => setIsMobileDrawerOpen(true)} 
        className="lg:hidden fixed top-4 left-4 z-40 p-2 bg-slate-800 rounded-lg shadow-sm border border-slate-200"
      >
        <Menu size={20} />
      </button>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer */}
      {isMobileDrawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="w-72 h-full relative">
            <button onClick={() => setIsMobileDrawerOpen(false)} className="absolute right-4 top-6 p-2 z-10 text-slate-400"><X size={20} /></button>
            <SidebarContent />
          </div>
          <div className="flex-1 bg-slate-900/50 backdrop-blur-sm" onClick={() => setIsMobileDrawerOpen(false)} />
        </div>
      )}

      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {children}
      </main>
    </div>
  );
}