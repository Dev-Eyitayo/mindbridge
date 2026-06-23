"use client";

import {
  ResponsiveContainer, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, type TooltipProps,
} from "recharts";
import { useEffect, useState } from "react";

interface TrendPoint {
  day: string;
  avgIntensity: number;
  avgSleep?: number;
  avgEnergy?: number;
  count: number;
}

interface ChartTipProps extends TooltipProps<number, string> {
  active?: boolean;
  payload?: {
    name: string;
    value: number;
    color: string;
  }[];
  label?: string;
}

function cssVar(name: string) {
  if (typeof window === "undefined") return "#7c3aed";
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

export function MoodTrendChart({ data }: { data: TrendPoint[] }) {
  const [c, setC] = useState({
    violet: "#7c3aed", cyan: "#06b6d4", amber: "#d97706",
    border: "#e4e4e7", subtle: "#a1a1aa", card: "#ffffff",
  });

  useEffect(() => {
    setC({
      violet: cssVar("--violet"),
      cyan:   cssVar("--cyan"),
      amber:  cssVar("--amber"),
      border: cssVar("--border"),
      subtle: cssVar("--text-tertiary"),
      card:   cssVar("--card"),
    });
  }, []);

  if (!data || data.length === 0) {
    return (
      <div className="h-48 flex items-center justify-center">
        <p className="text-sm italic" style={{ color: "var(--text-tertiary)" }}>
          Not enough data yet.
        </p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={190}>
      <LineChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -22 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={c.border} vertical={false} />
        <XAxis dataKey="day" tick={{ fill: c.subtle, fontSize: 11 }} tickLine={false} axisLine={false} />
        <YAxis domain={[0, 10]} tickCount={5} tick={{ fill: c.subtle, fontSize: 11 }} tickLine={false} axisLine={false} />
        <Tooltip content={<ChartTip />} />
        <Line type="monotone" dataKey="avgIntensity" stroke={c.violet} strokeWidth={2}
          dot={{ fill: c.card, stroke: c.violet, strokeWidth: 2, r: 3 }}
          activeDot={{ r: 5, fill: c.violet, stroke: c.card, strokeWidth: 2 }} name="Mood" />
        {data.some((d) => d.avgSleep != null) && (
          <Line type="monotone" dataKey="avgSleep" stroke={c.cyan} strokeWidth={1.5}
            dot={false} strokeDasharray="4 3" name="Sleep" />
        )}
        {data.some((d) => d.avgEnergy != null) && (
          <Line type="monotone" dataKey="avgEnergy" stroke={c.amber} strokeWidth={1.5}
            dot={false} strokeDasharray="2 3" name="Energy" />
        )}
      </LineChart>
    </ResponsiveContainer>
  );
}

export function ChartTip({ active, payload, label }: ChartTipProps) {
  if (!active || !payload?.length) return null;

  return (
    <div style={{
      background: "var(--card)", border: "1px solid var(--border)",
      borderRadius: "var(--r-md)", padding: "8px 12px", boxShadow: "var(--shadow-md)",
      fontSize: 12,
    }}>
      <p style={{ color: "var(--text-tertiary)", marginBottom: 4, fontWeight: 500 }}>{label}</p>
      {payload.map((e) => (
        <div key={String(e.name)} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: e.color, flexShrink: 0 }} />
          <span style={{ color: "var(--text-primary)" }}>
            {e.name}: <strong>{Number(e.value ?? 0).toFixed(1)}/10</strong>
          </span>
        </div>
      ))}
    </div>
  );
}