"use client";

import { useRouter, useParams, usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import {
  LayoutDashboard, MessageSquare, HeartPulse, Users,
  LogOut, Plus, Menu, X, Sparkles,
} from "lucide-react";
import { useState, useEffect } from "react";
import useSWR from "swr";
import { useChatStore, selectSidebarRefresh } from "@/store/useChatStore";

const fetcher = (url: string) => fetch(url, { credentials: "include" }).then((r) => r.json());

const NAV = [
  { href: "/dashboard",       label: "Overview",  icon: LayoutDashboard },
  { href: "/chat",      label: "Chat",      icon: MessageSquare   },
  { href: "/mood",      label: "Mood",      icon: HeartPulse      },
  { href: "/support",   label: "Support",   icon: Users           },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const router   = useRouter();
  const pathname = usePathname();
  const params   = useParams();
  const { data: session } = useSession();

  const currentSessionId = Array.isArray(params?.sessionId) ? params.sessionId[0] : undefined;
  const triggerRefresh   = useChatStore(selectSidebarRefresh);
  const resetRefresh     = useChatStore((s) => s.resetRefresh);
  const resetActiveChat  = useChatStore((s) => s.resetActiveChat);

  const { data, mutate } = useSWR("/api/chat/sessions", fetcher, {
    refreshInterval: 4000,
    revalidateOnFocus: true,
  });
  const sessions = Array.isArray(data) ? data : [];

  useEffect(() => {
    if (triggerRefresh) { mutate(); resetRefresh(); }
  }, [triggerRefresh, mutate, resetRefresh]);

  useEffect(() => { setOpen(false); }, [pathname]);

  const handleNewChat = () => {
    resetActiveChat();
    router.push("/chat");
    setOpen(false);
  };

  const firstName = session?.user?.name?.split(" ")[0] ?? "";
  const email     = session?.user?.email ?? "";
  const initials  = firstName?.[0]?.toUpperCase() ?? "?";

  const todaySessions   = sessions.filter((s: any) => isToday(s.createdAt));
  const recentSessions  = sessions.filter((s: any) => !isToday(s.createdAt));

  const SidebarInner = () => (
    <div className="flex flex-col h-full sidebar-scroll">

      {/* Logo */}
      <div
        className="flex items-center justify-between px-4 h-14 shrink-0"
        style={{ borderBottom: "1px solid var(--sidebar-border)" }}
      >
        <div className="flex items-center gap-2">
          <img 
            src="/logo.png" 
            alt="MindBridge Logo" 
            className="w-12 h-12 object-contain"
          />
          <span className="font-semibold text-[14px]" style={{ color: "var(--sidebar-text-active)" }}>
            MindBridge
          </span>
        </div>
        <button
          onClick={() => setOpen(false)}
          className="lg:hidden p-1 rounded"
          style={{ color: "var(--sidebar-text)" }}
          aria-label="Close sidebar"
        >
          <X size={16} />
        </button>
      </div>

      {/* New chat */}
      <div className="px-3 py-3 shrink-0">
        <button
          onClick={handleNewChat}
          className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors"
          style={{ background: "var(--sidebar-hover)", color: "var(--sidebar-text)" }}
          onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
          onMouseLeave={(e) => e.currentTarget.style.background = "var(--sidebar-hover)"}
        >
          <Plus size={15} strokeWidth={2} />
          New chat
        </button>
      </div>

      {/* Nav */}
      <nav
        className="px-3 pb-3 shrink-0"
        style={{ borderBottom: "1px solid var(--sidebar-border)" }}
      >
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = href === "/chat" ? pathname === "/chat" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm mb-0.5 transition-colors"
              style={{
                color:      active ? "var(--sidebar-text-active)" : "var(--sidebar-text)",
                background: active ? "var(--sidebar-active)" : "transparent",
                borderLeft: active ? "2px solid var(--sidebar-active-border)" : "2px solid transparent",
              }}
            >
              <Icon size={15} strokeWidth={1.75} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Chat history */}
      <div className="flex-1 overflow-y-auto px-3 py-3 sidebar-scroll">
        {todaySessions.length > 0 && (
          <div className="mb-4">
            <p className="px-3 mb-1.5 text-[10px] font-semibold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.2)" }}>
              Today
            </p>
            {todaySessions.map((s: any) => (
              <SessionItem key={s.id} s={s} active={s.id === currentSessionId} />
            ))}
          </div>
        )}
        {recentSessions.length > 0 && (
          <div>
            <p className="px-3 mb-1.5 text-[10px] font-semibold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.2)" }}>
              Previous
            </p>
            {recentSessions.map((s: any) => (
              <SessionItem key={s.id} s={s} active={s.id === currentSessionId} />
            ))}
          </div>
        )}
        {sessions.length === 0 && (
          <p className="px-3 text-xs italic" style={{ color: "rgba(255,255,255,0.2)" }}>
            No conversations yet.
          </p>
        )}
      </div>

      {/* User */}
      <div className="px-3 py-3 shrink-0" style={{ borderTop: "1px solid var(--sidebar-border)" }}>
        <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg mb-1">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold shrink-0"
            style={{ background: "var(--violet)", color: "white" }}
          >
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium truncate" style={{ color: "var(--sidebar-text-active)" }}>
              {firstName}
            </p>
            <p className="text-[11px] truncate" style={{ color: "rgba(255,255,255,0.25)" }}>
              {email}
            </p>
          </div>
        </div>
        <button
          onClick={() => signOut()}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition-colors"
          style={{ color: "rgba(255,255,255,0.3)" }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "#f87171"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.3)"; e.currentTarget.style.background = "transparent"; }}
        >
          <LogOut size={14} />
          Sign out
        </button>
      </div>
    </div>
  );

  return (
    <div className="h-screen flex overflow-hidden" style={{ background: "var(--bg-subtle)" }}>

      {/* Desktop sidebar */}
      <aside
        className="hidden lg:flex w-60 shrink-0 h-screen flex-col"
        style={{ background: "var(--sidebar-bg)" }}
      >
        <SidebarInner />
      </aside>

      {/* Mobile overlay */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="w-60 h-full flex flex-col"
            style={{ background: "var(--sidebar-bg)" }}
          >
            <SidebarInner />
          </div>
          <div
            className="flex-1 backdrop-blur-sm"
            style={{ background: "var(--overlay)" }}
            onClick={() => setOpen(false)}
          />
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile top bar */}
        <div
          className="lg:hidden flex items-center h-14 px-4 shrink-0"
          style={{ borderBottom: "1px solid var(--border)", background: "var(--bg)" }}
        >
          <button
            onClick={() => setOpen(true)}
            className="p-2 -ml-1 rounded-md transition-colors"
            style={{ color: "var(--text-secondary)" }}
            aria-label="Open sidebar"
          >
            <Menu size={18} />
          </button>
          <div className="flex items-center gap-1.5 ml-2">
            <span className="w-5 h-5 rounded flex items-center justify-center" style={{ background: "var(--violet)" }}>
              <Sparkles size={11} color="white" />
            </span>
            <span className="font-semibold text-sm tracking-tight" style={{ color: "var(--text-primary)" }}>
              MindBridge
            </span>
          </div>
        </div>

        <main className="flex-1 overflow-hidden flex flex-col">
          {children}
        </main>
      </div>
    </div>
  );
}

function SessionItem({ s, active }: { s: any; active: boolean }) {
  return (
    <Link
      href={`/chat/${s.id}`}
      className="block px-3 py-2 text-xs rounded-lg mb-0.5 truncate transition-colors"
      style={{
        color:      active ? "var(--sidebar-text-active)" : "var(--sidebar-text)",
        background: active ? "var(--sidebar-active)"      : "transparent",
      }}
      onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = "var(--sidebar-hover)"; }}
      onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = "transparent"; }}
    >
      {s.title || "Untitled chat"}
    </Link>
  );
}

const isToday = (date?: string): boolean => {
  if (!date) return false;
  const d = new Date(date), n = new Date();
  return d.getDate() === n.getDate() && d.getMonth() === n.getMonth() && d.getFullYear() === n.getFullYear();
};