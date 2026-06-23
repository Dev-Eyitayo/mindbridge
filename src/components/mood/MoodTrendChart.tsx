
"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  type TooltipProps,
} from "recharts";
import { useEffect, useState } from "react";

interface TrendPoint {
  day: string;
  avgIntensity: number;
  avgSleep?: number;
  avgEnergy?: number;
  count: number;
}

interface Props {
  data: TrendPoint[];
}

/** Resolve a CSS custom property at runtime so Recharts can use it */
function token(name: string): string {
  if (typeof window === "undefined") return "#4f46e5";
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

export function MoodTrendChart({ data }: Props) {
  const [colours, setColours] = useState({
    primary:        "#4f46e5",
    accent:         "#0d9488",
    warning:        "#d97706",
    border:         "#e8e6e3",
    subtle:         "#a09d99",
    surface:        "#ffffff",
  });

  useEffect(() => {
    setColours({
      primary:  token("--primary"),
      accent:   token("--accent"),
      warning:  token("--warning"),
      border:   token("--border"),
      subtle:   token("--foreground-subtle"),
      surface:  token("--surface"),
    });
  }, []);

  if (!data || data.length === 0) {
    return (
      <div className="h-[200px] flex items-center justify-center">
        <p className="text-sm text-subtle italic">Not enough data to show a trend yet.</p>
      </div>
    );
  }

  const hasMultipleLines = data.some((d) => d.avgSleep != null || d.avgEnergy != null);

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data} margin={{ top: 4, right: 8, bottom: 0, left: -20 }}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke={colours.border}
          vertical={false}
        />
        <XAxis
          dataKey="day"
          tick={{ fill: colours.subtle, fontSize: 11 }}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          domain={[0, 10]}
          tickCount={5}
          tick={{ fill: colours.subtle, fontSize: 11 }}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip content={<ChartTooltip />} />

        {/* Mood intensity — always shown */}
        <Line
          type="monotone"
          dataKey="avgIntensity"
          stroke={colours.primary}
          strokeWidth={2}
          dot={{ fill: colours.surface, stroke: colours.primary, strokeWidth: 2, r: 3 }}
          activeDot={{ r: 5, fill: colours.primary, stroke: colours.surface, strokeWidth: 2 }}
          name="Mood"
        />

        {/* Optional: sleep */}
        {data.some((d) => d.avgSleep != null) && (
          <Line
            type="monotone"
            dataKey="avgSleep"
            stroke={colours.accent}
            strokeWidth={1.5}
            dot={false}
            strokeDasharray="4 3"
            name="Sleep"
          />
        )}

        {/* Optional: energy */}
        {data.some((d) => d.avgEnergy != null) && (
          <Line
            type="monotone"
            dataKey="avgEnergy"
            stroke={colours.warning}
            strokeWidth={1.5}
            dot={false}
            strokeDasharray="2 3"
            name="Energy"
          />
        )}
      </LineChart>
    </ResponsiveContainer>
  );
}

interface ChartTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

function ChartTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <div
      className="bg-surface border border-border rounded-md px-3 py-2.5 text-xs shadow-md"
      style={{ minWidth: 120 }}
    >
      <p className="text-subtle mb-1.5 font-medium">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-1.5 mb-0.5">
          <span
            className="w-2 h-2 rounded-full shrink-0"
            style={{ background: entry.color }}
          />
          <span className="text-foreground">
            {entry.name}: <strong>{Number(entry.value).toFixed(1)}/10</strong>
          </span>
        </div>
      ))}
    </div>
  );
}