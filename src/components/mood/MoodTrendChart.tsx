"use client";

// src/components/mood/MoodTrendChart.tsx
// ============================================================
// Weekly Mood Trend Bar Chart using recharts.
// recharts must be added: pnpm add recharts
// ============================================================

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";

type TrendPoint = {
  date: string;
  label: string;
  average: number | null;
  count: number;
};

interface MoodTrendChartProps {
  data: TrendPoint[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload as TrendPoint;
    return (
      <div className="bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-sm text-sm">
        <p className="font-medium text-slate-800">{d.label}</p>
        {d.average !== null ? (
          <p className="text-teal-600 mt-0.5">Avg intensity: {d.average}/10</p>
        ) : (
          <p className="text-slate-400 mt-0.5 italic">No entries</p>
        )}
        {d.count > 0 && (
          <p className="text-slate-400 mt-0.5">{d.count} log{d.count === 1 ? "" : "s"}</p>
        )}
      </div>
    );
  }
  return null;
};

export function MoodTrendChart({ data }: MoodTrendChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="h-40 flex items-center justify-center text-sm text-slate-400 italic">
        No mood data yet. Start logging to see your trend.
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={180}>
      <BarChart data={data} barSize={28}>
        <CartesianGrid vertical={false} stroke="#f1f5f9" />
        <XAxis
          dataKey="label"
          tick={{ fontSize: 12, fill: "#94a3b8" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          domain={[0, 10]}
          ticks={[0, 2, 4, 6, 8, 10]}
          tick={{ fontSize: 11, fill: "#94a3b8" }}
          axisLine={false}
          tickLine={false}
          width={24}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f8fafc" }} />
        <Bar dataKey="average" radius={[6, 6, 0, 0]}>
          {data.map((entry, i) => (
            <Cell
              key={i}
              fill={entry.average === null ? "#e2e8f0" : "#0d9488"}
              opacity={entry.average === null ? 0.4 : 1}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
