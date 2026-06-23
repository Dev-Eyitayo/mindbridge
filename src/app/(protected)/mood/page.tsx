"use client";

import { useState } from "react";
import useSWR from "swr";
import { toast } from "sonner";
import { PlusCircle, X, TrendingUp, Smile } from "lucide-react";
import { MoodTrendChart } from "@/components/mood/MoodTrendChart";
import { MoodDistributionChart } from "@/components/mood/MoodDistributionChart";

const fetcher = (url: string) => fetch(url, { credentials: "include" }).then((r) => r.json());

const MOODS = [
  { value: "HAPPY",       emoji: "😊", label: "Happy"       },
  { value: "CALM",        emoji: "😌", label: "Calm"        },
  { value: "HOPEFUL",     emoji: "🌟", label: "Hopeful"     },
  { value: "NEUTRAL",     emoji: "😐", label: "Neutral"     },
  { value: "LONELY",      emoji: "💙", label: "Lonely"      },
  { value: "ANXIOUS",     emoji: "😰", label: "Anxious"     },
  { value: "SAD",         emoji: "😔", label: "Sad"         },
  { value: "OVERWHELMED", emoji: "😵", label: "Overwhelmed" },
  { value: "ANGRY",       emoji: "😤", label: "Angry"       },
  { value: "FEARFUL",     emoji: "😨", label: "Fearful"     },
];

const FORM_INIT = { moodType: "", intensity: 5, note: "", sleepScore: "" as string|number, energyScore: "" as string|number };

export default function MoodPage() {
  const [showForm,   setShowForm]   = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState(FORM_INIT);

  const { data: entries,  mutate: mutateEntries  } = useSWR("/api/mood?limit=14", fetcher);
  const { data: summary,  mutate: mutateSummary  } = useSWR("/api/mood/summary",  fetcher);

  const handleSubmit = async () => {
    if (!form.moodType) { toast.error("Please select a mood type."); return; }
    setSubmitting(true);
    try {
      const res = await fetch("/api/mood", {
        method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include",
        body: JSON.stringify({
          value: form.intensity, moodType: form.moodType, intensity: form.intensity,
          note: form.note || undefined,
          sleepScore:  form.sleepScore  !== "" ? Number(form.sleepScore)  : undefined,
          energyScore: form.energyScore !== "" ? Number(form.energyScore) : undefined,
        }),
      });
      if (!res.ok) throw new Error();
      toast.success("Mood logged.");
      setForm(FORM_INIT);
      setShowForm(false);
      mutateEntries(); mutateSummary();
    } catch { toast.error("Something went wrong. Try again."); }
    finally { setSubmitting(false); }
  };

  const { summary: stats, weeklyTrend } = summary ?? {};
  const isLoading = !entries || !summary;

  return (
    <div className="flex-1 overflow-y-auto scroll-thin px-5 py-7 sm:px-7 sm:py-8" style={{ background: "var(--bg-subtle)" }}>
      <div className="max-w-4xl mx-auto space-y-7 fade-up">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight" style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
              Mood tracker
            </h1>
            <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
              Track how you feel over time.
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all"
            style={{ background: "var(--violet)", color: "white" }}
          >
            <PlusCircle size={15} />
            Log mood
          </button>
        </div>

        {isLoading ? <MoodSkeleton /> : (
          <>
            {/* Summary */}
            {stats && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: "Total logs",    value: stats.totalEntries        },
                  { label: "Avg intensity", value: `${stats.averageIntensity}/10` },
                  { label: "Avg sleep",     value: stats.averageSleepScore  ? `${stats.averageSleepScore}/10`  : "—" },
                  { label: "Avg energy",    value: stats.averageEnergyScore ? `${stats.averageEnergyScore}/10` : "—" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="p-4"
                    style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--r-lg)", boxShadow: "var(--shadow-xs)" }}
                  >
                    <p className="text-[11px] font-medium uppercase tracking-wide mb-2" style={{ color: "var(--text-tertiary)" }}>
                      {s.label}
                    </p>
                    <p className="text-xl font-semibold" style={{ color: "var(--text-primary)" }}>{s.value}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Charts */}
            <div className="grid md:grid-cols-2 gap-5">
              {[
                { title: "Weekly trend",      icon: <TrendingUp size={15} />, chart: <MoodTrendChart data={weeklyTrend ?? []} /> },
                { title: "Mood distribution", icon: <Smile size={15} />,      chart: <MoodDistributionChart distribution={stats?.moodDistribution ?? {}} /> },
              ].map((c) => (
                <div
                  key={c.title}
                  className="p-5"
                  style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--r-lg)", boxShadow: "var(--shadow-xs)" }}
                >
                  <div className="flex items-center gap-2 text-sm font-medium mb-5" style={{ color: "var(--text-primary)" }}>
                    <span style={{ color: "var(--violet)" }}>{c.icon}</span>
                    {c.title}
                  </div>
                  {c.chart}
                </div>
              ))}
            </div>

            {/* Recent logs */}
            <div
              className="p-5"
              style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--r-lg)", boxShadow: "var(--shadow-xs)" }}
            >
              <h2 className="text-sm font-semibold mb-4" style={{ color: "var(--text-primary)" }}>Recent logs</h2>
              {Array.isArray(entries) && entries.length > 0 ? (
                <div className="space-y-px">
                  {entries.map((e: any) => {
                    const m = MOODS.find((x) => x.value === e.moodType);
                    return (
                      <div
                        key={e.id}
                        className="flex items-center gap-3 px-3 py-3 rounded-lg transition-colors"
                        onMouseEnter={(el) => el.currentTarget.style.background = "var(--bg-muted)"}
                        onMouseLeave={(el) => el.currentTarget.style.background = "transparent"}
                      >
                        <span className="text-xl shrink-0 leading-none">{m?.emoji ?? "💭"}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-medium capitalize" style={{ color: "var(--text-primary)" }}>
                              {m?.label ?? e.moodType?.toLowerCase()}
                            </span>
                            {e.intensity && (
                              <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>
                                Intensity {e.intensity}/10
                              </span>
                            )}
                          </div>
                          {e.note && (
                            <p className="text-xs mt-0.5 truncate" style={{ color: "var(--text-tertiary)" }}>
                              {e.note}
                            </p>
                          )}
                        </div>
                        <span className="text-xs shrink-0" style={{ color: "var(--text-tertiary)" }}>
                          {new Date(e.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-sm italic py-2" style={{ color: "var(--text-tertiary)" }}>
                  No logs yet. Tap "Log mood" to get started.
                </p>
              )}
            </div>
          </>
        )}
      </div>

      {showForm && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
          style={{ background: "var(--overlay)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowForm(false); }}
        >
          <div
            className="w-full max-w-md p-5 fade-up"
            style={{ background: "var(--card)", borderRadius: "var(--r-xl)", boxShadow: "var(--shadow-lg)" }}
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-semibold" style={{ color: "var(--text-primary)" }}>How are you feeling?</h2>
              <button
                onClick={() => setShowForm(false)}
                className="p-1.5 rounded-lg transition-colors"
                style={{ color: "var(--text-tertiary)" }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Mood grid */}
            <div className="mb-5">
              <Label>Mood</Label>
              <div className="grid grid-cols-5 gap-1.5 mt-2">
                {MOODS.map((m) => {
                  const active = form.moodType === m.value;
                  return (
                    <button
                      key={m.value}
                      type="button"
                      onClick={() => setForm((p) => ({ ...p, moodType: m.value }))}
                      className="flex flex-col items-center py-2.5 rounded-lg border transition-all"
                      style={{
                        borderColor: active ? "var(--violet)" : "var(--border)",
                        background:  active ? "var(--violet-light)" : "transparent",
                      }}
                    >
                      <span className="text-lg leading-none">{m.emoji}</span>
                      <span
                        className="text-[9px] mt-1 font-medium"
                        style={{ color: active ? "var(--violet)" : "var(--text-tertiary)" }}
                      >
                        {m.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Intensity */}
            <div className="mb-5">
              <Label>Intensity — {form.intensity}/10</Label>
              <input
                type="range" min={1} max={10} value={form.intensity}
                onChange={(e) => setForm((p) => ({ ...p, intensity: Number(e.target.value) }))}
                className="w-full mt-2"
              />
              <div className="flex justify-between text-[10px] mt-1" style={{ color: "var(--text-tertiary)" }}>
                <span>Mild</span><span>Moderate</span><span>Intense</span>
              </div>
            </div>

            {/* Sleep + Energy */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <FormField label="Sleep score">
                <FormInput type="number" min={1} max={10} placeholder="1–10"
                  value={form.sleepScore}
                  onChange={(e) => setForm((p) => ({ ...p, sleepScore: e.target.value }))} />
              </FormField>
              <FormField label="Energy score">
                <FormInput type="number" min={1} max={10} placeholder="1–10"
                  value={form.energyScore}
                  onChange={(e) => setForm((p) => ({ ...p, energyScore: e.target.value }))} />
              </FormField>
            </div>

            {/* Note */}
            <div className="mb-5">
              <Label>Note (optional)</Label>
              <textarea
                rows={2}
                placeholder="Anything on your mind?"
                value={form.note}
                onChange={(e) => setForm((p) => ({ ...p, note: e.target.value }))}
                className="w-full mt-2 px-3 py-2.5 text-sm resize-none rounded-lg outline-none transition-all"
                style={{ background: "var(--bg-subtle)", border: "1px solid var(--border)", color: "var(--text-primary)" }}
              />
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting || !form.moodType}
              className="w-full py-2.5 text-sm font-medium rounded-lg transition-all"
              style={{ background: "var(--violet)", color: "white", opacity: (submitting || !form.moodType) ? 0.5 : 1 }}
            >
              {submitting ? "Saving…" : "Save mood"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>{children}</p>;
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="space-y-1.5"><Label>{label}</Label>{children}</div>;
}

function FormInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className="w-full px-3 py-2.5 text-sm rounded-lg outline-none transition-all"
      style={{ background: "var(--bg-subtle)", border: "1px solid var(--border)", color: "var(--text-primary)" }}
      {...props}
    />
  );
}


function MoodSkeleton() {
  return (
    <div className="space-y-7">
      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="p-4"
            style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--r-lg)" }}
          >
            <div className="skeleton h-3 w-20 max-w-full mb-2.5" />
            <div className="skeleton h-6 w-16 max-w-full" />
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-5">
        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            className="p-5"
            style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--r-lg)" }}
          >
            <div className="skeleton h-4 w-32 mb-5" />
            <div className="skeleton w-full h-44" style={{ borderRadius: "var(--r-md)" }} />
          </div>
        ))}
      </div>

      {/* Log list */}
      <div
        className="p-5"
        style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--r-lg)" }}
      >
        <div className="skeleton h-4 w-24 mb-4" />
        <div className="space-y-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-3 px-3 py-3">
              <div className="skeleton w-8 h-8 shrink-0" style={{ borderRadius: "var(--r-sm)" }} />
              <div className="flex-1 space-y-1.5">
                <div className="skeleton h-3.5 w-[55%] max-w-full" />
                <div className="skeleton h-3 w-[35%] max-w-full" />
              </div>
              <div className="skeleton h-3 w-10 shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}