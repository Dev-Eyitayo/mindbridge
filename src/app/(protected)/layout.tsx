"use client";

import { useRouter, useParams } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import {
  LayoutDashboard,
  MessageSquare,
  HeartPulse,
  Users,
  LogOut,
  Plus,
  Menu,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";
import useSWR from "swr";
import { useChatStore, selectSidebarRefresh } from "@/store/useChatStore";

const fetcher = (url: string) =>
  fetch(url, { credentials: "include" }).then((r) => r.json());

const NAV_LINKS = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/chat",      label: "Chat",     icon: MessageSquare },
  { href: "/mood",      label: "Mood",     icon: HeartPulse },
  { href: "/support",   label: "Support",  icon: Users },
];

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const params = useParams();
  const currentSessionId = Array.isArray(params?.sessionId)
    ? params.sessionId[0]
    : undefined;

  const triggerRefresh = useChatStore(selectSidebarRefresh);
  const resetRefresh   = useChatStore((s) => s.resetRefresh);
  const resetActiveChat = useChatStore((s) => s.resetActiveChat);

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

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [params]);

  const handleNewChat = () => {
    resetActiveChat();
    router.push("/chat");
    setIsMobileOpen(false);
  };

  const firstName = session?.user?.name?.split(" ")[0] ?? "";
  const email     = session?.user?.email ?? "";

  return (
    <div className="h-screen flex overflow-hidden bg-background">

      {/* ── Desktop Sidebar ──────────────────────────────────────── */}
      <aside
        className="hidden lg:flex w-64 shrink-0 h-screen flex-col"
        style={{ background: "#0f0e13", borderRight: "1px solid rgba(255,255,255,0.06)" }}
      >
        <SidebarContent
          sessions={sessions}
          currentSessionId={currentSessionId}
          firstName={firstName}
          email={email}
          onNewChat={handleNewChat}
          onClose={() => {}}
        />
      </aside>

      {/* ── Mobile Drawer ────────────────────────────────────────── */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="w-64 h-full flex flex-col"
            style={{ background: "#0f0e13", borderRight: "1px solid rgba(255,255,255,0.06)" }}
          >
            <SidebarContent
              sessions={sessions}
              currentSessionId={currentSessionId}
              firstName={firstName}
              email={email}
              onNewChat={handleNewChat}
              onClose={() => setIsMobileOpen(false)}
              showCloseButton
            />
          </div>
          <div
            className="flex-1 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMobileOpen(false)}
          />
        </div>
      )}

      {/* ── Main content ─────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Mobile header bar */}
        <div
          className="lg:hidden flex items-center h-14 px-4 border-b shrink-0"
          style={{ borderColor: "var(--border)", background: "var(--surface)" }}
        >
          <button
            onClick={() => setIsMobileOpen(true)}
            className="p-2 rounded-md text-muted hover:text-foreground hover:bg-surface-hover transition-colors"
            aria-label="Open sidebar"
          >
            <Menu size={20} />
          </button>
          <span className="font-display text-lg font-normal text-foreground ml-3 tracking-tight">
            MindBridge
          </span>
        </div>

        <main className="flex-1 overflow-hidden flex flex-col">
          {children}
        </main>
      </div>
    </div>
  );
}

/* ── Sidebar Content ─────────────────────────────────────────────────────── */

interface SidebarContentProps {
  sessions: any[];
  currentSessionId?: string;
  firstName: string;
  email: string;
  onNewChat: () => void;
  onClose: () => void;
  showCloseButton?: boolean;
}

function SidebarContent({
  sessions,
  currentSessionId,
  firstName,
  email,
  onNewChat,
  onClose,
  showCloseButton,
}: SidebarContentProps) {
  const params = useParams();
  const pathname = typeof window !== "undefined" ? window.location.pathname : "";

  const todaySessions   = sessions.filter((s) => isToday(s.createdAt));
  const recentSessions  = sessions.filter((s) => !isToday(s.createdAt));

  return (
    <div className="flex flex-col h-full text-white/80">

      {/* Logo + close */}
      <div className="flex items-center justify-between px-5 h-16 shrink-0"
           style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <span className="font-display text-lg font-normal text-white/90 tracking-tight">
          MindBridge
        </span>
        {showCloseButton && (
          <button
            onClick={onClose}
            className="p-1.5 rounded text-white/40 hover:text-white/70 transition-colors"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* New chat */}
      <div className="px-3 py-4 shrink-0">
        <button
          onClick={onNewChat}
          className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium text-white/60 hover:text-white/90 rounded-md transition-colors duration-fast"
          style={{ background: "rgba(255,255,255,0.05)" }}
        >
          <Plus size={16} strokeWidth={2} />
          New chat
        </button>
      </div>

      {/* Main nav */}
      <nav className="px-3 pb-4 shrink-0"
           style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        {NAV_LINKS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors duration-fast mb-0.5
                ${isActive
                  ? "bg-white/8 text-white/95 font-medium"
                  : "text-white/50 hover:text-white/80 hover:bg-white/5"}
              `}
              style={isActive ? { borderLeft: "2px solid var(--primary)" } : {}}
            >
              <Icon size={16} strokeWidth={1.75} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Chat history */}
      <div
        className="flex-1 overflow-y-auto px-3 py-4 sidebar-scroll"
        style={{ scrollbarColor: "rgba(255,255,255,0.1) transparent" }}
      >
        {todaySessions.length > 0 && (
          <div className="mb-5">
            <p className="px-3 mb-2 text-[10px] font-medium uppercase tracking-widest text-white/25">
              Today
            </p>
            <div className="space-y-0.5">
              {todaySessions.map((s) => (
                <SessionLink
                  key={s.id}
                  session={s}
                  isActive={s.id === currentSessionId}
                  onClick={onClose}
                />
              ))}
            </div>
          </div>
        )}

        {recentSessions.length > 0 && (
          <div>
            <p className="px-3 mb-2 text-[10px] font-medium uppercase tracking-widest text-white/25">
              Previous
            </p>
            <div className="space-y-0.5">
              {recentSessions.map((s) => (
                <SessionLink
                  key={s.id}
                  session={s}
                  isActive={s.id === currentSessionId}
                  onClick={onClose}
                />
              ))}
            </div>
          </div>
        )}

        {sessions.length === 0 && (
          <p className="px-3 text-xs text-white/25 italic mt-2">
            No conversations yet.
          </p>
        )}
      </div>

      {/* User + Sign out */}
      <div
        className="px-3 py-4 shrink-0"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="flex items-center gap-3 px-3 py-2.5 mb-1">
          <div className="w-7 h-7 rounded-full bg-primary/30 flex items-center justify-center text-xs font-medium text-primary shrink-0">
            {firstName?.[0] ?? "?"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-white/80 truncate">{firstName}</p>
            <p className="text-[11px] text-white/35 truncate">{email}</p>
          </div>
        </div>
        <button
          onClick={() => signOut()}
          className="w-full flex items-center gap-3 px-3 py-2.5 text-xs text-white/35 hover:text-red-400 hover:bg-white/5 rounded-md transition-colors duration-fast"
        >
          <LogOut size={14} />
          Sign out
        </button>
      </div>
    </div>
  );
}

function SessionLink({
  session: s,
  isActive,
  onClick,
}: {
  session: any;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <Link
      href={`/chat/${s.id}`}
      onClick={onClick}
      className={`
        block px-3 py-2 text-sm rounded-md transition-colors duration-fast truncate
        ${isActive
          ? "bg-white/8 text-white/90 font-medium"
          : "text-white/40 hover:text-white/70 hover:bg-white/5"}
      `}
    >
      {s.title || "Untitled chat"}
    </Link>
  );
}

const isToday = (date?: string): boolean => {
  if (!date) return false;
  const d   = new Date(date);
  const now = new Date();
  return (
    d.getDate()     === now.getDate() &&
    d.getMonth()    === now.getMonth() &&
    d.getFullYear() === now.getFullYear()
  );
};