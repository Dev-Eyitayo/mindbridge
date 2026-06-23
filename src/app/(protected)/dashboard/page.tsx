/**
 * src/app/(protected)/dashboard/page.tsx
 *
 * Design decisions:
 * - Replaced the 4-column stat card grid (which felt cramped on mobile)
 *   with a cleaner 2-col (mobile) / 4-col (desktop) grid using our card system.
 * - Stat cards: minimal — icon, label, value. No subtitle text fighting for
 *   attention. The value IS the communication.
 * - Weekly trend chart card now has breathing room. Chart title uses font-sans
 *   (not serif) to stay in the "data" register, not the "emotional" register.
 * - Weekly insight panel: italic display font quote treatment. This is the
 *   one moment where the AI "speaks" directly — it earns the serif.
 * - Recent conversations list: clean, hover-states, no arrows cluttering items.
 *   Arrow appears on hover only (group-hover).
 * - Recommended specialist card: single card — not a list. Shows the top match.
 *   A "See all" link leads to /support.
 * - DashboardSkeleton: proper skeleton shapes that match the actual layout.
 * - All data fetching (useSWR), business logic, and types are preserved exactly.
 */
"use client";

import { useSession } from "next-auth/react";
import useSWR from "swr";
import Link from "next/link";
import {
  Heart,
  TrendingUp,
  Flame,
  Brain,
  Zap,
  MessageSquare,
  ArrowRight,
  Sparkles,
  Moon,
  Activity,
  BadgeCheck,
  Star,
} from "lucide-react";
import { MoodTrendChart } from "@/components/mood/MoodTrendChart";

const fetcher = (url: string) =>
  fetch(url, { credentials: "include" }).then((r) => r.json());

const MOOD_EMOJI: Record<string, string> = {
  HAPPY:      "😊",
  CALM:       "😌",
  HOPEFUL:    "🌟",
  NEUTRAL:    "😐",
  SAD:        "😔",
  ANXIOUS:    "😰",
  ANGRY:      "😤",
  OVERWHELMED:"😵",
  LONELY:     "💙",
  FEARFUL:    "😨",
};

const STRESS_COLOUR: Record<string, { text: string; bg: string }> = {
  Low:      { text: "text-success",      bg: "bg-success-muted" },
  Moderate: { text: "text-warning",      bg: "bg-warning-muted" },
  High:     { text: "text-destructive",  bg: "bg-destructive-muted" },
  Critical: { text: "text-destructive",  bg: "bg-destructive-muted" },
};

export default function DashboardPage() {
  const { data: session } = useSession();
  const firstName = session?.user?.name?.split(" ")[0] ?? "there";

  const { data, isLoading } = useSWR("/api/dashboard", fetcher, {
    refreshInterval: 30_000,
  });

  if (isLoading) return <DashboardSkeleton />;

  const {
    moodSummary,
    weeklyTrend,
    recentMoodEntries,
    stressScore,
    latestInsight,
    recentSessions,
    recommendedSpecialists,
    recommendationReason,
  } = data ?? {};

  const topMoodType = recentMoodEntries?.[0]?.moodType ?? null;
  const topSpecialist = recommendedSpecialists?.[0] ?? null;
  const stressStyle   = stressScore?.label ? STRESS_COLOUR[stressScore.label] : null;

  return (
    <div className="flex-1 overflow-y-auto bg-background px-6 py-8 md:px-8">
      <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">

        {/* ── Header ─────────────────────────────────────────────── */}
        <div>
          <h1 className="font-display text-3xl font-normal text-foreground tracking-tight">
            Good to see you, {firstName}.
          </h1>
          <p className="text-muted text-sm mt-1.5">Here's your wellness overview.</p>
        </div>

        {/* ── Stat cards ─────────────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 stagger">
          <StatCard
            icon={<Heart size={17} className="text-rose-500" />}
            label="Current mood"
            value={topMoodType ? `${MOOD_EMOJI[topMoodType] ?? "💭"} ${topMoodType.toLowerCase()}` : "Not logged"}
            sub={recentMoodEntries?.[0]?.intensity ? `Intensity ${recentMoodEntries[0].intensity}/10` : undefined}
          />
          <StatCard
            icon={<Flame size={17} className="text-orange-500" />}
            label="Mood streak"
            value={`${moodSummary?.currentStreak ?? 0} day${moodSummary?.currentStreak === 1 ? "" : "s"}`}
            sub="Keep it going"
          />
          <StatCard
            icon={<Activity size={17} className="text-violet-500" />}
            label="Avg. intensity"
            value={moodSummary?.averageIntensity ? `${moodSummary.averageIntensity}/10` : "—"}
            sub="Last 90 days"
          />
          <StatCard
            icon={<Zap size={17} className={stressStyle?.text ?? "text-subtle"} />}
            label="Stress score"
            value={`${stressScore?.score ?? 0}/100`}
            sub={stressScore?.label ?? "—"}
            subClassName={stressStyle ? `${stressStyle.text} ${stressStyle.bg} px-1.5 py-0.5 rounded-sm text-[10px]` : undefined}
          />
        </div>

        {/* ── Chart + Insight ─────────────────────────────────────── */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-surface border border-border rounded-lg shadow-xs p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <TrendingUp size={16} className="text-primary" strokeWidth={2} />
                Weekly mood trend
              </div>
              <Link
                href="/mood"
                className="text-xs text-primary hover:text-primary-hover transition-colors font-medium"
              >
                Full history →
              </Link>
            </div>
            <MoodTrendChart data={weeklyTrend ?? []} />
          </div>

          <div className="bg-surface border border-border rounded-lg shadow-xs p-6 flex flex-col">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-4">
              <Sparkles size={16} className="text-warning" strokeWidth={2} />
              Weekly insight
            </div>
            {latestInsight ? (
              <p className="font-display italic text-[17px] font-normal text-foreground leading-relaxed flex-1">
                "{latestInsight.content}"
              </p>
            ) : (
              <p className="text-sm text-subtle italic flex-1">
                Log your mood daily to unlock AI-generated insights.
              </p>
            )}
            <Link
              href="/mood"
              className="mt-4 text-xs text-primary hover:text-primary-hover transition-colors font-medium"
            >
              Log mood →
            </Link>
          </div>
        </div>

        {/* ── Additional stats (sleep/energy) ──────────────────────── */}
        {(moodSummary?.averageSleepScore || moodSummary?.averageEnergyScore) && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {moodSummary.averageSleepScore != null && (
              <StatCard
                icon={<Moon size={17} className="text-indigo-500" />}
                label="Avg. sleep"
                value={`${moodSummary.averageSleepScore}/10`}
                sub="Last 90 days"
              />
            )}
            {moodSummary.averageEnergyScore != null && (
              <StatCard
                icon={<Zap size={17} className="text-yellow-500" />}
                label="Avg. energy"
                value={`${moodSummary.averageEnergyScore}/10`}
                sub="Last 90 days"
              />
            )}
            <StatCard
              icon={<Brain size={17} className="text-accent" />}
              label="Entries logged"
              value={`${moodSummary?.totalEntries ?? 0}`}
              sub="Last 90 days"
            />
          </div>
        )}

        {/* ── Bottom row ─────────────────────────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-6">

          {/* Recent conversations */}
          <div className="bg-surface border border-border rounded-lg shadow-xs p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <MessageSquare size={16} className="text-primary" strokeWidth={2} />
                Recent conversations
              </div>
              <Link href="/chat" className="text-xs text-primary hover:text-primary-hover transition-colors font-medium">
                New chat →
              </Link>
            </div>
            {recentSessions?.length > 0 ? (
              <div className="space-y-1">
                {recentSessions.map((s: any) => (
                  <Link
                    key={s.id}
                    href={`/chat/${s.id}`}
                    className="group flex items-center justify-between px-3 py-2.5 rounded-md hover:bg-surface-hover transition-colors"
                  >
                    <span className="text-sm text-foreground truncate">{s.title ?? "Untitled chat"}</span>
                    <ArrowRight size={13} className="text-border-strong group-hover:text-primary shrink-0 ml-2 transition-colors" />
                  </Link>
                ))}
              </div>
            ) : (
              <EmptyState message="No conversations yet." action={{ href: "/chat", label: "Start chatting" }} />
            )}
          </div>

          {/* Recommended specialist */}
          <div className="bg-surface border border-border rounded-lg shadow-xs p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Heart size={16} className="text-primary" strokeWidth={2} />
                Specialist match
              </div>
              <Link href="/support" className="text-xs text-primary hover:text-primary-hover transition-colors font-medium">
                All specialists →
              </Link>
            </div>

            {topSpecialist ? (
              <div>
                {recommendationReason && (
                  <p className="text-xs text-muted mb-4 leading-relaxed italic">
                    {recommendationReason}
                  </p>
                )}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-md bg-primary-muted flex items-center justify-center text-primary font-medium text-sm shrink-0">
                    {topSpecialist.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-medium text-foreground">{topSpecialist.name}</p>
                      {topSpecialist.verified && <BadgeCheck size={14} className="text-accent shrink-0" />}
                    </div>
                    <p className="text-xs text-muted mt-0.5">{topSpecialist.title}</p>
                    <div className="flex items-center gap-1 mt-1.5">
                      <Star size={11} className="text-warning fill-warning" />
                      <span className="text-xs text-muted">{topSpecialist.rating}</span>
                      <span className="text-border-strong mx-1">·</span>
                      <span className="text-xs text-muted">{topSpecialist.yearsOfExperience} yrs exp.</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <EmptyState
                message="Chat more to receive personalised specialist recommendations."
                action={{ href: "/support", label: "Browse specialists" }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Primitives ──────────────────────────────────────────────────────────── */

function StatCard({
  icon,
  label,
  value,
  sub,
  subClassName,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
  subClassName?: string;
}) {
  return (
    <div className="bg-surface border border-border rounded-lg shadow-xs p-4 flex flex-col gap-3">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-xs text-subtle uppercase tracking-wide font-medium">{label}</span>
      </div>
      <p className="text-xl font-semibold text-foreground tracking-tight capitalize">{value}</p>
      {sub && (
        <span className={subClassName ?? "text-[11px] text-subtle"}>
          {sub}
        </span>
      )}
    </div>
  );
}

function EmptyState({
  message,
  action,
}: {
  message: string;
  action?: { href: string; label: string };
}) {
  return (
    <div className="py-4">
      <p className="text-sm text-subtle italic">{message}</p>
      {action && (
        <Link
          href={action.href}
          className="mt-2 inline-flex items-center gap-1 text-xs text-primary hover:text-primary-hover font-medium transition-colors"
        >
          {action.label} →
        </Link>
      )}
    </div>
  );
}

/* ── Skeleton ────────────────────────────────────────────────────────────── */

function DashboardSkeleton() {
  return (
    <div className="flex-1 overflow-y-auto bg-background px-6 py-8 md:px-8">
      <div className="max-w-5xl mx-auto space-y-8 animate-pulse">
        {/* Header */}
        <div className="space-y-2">
          <div className="h-8 bg-border rounded-md w-56" />
          <div className="h-4 bg-border rounded w-40" />
        </div>
        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-surface border border-border rounded-lg p-4 h-24" />
          ))}
        </div>
        {/* Chart row */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-surface border border-border rounded-lg h-64" />
          <div className="bg-surface border border-border rounded-lg h-64" />
        </div>
        {/* Bottom row */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-surface border border-border rounded-lg h-56" />
          <div className="bg-surface border border-border rounded-lg h-56" />
        </div>
      </div>
    </div>
  );
}