"use client";

import {
  ResponsiveContainer, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip,
} from "recharts";
import { useEffect, useState } from "react";

interface TrendPoint {
  date: string;
  label: string;       
  average: number | null;
  count: number;
}

interface Colors {
  violet: string;
  cyan: string;
  amber: string;
  border: string;
  subtle: string;
  card: string;
}

function cssVar(name: string): string {
  if (typeof window === "undefined") return "";
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function ChartTip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { name: string; value: number; color: string }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;

  return (
    <div
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: "var(--r-md)",
        padding: "8px 12px",
        boxShadow: "var(--shadow-md)",
        fontSize: 12,
      }}
    >
      {label && (
        <p style={{ color: "var(--text-tertiary)", marginBottom: 4, fontWeight: 500 }}>
          {label}
        </p>
      )}
      {payload.map((e) => (
        <div
          key={String(e.name)}
          style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: e.color,
              flexShrink: 0,
              display: "inline-block",
            }}
          />
          <span style={{ color: "var(--text-primary)" }}>
            {e.name}: <strong>{Number(e.value ?? 0).toFixed(1)}/10</strong>
          </span>
        </div>
      ))}
    </div>
  );
}

export function MoodTrendChart({ data }: { data: TrendPoint[] }) {
  const [mounted, setMounted] = useState(false);
  const [c, setC] = useState<Colors>({
    violet: "#7c3aed",
    cyan:   "#06b6d4",
    amber:  "#d97706",
    border: "#e4e4e7",
    subtle: "#a1a1aa",
    card:   "#ffffff",
  });

  useEffect(() => {
    setMounted(true);
    setC({
      violet: cssVar("--violet")        || "#7c3aed",
      cyan:   cssVar("--cyan")          || "#06b6d4",
      amber:  cssVar("--amber")         || "#d97706",
      border: cssVar("--border")        || "#e4e4e7",
      subtle: cssVar("--text-tertiary") || "#a1a1aa",
      card:   cssVar("--card")          || "#ffffff",
    });
  }, []);

  // Filter out days with no data for the empty-state check
  const hasAnyData = data?.some((d) => d.average !== null && d.count > 0);

  if (!data || data.length === 0 || !hasAnyData) {
    return (
      <div style={{ height: 190, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p className="text-sm italic" style={{ color: "var(--text-tertiary)" }}>
          Not enough data yet.
        </p>
      </div>
    );
  }

  if (!mounted) {
    return <div style={{ height: 190 }} />;
  }

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: 190,
        minWidth: 0,
        minHeight: 190,
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        {/* dataKey="label" for XAxis — matches { label: "Mon" } from mood.service */}
        <LineChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -22 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={c.border} vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fill: c.subtle, fontSize: 11 }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            domain={[0, 10]}
            tickCount={5}
            tick={{ fill: c.subtle, fontSize: 11 }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            content={(props) => (
              <ChartTip
                active={props.active}
                payload={props.payload as unknown as { name: string; value: number; color: string }[]}
                label={typeof props.label === "string" ? props.label : String(props.label ?? "")}
              />
            )}
          />
          {/* dataKey="average" — matches { average: number | null } from mood.service */}
          <Line
            type="monotone"
            dataKey="average"
            stroke={c.violet}
            strokeWidth={2}
            dot={{ fill: c.card, stroke: c.violet, strokeWidth: 2, r: 3 }}
            activeDot={{ r: 5, fill: c.violet, stroke: c.card, strokeWidth: 2 }}
            name="Mood"
            connectNulls
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}