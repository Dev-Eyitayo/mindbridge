"use client";

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Cell, ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";

const PALETTE = [
  "#7c3aed","#06b6d4","#6366f1","#14b8a6","#8b5cf6",
  "#a78bfa","#d97706","#f59e0b","#ef4444","#6b7280",
];

const MOOD_LABELS: Record<string, string> = {
  HAPPY:"Happy", CALM:"Calm", HOPEFUL:"Hopeful", NEUTRAL:"Neutral", LONELY:"Lonely",
  ANXIOUS:"Anxious", SAD:"Sad", OVERWHELMED:"Overwhelmed", ANGRY:"Angry", FEARFUL:"Fearful",
};

const MOOD_EMOJI: Record<string, string> = {
  HAPPY:"😊", CALM:"😌", HOPEFUL:"🌟", NEUTRAL:"😐", LONELY:"💙",
  ANXIOUS:"😰", SAD:"😔", OVERWHELMED:"😵", ANGRY:"😤", FEARFUL:"😨",
};

interface BarTipProps {
  active?: boolean;
  payload?: { value: number; payload: { name: string; emoji: string; color: string } }[];
  label?: string;
}

function BarTip({ active, payload }: BarTipProps) {
  if (!active || !payload?.length) return null;
  const it = payload[0];

  return (
    <div style={{
      background: "var(--card)",
      border: "1px solid var(--border)",
      borderRadius: "var(--r-md)",
      padding: "8px 12px",
      boxShadow: "var(--shadow-md)",
      fontSize: 12,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: it.payload.color, flexShrink: 0 }} />
        <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>
          {it.payload.emoji} {it.payload.name}
        </span>
      </div>
      <p style={{ color: "var(--text-tertiary)", margin: 0 }}>
        {it.value} log{it.value !== 1 ? "s" : ""}
      </p>
    </div>
  );
}

export function MoodDistributionChart({
  distribution,
}: {
  distribution: Record<string, number>;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!distribution || Object.keys(distribution).length === 0) {
    return (
      <div style={{ height: 180, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p className="text-sm italic" style={{ color: "var(--text-tertiary)" }}>
          Log some moods to see your distribution.
        </p>
      </div>
    );
  }

  const data = Object.entries(distribution)
    .filter(([, n]) => n > 0)
    .sort(([, a], [, b]) => b - a)
    .map(([key, value], i) => ({
      key,
      value,
      name:  MOOD_LABELS[key] ?? key,
      emoji: MOOD_EMOJI[key]  ?? "💭",
      // short label for X-axis — 3 chars so it fits
      label: (MOOD_LABELS[key] ?? key).slice(0, 3),
      color: PALETTE[i % PALETTE.length],
    }));

  if (!mounted) {
    return <div style={{ height: 180 }} />;
  }

  return (
    <div style={{ position: "relative", width: "100%", height: 180, minWidth: 0, minHeight: 180 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -24 }} barCategoryGap="25%">
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fill: "var(--text-tertiary)", fontSize: 10 }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            allowDecimals={false}
            tick={{ fill: "var(--text-tertiary)", fontSize: 11 }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            cursor={{ fill: "var(--bg-muted)", radius: 4 }}
            content={(props) => (
              <BarTip
                active={props.active}
                payload={props.payload as unknown as BarTipProps["payload"]}
              />
            )}
          />
          <Bar dataKey="value" name="Logs" radius={[4, 4, 0, 0]}>
            {data.map((entry, i) => (
              <Cell key={entry.key} fill={PALETTE[i % PALETTE.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}