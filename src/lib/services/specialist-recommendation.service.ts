import prisma from "@/lib/prisma";

/** Maps a dominant emotion to relevant specialist tags and a reason */
const EMOTION_TO_TAGS: Record<
  string,
  { tags: string[]; reason: string }
> = {
  ANXIOUS: {
    tags: ["anxiety", "CBT", "GAD"],
    reason:
      "Frequent anxiety-related themes in your conversations suggest speaking with an anxiety specialist or CBT therapist may be beneficial.",
  },
  FEARFUL: {
    tags: ["anxiety", "trauma", "PTSD"],
    reason:
      "Patterns suggesting fear and worry may benefit from support from an anxiety specialist or trauma-informed therapist.",
  },
  SAD: {
    tags: ["depression", "counselling", "mood disorders"],
    reason:
      "Recurring low mood themes suggest you might find it helpful to speak with a counsellor or psychologist who specialises in mood.",
  },
  OVERWHELMED: {
    tags: ["stress", "burnout", "CBT"],
    reason:
      "Signs of sustained overwhelm may indicate that speaking with a stress management therapist or counsellor could be valuable.",
  },
  ANGRY: {
    tags: ["stress", "emotional regulation", "CBT"],
    reason:
      "Elevated frustration patterns may benefit from support with emotional regulation from a licensed therapist.",
  },
  LONELY: {
    tags: ["counselling", "interpersonal therapy", "relationships"],
    reason:
      "Themes around connection and loneliness suggest that speaking with a counsellor may provide meaningful support.",
  },
  HOPEFUL: {
    tags: ["mindfulness", "wellbeing", "positive psychology"],
    reason:
      "Maintaining your positive momentum with a mindfulness or wellbeing coach may help sustain your progress.",
  },
  CALM: {
    tags: ["mindfulness", "wellbeing"],
    reason:
      "Consider exploring sessions with a mindfulness practitioner to deepen your sense of balance.",
  },
  NEUTRAL: {
    tags: ["counselling", "wellbeing"],
    reason:
      "Speaking with a counsellor can provide space for reflection and personal growth.",
  },
};

/** High-risk level -> always surface crisis-appropriate specialists */
const CRISIS_TAGS = ["psychiatry", "trauma", "depression", "crisis support"];

export type RecommendedSpecialist = {
  id: string;
  name: string;
  title: string;
  specialization: string;
  bio: string;
  yearsOfExperience: number;
  location: string;
  languages: string[];
  imageUrl: string | null;
  rating: number;
  availability: string;
  consultationType: string;
  tags: string[];
  verified: boolean;
};

export type RecommendationResult = {
  specialists: RecommendedSpecialist[];
  reason: string;
};

/**
 * Return specialist recommendations based on the user's dominant emotions
 * and highest risk level observed.
 * Does NOT diagnose the user.
 */
export async function getSpecialistRecommendations(
  dominantEmotions: string[],
  highestRiskLevel: string
): Promise<RecommendationResult> {
  // If in crisis/high-risk, prioritise crisis-appropriate specialists
  const isCrisis =
    highestRiskLevel === "CRISIS" || highestRiskLevel === "HIGH";

  const tagsToSearch = isCrisis
    ? CRISIS_TAGS
    : dominantEmotions.flatMap(
        (e) => EMOTION_TO_TAGS[e]?.tags ?? ["counselling"]
      );

  const uniqueTags = [...new Set(tagsToSearch)];

  // Build reason string from top emotion
  const topEmotion = dominantEmotions[0] ?? "NEUTRAL";
  const reason = isCrisis
    ? "Recent conversations suggest elevated distress. Speaking with a mental health professional may provide important support."
    : (EMOTION_TO_TAGS[topEmotion]?.reason ??
      "Based on your recent conversations, speaking with a mental health professional may be beneficial.");

  // Query specialists whose tags overlap with the derived tag list
  const specialists = await prisma.specialist.findMany({
    where: {
      tags: {
        hasSome: uniqueTags,
      },
    },
    orderBy: [{ rating: "desc" }, { verified: "desc" }],
    take: 5,
  });

  // If nothing matches, fall back to top-rated verified specialists
  if (specialists.length === 0) {
    const fallback = await prisma.specialist.findMany({
      where: { verified: true },
      orderBy: { rating: "desc" },
      take: 3,
    });
    return { specialists: fallback, reason };
  }

  return { specialists, reason };
}

/** Fetch all specialists with optional filters */
export async function getAllSpecialists(filters?: {
  specialization?: string;
  consultationType?: string;
  tag?: string;
}) {
  return prisma.specialist.findMany({
    where: {
      ...(filters?.specialization && {
        specialization: { contains: filters.specialization, mode: "insensitive" },
      }),
      ...(filters?.consultationType && {
        consultationType: filters.consultationType,
      }),
      ...(filters?.tag && {
        tags: { has: filters.tag },
      }),
    },
    orderBy: [{ rating: "desc" }, { verified: "desc" }],
  });
}
