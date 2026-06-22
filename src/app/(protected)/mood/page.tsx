"use client";


import { useState } from "react";
import useSWR from "swr";
import { toast } from "sonner";
import {
  Smile,
  Moon,
  Zap,
  Calendar,
  PlusCircle,
  X,
  ChevronDown,
  TrendingUp,
} from "lucide-react";
import { MoodTrendChart } from "@/components/mood/MoodTrendChart";
import { MoodDistributionChart } from "@/components/mood/MoodDistributionChart";

const fetcher = (url: string) =>
  fetch(url, { credentials: "include" }).then((r) => r.json());

const MOOD_TYPES = [
  { value: "HAPPY", label: "Happy", emoji: "😊" },
  { value: "CALM", label: "Calm", emoji: "😌" },
  { value: "HOPEFUL", label: "Hopeful", emoji: "🌟" },
  { value: "NEUTRAL", label: "Neutral", emoji: "😐" },
  { value: "LONELY", label: "Lonely", emoji: "💙" },
  { value: "ANXIOUS", label: "Anxious", emoji: "😰" },
  { value: "SAD", label: "Sad", emoji: "😔" },
  { value: "OVERWHELMED", label: "Overwhelmed", emoji: "😵" },
  { value: "ANGRY", label: "Angry", emoji: "😤" },
  { value: "FEARFUL", label: "Fearful", emoji: "😨" },
];

export default function MoodPage() {
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    moodType: "",
    intensity: 5,
    note: "",
    sleepScore: "" as string | number,
    energyScore: "" as string | number,
  });

  const { data: entries, mutate: mutateEntries } = useSWR("/api/mood?limit=14", fetcher);
  const { data: summaryData, mutate: mutateSummary } = useSWR("/api/mood/summary", fetcher);

  const handleSubmit = async () => {
    if (!form.moodType) {
      toast.error("Please select a mood type.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/mood", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          value: form.intensity,
          moodType: form.moodType,
          intensity: form.intensity,
          note: form.note || undefined,
          sleepScore: form.sleepScore !== "" ? Number(form.sleepScore) : undefined,
          energyScore: form.energyScore !== "" ? Number(form.energyScore) : undefined,
        }),
      });
      if (!res.ok) throw new Error();
      toast.success("Mood logged!");
      setForm({ moodType: "", intensity: 5, note: "", sleepScore: "", energyScore: "" });
      setShowForm(false);
      mutateEntries();
      mutateSummary();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const { summary, weeklyTrend } = summaryData ?? {};

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 p-6 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* ── Header ── */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl font-semibold text-slate-900">Mood Tracker</h1>
            <p className="text-slate-500 mt-1">Track how you're feeling over time.</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
          >
            <PlusCircle size={18} /> Log Mood
          </button>
        </div>

        {/* ── Log Form Modal ── */}
        {showForm && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-semibold text-slate-900 text-lg">How are you feeling?</h2>
                <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-600">
                  <X size={20} />
                </button>
              </div>

              {/* Mood Type Selection */}
              <div className="mb-5">
                <label className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2 block">
                  Mood
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {MOOD_TYPES.map((m) => (
                    <button
                      key={m.value}
                      onClick={() => setForm((p) => ({ ...p, moodType: m.value }))}
                      className={`flex flex-col items-center py-2 rounded-xl border text-xs transition-all ${
                        form.moodType === m.value
                          ? "border-teal-500 bg-teal-50 text-teal-700"
                          : "border-slate-200 hover:border-slate-300 text-slate-600"
                      }`}
                    >
                      <span className="text-xl mb-1">{m.emoji}</span>
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Intensity Slider */}
              <div className="mb-5">
                <label className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2 block">
                  Intensity — {form.intensity}/10
                </label>
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={form.intensity}
                  onChange={(e) => setForm((p) => ({ ...p, intensity: Number(e.target.value) }))}
                  className="w-full accent-teal-600"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>Mild</span><span>Moderate</span><span>Intense</span>
                </div>
              </div>

              {/* Optional Fields */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div>
                  <label className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1 block flex items-center gap-1">
                    <Moon size={11} /> Sleep
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    placeholder="1-10"
                    value={form.sleepScore}
                    onChange={(e) => setForm((p) => ({ ...p, sleepScore: e.target.value }))}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-400"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1 block flex items-center gap-1">
                    <Zap size={11} /> Energy
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    placeholder="1-10"
                    value={form.energyScore}
                    onChange={(e) => setForm((p) => ({ ...p, energyScore: e.target.value }))}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-400"
                  />
                </div>
              </div>

              {/* Note */}
              <div className="mb-6">
                <label className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1 block">
                  Note (optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Anything on your mind?"
                  value={form.note}
                  onChange={(e) => setForm((p) => ({ ...p, note: e.target.value }))}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-400 resize-none"
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={submitting || !form.moodType}
                className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 text-white py-3 rounded-xl font-medium text-sm transition-colors"
              >
                {submitting ? "Saving…" : "Save Mood"}
              </button>
            </div>
          </div>
        )}

        {/* ── Stats Row ── */}
        {summary && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <SummaryCard icon={<Calendar size={16} />} label="Total Logs" value={summary.totalEntries} />
            <SummaryCard icon={<Smile size={16} />} label="Avg Intensity" value={`${summary.averageIntensity}/10`} />
            {summary.averageSleepScore && (
              <SummaryCard icon={<Moon size={16} />} label="Avg Sleep" value={`${summary.averageSleepScore}/10`} />
            )}
            {summary.averageEnergyScore && (
              <SummaryCard icon={<Zap size={16} />} label="Avg Energy" value={`${summary.averageEnergyScore}/10`} />
            )}
          </div>
        )}

        {/* ── Charts ── */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <h2 className="font-semibold text-slate-800 flex items-center gap-2 mb-4">
              <TrendingUp size={18} className="text-teal-600" /> Weekly Trend
            </h2>
            <MoodTrendChart data={weeklyTrend ?? []} />
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <h2 className="font-semibold text-slate-800 flex items-center gap-2 mb-4">
              <Smile size={18} className="text-teal-600" /> Mood Distribution
            </h2>
            <MoodDistributionChart distribution={summary?.moodDistribution ?? {}} />
          </div>
        </div>

        {/* ── Recent Entries ── */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <h2 className="font-semibold text-slate-800 mb-4">Recent Logs</h2>
          {Array.isArray(entries) && entries.length > 0 ? (
            <div className="space-y-3">
              {entries.map((entry: any) => {
                const mood = MOOD_TYPES.find((m) => m.value === entry.moodType);
                return (
                  <div
                    key={entry.id}
                    className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl"
                  >
                    <span className="text-2xl">{mood?.emoji ?? "💭"}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-medium text-slate-800">
                          {mood?.label ?? entry.moodType ?? `Value: ${entry.value}`}
                        </span>
                        {entry.intensity && (
                          <span className="text-xs text-slate-400">
                            Intensity {entry.intensity}/10
                          </span>
                        )}
                        {entry.sleepScore && (
                          <span className="text-xs text-indigo-500">
                            😴 Sleep {entry.sleepScore}/10
                          </span>
                        )}
                        {entry.energyScore && (
                          <span className="text-xs text-amber-500">
                            ⚡ Energy {entry.energyScore}/10
                          </span>
                        )}
                      </div>
                      {entry.note && (
                        <p className="text-xs text-slate-500 mt-1 truncate">{entry.note}</p>
                      )}
                    </div>
                    <span className="text-xs text-slate-400 shrink-0">
                      {new Date(entry.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-slate-400 italic">No mood logs yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function SummaryCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4">
      <div className="flex items-center gap-1.5 text-teal-600 mb-2">{icon}
        <span className="text-xs text-slate-400 uppercase tracking-wider font-medium">{label}</span>
      </div>
      <p className="text-xl font-semibold text-slate-900">{value}</p>
    </div>
  );
}
