import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getMoodSummary, getWeeklyMoodTrend, getRecentMoodEntries } from "@/lib/services/mood.service";
import { getStressScore, getDominantEmotions } from "@/lib/services/analytics.service";
import { generateWeeklyInsights, getLatestInsight } from "@/lib/services/insight.service";
import { getSpecialistRecommendations } from "@/lib/services/specialist-recommendation.service";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  // Fetch everything in parallel
  const [
    moodSummary,
    weeklyTrend,
    recentMoodEntries,
    stressScore,
    dominantEmotions,
    latestInsight,
    recentSessions,
  ] = await Promise.all([
    getMoodSummary(userId),
    getWeeklyMoodTrend(userId),
    getRecentMoodEntries(userId, 5),
    getStressScore(userId),
    getDominantEmotions(userId),
    getLatestInsight(userId),
    prisma.chatSession.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      take: 3,
      select: { id: true, title: true, updatedAt: true },
    }),
  ]);


  // Auto-generate if no insight exists for this week yet
  if (!latestInsight) {
    generateWeeklyInsights(userId).catch(() => {});
  }

  // Get specialist recommendations based on patterns
  const { specialists, reason } = await getSpecialistRecommendations(
    dominantEmotions,
    stressScore.label === "Critical" ? "HIGH" : "LOW"
  );

  return NextResponse.json({
    moodSummary,
    weeklyTrend,
    recentMoodEntries,
    stressScore,
    dominantEmotions,
    latestInsight,
    recentSessions,
    recommendedSpecialists: specialists.slice(0, 2),
    recommendationReason: reason,
  });
}
