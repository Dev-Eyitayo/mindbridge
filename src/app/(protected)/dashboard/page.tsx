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
  UserCheck,
  ArrowRight,
  Sparkles,
  Moon,
  Activity,
} from "lucide-react";
import { MoodTrendChart } from "@/components/mood/MoodTrendChart";

const fetcher = (url: string) =>
  fetch(url, { credentials: "include" }).then((r) => r.json());

const MOOD_EMOJI: Record<string, string> = {
  HAPPY: "😊",
  CALM: "😌",
  HOPEFUL: "🌟",
  NEUTRAL: "😐",
  SAD: "😔",
  ANXIOUS: "😰",
  ANGRY: "😤",
  OVERWHELMED: "😵",
  LONELY: "💙",
  FEARFUL: "😨",
};

const STRESS_COLOUR: Record<string, string> = {
  Low: "text-emerald-600 bg-emerald-50",
  Moderate: "text-amber-600 bg-amber-50",
  High: "text-red-500 bg-red-50",
  Critical: "text-red-700 bg-red-100",
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

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 p-6 md:p-8">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* ── Header ── */}
        <div>
          <h1 className="font-serif text-3xl font-semibold text-slate-900">
            Good to see you, {firstName}.
          </h1>
          <p className="text-slate-500 mt-1">Here's your wellness overview for this week.</p>
        </div>

        {/* ── Stat Cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={<Heart size={20} className="text-rose-500" />}
            label="Current Mood"
            value={
              topMoodType
                ? `${MOOD_EMOJI[topMoodType] ?? "💭"} ${topMoodType}`
                : "Not logged"
            }
            sub={
              recentMoodEntries?.[0]?.intensity
                ? `Intensity ${recentMoodEntries[0].intensity}/10`
                : undefined
            }
          />
          <StatCard
            icon={<Flame size={20} className="text-orange-500" />}
            label="Mood Streak"
            value={`${moodSummary?.currentStreak ?? 0} day${moodSummary?.currentStreak === 1 ? "" : "s"}`}
            sub="Keep it going!"
          />
          <StatCard
            icon={<Activity size={20} className="text-violet-500" />}
            label="Avg. Intensity"
            value={
              moodSummary?.averageIntensity
                ? `${moodSummary.averageIntensity}/10`
                : "—"
            }
            sub="Last 90 days"
          />
          <StatCard
            icon={<Zap size={20} className={stressScore?.label ? STRESS_COLOUR[stressScore.label]?.split(" ")[0] : "text-slate-400"} />}
            label="Stress Score"
            value={`${stressScore?.score ?? 0}/100`}
            sub={stressScore?.label ?? "—"}
            valueClass={stressScore ? STRESS_COLOUR[stressScore.label] : undefined}
          />
        </div>

        {/* ── Weekly Trend Chart + Insight ── */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-slate-800 flex items-center gap-2">
                <TrendingUp size={18} className="text-teal-600" />
                Weekly Mood Trend
              </h2>
              <Link
                href="/mood"
                className="text-xs text-teal-600 hover:underline flex items-center gap-1"
              >
                Full history <ArrowRight size={12} />
              </Link>
            </div>
            <MoodTrendChart data={weeklyTrend ?? []} />
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <h2 className="font-semibold text-slate-800 flex items-center gap-2 mb-3">
                <Sparkles size={18} className="text-amber-500" />
                Weekly Insight
              </h2>
              {latestInsight ? (
                <p className="text-sm text-slate-600 leading-relaxed">
                  {latestInsight.content}
                </p>
              ) : (
                <p className="text-sm text-slate-400 italic">
                  Log your mood daily to unlock AI-generated insights.
                </p>
              )}
            </div>
            <Link
              href="/mood"
              className="mt-4 text-xs text-teal-600 hover:underline flex items-center gap-1"
            >
              Log mood <ArrowRight size={12} />
            </Link>
          </div>
        </div>

        {/* ── Additional Stats Row ── */}
        {(moodSummary?.averageSleepScore || moodSummary?.averageEnergyScore) && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {moodSummary.averageSleepScore && (
              <StatCard
                icon={<Moon size={20} className="text-indigo-500" />}
                label="Avg. Sleep"
                value={`${moodSummary.averageSleepScore}/10`}
                sub="Last 90 days"
              />
            )}
            {moodSummary.averageEnergyScore && (
              <StatCard
                icon={<Zap size={20} className="text-yellow-500" />}
                label="Avg. Energy"
                value={`${moodSummary.averageEnergyScore}/10`}
                sub="Last 90 days"
              />
            )}
            <StatCard
              icon={<Brain size={20} className="text-teal-500" />}
              label="Entries Logged"
              value={`${moodSummary?.totalEntries ?? 0}`}
              sub="Last 90 days"
            />
          </div>
        )}

        {/* ── Bottom Row: Recent Chats + Recommended Specialist ── */}
        <div className="grid lg:grid-cols-2 gap-6">

          {/* Recent Journal / Chats */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <h2 className="font-semibold text-slate-800 flex items-center gap-2 mb-4">
              <MessageSquare size={18} className="text-teal-600" />
              Recent Conversations
            </h2>
            {recentSessions?.length > 0 ? (
              <div className="space-y-2">
                {recentSessions.map((s: any) => (
                  <Link
                    key={s.id}
                    href={`/chat/${s.id}`}
                    className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-slate-50 transition-colors group"
                  >
                    <span className="text-sm text-slate-700 truncate">{s.title ?? "Untitled Chat"}</span>
                    <ArrowRight size={14} className="text-slate-300 group-hover:text-teal-500 shrink-0 ml-2" />
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-400">No conversations yet. Start chatting!</p>
            )}
            <Link
              href="/chat"
              className="mt-4 inline-flex items-center gap-1 text-xs text-teal-600 hover:underline"
            >
              New conversation <ArrowRight size={12} />
            </Link>
          </div>

          {/* Recommended Specialist */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <h2 className="font-semibold text-slate-800 flex items-center gap-2 mb-2">
              <UserCheck size={18} className="text-teal-600" />
              Suggested Support
            </h2>
            {recommendationReason && (
              <p className="text-xs text-slate-400 mb-4 leading-relaxed italic">
                {recommendationReason}
              </p>
            )}
            {recommendedSpecialists?.length > 0 ? (
              <div className="space-y-3">
                {recommendedSpecialists.map((sp: any) => (
                  <div
                    key={sp.id}
                    className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl"
                  >
                    <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-semibold text-sm shrink-0">
                      {sp.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-800 truncate">{sp.name}</p>
                      <p className="text-xs text-slate-500 truncate">{sp.title}</p>
                    </div>
                    <div className="ml-auto shrink-0 text-xs text-amber-600 font-medium">
                      ★ {sp.rating}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-400">Chat more to receive personalised suggestions.</p>
            )}
            <Link
              href="/support"
              className="mt-4 inline-flex items-center gap-1 text-xs text-teal-600 hover:underline"
            >
              View all specialists <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────

function StatCard({
  icon,
  label,
  value,
  sub,
  valueClass,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
  valueClass?: string;
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
          {label}
        </span>
      </div>
      <p
        className={`text-xl font-semibold ${valueClass ?? "text-slate-900"} truncate`}
      >
        {value}
      </p>
      {sub && <p className="text-xs text-slate-400 mt-1">{sub}</p>}
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 p-6 md:p-8 animate-pulse">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="h-8 bg-slate-200 rounded w-1/3" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 h-28 border border-slate-100" />
          ))}
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl h-56 border border-slate-100" />
          <div className="bg-white rounded-2xl h-56 border border-slate-100" />
        </div>
      </div>
    </div>
  );
}
