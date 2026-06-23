"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, type TooltipProps } from "recharts";

interface Props {
  distribution: Record<string, number>;
}

const MOOD_LABELS: Record<string, string> = {
  HAPPY:       "Happy",
  CALM:        "Calm",
  HOPEFUL:     "Hopeful",
  NEUTRAL:     "Neutral",
  LONELY:      "Lonely",
  ANXIOUS:     "Anxious",
  SAD:         "Sad",
  OVERWHELMED: "Overwhelmed",
  ANGRY:       "Angry",
  FEARFUL:     "Fearful",
};

const MOOD_EMOJI: Record<string, string> = {
  HAPPY:       "😊",
  CALM:        "😌",
  HOPEFUL:     "🌟",
  NEUTRAL:     "😐",
  LONELY:      "💙",
  ANXIOUS:     "😰",
  SAD:         "😔",
  OVERWHELMED: "😵",
  ANGRY:       "😤",
  FEARFUL:     "😨",
};

/**
 * A calm, premium palette:
 * - Positive moods: indigo to teal range
 * - Neutral/ambivalent: warm slate / amber
 * - Difficult moods: rose / amber
 *
 * Note: Order matters only aesthetically (Recharts cycles through them
 * in the order data entries appear). The semantic assignment to specific
 * moods isn't guaranteed without sorting the data first.
 */
const CHART_PALETTE = [
  "#4f46e5", // indigo-600   — primary
  "#0d9488", // teal-600     — accent
  "#6366f1", // indigo-500
  "#14b8a6", // teal-500
  "#8b5cf6", // violet-500
  "#a78bfa", // violet-400
  "#d97706", // amber-600
  "#f59e0b", // amber-500
  "#ef4444", // red-500
  "#6b7280", // gray-500
];

export function MoodDistributionChart({ distribution }: Props) {
  if (!distribution || Object.keys(distribution).length === 0) {
    return (
      <div className="h-[200px] flex items-center justify-center">
        <p className="text-sm text-subtle italic">Log some moods to see your distribution.</p>
      </div>
    );
  }

  const data = Object.entries(distribution)
    .filter(([, count]) => count > 0)
    .sort(([, a], [, b]) => b - a)
    .map(([mood, count]) => ({
      name:  MOOD_LABELS[mood] ?? mood,
      emoji: MOOD_EMOJI[mood] ?? "💭",
      value: count,
      key:   mood,
    }));

  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div>
      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius="40%"
            outerRadius="72%"
            paddingAngle={2}
            strokeWidth={0}
          >
            {data.map((entry, index) => (
              <Cell
                key={entry.key}
                fill={CHART_PALETTE[index % CHART_PALETTE.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<DistributionTooltip total={total} />} />
        </PieChart>
      </ResponsiveContainer>

      {/* Custom legend — 2 columns */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mt-3">
        {data.slice(0, 8).map((entry, index) => (
          <div key={entry.key} className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ background: CHART_PALETTE[index % CHART_PALETTE.length] }}
            />
            <span className="text-[11px] text-muted truncate">
              {entry.emoji} {entry.name}
            </span>
            <span className="text-[11px] text-subtle ml-auto shrink-0">
              {Math.round((entry.value / total) * 100)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

interface DistributionTooltipProps {
  active?: boolean;
  payload?: any[];
  total: number;
}

function DistributionTooltip({ active, payload, total }: DistributionTooltipProps) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  const pct  = total ? Math.round(((item.value as number) / total) * 100) : 0;

  return (
    <div className="bg-surface border border-border rounded-md px-3 py-2 text-xs shadow-md">
      <div className="flex items-center gap-1.5 mb-0.5">
        <span
          className="w-2 h-2 rounded-full shrink-0"
          style={{ background: item.payload.fill ?? item.color }}
        />
        <span className="text-foreground font-medium">{item.name}</span>
      </div>
      <p className="text-subtle">
        {item.value} log{item.value !== 1 ? "s" : ""} · {pct}%
      </p>
    </div>
  );
}