import OpenAI from "openai";
import prisma from "@/lib/prisma";
import { getMoodEntriesInRange } from "./mood.service";
import { getEmotionFrequencies } from "./analytics.service";

const groq = new OpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY,
});

const INSIGHT_PROMPT = `
You are a compassionate mental wellness analyst.

You will receive a summary of a user's mood and emotional data from the past week.
Generate 2 to 4 meaningful, supportive observations.

Rules:
- Never diagnose the user with any condition.
- Use gentle, supportive language: "you may have noticed", "it seems", "you might find".
- Focus on patterns, not problems.
- Be specific and grounded in the data provided.
- Each insight should be a single clear sentence.
- Return ONLY a JSON array of strings. No preamble, no markdown.

Example:
["Anxiety appears to peak on weekday mornings, which may reflect work-related pressure.","Sleep scores tend to be lower when stress intensity is higher — these two are often connected."]
`.trim();

/** Get the Monday of the current week */
function getWeekStart(date = new Date()): Date {
  const d = new Date(date);
  const day = d.getDay(); // 0 = Sun
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

/**
 * Generate (or retrieve cached) weekly insights for a user.
 * Safe to call multiple times — returns cached if already generated this week.
 */
export async function generateWeeklyInsights(userId: string) {
  const weekStart = getWeekStart();

  // Return cached insight for this week if it exists
  const existing = await prisma.weeklyInsight.findUnique({
    where: { userId_weekStart: { userId, weekStart } },
  });
  if (existing) return existing;

  // Gather data for the past 7 days
  const weekEnd = new Date();
  const [moodEntries, emotionFreqs] = await Promise.all([
    getMoodEntriesInRange(userId, weekStart, weekEnd),
    getEmotionFrequencies(userId, 7),
  ]);

  // Build a compact data summary for the AI
  const avgMood =
    moodEntries.length > 0
      ? (moodEntries.reduce((s, e) => s + (e.intensity ?? e.value), 0) /
          moodEntries.length).toFixed(1)
      : "N/A";

  const avgSleep =
    moodEntries.filter((e) => e.sleepScore).length > 0
      ? (
          moodEntries.reduce((s, e) => s + (e.sleepScore ?? 0), 0) /
          moodEntries.filter((e) => e.sleepScore).length
        ).toFixed(1)
      : "N/A";

  const topEmotions = emotionFreqs
    .slice(0, 3)
    .map((e) => `${e.emotion} (${e.percentage}%)`)
    .join(", ");

  const moodByDay = moodEntries
    .reduce((acc: Record<string, number[]>, e) => {
      const day = e.createdAt.toLocaleDateString("en-US", { weekday: "long" });
      if (!acc[day]) acc[day] = [];
      acc[day].push(e.intensity ?? e.value);
      return acc;
    }, {});

  const dailySummary = Object.entries(moodByDay)
    .map(([day, vals]) => `${day}: avg ${(vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1)}`)
    .join(", ");

  const dataSummary = `
Week: ${weekStart.toDateString()} to ${weekEnd.toDateString()}
Mood entries logged: ${moodEntries.length}
Average intensity/mood: ${avgMood}/10
Average sleep score: ${avgSleep}/10
Top emotions from chat: ${topEmotions || "N/A"}
Daily mood averages: ${dailySummary || "N/A"}
  `.trim();

  if (moodEntries.length === 0 && emotionFreqs.length === 0) {
    // Not enough data — store a placeholder
    return prisma.weeklyInsight.upsert({
      where: { userId_weekStart: { userId, weekStart } },
      update: {},
      create: {
        userId,
        weekStart,
        content:
          "Log your mood daily to start seeing personalised weekly insights.",
        tags: [],
      },
    });
  }

  // Ask Groq to generate insights
  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: INSIGHT_PROMPT },
        { role: "user", content: dataSummary },
      ],
      temperature: 0.6,
      max_tokens: 300,
    });

    const raw = completion.choices[0]?.message?.content?.trim() ?? "[]";
    const insights: string[] = JSON.parse(raw);

    // Derive tags from top emotions
    const tags = emotionFreqs.slice(0, 3).map((e) => e.emotion.toLowerCase());

    return prisma.weeklyInsight.upsert({
      where: { userId_weekStart: { userId, weekStart } },
      update: { content: insights.join(" "), tags },
      create: {
        userId,
        weekStart,
        content: insights.join(" "),
        tags,
      },
    });
  } catch (err) {
    console.error("[Insight Service] Failed to generate insights:", err);
    return null;
  }
}

/** Fetch the most recent insight for a user */
export async function getLatestInsight(userId: string) {
  return prisma.weeklyInsight.findFirst({
    where: { userId },
    orderBy: { weekStart: "desc" },
  });
}
