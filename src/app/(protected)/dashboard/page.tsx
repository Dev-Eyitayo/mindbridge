"use client";

import { useSession } from "next-auth/react";
import useSWR from "swr";
import Link from "next/link";
import {
  Heart, TrendingUp, Flame, Brain, Zap,
  MessageSquare, ArrowRight, Sparkles, Moon, Activity,
  BadgeCheck, Star,
} from "lucide-react";
import { MoodTrendChart } from "@/components/mood/MoodTrendChart";

const fetcher = (url: string) => fetch(url, { credentials: "include" }).then((r) => r.json());

const MOOD_EMOJI: Record<string, string> = {
  HAPPY: "😊", CALM: "😌", HOPEFUL: "🌟", NEUTRAL: "😐",
  SAD: "😔", ANXIOUS: "😰", ANGRY: "😤", OVERWHELMED: "😵",
  LONELY: "💙", FEARFUL: "😨",
};

const STRESS: Record<string, { text: string; bg: string }> = {
  Low:      { text: "#16a34a", bg: "#f0fdf4" },
  Moderate: { text: "#d97706", bg: "#fffbeb" },
  High:     { text: "#dc2626", bg: "#fef2f2" },
  Critical: { text: "#dc2626", bg: "#fef2f2" },
};

export default function DashboardPage() {
  const { data: session } = useSession();
  const firstName = session?.user?.name?.split(" ")[0] ?? "there";

  const { data, isLoading } = useSWR("/api/dashboard", fetcher, { refreshInterval: 30_000 });

  if (isLoading) return <DashboardSkeleton />;

  const {
    moodSummary, weeklyTrend, recentMoodEntries, stressScore,
    latestInsight, recentSessions, recommendedSpecialists, recommendationReason,
  } = data ?? {};

  const topMood  = recentMoodEntries?.[0]?.moodType ?? null;
  const topSp    = recommendedSpecialists?.[0] ?? null;
  const stressStyle = stressScore?.label ? STRESS[stressScore.label] : null;

  return (
    <div
      className="flex-1 overflow-y-auto scroll-thin px-5 py-7 sm:px-7 sm:py-8"
      style={{ background: "var(--bg-subtle)" }}
    >
      <div className="max-w-5xl mx-auto space-y-7 fade-up">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold tracking-tight" style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
            Good to see you, {firstName}.
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
            Here's your wellness overview.
          </p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <StatCard icon={<Heart size={16} />} iconColor="#ef4444" label="Current mood"
            value={topMood ? `${MOOD_EMOJI[topMood] ?? "💭"} ${topMood.toLowerCase()}` : "Not logged"}
            sub={recentMoodEntries?.[0]?.intensity ? `Intensity ${recentMoodEntries[0].intensity}/10` : "No logs yet"}
          />
          <StatCard icon={<Flame size={16} />} iconColor="#f97316" label="Mood streak"
            value={`${moodSummary?.currentStreak ?? 0} day${moodSummary?.currentStreak === 1 ? "" : "s"}`}
            sub="Keep it going"
          />
          <StatCard icon={<Activity size={16} />} iconColor="#8b5cf6" label="Avg. intensity"
            value={moodSummary?.averageIntensity ? `${moodSummary.averageIntensity}/10` : "—"}
            sub="Last 90 days"
          />
          <StatCard icon={<Zap size={16} />} iconColor={stressStyle?.text ?? "var(--text-tertiary)"}
            label="Stress score"
            value={`${stressScore?.score ?? 0}/100`}
            sub={stressScore?.label ?? "—"}
            subStyle={stressStyle ? { color: stressStyle.text, background: stressStyle.bg, padding: "1px 6px", borderRadius: 4, fontSize: 11 } : undefined}
          />
        </div>

        {/* Chart + Insight */}
        <div className="grid lg:grid-cols-3 gap-5">
          <Card className="lg:col-span-2 p-5">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2 text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                <TrendingUp size={15} style={{ color: "var(--violet)" }} />
                Weekly mood trend
              </div>
              <Link href="/mood" className="text-xs font-medium" style={{ color: "var(--violet)" }}>
                Full history →
              </Link>
            </div>
            <MoodTrendChart data={weeklyTrend ?? []} />
          </Card>

          <Card className="p-5 flex flex-col">
            <div className="flex items-center gap-2 text-sm font-medium mb-4" style={{ color: "var(--text-primary)" }}>
              <Sparkles size={15} style={{ color: "#f59e0b" }} />
              Weekly insight
            </div>
            {latestInsight ? (
              <p className="text-[15px] leading-relaxed flex-1" style={{ color: "var(--text-primary)", fontStyle: "italic" }}>
                "{latestInsight.content}"
              </p>
            ) : (
              <p className="text-sm flex-1 italic" style={{ color: "var(--text-tertiary)" }}>
                Log your mood daily to unlock AI-generated insights.
              </p>
            )}
            <Link href="/mood" className="mt-4 text-xs font-medium" style={{ color: "var(--violet)" }}>
              Log mood →
            </Link>
          </Card>
        </div>

        {/* Extra stats */}
        {(moodSummary?.averageSleepScore || moodSummary?.averageEnergyScore) && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {moodSummary.averageSleepScore != null && (
              <StatCard icon={<Moon size={16} />} iconColor="#6366f1" label="Avg. sleep"
                value={`${moodSummary.averageSleepScore}/10`} sub="Last 90 days" />
            )}
            {moodSummary.averageEnergyScore != null && (
              <StatCard icon={<Zap size={16} />} iconColor="#eab308" label="Avg. energy"
                value={`${moodSummary.averageEnergyScore}/10`} sub="Last 90 days" />
            )}
            <StatCard icon={<Brain size={16} />} iconColor="var(--cyan)" label="Entries logged"
              value={`${moodSummary?.totalEntries ?? 0}`} sub="Last 90 days" />
          </div>
        )}

        {/* Bottom row */}
        <div className="grid lg:grid-cols-2 gap-5">
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                <MessageSquare size={15} style={{ color: "var(--violet)" }} />
                Recent conversations
              </div>
              <Link href="/chat" className="text-xs font-medium" style={{ color: "var(--violet)" }}>
                New chat →
              </Link>
            </div>
            {recentSessions?.length > 0 ? (
              <div className="space-y-px">
                {recentSessions.map((s: any) => (
                  <Link
                    key={s.id}
                    href={`/chat/${s.id}`}
                    className="group flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors"
                    style={{ color: "var(--text-primary)" }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "var(--bg-muted)"}
                    onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                  >
                    <span className="text-sm truncate">{s.title ?? "Untitled chat"}</span>
                    <ArrowRight size={13} style={{ color: "var(--text-tertiary)", flexShrink: 0, marginLeft: 8 }} />
                  </Link>
                ))}
              </div>
            ) : (
              <Empty msg="No conversations yet." href="/chat" action="Start chatting" />
            )}
          </Card>

          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                <Heart size={15} style={{ color: "var(--violet)" }} />
                Specialist match
              </div>
              <Link href="/support" className="text-xs font-medium" style={{ color: "var(--violet)" }}>
                All specialists →
              </Link>
            </div>
            {topSp ? (
              <div>
                {recommendationReason && (
                  <p className="text-xs italic mb-4 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {recommendationReason}
                  </p>
                )}
                <div className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-semibold shrink-0"
                    style={{ background: "var(--violet-light)", color: "var(--violet)" }}
                  >
                    {topSp.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                        {topSp.name}
                      </span>
                      {topSp.verified && <BadgeCheck size={14} style={{ color: "var(--cyan)", flexShrink: 0 }} />}
                    </div>
                    <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>{topSp.title}</p>
                    <div className="flex items-center gap-1 mt-1.5">
                      <Star size={11} style={{ color: "#f59e0b", fill: "#f59e0b" }} />
                      <span className="text-xs" style={{ color: "var(--text-secondary)" }}>{topSp.rating}</span>
                      <span className="mx-1.5" style={{ color: "var(--border-strong)" }}>·</span>
                      <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
                        {topSp.yearsOfExperience} yrs exp.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Empty msg="Chat more to get personalised specialist recommendations." href="/support" action="Browse specialists" />
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}


function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={className}
      style={{
        background: "var(--card)",
        border:     "1px solid var(--border)",
        borderRadius: "var(--r-lg)",
        boxShadow:  "var(--shadow-xs)",
      }}
    >
      {children}
    </div>
  );
}

function StatCard({
  icon, iconColor, label, value, sub, subStyle,
}: {
  icon: React.ReactNode; iconColor: string; label: string;
  value: string; sub?: string; subStyle?: React.CSSProperties;
}) {
  return (
    <Card className="p-4">
      <div className="flex items-center gap-1.5 mb-3" style={{ color: iconColor }}>
        {icon}
        <span className="text-[11px] font-medium uppercase tracking-wide" style={{ color: "var(--text-tertiary)" }}>
          {label}
        </span>
      </div>
      <p className="text-xl font-semibold tracking-tight capitalize" style={{ color: "var(--text-primary)", letterSpacing: "-0.01em" }}>
        {value}
      </p>
      {sub && (
        <span className="mt-1.5 inline-block text-[11px]" style={subStyle ?? { color: "var(--text-tertiary)" }}>
          {sub}
        </span>
      )}
    </Card>
  );
}

function Empty({ msg, href, action }: { msg: string; href: string; action: string }) {
  return (
    <div className="py-2">
      <p className="text-sm italic" style={{ color: "var(--text-tertiary)" }}>{msg}</p>
      <Link href={href} className="mt-2 inline-block text-xs font-medium" style={{ color: "var(--violet)" }}>
        {action} →
      </Link>
    </div>
  );
}


function DashboardSkeleton() {
  return (
    <div
      className="flex-1 overflow-y-auto px-5 py-7 sm:px-7 sm:py-8"
      style={{ background: "var(--bg-subtle)" }}
    >
      <div className="max-w-5xl mx-auto space-y-7">

        {/* Header */}
        <div className="space-y-2">
          <div className="skeleton h-7 w-64 max-w-full" />
          <div className="skeleton h-4 w-44 max-w-full" />
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="p-4"
              style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--r-lg)" }}
            >
              <div className="skeleton h-3.5 w-24 max-w-full mb-3" />
              <div className="skeleton h-6 w-28 max-w-full mb-2" />
              <div className="skeleton h-3 w-20 max-w-full" />
            </div>
          ))}
        </div>

        {/* Chart + Insight */}
        <div className="grid lg:grid-cols-3 gap-5">
          <div
            className="lg:col-span-2 p-5"
            style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--r-lg)" }}
          >
            <div className="flex items-center justify-between mb-5">
              <div className="skeleton h-4 w-36" />
              <div className="skeleton h-3.5 w-20" />
            </div>
            {/* Chart area */}
            <div className="skeleton w-full h-48" style={{ borderRadius: "var(--r-md)" }} />
          </div>
          <div
            className="p-5"
            style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--r-lg)" }}
          >
            <div className="skeleton h-4 w-28 mb-4" />
            <div className="space-y-2.5 flex-1">
              <div className="skeleton h-3.5 w-full" />
              <div className="skeleton h-3.5 w-[90%]" />
              <div className="skeleton h-3.5 w-[80%]" />
              <div className="skeleton h-3.5 w-[95%]" />
              <div className="skeleton h-3.5 w-[70%]" />
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="grid lg:grid-cols-2 gap-5">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="p-5"
              style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--r-lg)" }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="skeleton h-4 w-40" />
                <div className="skeleton h-3.5 w-16" />
              </div>
              <div className="space-y-2.5">
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="flex items-center justify-between px-3 py-2.5" style={{ borderRadius: "var(--r-md)" }}>
                    <div className="skeleton h-3.5 w-[65%]" />
                    <div className="skeleton h-3.5 w-4" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}