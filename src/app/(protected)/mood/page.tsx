/**
 * src/app/(protected)/mood/page.tsx
 *
 * Design decisions:
 * - The "Log Mood" button is moved to match our button system (primary, default size).
 * - The mood log modal uses our standard dialog pattern: white rounded-xl, subtle
 *   overlay, proper z-index stacking.
 * - Mood type selector: the 5-col grid is kept but buttons are redesigned.
 *   Selected state: thin border in primary + primary-muted background.
 *   Emoji is slightly larger, label below it in 11px.
 * - Intensity slider: standard range input styled with accent-color from our tokens.
 *   Min/mid/max labels in correct positions.
 * - Optional sleep/energy inputs: proper Field primitive with consistent styling.
 * - Note textarea: matches form inputs.
 * - Summary stat cards at top: 2-col (mobile) / 4-col (desktop).
 * - Charts: 2-col grid, each chart in a surface card.
 * - Recent entries list: each entry is a surface card row, no bg-slate-50 nesting.
 * - All state management and fetch logic are preserved exactly.
 */
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
  TrendingUp,
} from "lucide-react";
import { MoodTrendChart } from "@/components/mood/MoodTrendChart";
import { MoodDistributionChart } from "@/components/mood/MoodDistributionChart";

const fetcher = (url: string) =>
  fetch(url, { credentials: "include" }).then((r) => r.json());

const MOOD_TYPES = [
  { value: "HAPPY",       label: "Happy",      emoji: "😊" },
  { value: "CALM",        label: "Calm",       emoji: "😌" },
  { value: "HOPEFUL",     label: "Hopeful",    emoji: "🌟" },
  { value: "NEUTRAL",     label: "Neutral",    emoji: "😐" },
  { value: "LONELY",      label: "Lonely",     emoji: "💙" },
  { value: "ANXIOUS",     label: "Anxious",    emoji: "😰" },
  { value: "SAD",         label: "Sad",        emoji: "😔" },
  { value: "OVERWHELMED", label: "Overwhelmed",emoji: "😵" },
  { value: "ANGRY",       label: "Angry",      emoji: "😤" },
  { value: "FEARFUL",     label: "Fearful",    emoji: "😨" },
];

export default function MoodPage() {
  const [showForm,   setShowForm]   = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    moodType:    "",
    intensity:   5,
    note:        "",
    sleepScore:  "" as string | number,
    energyScore: "" as string | number,
  });

  const { data: entries,     mutate: mutateEntries  } = useSWR("/api/mood?limit=14", fetcher);
  const { data: summaryData, mutate: mutateSummary  } = useSWR("/api/mood/summary",  fetcher);

  const handleSubmit = async () => {
    if (!form.moodType) {
      toast.error("Please select a mood type.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/mood", {
        method:      "POST",
        headers:     { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          value:       form.intensity,
          moodType:    form.moodType,
          intensity:   form.intensity,
          note:        form.note || undefined,
          sleepScore:  form.sleepScore  !== "" ? Number(form.sleepScore)  : undefined,
          energyScore: form.energyScore !== "" ? Number(form.energyScore) : undefined,
        }),
      });
      if (!res.ok) throw new Error();
      toast.success("Mood logged.");
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
    <div className="flex-1 overflow-y-auto bg-background px-6 py-8 md:px-8">
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">

        {/* ── Header ─────────────────────────────────────────────── */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-normal text-foreground tracking-tight">
              Mood tracker
            </h1>
            <p className="text-muted text-sm mt-1.5">Track how you're feeling over time.</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-primary-fg px-4 py-2.5 rounded-DEFAULT text-sm font-medium transition-colors duration-fast shadow-xs"
          >
            <PlusCircle size={16} />
            Log mood
          </button>
        </div>

        {/* ── Summary stats ──────────────────────────────────────── */}
        {summary && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 stagger">
            <SummaryCard icon={<Calendar size={15} />}  label="Total logs"    value={summary.totalEntries} />
            <SummaryCard icon={<Smile size={15} />}     label="Avg intensity" value={`${summary.averageIntensity}/10`} />
            {summary.averageSleepScore && (
              <SummaryCard icon={<Moon size={15} />}    label="Avg sleep"     value={`${summary.averageSleepScore}/10`} />
            )}
            {summary.averageEnergyScore && (
              <SummaryCard icon={<Zap size={15} />}     label="Avg energy"    value={`${summary.averageEnergyScore}/10`} />
            )}
          </div>
        )}

        {/* ── Charts ─────────────────────────────────────────────── */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-surface border border-border rounded-lg shadow-xs p-6">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-5">
              <TrendingUp size={16} className="text-primary" strokeWidth={2} />
              Weekly trend
            </div>
            <MoodTrendChart data={weeklyTrend ?? []} />
          </div>

          <div className="bg-surface border border-border rounded-lg shadow-xs p-6">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-5">
              <Smile size={16} className="text-primary" strokeWidth={2} />
              Mood distribution
            </div>
            <MoodDistributionChart distribution={summary?.moodDistribution ?? {}} />
          </div>
        </div>

        {/* ── Recent entries ─────────────────────────────────────── */}
        <div className="bg-surface border border-border rounded-lg shadow-xs p-6">
          <h2 className="text-sm font-medium text-foreground mb-5">Recent logs</h2>
          {Array.isArray(entries) && entries.length > 0 ? (
            <div className="space-y-2">
              {entries.map((entry: any) => {
                const mood = MOOD_TYPES.find((m) => m.value === entry.moodType);
                return (
                  <div
                    key={entry.id}
                    className="flex items-start gap-4 px-3 py-3 rounded-md hover:bg-surface-hover transition-colors"
                  >
                    <span className="text-2xl leading-none mt-0.5">{mood?.emoji ?? "💭"}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-medium text-foreground capitalize">
                          {mood?.label ?? entry.moodType?.toLowerCase() ?? `Value: ${entry.value}`}
                        </span>
                        {entry.intensity && (
                          <span className="text-xs text-subtle">
                            Intensity {entry.intensity}/10
                          </span>
                        )}
                        {entry.sleepScore && (
                          <span className="text-xs text-muted">
                            Sleep {entry.sleepScore}/10
                          </span>
                        )}
                        {entry.energyScore && (
                          <span className="text-xs text-muted">
                            Energy {entry.energyScore}/10
                          </span>
                        )}
                      </div>
                      {entry.note && (
                        <p className="text-xs text-subtle mt-0.5 truncate">{entry.note}</p>
                      )}
                    </div>
                    <span className="text-xs text-subtle shrink-0">
                      {new Date(entry.createdAt).toLocaleDateString("en-US", {
                        month:  "short",
                        day:    "numeric",
                        hour:   "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-subtle italic py-4">No mood logs yet. Log your first entry above.</p>
          )}
        </div>
      </div>

      {/* ── Log mood modal ─────────────────────────────────────────────── */}
      {showForm && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-[2px] z-50 flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowForm(false);
          }}
        >
          <div className="bg-surface rounded-xl w-full max-w-md p-6 shadow-xl animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-normal text-foreground tracking-tight">
                How are you feeling?
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="p-1.5 rounded-md text-subtle hover:text-muted hover:bg-surface-hover transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Mood grid */}
            <div className="mb-6">
              <FieldLabel>Mood</FieldLabel>
              <div className="grid grid-cols-5 gap-2 mt-2">
                {MOOD_TYPES.map((m) => (
                  <button
                    key={m.value}
                    type="button"
                    onClick={() => setForm((p) => ({ ...p, moodType: m.value }))}
                    className={`
                      flex flex-col items-center py-2.5 px-1 rounded-md border text-center transition-all duration-fast
                      ${form.moodType === m.value
                        ? "border-primary bg-primary-muted"
                        : "border-border hover:border-border-strong hover:bg-surface-hover"}
                    `}
                  >
                    <span className="text-xl mb-1 leading-none">{m.emoji}</span>
                    <span className={`text-[10px] leading-tight ${form.moodType === m.value ? "text-primary" : "text-muted"}`}>
                      {m.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Intensity */}
            <div className="mb-6">
              <FieldLabel>Intensity — {form.intensity}/10</FieldLabel>
              <input
                type="range"
                min={1}
                max={10}
                value={form.intensity}
                onChange={(e) => setForm((p) => ({ ...p, intensity: Number(e.target.value) }))}
                className="w-full mt-2"
                style={{ accentColor: "var(--primary)" }}
              />
              <div className="flex justify-between text-[10px] text-subtle mt-1">
                <span>Mild</span><span>Moderate</span><span>Intense</span>
              </div>
            </div>

            {/* Sleep + Energy */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <FormField label="Sleep score">
                <FormInput
                  type="number"
                  min={1}
                  max={10}
                  placeholder="1–10"
                  value={form.sleepScore}
                  onChange={(e) => setForm((p) => ({ ...p, sleepScore: e.target.value }))}
                />
              </FormField>
              <FormField label="Energy score">
                <FormInput
                  type="number"
                  min={1}
                  max={10}
                  placeholder="1–10"
                  value={form.energyScore}
                  onChange={(e) => setForm((p) => ({ ...p, energyScore: e.target.value }))}
                />
              </FormField>
            </div>

            {/* Note */}
            <div className="mb-6">
              <FormField label="Note (optional)">
                <textarea
                  rows={2}
                  placeholder="Anything on your mind?"
                  value={form.note}
                  onChange={(e) => setForm((p) => ({ ...p, note: e.target.value }))}
                  className="
                    w-full px-3.5 py-2.5 text-sm text-foreground resize-none
                    bg-background-alt placeholder:text-subtle
                    border border-border rounded-DEFAULT
                    focus:bg-surface focus:border-border-focus focus:ring-4 focus:ring-primary/8
                    outline-none transition-all duration-fast
                  "
                />
              </FormField>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting || !form.moodType}
              className="w-full py-2.5 bg-primary hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed text-primary-fg text-sm font-medium rounded-DEFAULT transition-colors duration-fast"
            >
              {submitting ? "Saving…" : "Save mood"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Primitives ──────────────────────────────────────────────────────────── */

function SummaryCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
  return (
    <div className="bg-surface border border-border rounded-lg shadow-xs p-4 flex flex-col gap-2.5">
      <div className="flex items-center gap-1.5 text-primary">{icon}
        <span className="text-[10px] text-subtle uppercase tracking-wide font-medium">{label}</span>
      </div>
      <p className="text-xl font-semibold text-foreground">{value}</p>
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-medium text-muted tracking-wide">{children}</p>
  );
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <FieldLabel>{label}</FieldLabel>
      {children}
    </div>
  );
}

function FormInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className="
        w-full px-3.5 py-2.5 text-sm text-foreground
        bg-background-alt placeholder:text-subtle
        border border-border rounded-DEFAULT
        focus:bg-surface focus:border-border-focus focus:ring-4 focus:ring-primary/8
        outline-none transition-all duration-fast
      "
      {...props}
    />
  );
}