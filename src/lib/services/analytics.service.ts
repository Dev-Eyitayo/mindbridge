import prisma from "@/lib/prisma";

/** Retrieve recent message analyses for a user */
export async function getRecentAnalyses(userId: string, limit = 50) {
  return prisma.messageAnalysis.findMany({
    where: {
      message: { userId },
    },
    include: { message: { select: { createdAt: true } } },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}

export type EmotionFrequency = {
  emotion: string;
  count: number;
  percentage: number;
};

/** Compute emotion frequency distribution from recent analyses */
export async function getEmotionFrequencies(
  userId: string,
  days = 30
): Promise<EmotionFrequency[]> {
  const since = new Date();
  since.setDate(since.getDate() - days);

  const analyses = await prisma.messageAnalysis.findMany({
    where: {
      message: {
        userId,
        createdAt: { gte: since },
      },
    },
    select: { emotion: true },
  });

  if (analyses.length === 0) return [];

  const counts: Record<string, number> = {};
  for (const a of analyses) {
    counts[a.emotion] = (counts[a.emotion] ?? 0) + 1;
  }

  const total = analyses.length;
  return Object.entries(counts)
    .map(([emotion, count]) => ({
      emotion,
      count,
      percentage: Math.round((count / total) * 100),
    }))
    .sort((a, b) => b.count - a.count);
}

export type StressScore = {
  score: number;  // 0-100
  label: string;  // "Low" | "Moderate" | "High" | "Critical"
  trend: "up" | "down" | "stable";
};

/**
 * Compute a stress score (0-100) from recent analyses.
 * Uses HIGH/CRISIS risk levels and negative emotions as signals.
 */
export async function getStressScore(userId: string): Promise<StressScore> {
  const [recent, older] = await Promise.all([
    prisma.messageAnalysis.findMany({
      where: {
        message: { userId },
        createdAt: { gte: nDaysAgo(7) },
      },
      select: { riskLevel: true, intensity: true, emotion: true },
    }),
    prisma.messageAnalysis.findMany({
      where: {
        message: { userId },
        createdAt: { gte: nDaysAgo(14), lt: nDaysAgo(7) },
      },
      select: { riskLevel: true, intensity: true, emotion: true },
    }),
  ]);

  const scoreOf = (analyses: typeof recent) => {
    if (analyses.length === 0) return 0;
    const negativeEmotions = new Set(["ANXIOUS", "SAD", "ANGRY", "FEARFUL", "OVERWHELMED", "LONELY"]);
    const weights = { LOW: 0.2, MODERATE: 0.5, HIGH: 0.8, CRISIS: 1.0 };
    const base =
      analyses.reduce((sum, a) => {
        const riskWeight = weights[a.riskLevel as keyof typeof weights] ?? 0.2;
        const isNeg = negativeEmotions.has(a.emotion) ? 1 : 0;
        return sum + (a.intensity / 10) * riskWeight * (isNeg ? 1.2 : 0.5);
      }, 0) / analyses.length;
    return Math.min(100, Math.round(base * 100));
  };

  const currentScore = scoreOf(recent);
  const previousScore = scoreOf(older);

  const trend: StressScore["trend"] =
    currentScore > previousScore + 5
      ? "up"
      : currentScore < previousScore - 5
      ? "down"
      : "stable";

  const label =
    currentScore >= 70
      ? "Critical"
      : currentScore >= 50
      ? "High"
      : currentScore >= 25
      ? "Moderate"
      : "Low";

  return { score: currentScore, label, trend };
}

/** Get dominant emotions in the last N days */
export async function getDominantEmotions(
  userId: string,
  days = 14
): Promise<string[]> {
  const freqs = await getEmotionFrequencies(userId, days);
  return freqs.slice(0, 3).map((f) => f.emotion);
}

// ── Helpers ──────────────────────────────────────────────────

function nDaysAgo(n: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
}
