"use client";

import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
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

interface DistEntry {
  key: string;
  value: number;
  name: string;
  emoji: string;
}

function PieTipContent({
  active,
  payload,
  total,
}: {
  active?: boolean;
  payload?: { name: string; value: number; color: string }[];
  total: number;
}) {
  if (!active || !payload?.length) return null;
  const it = payload[0];
  const value = Number(it.value ?? 0);
  const pct = total ? Math.round((value / total) * 100) : 0;

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
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: it.color, flexShrink: 0 }} />
        <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>{it.name}</span>
      </div>
      <p style={{ color: "var(--text-tertiary)", margin: 0 }}>
        {value} log{value !== 1 ? "s" : ""} · {pct}%
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
      <div style={{ height: 160, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p className="text-sm italic" style={{ color: "var(--text-tertiary)" }}>
          Log some moods to see your distribution.
        </p>
      </div>
    );
  }

  const data: DistEntry[] = Object.entries(distribution)
    .filter(([, n]) => n > 0)
    .sort(([, a], [, b]) => b - a)
    .map(([key, value]) => ({
      key,
      value,
      name:  MOOD_LABELS[key] ?? key,
      emoji: MOOD_EMOJI[key] ?? "💭",
    }));

  const total = data.reduce((s, d) => s + d.value, 0);

  if (!mounted) {
    return <div style={{ height: 160 }} />;
  }

  return (
    <div>
      {/* Explicit height wrapper — required for ResponsiveContainer */}
      <div style={{ position: "relative", width: "100%", height: 160, minWidth: 0, minHeight: 160 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius="38%"
              outerRadius="68%"
              paddingAngle={2}
              strokeWidth={0}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={PALETTE[i % PALETTE.length]} />
              ))}
            </Pie>
            <Tooltip
              content={(props) => (
                <PieTipContent
                  active={props.active}
                  payload={props.payload as unknown as { name: string; value: number; color: string }[]}
                  total={total}
                />
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mt-3">
        {data.slice(0, 8).map((d, i) => (
          <div key={d.key} className="flex items-center gap-1.5">
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: PALETTE[i % PALETTE.length],
                flexShrink: 0,
                display: "inline-block",
              }}
            />
            <span className="text-[11px] truncate" style={{ color: "var(--text-secondary)" }}>
              {d.emoji} {d.name}
            </span>
            <span
              className="text-[11px] ml-auto shrink-0"
              style={{ color: "var(--text-tertiary)" }}
            >
              {Math.round((d.value / total) * 100)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}