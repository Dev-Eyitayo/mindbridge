// src/lib/services/mood.service.ts
// ============================================================
// Mood Service
// Encapsulates all mood-related database operations.
// ============================================================

import prisma from "@/lib/prisma";

export type MoodType =
  | "HAPPY"
  | "SAD"
  | "ANXIOUS"
  | "ANGRY"
  | "CALM"
  | "NEUTRAL"
  | "OVERWHELMED"
  | "HOPEFUL"
  | "LONELY"
  | "FEARFUL";

export type CreateMoodInput = {
  userId: string;
  value: number;      // 1-10 (kept for backward compat)
  moodType?: MoodType;
  intensity?: number; // 1-10
  note?: string;
  sleepScore?: number;
  energyScore?: number;
};

/** Create a new mood entry */
export async function createMoodEntry(input: CreateMoodInput) {
  return prisma.moodEntry.create({ data: input });
}

/** Fetch recent mood entries for a user (defaults to last 30) */
export async function getRecentMoodEntries(userId: string, limit = 30) {
  return prisma.moodEntry.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}

/** Fetch mood entries within a date range */
export async function getMoodEntriesInRange(
  userId: string,
  from: Date,
  to: Date
) {
  return prisma.moodEntry.findMany({
    where: {
      userId,
      createdAt: { gte: from, lte: to },
    },
    orderBy: { createdAt: "asc" },
  });
}

/** Get the last N days of entries (for charts) */
export async function getMoodEntriesLastNDays(userId: string, days = 7) {
  const from = new Date();
  from.setDate(from.getDate() - days);
  return getMoodEntriesInRange(userId, from, new Date());
}

export type MoodSummary = {
  totalEntries: number;
  averageIntensity: number;
  averageValue: number;
  averageSleepScore: number | null;
  averageEnergyScore: number | null;
  moodDistribution: Record<string, number>;
  currentStreak: number;
};

/** Calculate summary stats for a user's mood history */
export async function getMoodSummary(userId: string): Promise<MoodSummary> {
  const entries = await getRecentMoodEntries(userId, 90);

  if (entries.length === 0) {
    return {
      totalEntries: 0,
      averageIntensity: 0,
      averageValue: 0,
      averageSleepScore: null,
      averageEnergyScore: null,
      moodDistribution: {},
      currentStreak: 0,
    };
  }

  const withIntensity = entries.filter((e) => e.intensity !== null);
  const withSleep = entries.filter((e) => e.sleepScore !== null);
  const withEnergy = entries.filter((e) => e.energyScore !== null);

  const averageValue =
    entries.reduce((sum, e) => sum + e.value, 0) / entries.length;

  const averageIntensity =
    withIntensity.length > 0
      ? withIntensity.reduce((sum, e) => sum + (e.intensity ?? 0), 0) /
        withIntensity.length
      : 0;

  const averageSleepScore =
    withSleep.length > 0
      ? withSleep.reduce((sum, e) => sum + (e.sleepScore ?? 0), 0) /
        withSleep.length
      : null;

  const averageEnergyScore =
    withEnergy.length > 0
      ? withEnergy.reduce((sum, e) => sum + (e.energyScore ?? 0), 0) /
        withEnergy.length
      : null;

  // Build mood distribution
  const moodDistribution: Record<string, number> = {};
  for (const entry of entries) {
    if (entry.moodType) {
      moodDistribution[entry.moodType] =
        (moodDistribution[entry.moodType] ?? 0) + 1;
    }
  }

  // Calculate streak (consecutive days with at least one entry)
  const streak = calculateStreak(entries.map((e) => e.createdAt));

  return {
    totalEntries: entries.length,
    averageIntensity: Math.round(averageIntensity * 10) / 10,
    averageValue: Math.round(averageValue * 10) / 10,
    averageSleepScore: averageSleepScore
      ? Math.round(averageSleepScore * 10) / 10
      : null,
    averageEnergyScore: averageEnergyScore
      ? Math.round(averageEnergyScore * 10) / 10
      : null,
    moodDistribution,
    currentStreak: streak,
  };
}

/** Compute consecutive-day streak from a list of timestamps (desc order OK) */
function calculateStreak(dates: Date[]): number {
  if (dates.length === 0) return 0;

  // Deduplicate to unique day strings
  const uniqueDays = [
    ...new Set(dates.map((d) => d.toISOString().split("T")[0])),
  ].sort((a, b) => b.localeCompare(a)); // desc

  const today = new Date().toISOString().split("T")[0];

  let streak = 0;
  let cursor = today;

  for (const day of uniqueDays) {
    if (day === cursor) {
      streak++;
      // Go back one day
      const d = new Date(cursor);
      d.setDate(d.getDate() - 1);
      cursor = d.toISOString().split("T")[0];
    } else if (day < cursor) {
      // Gap found
      break;
    }
  }

  return streak;
}

/** Weekly mood trend: average value per day for the last 7 days */
export async function getWeeklyMoodTrend(userId: string) {
  const entries = await getMoodEntriesLastNDays(userId, 7);

  // Group by day
  const byDay: Record<string, number[]> = {};
  for (const entry of entries) {
    const day = entry.createdAt.toISOString().split("T")[0];
    if (!byDay[day]) byDay[day] = [];
    byDay[day].push(entry.intensity ?? entry.value);
  }

  // Build a 7-day array
  const result = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split("T")[0];
    const values = byDay[key] ?? [];
    result.push({
      date: key,
      label: d.toLocaleDateString("en-US", { weekday: "short" }),
      average: values.length
        ? Math.round((values.reduce((a, b) => a + b, 0) / values.length) * 10) / 10
        : null,
      count: values.length,
    });
  }

  return result;
}
