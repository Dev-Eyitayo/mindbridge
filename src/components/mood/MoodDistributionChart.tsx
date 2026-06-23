"use client";
import type { TooltipProps } from "recharts";


const PALETTE = [
  "#7c3aed","#06b6d4","#6366f1","#14b8a6","#8b5cf6",
  "#a78bfa","#d97706","#f59e0b","#ef4444","#6b7280",
];

const MOOD_LABELS: Record<string, string> = {
  HAPPY:"Happy",CALM:"Calm",HOPEFUL:"Hopeful",NEUTRAL:"Neutral",LONELY:"Lonely",
  ANXIOUS:"Anxious",SAD:"Sad",OVERWHELMED:"Overwhelmed",ANGRY:"Angry",FEARFUL:"Fearful",
};

const MOOD_EMOJI: Record<string, string> = {
  HAPPY:"😊",CALM:"😌",HOPEFUL:"🌟",NEUTRAL:"😐",LONELY:"💙",
  ANXIOUS:"😰",SAD:"😔",OVERWHELMED:"😵",ANGRY:"😤",FEARFUL:"😨",
};

import { PieChart, Pie, Cell, Tooltip as PieTip, ResponsiveContainer as PRC, type TooltipProps as PTP } from "recharts";

export function MoodDistributionChart({ distribution }: { distribution: Record<string, number> }) {
  if (!distribution || Object.keys(distribution).length === 0) {
    return (
      <div className="h-48 flex items-center justify-center">
        <p className="text-sm italic" style={{ color: "var(--text-tertiary)" }}>
          Log some moods to see your distribution.
        </p>
      </div>
    );
  }

  const data = Object.entries(distribution)
    .filter(([, n]) => n > 0)
    .sort(([, a], [, b]) => b - a)
    .map(([key, value]) => ({
      key, value,
      name:  MOOD_LABELS[key] ?? key,
      emoji: MOOD_EMOJI[key] ?? "💭",
    }));

  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <div>
      <PRC width="100%" height={160}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%"
            innerRadius="38%" outerRadius="68%" paddingAngle={2} strokeWidth={0}>
            {data.map((_, i) => (
              <Cell key={i} fill={PALETTE[i % PALETTE.length]} />
            ))}
          </Pie>
          <PieTip content={<PieTipContent total={total} />} />
        </PieChart>
      </PRC>
      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mt-3">
        {data.slice(0, 8).map((d, i) => (
          <div key={d.key} className="flex items-center gap-1.5">
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: PALETTE[i % PALETTE.length], flexShrink: 0 }} />
            <span className="text-[11px] truncate" style={{ color: "var(--text-secondary)" }}>
              {d.emoji} {d.name}
            </span>
            <span className="text-[11px] ml-auto shrink-0" style={{ color: "var(--text-tertiary)" }}>
              {Math.round((d.value / total) * 100)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}


interface PieChartData {
  key: string;
  value: number;
  name: string;
  emoji: string;
  fill?: string;
}

interface PieTipProps extends TooltipProps<number, string> {
  payload?: any;
  total: number;
}

export function PieTipContent({ active, payload, total }: PieTipProps) {
  if (!active || !payload?.length) return null;

  const it = payload[0];
  const dataPayload = it.payload as PieChartData;
  
  const fill = dataPayload.fill ?? it.color;
  const value = Number(it.value ?? 0);
  const pct = total ? Math.round((value / total) * 100) : 0;

  return (
    <div style={{
      background: "var(--card)", border: "1px solid var(--border)",
      borderRadius: "var(--r-md)", padding: "8px 12px", boxShadow: "var(--shadow-md)", fontSize: 12,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: fill, flexShrink: 0 }} />
        <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>{it.name}</span>
      </div>
      <p style={{ color: "var(--text-tertiary)" }}>{value} log{value !== 1 ? "s" : ""} · {pct}%</p>
    </div>
  );
}