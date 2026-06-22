"use client";

import { useRouter, useParams, usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import Link from "next/link";
import {
  LayoutDashboard,
  LogOut,
  Plus,
  Menu,
  X,
  History,
  Smile,
  HeartHandshake,
  MessageCircle,
} from "lucide-react";
import { useState, useEffect } from "react";
import useSWR from "swr";
import { useChatStore, selectSidebarRefresh } from "@/store/useChatStore";

const fetcher = (url: string) =>
  fetch(url, { credentials: "include" }).then((res) => res.json());

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const params = useParams();
  const currentSessionId = Array.isArray(params?.sessionId)
    ? params.sessionId[0]
    : undefined;

  const triggerRefresh = useChatStore(selectSidebarRefresh);
  const resetRefresh = useChatStore((state) => state.resetRefresh);
  const resetActiveChat = useChatStore((state) => state.resetActiveChat);

  const { data, mutate } = useSWR("/api/chat/sessions", fetcher, {
    refreshInterval: 4000,
    revalidateOnFocus: true,
  });

  const sessions = Array.isArray(data) ? data : [];

  useEffect(() => {
    if (triggerRefresh) {
      mutate();
      resetRefresh();
    }
  }, [triggerRefresh, mutate, resetRefresh]);

  const handleCreateNewChat = () => {
    resetActiveChat();
    router.push("/chat");
    setIsMobileDrawerOpen(false);
  };

  // Helper: active nav item style
  const navItemClass = (href: string) => {
    const isActive = pathname === href || (href !== "/chat" && pathname.startsWith(href));
    return `flex items-center gap-3 px-4 py-3 text-sm rounded-lg transition-colors ${
      isActive
        ? "bg-teal-600/15 text-teal-300 font-medium"
        : "hover:bg-slate-900 text-slate-400 hover:text-slate-200"
    }`;
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100 border-r border-slate-800">
      {/* Logo */}
      <div className="px-6 py-8 font-serif text-2xl font-semibold tracking-tighter border-b border-slate-800">
        🌿 MindBridge
      </div>

      {/* New Chat Button */}
      <div className="p-6">
        <button
          onClick={handleCreateNewChat}
          className="w-full flex items-center justify-center gap-3 bg-teal-600 hover:bg-teal-700 text-white py-3 px-4 rounded-lg transition-colors font-medium"
        >
          <Plus size={20} /> New Chat
        </button>
      </div>

      <nav
        className="flex-1 px-2 overflow-y-auto pb-6 sidebar-scroll"
        style={{ scrollbarColor: "#334155 transparent", scrollbarWidth: "thin" }}
      >
        {/* ── Primary Navigation ── */}
        <div className="px-1 mb-6">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3 px-3">
            Menu
          </div>
          <Link
            href="/dashboard"
            className={navItemClass("/dashboard")}
          >
            <LayoutDashboard size={18} /> Dashboard
          </Link>
          {/* <Link
            href="/chat"
            onClick={resetActiveChat}
            className={`flex items-center gap-3 px-4 py-3 text-sm rounded-lg transition-colors mt-0.5 ${
              pathname === "/chat" && !currentSessionId
                ? "bg-teal-600/15 text-teal-300 font-medium"
                : "hover:bg-slate-900 text-slate-400 hover:text-slate-200"
            }`}
          >
            <MessageCircle size={18} /> Chat
          </Link> */}
          <Link
            href="/mood"
            className={navItemClass("/mood")}
          >
            <Smile size={18} /> Mood Tracker
          </Link>
          <Link
            href="/support"
            className={navItemClass("/support")}
          >
            <HeartHandshake size={18} /> Support
          </Link>
        </div>

        {/* === TODAY SECTION === */}
        <div className="px-1 mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">
            <History size={14} /> Today
          </div>
          <div className="space-y-0.5 pr-2">
            {sessions
              .filter((s: any) => isToday(s.createdAt) || s.title === "New Chat")
              .map((s: any) => {
                const isActive = s.id === currentSessionId;
                return (
                  <Link
                    key={s.id}
                    href={`/chat/${s.id}`}
                    className={`block px-4 py-2.5 text-sm rounded-lg transition-colors truncate ${
                      isActive
                        ? "bg-teal-600/15 text-teal-300 font-medium"
                        : "text-slate-300 hover:text-slate-100 hover:bg-slate-900"
                    }`}
                  >
                    {s.title || "New Chat"}
                  </Link>
                );
              })}
          </div>
        </div>

        {/* === RECENT SECTION === */}
        <div className="px-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">
            <History size={14} /> Recent
          </div>
          <div className="space-y-0.5 pr-2">
            {sessions
              .filter((s: any) => !isToday(s.createdAt) && s.title !== "New Chat")
              .map((s: any) => {
                const isActive = s.id === currentSessionId;
                return (
                  <Link
                    key={s.id}
                    href={`/chat/${s.id}`}
                    className={`block px-4 py-2.5 text-sm rounded-lg transition-colors truncate ${
                      isActive
                        ? "bg-teal-600/15 text-teal-300 font-medium"
                        : "text-slate-300 hover:text-slate-100 hover:bg-slate-900"
                    }`}
                  >
                    {s.title || "Untitled Chat"}
                  </Link>
                );
              })}
          </div>
        </div>
      </nav>

      {/* Sign Out */}
      <div className="p-6 border-t border-slate-800 mt-auto">
        <button
          onClick={() => signOut()}
          className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-400 hover:bg-slate-900 hover:text-red-400 rounded-lg transition-colors"
        >
          <LogOut size={18} /> Sign out
        </button>
      </div>
    </div>
  );

  return (
    <div className="h-screen flex bg-slate-50 overflow-hidden">
      {/* Mobile Menu Trigger */}
      <button
        onClick={() => setIsMobileDrawerOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-white border border-slate-200 rounded-lg"
      >
        <Menu size={22} />
      </button>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 shrink-0 h-screen overflow-hidden">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer */}
      {isMobileDrawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="w-72 h-full bg-slate-950 relative">
            <button
              onClick={() => setIsMobileDrawerOpen(false)}
              className="absolute right-4 top-6 p-2 text-slate-400 hover:text-slate-200"
            >
              <X size={24} />
            </button>
            <SidebarContent />
          </div>
          <div
            className="flex-1 bg-black/60"
            onClick={() => setIsMobileDrawerOpen(false)}
          />
        </div>
      )}

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {children}
      </main>
    </div>
  );
}

/* Helper Functions */
const isToday = (date?: string): boolean => {
  if (!date) return false;
  const d = new Date(date);
  const now = new Date();
  return (
    d.getDate() === now.getDate() &&
    d.getMonth() === now.getMonth() &&
    d.getFullYear() === now.getFullYear()
  );
};
