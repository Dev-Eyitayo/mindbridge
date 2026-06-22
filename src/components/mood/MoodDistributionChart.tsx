"use client";

// src/components/mood/MoodDistributionChart.tsx
// Donut/pie chart showing mood type distribution using recharts

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const MOOD_COLOURS: Record<string, string> = {
  HAPPY: "#10b981",
  CALM: "#6366f1",
  HOPEFUL: "#f59e0b",
  NEUTRAL: "#94a3b8",
  LONELY: "#60a5fa",
  ANXIOUS: "#f97316",
  SAD: "#3b82f6",
  OVERWHELMED: "#8b5cf6",
  ANGRY: "#ef4444",
  FEARFUL: "#ec4899",
};

interface Props {
  distribution: Record<string, number>;
}

export function MoodDistributionChart({ distribution }: Props) {
  const data = Object.entries(distribution).map(([name, value]) => ({
    name,
    value,
  }));

  if (data.length === 0) {
    return (
      <div className="h-40 flex items-center justify-center text-sm text-slate-400 italic">
        No distribution data yet.
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={180}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={45}
          outerRadius={70}
          paddingAngle={3}
          dataKey="value"
        >
          {data.map((entry) => (
            <Cell
              key={entry.name}
              fill={MOOD_COLOURS[entry.name] ?? "#94a3b8"}
            />
          ))}
        </Pie>
        <Tooltip
          formatter={(value: number, name: string) => [value, name]}
        />
        <Legend
          iconType="circle"
          iconSize={8}
          formatter={(v) =>
            v.charAt(0) + v.slice(1).toLowerCase()
          }
          wrapperStyle={{ fontSize: "11px" }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
