"use client";

import { useRouter } from 'next/navigation'; // Add this
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { 
  LayoutDashboard, 
  LogOut, 
  Plus,
  Menu,
  ChevronLeft,
  X,
  History
} from "lucide-react";
import { useState } from "react";
import useSWR, { useSWRConfig } from 'swr';

const fetcher = (url: string) => 
  fetch(url, { credentials: 'include' }).then(res => res.json());

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const { mutate } = useSWRConfig();
  const router = useRouter();

  const { data } = useSWR('/api/chat/sessions', fetcher, {
    refreshInterval: 5000,
  });


  const sessions = Array.isArray(data) ? data : [];

  const handleCreateNewChat = () => {
    router.push('/dashboard/new');
    setIsMobileDrawerOpen(false);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white border-r border-slate-200">
      <div className="p-6 flex items-center gap-2 font-serif text-xl font-bold tracking-tight">
        🌿 MindBridge
      </div>

      <div className="p-4">
        <button 
          onClick={handleCreateNewChat}
          className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white p-3 rounded-xl hover:bg-slate-800 transition-all shadow-sm"
        >
          <Plus size={20} />
        </button>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-6 overflow-y-auto">
        <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100">
          <LayoutDashboard size={18} /> Overview
        </Link>
        
        <div className="px-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
            <History size={12} /> Recent Chats
          </div>
          <div className="space-y-1">
            {sessions.length > 0 ? (
              sessions.map((s: {id: string, title: string}) => (
                <Link 
                  key={s.id} 
                  href={`/dashboard/${s.id}`} 
                  className="block px-3 py-2 text-sm text-slate-600 hover:text-teal-600 hover:bg-slate-50 rounded-lg truncate transition-colors"
                >
                  {s.title || "Untitled Chat"}
                </Link>
              ))
            ) : (
              <p className="px-3 py-2 text-xs text-slate-400 italic">No recent chats</p>
            )}
          </div>
        </div>
      </nav>

      <div className="p-4 border-t border-slate-100">
        <button onClick={() => signOut()} className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-slate-600 hover:bg-red-50 hover:text-red-600 transition-all font-medium">
          <LogOut size={20} /> Sign out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex font-sans text-slate-900">
      <button onClick={() => setIsMobileDrawerOpen(true)} className="lg:hidden fixed top-4 left-4 z-40 p-2 bg-white rounded-lg shadow-sm border border-slate-200">
        <Menu size={20} />
      </button>

      <aside className={`hidden lg:block transition-all duration-300 ease-in-out ${isSidebarOpen ? "w-72" : "w-0"} overflow-hidden`}>
        <SidebarContent />
      </aside>

      {isMobileDrawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="w-72 bg-white shadow-2xl h-full relative">
            <button onClick={() => setIsMobileDrawerOpen(false)} className="absolute right-4 top-6 p-2"><X size={20} /></button>
            <SidebarContent />
          </div>
          <div className="flex-1 bg-slate-900/20 backdrop-blur-sm" onClick={() => setIsMobileDrawerOpen(false)} />
        </div>
      )}

      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className={`hidden lg:flex fixed top-6 z-40 p-1.5 bg-white border border-slate-200 rounded-md shadow-sm hover:bg-slate-50 transition-all ${isSidebarOpen ? "left-[270px]" : "left-4"}`}
      >
        <ChevronLeft className={`transition-transform ${!isSidebarOpen ? 'rotate-180' : ''}`} size={16} />
      </button>

      <main className="flex-1 flex flex-col h-screen overflow-hidden relative bg-slate-50">
        {children}
      </main>
    </div>
  );
}